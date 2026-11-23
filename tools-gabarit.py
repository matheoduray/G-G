"""Blocs communs à toutes les pages : bandeau, en-tête, pied de page, pop-up, barre mobile.

Les pages restent du HTML ordinaire (rien à compiler pour mettre en ligne).
Ce script réécrit simplement les blocs communs dans chaque page, pour qu'ils
restent identiques partout, et remplace les liens vides (href="#") par de
vraies destinations.

Lancer depuis la racine du dépôt : python3 tools-gabarit.py
"""
import glob
import html
import re
import urllib.parse

TEL = "tel:+32478488334"
WA_NUM = "32478488334"
WA_TEXTE = "Bonjour Gleam & Go, je voudrais un créneau"
EMAIL = "matheoduray@gmail.com"
WA = "https://wa.me/%s?text=%s" % (WA_NUM, urllib.parse.quote(WA_TEXTE, safe=""))
AVIS = "https://share.google/uj7ejIzY9wQKRMeIa"
INSTA = "https://www.instagram.com/gleamandgo_be/"
CALENDLY = "https://calendly.com/gleamandgo"
RESERVER = "/nettoyage-interieur-voiture/#composer"
CAL = {
    "interieur": "https://calendly.com/gleamandgo/signature-interieur",
    "complet": "https://calendly.com/gleamandgo/signature-interieur-exterieur",
    "exterieur": "https://calendly.com/gleamandgo/signature-exterieur",
    "polissage": "https://calendly.com/gleamandgo/polissage-onestep",
    "hiver": "https://calendly.com/gleamandgo/pack-hiver",
}

ICO_TEL = ('<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 '
           '11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" '
           'fill="currentColor"/></svg>')

BANDEAU = ('<a class="bandeau" id="bandeau" href="/black-friday/">'
           '<span class="js-bandeau-texte"><b>Black Friday</b> : +25 % offerts sur nos cartes, jusqu\'au 30/11 à 23 h 59</span>'
           '<span class="go" aria-hidden="true">→</span></a>')

HEADER = '''<header class="top" id="top">
  <div class="wrap">
    <div class="bar">
      <nav class="nav-l" aria-label="Navigation principale">
        <a class="lnk" href="/" data-nav="/">Accueil</a>
        <a class="lnk" href="/offres/" data-nav="/offres/">Nos offres</a>
        <a class="lnk js-camp-menu" href="/black-friday/" data-nav="/black-friday/" style="color:var(--gold-2)">Black Friday</a>
      </nav>
      <span aria-hidden="true" class="spacer-m"></span>
      <a class="logo" href="/" aria-label="Gleam & Go, accueil">
        <span class="wm">Gleam <span>&amp;</span> Go</span>
        <span class="rule"></span>
        <span class="sub">Detailing à domicile</span>
      </a>
      <div class="nav-r">
        <a class="lnk" href="/qui-sommes-nous/" data-nav="/qui-sommes-nous/">Qui sommes-nous</a>
        <a class="tel js-tel" href="%(tel)s" aria-label="Appeler le 0478 48 83 34">%(ico)s<span>0478 48 83 34</span></a>
        <a class="btn btn-gold" href="%(reserver)s">Réserver</a>
      </div>
      <button class="burger" id="burger" aria-expanded="false" aria-controls="mpanel" aria-label="Ouvrir le menu">
        <svg width="24" height="24" viewBox="0 0 24 24"><path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" stroke-width="1.6"/></svg>
      </button>
    </div>
    <nav class="mpanel" id="mpanel" aria-label="Menu mobile">
      <a class="lnk" href="/">Accueil</a>
      <a class="lnk" href="/offres/">Nos offres</a>
      <a class="lnk js-camp-menu js-camp-seul" href="/black-friday/" style="color:var(--gold-2)">Black Friday</a>
      <a class="lnk" href="/pack-hiver/">Pack Hiver</a>
      <a class="lnk" href="/nettoyage-interieur-voiture/">Signature Intérieur</a>
      <a class="lnk" href="/lavage-exterieur-voiture/">Signature Extérieur</a>
      <a class="lnk" href="/polissage-voiture/">Polissage</a>
      <a class="lnk" href="/protection-ceramique-voiture/">Protection céramique</a>
      <a class="lnk" href="/abonnement-entretien-voiture/">Refresh (abonnement)</a>
      <a class="lnk" href="/qui-sommes-nous/">Qui sommes-nous</a>
      <a class="btn btn-gold" href="%(reserver)s">Réserver</a>
      <a class="btn btn-line js-tel" href="%(tel)s" style="margin-top:10px">Appeler le 0478 48 83 34</a>
    </nav>
  </div>
</header>''' % {"tel": TEL, "ico": ICO_TEL, "reserver": RESERVER}

