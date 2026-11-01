"""Miniatures de la page Offres.

Recadrage au format des cartes, sans retouche de couleur : les photos
sortent telles qu'elles ont été prises. grade() reste disponible plus bas
si un jour on veut réessayer un étalonnage, mais il n'est plus appelé.
Lancer depuis la racine du dépôt : python3 tools-miniatures.py
"""
import numpy as np
from PIL import Image, ImageFilter

SRC = "img/"
OUT = "img/"
LUM = np.array([0.2126, 0.7152, 0.0722])


def crop_ratio(im, ratio, cx=0.5, cy=0.5, zoom=1.0):
    w, h = im.size
    if w / h > ratio:
        nw, nh = int(round(h * ratio)), h
    else:
        nw, nh = w, int(round(w / ratio))
    nw, nh = int(round(nw / zoom)), int(round(nh / zoom))
    x = max(0, min(int(round((w - nw) * cx)), w - nw))
    y = max(0, min(int(round((h - nh) * cy)), h - nh))
    return im.crop((x, y, x + nw, y + nh))


def grade(im, cible=104.0, noir=16.0, contraste=0.34, chaud=0.30,
          froid=0.22, sat=1.14, eclat=0.30, vignette=0.42, grain=2.2,
          haut=0.0):
    a = np.asarray(im.convert("RGB")).astype(np.float32)
    h, w = a.shape[:2]

    # 1. même densité pour toutes les miniatures
    l = a @ LUM
    p = np.percentile(l, 70)
    if p > 1:
        a *= np.clip(cible / p, 0.30, 2.4)
    a = np.clip(a, 0, 255)

    # 2. noir posé : on écrase le bas de la courbe, le fond devient vraiment noir
    a = np.clip((a - noir) * (255.0 / (255.0 - noir)), 0, 255)

    # 3. contraste en S
    x = a / 255.0
    a = np.clip((x + contraste * (x - 0.5) * (1 - np.abs(x - 0.5) * 2) * 2) * 255.0, 0, 255)

    # 4. lumière d'atelier : hautes lumières chaudes, ombres légèrement froides
    l = (a @ LUM) / 255.0
    wh = (l ** 2.0)[..., None]
    ws = ((1.0 - l) ** 2.4)[..., None]
    a += wh * np.array([26.0, 12.0, -14.0]) * chaud
    a += ws * np.array([-10.0, -2.0, 16.0]) * froid
    a = np.clip(a, 0, 255)

    # 5. halo chaud venu du haut, comme un néon au plafond
    yy = (np.arange(h) / h)[:, None]
    xx = (np.arange(w) / w)[None, :]
    halo = np.exp(-((yy - 0.06) ** 2) / 0.085) * np.exp(-((xx - 0.5) ** 2) / 0.65)
    a += halo[..., None] * np.array([40.0, 31.0, 17.0]) * eclat
    a = np.clip(a, 0, 255)

    # 6. couleurs réelles, un cran plus franches
    gris = a.mean(axis=2, keepdims=True)
    a = np.clip(gris + (a - gris) * sat, 0, 255)

    # 7. éclat : on rajoute une version floutée des hautes lumières
    im2 = Image.fromarray(a.astype("uint8"))
    flou = np.asarray(im2.filter(ImageFilter.GaussianBlur(w / 28))).astype(np.float32)
    masque = np.clip(((a @ LUM) / 255.0 - 0.62) / 0.38, 0, 1)[..., None]
    a = np.clip(a + flou * masque * 0.22, 0, 255)

    # 8. vignette franche : l'image se fond dans le noir du site
    yy2, xx2 = np.mgrid[0:h, 0:w]
    r = ((xx2 / w - 0.5) ** 2 * 1.35 + (yy2 / h - 0.5) ** 2 * 1.55)
    a *= np.clip(1.0 - r * vignette * 2.5, 1.0 - vignette, 1.0)[..., None]

    # 9. assombrir le haut quand l'arrière-plan est un ciel ou une façade claire
    if haut:
        rampe = np.clip(1.0 - np.exp(-((np.arange(h) / h) ** 2) / 0.10) * haut, 0, 1)
        a *= rampe[:, None, None]

    rng = np.random.default_rng(7)
    a += rng.normal(0, grain, a.shape)
    return Image.fromarray(np.clip(a, 0, 255).astype("uint8"))


JOBS = [
    # sortie,          source,          ratio, cx,   cy,   densité, réglages, zoom
    ("off-interieur",  "svc-signature", 4 / 3, 0.50, 0.50, 104, {}, 1.0),
    ("off-exterieur",  "gal-3",         4 / 3, 0.45, 0.46, 100, {}, 1.0),
    ("off-prestige",   "gal-1",         4 / 3, 0.50, 0.52,  98, {"haut": 0.52, "sat": 0.95}, 1.14),
    ("off-polissage",  "svc-polish",    4 / 3, 0.50, 0.56,  92, {}, 1.0),
    ("off-ceramique",  "gal-2",         4 / 3, 0.50, 0.42, 104, {}, 1.0),
    ("off-refresh",    "svc-refresh",   4 / 3, 0.50, 0.50, 100, {}, 1.0),
    ("off-hiver",      "pop",           4 / 5, 0.60, 0.62, 100, {"sat": 0.95, "haut": 0.22}, 1.30),
    ("off-pack",       "pop",           4 / 3, 0.62, 0.60, 100, {"sat": 0.95, "haut": 0.22}, 1.18),
]

if __name__ == "__main__":
    for nom, src, ratio, cx, cy, cible, extra, zoom in JOBS:
        im = crop_ratio(Image.open(SRC + src + ".jpg"), ratio, cx, cy, zoom)
        larg = 900 if ratio > 1 else 760
        im = im.resize((larg, int(round(im.height * larg / im.width))), Image.LANCZOS)
        im.save(OUT + nom + ".jpg", quality=88, optimize=True, progressive=True)
        print(nom, Image.open(OUT + nom + ".jpg").size)
