"""Étalonnage commun des miniatures de la page Offres."""
import numpy as np
from PIL import Image, ImageFilter

SRC = "/home/claude/g-g/img/"
OUT = "/home/claude/g-g/img/"

LUM = np.array([0.2126, 0.7152, 0.0722])
OMBRE = np.array([20.0, 36.0, 58.0])      # bleu nuit
LUMIERE = np.array([236.0, 214.0, 164.0])  # champagne


def crop_ratio(im, ratio, cx=0.5, cy=0.5):
    w, h = im.size
    if w / h > ratio:          # trop large -> on rogne les côtés
        nw, nh = int(round(h * ratio)), h
    else:                      # trop haut -> on rogne en hauteur
        nw, nh = w, int(round(w / ratio))
    x = int(round((w - nw) * cx))
    y = int(round((h - nh) * cy))
    x = max(0, min(x, w - nw)); y = max(0, min(y, h - nh))
    return im.crop((x, y, x + nw, y + nh))


def duotone(a, force=0.72):
    """Mélange l'image avec un dégradé bleu nuit -> champagne."""
    l = np.clip((a @ LUM) / 255.0, 0, 1)
    # rampe en 3 points : noir bleuté -> brun doré -> champagne clair
    p0 = np.array([8.0, 14.0, 24.0])
    p1 = np.array([116.0, 96.0, 74.0])
    p2 = np.array([240.0, 226.0, 196.0])
    k = l[..., None]
    bas = p0 + (p1 - p0) * np.clip(k / 0.55, 0, 1)
    haut = p1 + (p2 - p1) * np.clip((k - 0.55) / 0.45, 0, 1)
    duo = np.where(k < 0.55, bas, haut)
    return a * (1 - force) + duo * force


def grade(im, cible=92.0, contraste=0.30, froid=0.26, chaud=0.20,
          sat=1.06, vignette=0.34, grain=3.0, duo=0.70):
    a = np.asarray(im.convert("RGB")).astype(np.float32)

    # 1. exposition : même densité pour toutes les images
    l = a @ LUM
    p = np.percentile(l, 84) * 0.62
    if p > 1:
        a *= np.clip(cible / p, 0.35, 2.2)
    a = np.clip(a, 0, 255)

    # 2. contraste en S doux autour du gris moyen
    x = a / 255.0
    a = (x + contraste * (x - 0.5) * (1 - np.abs(x - 0.5) * 2) * 2) * 255.0
    a = np.clip(a, 0, 255)

    # 3. split-toning : ombres froides, lumières chaudes
    l = (a @ LUM) / 255.0
    ws = ((1.0 - l) ** 2)[..., None]
    wh = (l ** 2.2)[..., None]
    gris = a.mean(axis=2, keepdims=True)
    a += ws * (OMBRE - np.array([34.0, 34.0, 34.0])) * froid
    a += wh * (LUMIERE - np.array([215.0, 215.0, 215.0])) * chaud
    a = np.clip(a, 0, 255)

    # 4. bichromie or / bleu nuit : c'est elle qui donne le fil conducteur
    a = duotone(a, duo)
    gris = a.mean(axis=2, keepdims=True)
    a = np.clip(gris + (a - gris) * sat, 0, 255)

    # 5. vignette identique partout
    h, w = a.shape[:2]
    yy, xx = np.mgrid[0:h, 0:w]
    r = ((xx / w - 0.5) ** 2 * 1.25 + (yy / h - 0.5) ** 2 * 1.45)
    a *= np.clip(1.0 - r * vignette * 2.4, 1.0 - vignette, 1.0)[..., None]

    # 6. grain fin, commun
    rng = np.random.default_rng(7)
    a += rng.normal(0, grain, a.shape)
    return Image.fromarray(np.clip(a, 0, 255).astype("uint8"))


JOBS = [
    # sortie,          source,          ratio, cx,   cy,   exposition
    ("off-interieur",  "svc-signature", 4 / 3, 0.50, 0.50, 88),
    ("off-exterieur",  "gal-3",         4 / 3, 0.45, 0.46, 88),
    ("off-prestige",   "gal-1",         4 / 3, 0.50, 0.46, 94),
    ("off-polissage",  "svc-polish",    4 / 3, 0.50, 0.56, 70),
    ("off-ceramique",  "gal-2",         4 / 3, 0.50, 0.42, 94),
    ("off-refresh",    "svc-refresh",   4 / 3, 0.50, 0.50, 86),
    ("off-hiver",      "pop",           4 / 5, 0.52, 0.52, 90),
]

if __name__ == "__main__":
    for nom, src, ratio, cx, cy, cible in JOBS:
        im = Image.open(SRC + src + ".jpg")
        im = crop_ratio(im, ratio, cx, cy)
        larg = 900 if ratio > 1 else 760
        if im.width > larg:
            im = im.resize((larg, int(round(im.height * larg / im.width))), Image.LANCZOS)
        grade(im, cible=cible).save(OUT + nom + ".jpg", quality=84, optimize=True, progressive=True)
        print(nom, Image.open(OUT + nom + ".jpg").size)