FOOTER = '''<footer>
  <div class="wrap">
    <div><strong style="color:var(--white)">Gleam &amp; Go</strong>, detailing automobile à domicile, Bruxelles.<br><a class="js-tel" href="%(tel)s" style="margin:0">0478 48 83 34</a>, 7j/7 de 9 h à 21 h<br><a class="js-email" href="mailto:%(email)s" style="margin:0">%(email)s</a><br>N° d'entreprise (BCE) : BE 1031.632.216</div>
    <div>
      <a href="/offres/">Nos offres</a><a href="/black-friday/" class="js-camp-menu js-camp-seul">Black Friday</a><a href="/pack-hiver/">Pack Hiver</a><a href="/nettoyage-interieur-voiture/">Signature Intérieur</a><a href="/lavage-exterieur-voiture/">Signature Extérieur</a><a href="/polissage-voiture/">Polissage</a><a href="/protection-ceramique-voiture/">Protection céramique</a><a href="/abonnement-entretien-voiture/">Refresh</a><a href="/qui-sommes-nous/">Qui sommes-nous</a><a href="/#faq">FAQ</a>
      <a href="%(insta)s" target="_blank" rel="noopener">Instagram</a><a class="js-reviews" href="%(avis)s" target="_blank" rel="noopener">Avis Google</a>
    </div>
    <div class="legal">
      <a href="/mentions-legales/">Mentions légales</a><a href="/cgv/">CGV</a><a href="/confidentialite/">Confidentialité</a><a href="/retractation/">Me rétracter</a><button type="button" class="js-cookies-reglages">Gérer les cookies</button>
    </div>
  </div>
</footer>''' % {"tel": TEL, "insta": INSTA, "avis": AVIS, "email": EMAIL}

POPUP = '''<div class="pop" id="pop" role="dialog" aria-modal="true" aria-labelledby="popTitle">
  <div class="pop-card">
    <button class="pop-close" id="popClose" type="button" aria-label="Fermer">&times;</button>
    <div class="pop-media" id="popMedia"></div>
    <div class="pop-body">
    <p class="kicker" id="popKicker"></p>
    <h2 id="popTitle"></h2>
    <ul id="popList"></ul>
    <p class="pop-fin" id="popNote"></p>
    <a class="btn btn-gold" id="popCta" href="/black-friday/">Voir les cartes</a>
    <button class="later" id="popLater" type="button">Non merci</button>
    </div>
  </div>
</div>'''

MBAR = '''<div class="mbar">
  <a class="btn btn-line js-wa" href="%(wa)s" target="_blank" rel="noopener">WhatsApp</a>
  <a class="btn btn-gold" href="%(reserver)s">Réserver</a>
</div>''' % {"wa": WA, "reserver": RESERVER}


def wa_msg(msg):
    return "https://wa.me/%s?text=%s" % (WA_NUM, urllib.parse.quote(msg, safe=""))


