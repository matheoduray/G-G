"""Images de partage (Open Graph, 1200 x 630) : ce qui s'affiche quand on partage une page sur WhatsApp.

Lancer depuis la racine du dépôt : python3 tools-og.py
Besoin de : pip install pillow fonttools brotli
"""
import io
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1200, 630
GOLD, GOLD2, WHITE, MUTED = (201, 169, 106), (231, 211, 161), (243, 240, 234), (190, 184, 174)

# La police du site (woff2) convertie en mémoire pour Pillow
_t = TTFont("assets/fonts/archivo-latin.woff2"); _t.flavor = None
_buf = io.BytesIO(); _t.save(_buf)
FONT = _buf.getvalue()


def police(taille, graisse=700, largeur=100):
    f = ImageFont.truetype(io.BytesIO(FONT), taille)
    f.set_variation_by_axes([graisse, largeur])
    return f


def fond(src, cx=0.5, cy=0.5):
    im = Image.open(src).convert("RGB")
    r = W / H
    w, h = im.size
    if w / h > r:
        nw, nh = int(h * r), h
    else:
        nw, nh = w, int(w / r)
    x, y = int((w - nw) * cx), int((h - nh) * cy)
    im = im.crop((x, y, x + nw, y + nh)).resize((W, H), Image.LANCZOS)
    # dégradé noir à gauche pour le texte
    voile = Image.new("L", (W, H))
    px = voile.load()
    for i in range(W):
        a = int(255 * max(0.0, min(1.0, 1.08 - i / (W * 0.78))))
        for j in range(H):
            px[i, j] = a
    noir = Image.new("RGB", (W, H), (0, 0, 0))
    im = Image.composite(noir, im, voile)
    return Image.blend(im, Image.new("RGB", (W, H), (0, 0, 0)), 0.18)


def lignes(d, x, y, texte, f, coul, largeur_max, interligne=1.06):
    mots, ligne, out = texte.split(), "", []
    for m in mots:
        t = (ligne + " " + m).strip()
        if d.textlength(t, font=f) > largeur_max and ligne:
            out.append(ligne); ligne = m
        else:
            ligne = t
    out.append(ligne)
    for l in out:
        d.text((x, y), l, font=f, fill=coul)
        y += int(f.size * interligne)
    return y


def carte(sortie, src, kicker, titre, prix, detail, cx=0.5, cy=0.5):
    im = fond(src, cx, cy)
    d = ImageDraw.Draw(im)
    x = 72
    d.text((x, 64), "GLEAM & GO", font=police(30, 800, 125), fill=WHITE)
    d.line((x, 108, x + 92, 108), fill=GOLD, width=2)
    d.text((x, 150), kicker.upper(), font=police(26, 600, 100), fill=GOLD)
    y = lignes(d, x, 196, titre, police(68, 800, 112), WHITE, 720)
    y += 18
    d.text((x, y), prix, font=police(64, 800, 118), fill=GOLD2)
    y += 82
    lignes(d, x, y, detail, police(28, 450, 100), MUTED, 700, 1.3)
    d.text((x, H - 62), "gleamandgo.be · 0478 48 83 34", font=police(24, 600, 100), fill=WHITE)
    im.save(sortie, quality=86, optimize=True, progressive=True)
    print(sortie, im.size)


if __name__ == "__main__":
    carte("img/og-black-friday.jpg", "img/pop.jpg", "Black Friday · jusqu'au 30/11",
          "+25 % offerts sur nos cartes", "100 € = 125 €",
          "200 € = 250 € · 400 € = 500 €. Pour vous ou à offrir, carte en PDF sous 2 h.", 0.6, 0.55)
    carte("img/og-pack-hiver.jpg", "img/off-prestige.jpg", "Pack Hiver · à domicile",
          "Votre voiture prête pour le froid", "200 € tout compris",
          "Intérieur + extérieur, Kit Hiver offert, déplacement offert jusqu'à 15 km.", 0.62, 0.5)
    carte("img/og-accueil.jpg", "img/hero.jpg", "Detailing à domicile · Bruxelles",
          "Nettoyage de voiture à domicile", "5,0 sur Google",
          "Intérieur, extérieur, polissage, céramique. On apporte l'eau, vous fournissez une prise.", 0.6, 0.5)