def corrige_liens(s):
    """Remplace chaque href="#" par la destination que le script aurait mise, sans attendre le JavaScript."""
    def un_lien(m):
        tag = m.group(0)
        classes = (re.search(r'class="([^"]*)"', tag) or [None, ""])[1].split()
        if 'href="#"' not in tag:
            return tag
        dest = None
        if "js-tel" in classes:
            dest = TEL
        elif "js-wa-msg" in classes:
            cal = re.search(r'data-cal="([^"]*)"', tag)
            msg = re.search(r'data-msg="([^"]*)"', tag)
            if cal and CAL.get(cal.group(1)):
                dest = CAL[cal.group(1)]
            else:
                dest = wa_msg(html.unescape(msg.group(1)) if msg else WA_TEXTE)
        elif "js-wa" in classes or "wa" in classes:
            dest = WA
        elif "js-reviews" in classes:
            dest = AVIS
        elif "js-ig" in classes:
            dest = INSTA
        elif "js-cal" in classes:
            dest = CALENDLY
        elif "js-cfg-book" in classes:
            dest = WA
        elif 'id="popCta"' in tag:
            dest = "/black-friday/"
        elif "js-pay" in classes:
            dest = WA
        if dest is None:
            return tag
        return tag.replace('href="#"', 'href="%s"' % html.escape(dest, quote=True))
    return re.sub(r"<a\b[^>]*>", un_lien, s)


RX_INSEC = re.compile(r"(\d) (€|%|km|h\b|min\b|ans\b|jours\b|mois\b|semaines\b)")


def insecables(s):
    """Typographie française dans le texte visible (hors balises et scripts) : 200 €, 25 %, 23 h 59, « : »."""
    def texte(t):
        t = RX_INSEC.sub(lambda m: m.group(1) + "&nbsp;" + m.group(2), t)
        t = re.sub(r"h (\d{2})\b", r"h&nbsp;\1", t)
        return re.sub(r" ([:;!?])", r"&nbsp;\1", t)
    parts = re.split(r"(<script[\s\S]*?</script>|<style[\s\S]*?</style>|<[^>]+>)", s)
    return "".join(p if p.startswith("<") else texte(p) for p in parts)


def remplace(s, motif, nouveau, page, quoi):
    s2, n = re.subn(motif, lambda m: nouveau, s, count=1, flags=re.S)
    if n != 1:
        raise SystemExit("%s : bloc introuvable (%s)" % (page, quoi))
    return s2


def traite(page):
    s = open(page, encoding="utf-8").read()
    if '<header class="top"' not in s:
        return False          # page de redirection : rien à faire
    s = remplace(s, r'<header class="top" id="top">.*?</header>', HEADER, page, "en-tête")
    s = remplace(s, r"<footer>.*?</footer>", FOOTER, page, "pied de page")
    s = remplace(s, r'<div class="pop" id="pop".*?</div>\s*</div>\s*</div>', POPUP, page, "pop-up")
    s = remplace(s, r'<div class="mbar">.*?</div>', MBAR, page, "barre mobile")
    if 'id="bandeau"' in s:
        s = remplace(s, r'<a class="bandeau" id="bandeau".*?</a>(?=\n)', BANDEAU, page, "bandeau")
    else:
        s, n = re.subn(r"(<body[^>]*>\n)", lambda m: m.group(1) + BANDEAU + "\n", s, count=1)
        if n != 1:
            raise SystemExit("%s : balise body introuvable" % page)
    s = corrige_liens(s)
    s = insecables(s)
    open(page, "w", encoding="utf-8").write(s)
    return True


if __name__ == "__main__":
    pages = ["index.html", "404.html"] + sorted(glob.glob("*/index.html"))
    for p in pages:
        try:
            ok = traite(p)
        except FileNotFoundError:
            continue
        print(("mis à jour  " if ok else "redirection ") + p)
    vides = [(p, open(p, encoding="utf-8").read().count('href="#"')) for p in pages if glob.glob(p)]
    restes = [(p, n) for p, n in vides if n]
    print("liens vides restants :", restes or "aucun")
