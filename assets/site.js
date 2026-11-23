/* Photos intégrées (générées) */
var PHOTO_DATA = {"abo": "/img/abo.webp", "about-1": "/img/about-1.webp", "about-2": "/img/about-2.webp", "about-3": "/img/about-3.webp", "gal-1": "/img/gal-1.webp", "gal-2": "/img/gal-2.webp", "gal-3": "/img/gal-3.webp", "gal-4": "/img/gal-4.webp", "gal-5": "/img/gal-5.webp", "gal-6": "/img/gal-6.webp", "gal-7": "/img/gal-7.webp", "gal-8": "/img/gal-8.webp", "hero-m": "/img/hero-m.webp", "hero": "/img/hero.webp", "matheo": "/img/matheo.webp", "pol-multi": "/img/pol-multi.webp", "pol-one": "/img/pol-one.webp", "pop": "/img/pop.webp", "svc-polish": "/img/svc-polish.webp", "svc-refresh": "/img/svc-refresh.webp", "svc-signature": "/img/svc-signature.webp", "yanis": "/img/yanis.webp", "off-interieur": "/img/off-interieur.webp", "off-exterieur": "/img/off-exterieur.webp", "off-prestige": "/img/off-prestige.webp", "off-polissage": "/img/off-polissage.webp", "off-ceramique": "/img/off-ceramique.webp", "off-refresh": "/img/off-refresh.webp", "off-hiver": "/img/off-hiver.webp", "off-pack": "/img/off-pack.webp"};


/* ======================================================================
   CONFIG — tout ce que tu dois modifier est ici.
   ====================================================================== */
var CONFIG = {
  calendly: "https://calendly.com/gleamandgo",   // page Calendly générale (tous les types de RDV) — vide = WhatsApp
  /* Un lien par prestation. Vide = le bouton concerné repasse sur WhatsApp. */
  cal: {
    interieur: "https://calendly.com/gleamandgo/signature-interieur",
    complet:   "https://calendly.com/gleamandgo/signature-interieur-exterieur",
    exterieur: "https://calendly.com/gleamandgo/signature-exterieur",
    polissage: "https://calendly.com/gleamandgo/polissage-onestep",
    hiver:     "https://calendly.com/gleamandgo/pack-hiver"   // lien Calendly inchangé
  },
  phone: "+32478488334",
  email: "matheoduray@gmail.com",          // adresse affichée sur le site (pied de page, mentions légales, rétractation)
  waTexte: "Bonjour Gleam & Go, je voudrais un créneau",   // message WhatsApp par défaut

  /* ====================================================================
     PAIEMENTS STRIPE : colle ici chaque Payment Link (https://buy.stripe.com/...).
     Vide = le bouton ouvre WhatsApp avec un message prêt.
     Dans Stripe, pour chaque lien : Après le paiement > Rediriger vers
     https://gleamandgo.be/merci/?produit=CLE&session_id={CHECKOUT_SESSION_ID}
     (CLE = carte-100, carte-200, carte-400, pack-hiver ou test-1)
     ==================================================================== */
  produits: {
    "carte-100":  { nom:"Carte Gleam & Go 100 € + bonus 25 €",  prix:100, type:"carte",  stripe:"",
                    msg:"Bonjour, je voudrais la carte Black Friday de 100 € (125 € de prestations)." },
    "carte-200":  { nom:"Carte Gleam & Go 200 € + bonus 50 €",  prix:200, type:"carte",  stripe:"",
                    msg:"Bonjour, je voudrais la carte Black Friday de 200 € (250 € de prestations)." },
    "carte-400":  { nom:"Carte Gleam & Go 400 € + bonus 100 €", prix:400, type:"carte",  stripe:"",
                    msg:"Bonjour, je voudrais la carte Black Friday de 400 € (500 € de prestations)." },
    "pack-hiver": { nom:"Pack Hiver", prix:200, type:"prestation", stripe:"",
                    msg:"Bonjour, je voudrais réserver le Pack Hiver à 200 € tout compris." },
    "test-1":     { nom:"Test de paiement", prix:1, type:"test", stripe:"", msg:"" },
    /* Décembre : cartes cadeaux de Noël (sans bonus) */
    "noel-signature":  { nom:"Carte cadeau Signature Intérieur", prix:149, type:"carte", stripe:"",
                         msg:"Bonjour, je voudrais offrir une carte cadeau Signature Intérieur (149 €)." },
    "noel-pack-hiver": { nom:"Carte cadeau Pack Hiver", prix:200, type:"carte", stripe:"",
                         msg:"Bonjour, je voudrais offrir une carte cadeau Pack Hiver (200 €)." },
    "noel-ceramique":  { nom:"Carte cadeau Pack Céramique", prix:399, type:"carte", stripe:"",
                         msg:"Bonjour, je voudrais offrir une carte cadeau Pack Céramique (399 €)." },
    "noel-libre":      { nom:"Carte cadeau, montant libre", prix:50, type:"carte", stripe:"",       // prix = minimum ; le vrai montant est dans Stripe
                         msg:"Bonjour, je voudrais offrir une carte cadeau d'un montant de ... €." },
    /* Restitution de leasing */
    "restitution-249": { nom:"Restitution Essentielle", prix:249, type:"prestation", stripe:"",
                         msg:"Bonjour, je rends ma voiture de société le ... : je voudrais la Restitution Essentielle (249 €)." },
    "restitution-499": { nom:"Restitution + Polissage", prix:499, type:"prestation", stripe:"",
                         msg:"Bonjour, je rends ma voiture de société le ... : je voudrais la Restitution + Polissage (499 €)." },
    /* Journée Gleam & Go en résidence (tarif résident) */
    "journee-pack-hiver": { nom:"Journée résidence : Pack Hiver", prix:180, type:"prestation", stripe:"",
                            msg:"Bonjour, je voudrais un Pack Hiver (180 €) pendant la Journée Gleam & Go de ma résidence." },
    "journee-signature":  { nom:"Journée résidence : Signature Intérieur", prix:135, type:"prestation", stripe:"",
                            msg:"Bonjour, je voudrais un Signature Intérieur (135 €) pendant la Journée Gleam & Go de ma résidence." }
  },

  /* Journée Gleam & Go dans une résidence : une journée à la fois. Vide = « prochaine date bientôt ».
     calendly = lien d'un événement Calendly avec paiement Stripe (6 créneaux ce jour-là). */
  journee: {
    residence: "",                 // ex. "Résidence Les Érables"
    adresse: "",                   // ex. "Avenue de Tervueren 200, 1150 Woluwe-Saint-Pierre"
    date: "",                      // ex. "2026-12-12" (AAAA-MM-JJ)
    creneaux: ["9 h", "10 h 30", "12 h", "13 h 30", "15 h", "16 h 30"],
    calendly: ""                   // ex. "https://calendly.com/gleamandgo/journee-residence"
  },

  /* Campagnes : bandeau, lien du menu et pop-up changent seuls selon la date.
     La première dont la période contient aujourd'hui gagne. */
  campagnes: [
    { id:"bf", du:"2026-11-23T00:00:00+01:00", au:"2026-11-30T23:59:59+01:00",
      bandeau:"<b>Black Friday</b> : +25 % offerts sur nos cartes, jusqu'au 30/11 à 23 h 59",
      lien:"/black-friday/", menu:"Black Friday",
      popup:{ kicker:"Black Friday · jusqu'au 30/11 à 23 h 59", titre:"+25 % offerts sur nos cartes",
              lignes:["Vous payez 100 €, vous recevez 125 €","Vous payez 200 €, vous recevez 250 €","Vous payez 400 €, vous recevez 500 €"],
              note:"Pour vous ou à offrir. Carte en PDF sous 2 h, valable 2 ans.", cta:"Voir les cartes", photo:"pop", delai:7000 } },
    { id:"noel", du:"2026-12-01T00:00:00+01:00", au:"2026-12-24T12:00:00+01:00",
      bandeau:"<b>Cartes cadeaux</b> reçues en 2 h, jusqu'au 24/12 midi · Pack Hiver 200 €",
      lien:"/cartes-cadeaux/", menu:"Cartes cadeaux",
      popup:{ kicker:"Noël · jusqu'au 24/12 à midi", titre:"Le cadeau qu'on ne s'offre jamais soi-même",
              lignes:["Signature Intérieur 149 €, Pack Hiver 200 €, Pack Céramique 399 €","Ou le montant de votre choix, dès 50 €","Reçue en PDF sous 2 h, valable 2 ans"],
              note:"Version imprimée dans une enveloppe noire sur demande.", cta:"Offrir une carte", photo:"pop", delai:7000 } },
    { id:"apres-fetes", du:"2026-12-26T00:00:00+01:00", au:"2026-12-31T23:59:59+01:00",
      bandeau:"<b>Après les fêtes</b> : sel, boue, miettes. Créneaux de janvier ouverts",
      lien:"/pack-hiver/", menu:"Pack Hiver", popup:null },
    { id:"hiver", du:"2026-12-01T00:00:00+01:00", au:"2027-01-31T23:59:59+01:00",
      bandeau:"<b>Pack Hiver</b> : 200 € tout compris, Kit Hiver offert",
      lien:"/pack-hiver/", menu:"Pack Hiver",
      popup:{ kicker:"Offre d'hiver", titre:"Pack Hiver, 200 € tout compris",
              lignes:["Intérieur et extérieur complets","Kit Hiver offert (valeur 49 €)","Déplacement offert jusqu'à 15 km"],
              note:"Prestations jusqu'au 31 janvier. Seul supplément possible : poils d'animaux + 40 €.", cta:"Voir le Pack Hiver", photo:"off-hiver", delai:9000 } }
  ],

  /* Mesure (pubs). Vide = rien ne se charge et la bannière cookies ne s'affiche pas.
     Rien ne se charge avant que le visiteur clique « Accepter ». */
  mesure: {
    metaPixel: "",        // ex. "1234567890123456"
    ga4: "",              // ex. "G-XXXXXXXXXX"
    googleAds: "",        // ex. "AW-1234567890"
    adsLabels: { whatsapp:"", telephone:"", achat:"" }   // étiquettes de conversion Google Ads
  },
  /* Vidéo du hero. Priorité 1 : un fichier MP4 (le plus fiable). Priorité 2 : l'ID YouTube. */
  heroVideo: "",                // ex. "hero.mp4" — remplace la photo du hero par une vidéo
  heroYouTube: "",              // ID YouTube (vide = pas de vidéo, on garde la photo)
  heroVideoFocus: "50%",        // PC : quelle bande verticale garder (0% = haut, 50% = milieu, 100% = bas)
  clients: "+ de 100",
  whatsapp: "32478488334",
  googleReviews: "https://share.google/uj7ejIzY9wQKRMeIa",
  heroImage: "",                // URL de ta photo principale (sombre, voiture en cours de nettoyage)

  signature: 149,
  refresh: 109,
  polishOneStep: 300,
  polishMultiStep: "Sur devis", // mets un nombre (ex. 650) si tu as un prix de départ

  exterieur: 69,                // Signature Extérieur seul
  complet: 200,                 // Signature Intérieur + Extérieur (prix pack)

  /* Formules du configurateur. cal = clé dans CONFIG.cal ; interieur:true = l'état et les poils s'appliquent */
  formules: [
    { id:"interieur", label:"Intérieur",  note:"L'habitacle à fond", cal:"interieur", interieur:true,
      inclus:["Aspiration complète, coffre compris","Shampooing des sièges et tapis","Vapeur, plastiques, cuir","Vitres intérieures"] },
    { id:"exterieur", label:"Extérieur",  note:"La carrosserie à la main", cal:"exterieur", interieur:false, exterieur:true,
      inclus:["Prélavage mousse et lavage à la main","Jantes et pneus","Vitres et séchage sans traces","Protection hydrophobe Koch Chemie PW"] },
    { id:"complet",   label:"Prestige", note:"Intérieur + extérieur, la voiture entière", cal:"complet", interieur:true, exterieur:true, tag:"Le plus complet",
      inclus:["Tout le Signature Intérieur","Tout le Signature Extérieur"] }
  ],
  etat: [
    { id:"normal",    label:"Normal",    note:"Entretien courant", add:0  },
    { id:"sale",      label:"Sale",      note:"Plusieurs mois sans nettoyage", add:25 },
    { id:"tres-sale", label:"Très sale", note:"Taches, boue, habitacle chargé", add:50 }
  ],
  /* Taille du véhicule : plus de supplément (même prix pour toutes les voitures). Laisser vide. */
  taille: [],
  /* besoin : "interieur" = seulement si la formule touche l'habitacle ; "exterieur" = seulement si elle touche la carrosserie ; absent = toujours proposé.
     inclut : options déjà comprises dedans (elles disparaissent quand celle-ci est cochée) */
  options: [
    { id:"kithiver", label:"Kit Hiver", note:"Vitres dégraissées et anti-buée, vitres extérieures hydrophobes, joints traités contre le gel, tapis désalés", add:49, inclut:["glaco"] },
    { id:"poils",  label:"Poils d'animaux",            note:"Retrait complet, brosse et aspiration",      add:40, besoin:"interieur" },
    { id:"tapis",  label:"Imperméabilisation des tapis", note:"Anti-taches, appliqué après le shampooing", add:45, besoin:"interieur" },
    { id:"glaco",  label:"Glaco sur les vitres",       note:"Hydrophobe : la pluie file sans essuie-glace", add:35, besoin:"exterieur" },
    { id:"phares", label:"Rénovation des phares",      note:"Ponçage et polissage des optiques jaunies",  add:60, besoin:"exterieur" }
  ],
  zone: [
    { id:"bxl",  label:"Bruxelles",      note:"Les 19 communes",           add:0  },
    { id:"z15",  label:"Jusqu'à 15 km",  note:"Waterloo, Rhode, Zaventem", add:10 },
    { id:"z30",  label:"15 à 30 km",     note:"Wavre, Nivelles, Malines",  add:25 },
    { id:"z50",  label:"30 à 50 km",     note:"Louvain, Namur, Gand",      add:45 },
    { id:"far",  label:"Plus de 50 km",  note:"Liège, la côte…",                 add:null }
  ],
  /* Photos : mets le chemin ou l'URL de chaque image. Vide = emplacement affiché avec sa consigne. */
  photos: {
    "hero":          { src:"", alt:"Nettoyage d'une jante à la brosse dans la mousse", tip:"Hero : voiture foncée en plein lavage, mousse visible, de nuit ou en fin de journée, format paysage" },
    "svc-signature": { src:"", alt:"Habitacle BMW cuir rouge après nettoyage", tip:"Habitacle impeccable, sièges shampouinés, vue depuis la portière ouverte" },
    "svc-refresh":   { src:"", alt:"Habitacle Audi e-tron après entretien", tip:"Voiture propre garée devant une maison, lumière douce" },
    "svc-polish":    { src:"", alt:"Polissage d'un capot à la polisseuse", tip:"Polisseuse Rupes en action sur un capot, reflet visible" },
    "off-interieur": { src:"", alt:"Habitacle BMW cuir bordeaux après un Signature Intérieur", tip:"Miniature page Offres" },
    "off-exterieur": { src:"", alt:"Logo Porsche nettoyé au pinceau dans la mousse", tip:"Miniature page Offres" },
    "off-prestige": { src:"", alt:"Porsche Panamera noir mat après un Prestige", tip:"Miniature page Offres" },
    "off-polissage": { src:"", alt:"Polissage d'un capot à la polisseuse Rupes", tip:"Miniature page Offres" },
    "off-ceramique": { src:"", alt:"Carrosserie BMW protégée, l'eau perle sur le vernis", tip:"Miniature page Offres" },
    "off-refresh": { src:"", alt:"Habitacle entretenu lors d'un passage Refresh", tip:"Miniature page Offres" },
    "off-hiver": { src:"", alt:"Maserati GranTurismo après polissage et protection céramique", tip:"Miniature page Offres" },
    "off-pack": { src:"", alt:"Maserati GranTurismo polie, carrosserie protégée", tip:"Miniature page Offres" },
    "gal-1":  { src:"", alt:"Porsche Panamera noir mat après nettoyage", tip:"La plus belle photo : voiture finie, reflets profonds" },
    "gal-2":  { src:"", alt:"Eau qui perle sur une BMW noire", tip:"Siège avant, avant shampooing" },
    "gal-3":  { src:"", alt:"Logo Porsche nettoyé au pinceau", tip:"Même siège, après shampooing" },
    "gal-4":  { src:"", alt:"Porsche Panamera en prélavage mousse chez le client", tip:"Jante en gros plan, propre" },
    "gal-5":  { src:"", alt:"Audi e-tron en prélavage mousse, rue de Bruxelles", tip:"Gouttes d'eau qui perlent sur la carrosserie" },
    "gal-6":  { src:"", alt:"Habitacle BMW cuir bordeaux", tip:"Photo large : l'équipe au travail devant chez un client" },
    "gal-7":  { src:"", alt:"Habitacle Audi e-tron", tip:"Tapis de sol propres, en détail" },
    "gal-8":  { src:"", alt:"Porsche 911 et tapis en cours de nettoyage", tip:"Tableau de bord et console, détail" },
    "gal-9":  { src:"", alt:"", tip:"Coffre vidé et aspiré" },
    "gal-10": { src:"", alt:"", tip:"Photo large : voiture finie de profil, de nuit" },
    "gal-11": { src:"", alt:"", tip:"Détail : logo ou calandre qui brille" },
    "tar-avant":   { src:"", alt:"Prélavage mousse d'une Audi e-tron dans une rue de Bruxelles", tip:"Avant : habitacle sale, sous le même angle que les deux suivantes" },
    "tar-pendant": { src:"", alt:"Habitacle BMW après le Signature", tip:"Pendant : shampooing ou vapeur en action" },
    "tar-apres":   { src:"", alt:"Habitacle Audi e-tron après le Signature", tip:"Après : même angle que la photo « avant »" },
    "pol-one":   { src:"", alt:"Polissage one-step sur un capot", tip:"Capot à moitié poli : moitié terne, moitié brillante" },
    "pol-multi": { src:"", alt:"Illustration : carrosserie brillante sous éclairage néon", tip:"Rayures visibles à la lampe, avant correction" },
    "abo":       { src:"", alt:"Porsche Panamera entretenue devant chez le client", tip:"Voiture propre dans l'allée d'un client régulier" },
    "yanis":     { src:"", alt:"Yanis, cofondateur de Gleam & Go, en veste Gleam & Go", tip:"Portrait de Yanis" },
    "matheo":    { src:"", alt:"Mathéo, cofondateur de Gleam & Go, devant une BMW", tip:"Portrait de Mathéo" },
    "team":      { src:"", alt:"Yanis, cofondateur de Gleam & Go, rince une voiture au nettoyeur haute pression", tip:"Portrait vertical : vous deux devant une voiture finie" },
    "about-1":   { src:"", alt:"Le véhicule de service Gleam & Go et son équipement", tip:"Votre matériel : réservoir d'eau, rallonge, produits Koch Chemie" },
    "about-2":   { src:"", alt:"Yanis rince une voiture au nettoyeur haute pression", tip:"Mains au travail : pinceau sur une grille d'aération" },
    "about-3":   { src:"", alt:"Polissage d'un capot à la polisseuse", tip:"Votre véhicule de service ou votre installation sur place" }
  },

  /* Garantie affichée sur les pages d'offre. active:false = on affiche « Pas de surprise » à la place. */
  garantie: {
    active: false,
    titre: "Satisfait, ou on revient",
    texte: "Un point ne vous convient pas ? Dites-le-nous dans les 7 jours : on revient le reprendre gratuitement."
  },

  /* Offre de saison (page Pack Hiver, page Offres, blocs « Allez plus loin »). */
  offre: {
    active: true,
    kicker: "Offre d'hiver",
    titre: "Pack Hiver",
    prix: 200,
    lignes: [
      "Signature Intérieur : aspiration, shampooing des sièges et tapis, vapeur, plastiques, cuir",
      "Signature Extérieur : lavage à la main, jantes, protection hydrophobe",
      "Kit Hiver offert (valeur 49 €)",
      "Déplacement offert jusqu'à 15 km"
    ]
  },

  /* Protection céramique. Remplace "Sur devis" par un nombre quand tes prix sont fixés. */
  ceramique: {
    actif: true,
    formules: [
      { id:"c3", titre:"Céramique 3 ans", duree:"Posée en 1 journée · polissage de préparation compris", prix:499, cal:"hiver",
        lignes:["Décontamination complète de la carrosserie","Polissage une passe pour préparer le vernis","Pose du revêtement, séchage sur place","Protection annoncée : 3 ans"] },
      { id:"c5", titre:"Céramique 5 ans", duree:"Posée en 2 journées · polissage de préparation compris", prix:699, cal:"hiver", vedette:true,
        lignes:["Décontamination complète de la carrosserie","Polissage plus poussé le premier jour","Pose en couches, avec durcissement entre chaque","Protection annoncée : 5 ans"] }
    ]
  },

  instagram: "https://www.instagram.com/gleamandgo_be/",
  instagramHandle: "@gleamandgo_be",
  /* Fichiers vidéo (MP4) joués automatiquement, sans son, quand le visiteur arrive dessus.
     Si c'est vide, on affiche les lecteurs Instagram ci-dessous à la place. */
  reelsVideo: ["", "", ""],
  /* 3 Reels : colle ici les liens de tes publications Instagram */
  reels: [
    "https://www.instagram.com/p/Dd6iRv9BHm5/",
    "https://www.instagram.com/p/DeCUEN6tpy7/",
    "https://www.instagram.com/p/Da4fVWntrw5/"
  ],

  /* Avis Google, copiés mot pour mot, avec le mois de publication sur la fiche */
  rating: "5,0",
  reviewCount: "+ de 25",       // nombre d'avis affiché : mets le chiffre exact de ta fiche (ex. 31)
  reviews: [
    { name:"Bernard W.",  date:"août 2026", text:"Ma voiture était une poubelle roulante, je la retrouve neuve, un énorme merci, je recommande à 100%" },
    { name:"Fouad A.",    date:"août 2026", text:"Nettoyage digne d’une Audi Q8 e-tron. Excellent travail les gars. Je recommande !!!🤩" },
    { name:"Stephanie G.",date:"août 2026", text:"Travail nickel et soigné! Chouette projet porté par des petits jeunes… Je recommande." },
    { name:"Sarah T.",    date:"août 2026", text:"Service hors pair ! Satisfaite car ils offrent un service impeccable, je recommande à 100% Et tout ça avec le sourire ^^" },
    { name:"cypsi 25",    date:"août 2026", text:"Super service ! Très pratique de pouvoir faire laver sa voiture directement à domicile, avec un résultat impeccable. Je recommande sans hésiter !" }
  ],

  rythmes: [
    { id:"2s", label:"Toutes les 2 semaines", rhythm:"Voiture toujours impeccable",            price:79,  tag:"Meilleur prix par passage" },
    { id:"4s", label:"Toutes les 4 semaines", rhythm:"Le plus choisi pour un usage quotidien", price:89,  tag:"Recommandé", pick:true },
    { id:"8s", label:"Tous les 2 mois",       rhythm:"Usage modéré, voiture souvent au garage", price:109, tag:"" }
  ]
};
/* ====================================================================== */

(function(){
  var eur = function(n){ return n + "\u00a0€"; };
  /* Typographie française : espaces insécables avant €, %, h, km et avant : ; ! ? */
  var nb = function(t){ return String(t == null ? "" : t).replace(/(\d) (€|%|km|h\b)/g, "$1\u00a0$2").replace(/h (\d\d)\b/g, "h\u00a0$1").replace(/ ([:;!?])/g, "\u00a0$1"); };
  var wa = function(msg){ return "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(msg); };
  /* key = type de RDV dans CONFIG.cal ; recap = texte pré-rempli dans la question 1 de Calendly */
  var book = function(msg, key, recap){
    var url = (key && CONFIG.cal && CONFIG.cal[key]) || "";
    if (!url) return wa(msg);
    return url + (url.indexOf("?") > -1 ? "&" : "?") + "a1=" + encodeURIComponent(recap || msg);
  };
  var esc2 = function(t){ var d = document.createElement("div"); d.textContent = t == null ? "" : t; return d.innerHTML; };
  var GG = window.GG = window.GG || {};
  /* Date du jour. ?apercu=2026-12-01T10:00 permet de voir le site tel qu'il sera à une autre date. */
  var NOW = (function(){
    var q = (location.search.match(/[?&]apercu=([^&]+)/) || [])[1];
    var t = q ? Date.parse(decodeURIComponent(q)) : NaN;
    return isNaN(t) ? Date.now() : t;
  })();
  GG.now = NOW;
  var PAGE = (document.querySelector(".page") || document.body).getAttribute("data-page") || location.pathname;
  GG.page = PAGE;
  var CAMP = (CONFIG.campagnes || []).filter(function(c){ return NOW >= Date.parse(c.du) && NOW <= Date.parse(c.au); })[0] || null;
  GG.campagne = CAMP;
  document.querySelectorAll(".js-tel").forEach(function(a){ a.href = "tel:" + CONFIG.phone; });
  document.querySelectorAll(".js-cal").forEach(function(a){ a.href = CONFIG.calendly || wa(CONFIG.waTexte); });
  document.querySelectorAll(".js-clients").forEach(function(e){ e.textContent = CONFIG.clients; });
  document.querySelectorAll(".js-email").forEach(function(a){ a.href = "mailto:" + CONFIG.email; if (!a.children.length) a.textContent = CONFIG.email; });
  document.querySelectorAll(".js-email-ligne").forEach(function(e){
    if (CONFIG.email) e.innerHTML = '<a href="mailto:' + esc2(CONFIG.email) + '" style="margin:0">' + esc2(CONFIG.email) + '</a><br>';
  });

  /* Éléments datés : data-jusqua = retiré après cette date ; data-des = affiché à partir de cette date */
  document.querySelectorAll("[data-jusqua]").forEach(function(el){ if (NOW > Date.parse(el.getAttribute("data-jusqua"))) el.remove(); });
  document.querySelectorAll("[data-des]").forEach(function(el){ if (NOW >= Date.parse(el.getAttribute("data-des"))) el.hidden = false; else el.remove(); });

  /* Bandeau et lien du menu : suivent la campagne du moment */
  (function(){
    var b = document.getElementById("bandeau");
    if (b) {
      if (CAMP && CAMP.bandeau) {
        b.hidden = false; b.href = CAMP.lien;
        var t = b.querySelector(".js-bandeau-texte"); if (t) t.innerHTML = nb(CAMP.bandeau);
        if (PAGE === CAMP.lien) b.setAttribute("aria-current", "page");
      } else { b.hidden = true; }
      if (!(window.CSS && CSS.supports && CSS.supports("selector(:has(*))")) && !b.hidden) {
        document.documentElement.style.setProperty("--bh", (matchMedia("(max-width:620px)").matches ? 44 : 38) + "px");
      }
    }
    document.querySelectorAll(".js-camp-menu").forEach(function(a){
      if (!CAMP) { a.remove(); return; }
      a.textContent = CAMP.menu; a.href = CAMP.lien;
      if (a.hasAttribute("data-nav")) a.setAttribute("data-nav", CAMP.lien);
      /* Dans les listes où la page existe déjà (menu mobile, pied de page), pas de doublon */
      if (a.classList.contains("js-camp-seul")) {
        var doublon = Array.prototype.some.call(a.parentNode.querySelectorAll("a"), function(x){ return x !== a && x.getAttribute("href") === CAMP.lien; });
        if (doublon) a.remove();
      }
    });
  })();

  /* Liens génériques */
  document.querySelectorAll(".js-wa").forEach(function(a){ a.href = wa(a.getAttribute("data-msg") || CONFIG.waTexte); });
  document.querySelectorAll(".js-wa-msg").forEach(function(a){ a.href = book(a.getAttribute("data-msg"), a.getAttribute("data-cal"), a.getAttribute("data-recap")); });
  document.querySelectorAll(".js-reviews").forEach(function(a){ a.href = CONFIG.googleReviews; });
  document.querySelectorAll(".js-p-signature").forEach(function(e){ e.textContent = eur(CONFIG.signature); });
  var minRef = Math.min.apply(null, CONFIG.rythmes.map(function(r){ return r.price; }));
  document.querySelectorAll(".js-p-refresh").forEach(function(e){ e.textContent = eur(minRef); });
  document.querySelectorAll(".js-p-exterieur").forEach(function(e){ e.textContent = eur(CONFIG.exterieur); });
  document.querySelectorAll(".js-p-complet").forEach(function(e){ e.textContent = eur(CONFIG.complet); });
  document.querySelectorAll(".js-p-polish").forEach(function(e){ e.textContent = eur(CONFIG.polishOneStep); });
  document.querySelectorAll(".js-p-multistep").forEach(function(e){ e.textContent = typeof CONFIG.polishMultiStep === "number" ? "dès " + eur(CONFIG.polishMultiStep) : CONFIG.polishMultiStep; });

  /* Photo hero */
  var PD = window.PHOTO_DATA || {};
  var heroSrc = CONFIG.heroImage || (CONFIG.photos.hero && CONFIG.photos.hero.src) || PD["hero"];
  if (heroSrc && document.getElementById("heroPhoto")) {
    var hp = document.getElementById("heroPhoto");
    hp.style.setProperty("--hero-d", "url('" + heroSrc + "')");
    var heroM = PD["hero-m"]; if (heroM) hp.style.setProperty("--hero-m", "url('" + heroM + "')");
    document.getElementById("hero").classList.add("has-photo");
  }

  /* Vidéo hero : sur PC, on garde un rectangle horizontal au milieu de la vidéo verticale */
  (function(){
    var hero = document.getElementById("hero"), box = document.getElementById("heroVideo");
    if (!hero || !box) return;
    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    var inClaude = /claude\.ai|claudeusercontent|anthropic/.test(location.hostname);
    box.style.setProperty("--vfocus", CONFIG.heroVideoFocus);
    if (CONFIG.heroVideo && !reduce) {
      var v = document.createElement("video");
      v.src = CONFIG.heroVideo; v.muted = true; v.loop = true; v.autoplay = true; v.playsInline = true;
      v.setAttribute("muted",""); v.setAttribute("playsinline",""); v.preload = "auto";
      if (PD["hero"]) v.poster = PD["hero"];
      box.appendChild(v); hero.classList.add("has-video");
      v.play && v.play().catch(function(){});
    } else if (CONFIG.heroYouTube && !reduce && !inClaude) {
      var id = CONFIG.heroYouTube, f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&mute=1&loop=1&playlist=" + id + "&controls=0&playsinline=1&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3";
      f.allow = "autoplay; encrypted-media"; f.title = "Vidéo Gleam & Go"; f.tabIndex = -1;
      box.appendChild(f); hero.classList.add("has-video");
      var fit = function(){
        var W = hero.clientWidth, H = hero.clientHeight, w = Math.max(W, H * 9 / 16), h = w * 16 / 9;
        f.style.width = w + "px"; f.style.height = h + "px";
        var slack = h - H, focus = parseFloat(CONFIG.heroVideoFocus) / 100;
        f.style.top = (H / 2 - (focus - 0.5) * slack) + "px";
      };
      window.__fitHero = fit; fit(); window.addEventListener("resize", fit);
    }
  })();

  /* Le titre du hero s'ajuste toujours à la largeur disponible */
  (function(){
    var big = document.querySelector(".hero-title .big"), zone = document.querySelector(".hero-center");
    if (!big || !zone) return;
    function fit(){
      big.style.fontSize = "";
      var avail = zone.clientWidth - 40, cur = parseFloat(getComputedStyle(big).fontSize), w = big.scrollWidth;
      if (w > avail) big.style.fontSize = Math.floor(cur * avail / w) + "px";
    }
    fit();
    window.addEventListener("resize", fit);
    window.addEventListener("load", fit);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    setTimeout(fit, 400); setTimeout(fit, 1500);
  })();

  /* Emplacements photo */
  document.querySelectorAll("[data-photo]").forEach(function(f){
    var key = f.getAttribute("data-photo"), ph = CONFIG.photos[key] || {tip:""};
    var src = ph.src || PD[key];
    if (src) {
      var img = document.createElement("img");
      img.alt = ph.alt || ""; img.loading = "lazy"; img.decoding = "async";
      img.addEventListener("load", function(){ img.classList.add("ok"); });
      img.addEventListener("error", function(){ img.classList.add("ok"); });
      img.src = src; if (img.complete) img.classList.add("ok");
      f.appendChild(img); f.classList.add("has");
    } else {
      f.innerHTML = '<figcaption class="cap"><b>Photo à fournir</b>' + ph.tip + ' <i>(' + key + ')</i></figcaption>';
    }
  });

  /* Instagram */
  document.querySelectorAll(".js-ig").forEach(function(a){ a.href = CONFIG.instagram; });
  document.querySelectorAll(".js-ig-handle").forEach(function(e){ e.textContent = CONFIG.instagramHandle; });
  (function(){
    var box = document.getElementById("reels"), urls = (CONFIG.reels || []).filter(function(u){ return u; });
    var sec = document.getElementById("instagram");
    if (!box || !sec) return;
    if (!urls.length && !(CONFIG.reelsVideo || []).filter(function(v){ return v; }).length) { box.remove(); sec.querySelector(".lead").textContent = "Le travail en cours, publié au quotidien sur Instagram."; return; }
    var vids = (CONFIG.reelsVideo || []).filter(function(v){ return v; });
    if (vids.length) {
      box.innerHTML = vids.map(function(v, i){
        var lien = urls[i] || CONFIG.instagram;
        return '<div><video muted loop playsinline preload="metadata" src="' + v + '"></video>' +
               '<a class="vlink" href="' + lien + '" target="_blank" rel="noopener">Voir sur Instagram</a></div>';
      }).join("");
      var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
      var vs = box.querySelectorAll("video");
      vs.forEach(function(v){ v.addEventListener("click", function(){ v.paused ? v.play() : v.pause(); }); });
      if (reduce) { vs.forEach(function(v){ v.setAttribute("controls",""); }); return; }
      if (!("IntersectionObserver" in window)) { vs.forEach(function(v){ v.play().catch(function(){}); }); return; }
      var io = new IntersectionObserver(function(es){
        es.forEach(function(e){
          if (e.isIntersecting) { e.target.play().catch(function(){}); }
          else { e.target.pause(); }
        });
      }, { threshold: 0.4 });
      vs.forEach(function(v){ io.observe(v); });
      return;
    }
    /* Les lecteurs Instagram sont lourds et déposent des cookies Meta : ils ne se chargent qu'au clic */
    var posters = ["gal-4", "gal-8", "gal-5"];
    box.innerHTML = urls.map(function(u, i){
      var clean = u.split("?")[0].replace(/\/$/, ""), img = PD[posters[i % posters.length]];
      return '<div><button type="button" class="reel-facade" data-src="' + clean + '/embed" aria-label="Lire la vidéo Instagram ' + (i + 1) + '">' +
        (img ? '<img src="' + img + '" alt="" loading="lazy" decoding="async">' : '') +
        '<span class="play"><span class="disc"><svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l12 7-12 7z" fill="currentColor"/></svg></span>' +
        '<span class="lbl">Voir la vidéo</span><small>Lecteur Instagram</small></span></button></div>';
    }).join("");
    box.addEventListener("click", function(e){
      var b = e.target.closest && e.target.closest(".reel-facade");
      if (!b) return;
      var f = document.createElement("iframe");
      f.src = b.getAttribute("data-src"); f.setAttribute("scrolling", "no"); f.setAttribute("allowtransparency", "true");
      f.title = "Vidéo Instagram"; f.allow = "autoplay; encrypted-media";
      b.replaceWith(f);
    });
  })();

  /* Vignette vidéo : YouTube ne se charge qu'au clic */
  function facadeVideo(hote, id, libelle, photo, apresClic){
    if (!hote || !id) return false;
    var b = document.createElement("button");
    b.className = "vfacade"; b.type = "button";
    b.setAttribute("aria-label", libelle);
    var img = photo || "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg";
    b.innerHTML = '<img src="' + img + '" alt="" loading="lazy">' +
      '<span class="play"><span class="disc"><svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l12 7-12 7z" fill="currentColor"/></svg></span><span class="lbl">' + libelle + '</span></span>';
    b.addEventListener("click", function(){
      var w = document.createElement("div");
      w.className = "vframe";
      w.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1&playsinline=1" title="' + libelle + '" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>';
      b.replaceWith(w);
      if (apresClic) apresClic();
    });
    hote.appendChild(b);
    return true;
  }

  /* Offre de saison : textes réutilisés sur plusieurs pages */
  (function(){
    var o = CONFIG.offre || {};
    if (!o.active) { document.querySelectorAll(".js-offre-bloc").forEach(function(e){ e.remove(); }); return; }
    document.querySelectorAll(".js-offre-kicker").forEach(function(e){ e.textContent = o.kicker; });
    document.querySelectorAll(".js-offre-titre").forEach(function(e){ e.textContent = o.titre; });
    document.querySelectorAll(".js-offre-prix").forEach(function(e){ e.textContent = eur(o.prix); });
    document.querySelectorAll(".js-offre-lignes").forEach(function(e){ e.innerHTML = o.lignes.map(function(l){ return "<li>" + esc2(nb(l)) + "</li>"; }).join(""); });
  })();

  /* Paiement : chaque bouton .js-pay[data-produit] mène au lien Stripe du produit, sinon à WhatsApp */
  var UTM = (function(){
    var out = [];
    (location.search.slice(1) || "").split("&").forEach(function(kv){
      var k = kv.split("=")[0];
      if (/^utm_(source|medium|campaign|term|content)$/.test(k)) out.push(kv);
    });
    if (!out.length) { try { var m = JSON.parse(localStorage.getItem("gg_utm") || "null"); if (m && Date.now() - m.t < 30 * 864e5) out = m.q; } catch (e) {} }
    return out;
  })();
  GG.utm = UTM;
  function lienPaiement(cle){
    var p = CONFIG.produits && CONFIG.produits[cle];
    if (!p) return null;
    if (p.stripe) return p.stripe + (UTM.length ? (p.stripe.indexOf("?") > -1 ? "&" : "?") + UTM.join("&") : "");
    return wa(p.msg || CONFIG.waTexte);
  }
  GG.lienPaiement = lienPaiement;
  document.querySelectorAll(".js-pay[data-produit]").forEach(function(a){
    var cle = a.getAttribute("data-produit"), p = CONFIG.produits && CONFIG.produits[cle], href = lienPaiement(cle);
    if (!href) return;
    a.href = href;
    if (p.stripe) { a.removeAttribute("target"); a.setAttribute("data-stripe", "1"); }
    else { a.target = "_blank"; a.rel = "noopener"; }
  });

  /* Pop-up de la campagne : une seule fois par visiteur, jamais sur la page de l'offre, les pages légales ou la page merci */
  (function(){
    var pop = document.getElementById("pop");
    if (!pop) return;
    var c = CAMP, P = c && c.popup;
    var calmes = ["/black-friday/", "/pack-hiver/", "/merci/", "/mentions-legales/", "/cgv/", "/confidentialite/", "/retractation/"];
    if (!P || calmes.indexOf(PAGE) > -1 || PAGE === c.lien || !document.querySelector(".page")) { pop.remove(); return; }
    var KEY = "gg_pop_" + c.id, deja = true;
    try { deja = !!localStorage.getItem(KEY); } catch (e) { deja = true; }   // sans mémoire possible, on ne dérange pas
    if (deja) { pop.remove(); return; }
    document.getElementById("popKicker").textContent = nb(P.kicker);
    document.getElementById("popTitle").textContent = nb(P.titre);
    document.getElementById("popList").innerHTML = (P.lignes || []).map(function(l){ return "<li>" + esc2(nb(l)) + "</li>"; }).join("");
    var note = document.getElementById("popNote"); if (note) note.textContent = nb(P.note);
    var media = document.getElementById("popMedia"), carte = pop.querySelector(".pop-card");
    var visuel = PD[P.photo] || PD["pop"];
    if (visuel && media) { var pi = document.createElement("img"); pi.src = visuel; pi.alt = ""; pi.decoding = "async"; media.appendChild(pi); }
    else if (media) { media.remove(); carte.style.gridTemplateColumns = "1fr"; }
    var cta = document.getElementById("popCta"); cta.href = c.lien; cta.textContent = P.cta || "Voir l'offre";
    var avant = null;
    function ferme(){
      if (!pop.classList.contains("on")) return;
      pop.classList.remove("on");
      if (avant && avant.focus) avant.focus();
    }
    function montre(){
      var ck = document.getElementById("ck");
      if (ck && !ck.hidden) { setTimeout(montre, 2500); return; }      // d'abord la question des cookies
      if (document.getElementById("calbox") && document.getElementById("calbox").classList.contains("on")) return;
      try { localStorage.setItem(KEY, String(Date.now())); } catch (e) { return; }
      avant = document.activeElement;
      pop.classList.add("on");
      var x = document.getElementById("popClose"); if (x) x.focus({ preventScroll: true });
    }
    document.getElementById("popClose").addEventListener("click", ferme);
    document.getElementById("popLater").addEventListener("click", ferme);
    cta.addEventListener("click", ferme);
    pop.addEventListener("click", function(e){ if (e.target === pop) ferme(); });
    document.addEventListener("keydown", function(e){ if (e.key === "Escape") ferme(); });
    setTimeout(montre, P.delai || 7000);
  })();

  /* Listes de tarifs réutilisables sur la page Offres (toujours synchronisées avec le configurateur) */
  document.querySelectorAll(".js-tarif-liste").forEach(function(ul){
    var quoi = ul.getAttribute("data-liste");
    var src = quoi === "options" ? CONFIG.options
            : quoi === "taille"  ? CONFIG.taille
            : quoi === "etat"    ? CONFIG.etat
            : quoi === "zone"    ? CONFIG.zone
            : quoi === "formules"? CONFIG.formules : [];
    ul.innerHTML = (src || []).map(function(o){
      var v = typeof o.prix === "number" ? o.prix : (typeof o.add === "number" ? o.add : null);
      var p = v === null ? "Sur devis" : (v === 0 ? "Inclus" : (quoi === "formules" ? eur(v) : "+ " + eur(v)));
      var note = o.note || "";
      if (quoi === "options" && o.besoin) {
        note += note ? " · " : "";
        note += o.besoin === "interieur" ? "avec Signature ou Prestige" : "avec Extérieur ou Prestige";
      }
      return "<li><span>" + esc2(o.label) + "<small>" + esc2(note) + "</small></span><em>" + p + "</em></li>";
    }).join("");
  });

  /* Protection céramique */
  (function(){
    var box = document.getElementById("cera"), C = CONFIG.ceramique || {};
    if (!box) return;
    if (!C.actif || !C.formules) { box.remove(); return; }
    box.innerHTML = C.formules.map(function(c){
      var msg = "Bonjour, je suis intéressé par la " + c.titre.toLowerCase() + " (" + c.duree.toLowerCase() + ").";
      var prix = typeof c.prix === "number" ? eur(c.prix) : c.prix;
      return '<article class="' + (c.vedette ? "pick" : "") + '"><div class="tag">' + (c.vedette ? "Protection la plus longue" : "") + '</div>' +
        '<h3>' + c.titre + '</h3><p class="duree">' + c.duree + '</p><p class="price"><b>' + prix + '</b></p>' +
        '<ul>' + c.lignes.map(function(l){ return "<li>" + l + "</li>"; }).join("") + '</ul>' +
        '<a class="btn ' + (c.vedette ? "btn-gold" : "btn-line") + '" href="' + book(msg, c.cal, c.titre) + '" target="_blank" rel="noopener">' + (typeof c.prix === "number" ? "Réserver la " + c.titre.toLowerCase() : "Demander un devis") + '</a></article>';
    }).join("");
  })();

  /* Avis */
  document.querySelectorAll(".js-score").forEach(function(e){ e.textContent = CONFIG.rating + " sur Google, " + CONFIG.reviewCount + " avis"; });
  document.querySelectorAll(".js-count").forEach(function(e){ e.textContent = CONFIG.reviewCount + " avis sur Google"; });
  document.querySelectorAll(".js-count2").forEach(function(e){ e.textContent = CONFIG.reviewCount + " avis Google"; });
  document.querySelectorAll(".js-rating").forEach(function(e){ e.textContent = CONFIG.rating + " ★"; });
  function avisHTML(r){
    return '<blockquote><span class="stars" aria-label="5 étoiles sur 5">★★★★★</span><p>' + esc2(nb(r.text)) + '</p><cite>' + esc2(r.name) +
      (r.date ? ' · ' + esc2(r.date) : '') + ' · avis Google</cite></blockquote>';
  }
  /* Accueil : les avis signés d'un prénom */
  (document.getElementById("reviews") || {}).innerHTML = CONFIG.reviews.filter(function(r){ return /^[A-ZÀ-Ý]/.test(r.name); }).slice(0, 4).map(avisHTML).join("");

  /* Pages offres : avis ciblés (data-pick = numéros dans CONFIG.reviews, à partir de 0) */
  document.querySelectorAll(".js-revs").forEach(function(box){
    var pick = (box.getAttribute("data-pick") || "0,1,2").split(",").map(Number);
    box.innerHTML = pick.map(function(i){ return CONFIG.reviews[i]; }).filter(Boolean).map(avisHTML).join("");
  });
  document.querySelectorAll(".js-p-ext").forEach(function(e){ e.textContent = eur(CONFIG.exterieur); });
  var OF = CONFIG.offre || {};
  document.querySelectorAll("[data-bg]").forEach(function(sec){
    var src = PD[sec.getAttribute("data-bg")]; if (src) sec.style.setProperty("--bg", "url('" + src + "')");
  });
  /* Comptes à rebours : data-fin sur chaque bloc ; retirés une fois la date passée */
  document.querySelectorAll(".js-countdown").forEach(function(b){
    var end = Date.parse(b.getAttribute("data-fin") || (CAMP && CAMP.au) || "");
    if (isNaN(end) || end <= NOW) { b.remove(); return; }
    var decal = NOW - Date.now();      // aperçu à une autre date
    var pad = function(n){ return (n < 10 ? "0" : "") + n; };
    function tick(){
      var d = end - (Date.now() + decal);
      if (d <= 0) { b.remove(); clearInterval(t); return; }
      var j = Math.floor(d / 864e5), h = Math.floor(d / 36e5) % 24, m = Math.floor(d / 6e4) % 60, sec = Math.floor(d / 1e3) % 60;
      b.querySelector(".js-cd-j").textContent = pad(j); b.querySelector(".js-cd-h").textContent = pad(h);
      b.querySelector(".js-cd-m").textContent = pad(m); b.querySelector(".js-cd-s").textContent = pad(sec);
    }
    var t = setInterval(tick, 1000); tick();
  });
  if (CONFIG.garantie && CONFIG.garantie.active) {
    document.querySelectorAll(".js-garantie-titre").forEach(function(e){ e.textContent = CONFIG.garantie.titre; });
    document.querySelectorAll(".js-garantie-texte").forEach(function(e){ e.textContent = CONFIG.garantie.texte; });
  }

  /* Gouttes lumineuses sous la silhouette */
  var g = document.getElementById("drops") || {}, s = 11, h = "";
  function r(){ s = (s * 9301 + 49297) % 233280; return s / 233280; }
  for (var i = 0; i < 40; i++) {
    var x = 240 + r() * 1220, y = 250 + r() * 220, rad = .8 + r() * 1.8, o = .15 + r() * .5;
    h += '<circle cx="'+x.toFixed(0)+'" cy="'+y.toFixed(0)+'" r="'+rad.toFixed(1)+'" fill="#E7D3A1" opacity="'+o.toFixed(2)+'"/>';
  }
  g.innerHTML = h;
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".smil").forEach(function(a){ a.remove(); });
  }

  /* Configurateur */
  function baseOf(f){ return f === "exterieur" ? CONFIG.exterieur : (f === "complet" ? CONFIG.complet : CONFIG.signature); }
  CONFIG.formules.forEach(function(f){ f.add = baseOf(f.id); });
  var cfg = document.getElementById("configurator");
  var qf = (location.search.match(/[?&]f=([a-z]+)/) || [])[1];
  var startF = (qf && CONFIG.formules.some(function(f){ return f.id === qf; })) ? qf : ((cfg && cfg.getAttribute("data-formule")) || "interieur");
  var state = { formule:startF, taille:"standard", etat:"normal", options:{}, zone:"bxl" };
  var esc = function(t){ var d = document.createElement("div"); d.textContent = t; return d.innerHTML; };
  function build(group, list, multi){
    var box = document.querySelector('[data-group="'+group+'"]');
    if (!box) return;
    box.innerHTML = list.map(function(o){
      var type = multi ? "checkbox" : "radio";
      var checked = (!multi && state[group] === o.id) ? " checked" : "";
      var inner;
      if (group === "formule") {
        inner = (o.tag ? '<em class="tag">'+esc(o.tag)+'</em>' : '') +
          '<b>'+esc(o.label)+'</b><span class="note">'+esc(o.note)+'</span>' +
          '<span class="fp">'+eur(o.add)+'</span>' +
          '<ul>'+o.inclus.map(function(i){ return '<li>'+esc(i)+'</li>'; }).join("")+'</ul>';
      } else {
        var price = o.add === null ? "Sur devis" : (o.add === 0 ? "Inclus" : "+ " + eur(o.add));
        inner = '<b>'+esc(o.label)+'</b><span>'+esc(o.note)+'</span><span class="p">'+price+'</span>';
      }
      return '<div class="choice" data-id="'+o.id+'"><input type="'+type+'" name="'+group+'" id="'+group+'-'+o.id+'" value="'+o.id+'"'+checked+'>' +
             '<label for="'+group+'-'+o.id+'"><i class="tick" aria-hidden="true"></i>'+inner+'</label></div>';
    }).join("");
    box.addEventListener("change", function(e){
      if (multi) state.options[e.target.value] = e.target.checked; else state[group] = e.target.value;
      update();
    });
  }
  function find(list, id){ for (var i=0;i<list.length;i++) if (list[i].id===id) return list[i]; }
  var calm = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  /* Le total défile jusqu'au nouveau montant */
  function tween(el, to){
    if (to === null) { el.textContent = "Sur devis"; el.__v = null; return; }
    var from = typeof el.__v === "number" ? el.__v : to;
    el.__v = to;
    if (calm || from === to) { el.textContent = eur(to); return; }
    el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump");
    var t0 = performance.now(), d = 450;
    cancelAnimationFrame(el.__raf);
    (function step(now){
      var k = Math.min(1, (now - t0) / d), e = 1 - Math.pow(1 - k, 3);
      el.textContent = eur(Math.round(from + (to - from) * e));
      if (k < 1) el.__raf = requestAnimationFrame(step);
    })(t0);
  }
  /* Une étape qui réapparaît glisse en place */
  function show(el, on){
    if (!el) return;
    var was = el.hidden; el.hidden = !on;
    if (on && was && !calm) { el.classList.remove("appear"); void el.offsetWidth; el.classList.add("appear"); }
  }
  function update(){
    var f = find(CONFIG.formules, state.formule), z = find(CONFIG.zone, state.zone);
    /* L'état de l'habitacle n'a de sens que si la formule touche l'intérieur */
    var etatSet = document.getElementById("cfgEtat"), optSet = document.getElementById("cfgOptions");
    show(etatSet, f.interieur);
    if (!f.interieur) {
      state.etat = "normal";
      var n = document.getElementById("etat-normal"); if (n) n.checked = true;
    }
    /* Chaque option ne s'affiche que si la formule la rend possible */
    var dispo = 0, comprises = {};
    CONFIG.options.forEach(function(o){ if (state.options[o.id] && o.inclut) o.inclut.forEach(function(x){ comprises[x] = true; }); });
    CONFIG.options.forEach(function(o){
      var ok = (!o.besoin ? true : (o.besoin === "interieur" ? !!f.interieur : !!f.exterieur)) && !comprises[o.id];
      var el = optSet && optSet.querySelector('.choice[data-id="' + o.id + '"]');
      if (el) el.hidden = !ok;
      if (ok) dispo++;
      else if (state.options[o.id]) {
        state.options[o.id] = false;
        var inp = document.getElementById("options-" + o.id); if (inp) inp.checked = false;
      }
    });
    show(optSet, dispo > 0);
    var e = find(CONFIG.etat, state.etat);
    var t = find(CONFIG.taille, state.taille);
    var lines = [];
    if (t && t.add) lines.push(["Taille : " + t.label, t.add]);
    if (f.interieur) lines.push(["État : " + e.label, e.add]);
    CONFIG.options.forEach(function(o){ if (state.options[o.id]) lines.push([o.label, o.add]); });
    lines.push(["Zone : " + z.label, z.add]);
    var total = f.add, devis = false;
    document.querySelectorAll(".js-cfg-titre").forEach(function(el){ el.textContent = "Signature " + f.label; });
    document.querySelectorAll(".js-cfg-base").forEach(function(el){ el.textContent = eur(f.add); });
    document.querySelectorAll(".js-cfg-inclus").forEach(function(el){ el.innerHTML = f.inclus.map(function(i){ return "<li>"+esc(i)+"</li>"; }).join(""); });
    document.getElementById("lines").innerHTML = lines.map(function(l){
      if (l[1] === null) devis = true; else total += l[1];
      var v = l[1] === null ? "sur devis" : (l[1] === 0 ? "inclus" : "+ " + eur(l[1]));
      return "<li><span>"+esc(l[0])+"</span><span>"+v+"</span></li>";
    }).join("");
    document.querySelectorAll(".js-cfg-total").forEach(function(el){ tween(el, devis ? null : total); });
    var recap = "- Signature " + f.label + "\n" + (t ? "- Taille : " + t.label + "\n" : "") +
      lines.filter(function(l){ return l[0].indexOf("Taille :") !== 0; }).map(function(l){ return "- " + l[0]; }).join("\n") +
      "\nTotal estimé : " + (devis ? "sur devis" : eur(total));
    var msg = "Bonjour, je voudrais réserver :\n" + recap;
    var href = devis ? wa(msg) : book(msg, f.cal, recap), label = devis ? "Demander un devis" : "Réserver ce nettoyage";
    document.querySelectorAll(".js-cfg-book").forEach(function(btn){ btn.href = href; btn.textContent = btn.classList.contains("short") ? (devis ? "Devis" : "Réserver") : label; });
  }
  if (cfg) {
    build("formule", CONFIG.formules); build("etat", CONFIG.etat); build("options", CONFIG.options, true); build("zone", CONFIG.zone);
    if (CONFIG.taille && CONFIG.taille.length) build("taille", CONFIG.taille);
    else { var ts = document.getElementById("cfgTaille"); if (ts) ts.remove(); state.taille = ""; }
    update();
    /* Mobile : barre de total collée en bas tant que le configurateur est à l'écran */
    var bar = document.getElementById("cfgBar"), zoneCfg = document.getElementById("composer"), sum = document.querySelector(".summary");
    if (bar && zoneCfg && "IntersectionObserver" in window) {
      var inCfg = false, sumVis = false;
      var sync = function(){ document.body.classList.toggle("cfg-on", inCfg && !sumVis); };
      new IntersectionObserver(function(es){ inCfg = es[0].isIntersecting; sync(); }).observe(zoneCfg);
      if (sum) new IntersectionObserver(function(es){ sumVis = es[0].isIntersecting; sync(); }, { threshold: 0.3 }).observe(sum);
    }
  }

  /* Abonnements */
  (document.getElementById("freq") || {}).innerHTML = CONFIG.rythmes.map(function(f){
    var msg = "Bonjour, je voudrais démarrer un abonnement Refresh (" + f.label.toLowerCase() + ", " + eur(f.price) + " par passage).";
    return '<article class="'+(f.pick?"pick":"")+'"><div class="tag">'+(f.tag||"")+'</div><h3>'+f.label+'</h3><p class="rhythm">'+f.rhythm+'</p>' +
      '<p class="price"><b>'+eur(f.price)+'</b> / passage</p>' +
      '<a class="btn '+(f.pick?"btn-gold":"btn-line")+'" href="'+book(msg)+'" target="_blank" rel="noopener">Démarrer ce rythme</a></article>';
  }).join("");

  /* Apparitions au défilement : seulement ce qui est hors de l'écran au chargement (pas de clignotement) */
  (function(){
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var SEL = [
      ".sec h2.t", ".sec .lead", ".sec .score", ".row", ".cards > .card", ".gallery > .ph", ".strip > .ph",
      ".steps > li", ".reviews > blockquote", ".faq > details", ".contact > a", ".gains > div", ".chooser > a",
      ".feature", ".deal", ".band h2", ".band p", ".band .ctas", "#freq > article", ".reels > div",
      ".config .step", ".summary", ".includes > li", ".lp-full .wrap > *", ".sec .callline", ".iglink"
    ].join(",");
    var vh = window.innerHeight, els = [];
    document.querySelectorAll(SEL).forEach(function(el){
      if (el.closest(".pop,.calbox,.mpanel,.hero")) return;
      if (el.getBoundingClientRect().top < vh * 0.92) return;
      els.push(el);
    });
    els.forEach(function(el){
      var sibs = Array.prototype.filter.call(el.parentNode.children, function(c){ return els.indexOf(c) > -1; });
      var i = sibs.indexOf(el);
      el.style.setProperty("--d", Math.min(i, 6) * 70 + "ms");
      el.classList.add("rv");
      if (el.classList.contains("ph")) el.classList.add("rv-img");
    });
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){
        if (!e.isIntersecting) return;
        reveal(e.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    function sibsDelay(el){ return parseInt(el.style.getPropertyValue("--d"), 10) || 0; }
    function reveal(el){
      io.unobserve(el);
      el.classList.add("in");
      /* On rend la main aux transitions propres de l'élément (survol, etc.) */
      setTimeout(function(){ el.classList.remove("rv", "rv-img", "in"); el.style.removeProperty("--d"); }, 1300 + Math.min(sibsDelay(el), 600));
    }
    els.forEach(function(el){ io.observe(el); });
    /* Bas de page atteint : on révèle ce qui reste, pour ne jamais laisser un bloc invisible */
    window.addEventListener("scroll", function(){
      if (window.innerHeight + window.scrollY < document.documentElement.scrollHeight - 40) return;
      document.querySelectorAll(".rv:not(.in)").forEach(reveal);
    }, { passive: true });
  })();

  /* Routeur (pages) */
  var pages = document.querySelectorAll(".page");
  var top = document.getElementById("top"), burger = document.getElementById("burger");
  function onScroll(){ top.classList.toggle("solid", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, {passive:true});
  burger.addEventListener("click", function(){
    var open = top.classList.toggle("open");
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!burger.dataset.ico) burger.dataset.ico = burger.innerHTML;
    burger.innerHTML = open ? '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="1.6"/></svg>' : burger.dataset.ico;
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  });
  /* Anciennes adresses en #/… (pubs, Calendly, partages) : redirection vers les vraies pages */
  var OLD = {"/": "/", "/offres": "/offres/", "/services": "/offres/", "/pack-hiver": "/pack-hiver/", "/pack-ceramique": "/protection-ceramique-voiture/", "/pack-november": "/black-friday/", "/black-friday": "/black-friday/", "/signature": "/nettoyage-interieur-voiture/", "/tarifs": "/nettoyage-interieur-voiture/", "/polissage": "/polissage-voiture/", "/refresh": "/abonnement-entretien-voiture/", "/abonnements": "/abonnement-entretien-voiture/", "/qui-sommes-nous": "/qui-sommes-nous/"};
  function route(){
    var hash = location.hash || "";
    if (hash.indexOf("#/") === 0) {
      var parts = hash.slice(1).split("#"), dest = OLD[parts[0].replace(/\/$/, "") || "/"] || "/";
      location.replace(dest + (parts[1] ? "#" + parts[1] : ""));
      return;
    }
    var page = document.querySelector(".page"), path = page ? page.getAttribute("data-page") : "/";
    document.querySelectorAll(".page").forEach(function(p){ p.classList.add("on"); });
    document.querySelectorAll("[data-nav]").forEach(function(a){
      if (a.getAttribute("data-nav") === path) a.setAttribute("aria-current","page"); else a.removeAttribute("aria-current");
    });
    document.body.classList.toggle("at-home", path === "/");
    /* Barre mobile : le bouton principal reprend l'appel à l'action de la page */
    var mb = document.querySelector(".mbar .btn-gold"), cur = document.querySelector(".page .js-main-cta");
    /* Page avec son propre configurateur : « Réserver » y mène directement */
    if (document.getElementById("composer") && document.getElementById("configurator")) {
      document.querySelectorAll(".nav-r .btn-gold, .mpanel .btn-gold").forEach(function(a){ a.setAttribute("href", "#composer"); });
      if (mb && !cur) mb.setAttribute("href", "#composer");
    }
    if (mb && cur) {
      var href = cur.getAttribute("href");
      mb.setAttribute("href", href); mb.textContent = cur.getAttribute("data-mbar") || "Réserver";
      if (cur.getAttribute("data-produit")) mb.setAttribute("data-produit", cur.getAttribute("data-produit"));
      if (cur.getAttribute("data-stripe")) mb.setAttribute("data-stripe", "1");
      if (cur.target === "_blank") { mb.target = "_blank"; mb.rel = "noopener"; } else { mb.removeAttribute("target"); }
    }
    if (window.__fitHero) window.__fitHero();
    top.classList.remove("open"); burger.setAttribute("aria-expanded","false"); document.documentElement.style.overflow = ""; if (burger.dataset.ico) burger.innerHTML = burger.dataset.ico;
    onScroll();
  }
  window.addEventListener("hashchange", route);
  route();
})();


/* Réservation Calendly dans une fenêtre, sans quitter le site.
   Le script Calendly ne se charge qu'au premier clic sur un bouton de réservation (page plus rapide). */
(function(){
  var box = document.getElementById("calbox"), w = document.getElementById("calwidget");
  if (!CONFIG.calendly || !box || !w) return;
  var base = "https://calendly.com/gleamandgo", charge = null;

  function chargeCalendly(){
    if (charge) return charge;
    charge = new Promise(function(ok, ko){
      var l = document.createElement("link"); l.rel = "stylesheet";
      l.href = "https://assets.calendly.com/assets/external/widget.css"; document.head.appendChild(l);
      var s = document.createElement("script"); s.async = true;
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.onload = function(){ ok(); }; s.onerror = function(){ charge = null; ko(); };
      document.head.appendChild(s);
    });
    return charge;
  }
  function open(url){
    var pop = document.getElementById("pop"); if (pop) pop.classList.remove("on");
    w.innerHTML = '<p class="cal-wait">Chargement du calendrier…</p>';
    box.classList.add("on"); document.body.style.overflow = "hidden";
    var accord = window.GG && GG.consentement && GG.consentement() === "oui";
    url += (url.indexOf("?") > -1 ? "&" : "?") +
      (accord ? "hide_gdpr_banner=1&" : "") + "background_color=0e0e0e&text_color=f3f0ea&primary_color=c9a96a";
    chargeCalendly().then(function(){
      w.innerHTML = "";
      Calendly.initInlineWidget({ url: url, parentElement: w });
    }, function(){ close(); window.open(url, "_blank"); });   // secours si Calendly ne répond pas
    if (window.GG && GG.suivre) GG.suivre("ouverture-agenda", {});
  }
  function close(){ box.classList.remove("on"); document.body.style.overflow = ""; w.innerHTML = ""; }

  document.addEventListener("click", function(e){
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a || a.href.indexOf(base) !== 0) return;
    e.preventDefault();
    open(a.href);
  });
  document.getElementById("calclose").addEventListener("click", close);
  box.addEventListener("click", function(e){ if (e.target === box) close(); });
  document.addEventListener("keydown", function(e){ if (e.key === "Escape" && box.classList.contains("on")) close(); });

  window.addEventListener("message", function(e){
    if (e.origin !== "https://calendly.com" || !e.data || e.data.event !== "calendly.event_scheduled") return;
    if (window.GG && GG.suivre) GG.suivre("rdv", {});
  });
})();


/* ======================================================================
   Mesure : bannière cookies (consentement préalable), Consent Mode v2,
   Pixel Meta, Google Analytics 4, Google Ads.
   Rien n'est chargé tant que le visiteur n'a pas cliqué « Accepter ».
   ====================================================================== */
(function(){
  var M = CONFIG.mesure || {}, GG = window.GG = window.GG || {};
  var actif = !!(M.metaPixel || M.ga4 || M.googleAds);
  var KEY = "gg_consent", DUREE = 182 * 864e5;            // on redemande après 6 mois
  var charge = false, attente = [];

  function lire(){
    try { var c = JSON.parse(localStorage.getItem(KEY) || "null"); if (c && Date.now() - c.t < DUREE) return c.v; } catch (e) {}
    return null;
  }
  function ecrire(v){ try { localStorage.setItem(KEY, JSON.stringify({ v: v, t: Date.now() })); } catch (e) {} }
  GG.consentement = lire;

  /* Consent Mode v2 : tout est refusé par défaut, avant toute balise Google */
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){ dataLayer.push(arguments); };
  gtag("consent", "default", { ad_storage:"denied", ad_user_data:"denied", ad_personalization:"denied", analytics_storage:"denied", wait_for_update: 500 });

  function chargeOutils(){
    if (charge || !actif) return;
    charge = true;
    gtag("consent", "update", { ad_storage:"granted", ad_user_data:"granted", ad_personalization:"granted", analytics_storage:"granted" });
    var gid = M.ga4 || M.googleAds;
    if (gid) {
      var s = document.createElement("script"); s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(gid);
      document.head.appendChild(s);
      gtag("js", new Date());
      if (M.ga4) gtag("config", M.ga4, { cookie_expires: 34128000 });   // 13 mois au plus
      if (M.googleAds) gtag("config", M.googleAds);
    }
    if (M.metaPixel) {
      /* Code de base du Pixel Meta */
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
      document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq("init", M.metaPixel);
      fbq("track", "PageView");
    }
    /* Mémorise la source de la visite (30 jours) pour la transmettre au paiement */
    if (GG.utm && GG.utm.length && /utm_/.test(location.search)) {
      try { localStorage.setItem("gg_utm", JSON.stringify({ q: GG.utm, t: Date.now() })); } catch (e) {}
    }
    attente.splice(0).forEach(function(a){ envoie(a[0], a[1]); });
  }

  function ads(label, extra){
    if (!M.googleAds || !label) return;
    var p = { send_to: M.googleAds + "/" + label };
    for (var k in extra) p[k] = extra[k];
    gtag("event", "conversion", p);
  }
  function envoie(nom, p){
    var fb = window.fbq && M.metaPixel ? window.fbq : function(){};
    var item = p.produit ? [{ item_id: p.produit, item_name: p.nom || p.produit, price: p.valeur || 0, quantity: 1 }] : [];
    if (nom === "vue") {
      fb("track", "ViewContent", { content_name: p.nom, content_category: p.categorie || "offre", content_ids: p.produit ? [p.produit] : undefined, content_type: p.produit ? "product" : undefined, value: p.valeur, currency: p.valeur ? "EUR" : undefined });
      if (M.ga4) gtag("event", "view_item", { currency: "EUR", value: p.valeur || 0, items: item.length ? item : [{ item_name: p.nom }] });
    } else if (nom === "contact") {
      fb("track", "Contact", { content_name: p.methode });
      if (M.ga4) gtag("event", "contact", { method: p.methode });
      ads((M.adsLabels || {})[p.methode]);
    } else if (nom === "paiement") {
      fb("track", "InitiateCheckout", { value: p.valeur, currency: "EUR", content_ids: [p.produit], content_type: "product", num_items: 1 });
      if (M.ga4) gtag("event", "begin_checkout", { currency: "EUR", value: p.valeur, items: item });
    } else if (nom === "achat") {
      fb("track", "Purchase", { value: p.valeur, currency: "EUR", content_ids: [p.produit], content_type: "product", num_items: 1 }, { eventID: p.id });
      if (M.ga4) gtag("event", "purchase", { transaction_id: p.id, currency: "EUR", value: p.valeur, items: item });
      ads((M.adsLabels || {}).achat, { value: p.valeur, currency: "EUR", transaction_id: p.id });
    } else if (nom === "rdv") {
      fb("track", "Schedule");
      if (M.ga4) gtag("event", "generate_lead", { method: "calendly" });
    } else if (nom === "ouverture-agenda") {
      fb("trackCustom", "OuvertureAgenda");
      if (M.ga4) gtag("event", "ouverture_agenda");
    }
  }
  /* Un événement avant la réponse du visiteur attend ; refusé, il est oublié */
  GG.suivre = function(nom, p){
    if (!actif) return;
    var c = lire();
    if (c === "oui") { chargeOutils(); envoie(nom, p || {}); }
    else if (c === null) attente.push([nom, p || {}]);
  };

  /* Bannière */
  function banniere(){
    var ck = document.getElementById("ck");
    if (!ck) {
      ck = document.createElement("div");
      ck.className = "ck"; ck.id = "ck"; ck.setAttribute("role", "dialog"); ck.setAttribute("aria-label", "Cookies");
      ck.innerHTML = '<p>Nous aimerions mesurer quelles publicités vous amènent ici (Google Analytics, Google Ads, Meta). ' +
        'Ces cookies ne se chargent que si vous acceptez. <a href="/confidentialite/#cookies">En savoir plus</a></p>' +
        '<div class="ck-b"><button type="button" class="btn btn-line" data-ck="non">Refuser</button>' +
        '<button type="button" class="btn btn-line" data-ck="oui">Accepter</button></div>';
      document.body.appendChild(ck);
      ck.addEventListener("click", function(e){
        var b = e.target.closest && e.target.closest("[data-ck]");
        if (!b) return;
        var v = b.getAttribute("data-ck");
        ecrire(v); ck.hidden = true;
        if (v === "oui") chargeOutils();
        else { attente.length = 0; if (charge) location.reload(); }   // retrait du consentement : on recharge sans les outils
      });
    }
    ck.hidden = false;
  }
  document.querySelectorAll(".js-cookies-reglages").forEach(function(b){
    if (!actif) { b.remove(); return; }
    b.addEventListener("click", banniere);
  });
  if (actif) {
    var c = lire();
    if (c === "oui") chargeOutils();
    else if (c === null) banniere();
  }

  /* Clics : WhatsApp et téléphone (Contact), paiement Stripe (InitiateCheckout) */
  document.addEventListener("click", function(e){
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    var h = a.getAttribute("href") || "";
    if (/^tel:/.test(h)) GG.suivre("contact", { methode: "telephone" });
    else if (/wa\.me\/|api\.whatsapp\.com/.test(h)) GG.suivre("contact", { methode: "whatsapp" });
    var cle = a.getAttribute("data-produit"), p = cle && CONFIG.produits && CONFIG.produits[cle];
    if (p && /^https:\/\/(buy|checkout)\.stripe\.com\//.test(h)) GG.suivre("paiement", { produit: cle, nom: p.nom, valeur: p.prix });
  }, true);

  /* Pages d'offre : ViewContent */
  var VUES = {
    "/black-friday/": { nom: "Black Friday : cartes +25 %", categorie: "cartes" },
    "/pack-hiver/": { nom: "Pack Hiver", produit: "pack-hiver", valeur: 200, categorie: "pack" },
    "/nettoyage-interieur-voiture/": { nom: "Signature Intérieur", valeur: CONFIG.signature, categorie: "nettoyage" },
    "/lavage-exterieur-voiture/": { nom: "Signature Extérieur", valeur: CONFIG.exterieur, categorie: "nettoyage" },
    "/polissage-voiture/": { nom: "Polissage", valeur: CONFIG.polishOneStep, categorie: "polissage" },
    "/protection-ceramique-voiture/": { nom: "Protection céramique", categorie: "ceramique" },
    "/abonnement-entretien-voiture/": { nom: "Refresh", categorie: "abonnement" },
    "/offres/": { nom: "Nos offres", categorie: "offres" }
  };
  if (VUES[GG.page]) GG.suivre("vue", VUES[GG.page]);
})();


/* Journée Gleam & Go en résidence : date, lieu et créneaux viennent de CONFIG.journee */
(function(){
  var box = document.getElementById("journee");
  if (!box) return;
  var J = CONFIG.journee || {}, now = (window.GG && GG.now) || Date.now();
  var fin = J.date ? Date.parse(J.date + "T23:59:59+01:00") : NaN;
  if (!J.date || isNaN(fin) || fin < now) {
    box.querySelector(".js-j-kicker").textContent = "Journée Gleam & Go · prochaine date bientôt";
    return;
  }
  var d = new Date(J.date + "T12:00:00+01:00");
  var jour = d.toLocaleDateString("fr-BE", { weekday: "long", day: "numeric", month: "long" });
  box.querySelector(".js-j-kicker").textContent = "Journée Gleam & Go · " + jour;
  box.querySelector(".js-j-titre").textContent = (J.residence || "Votre résidence") + " : votre voiture nettoyée dans le parking";
  if (J.adresse) box.querySelector(".js-j-sous").textContent = J.adresse + ". Vous réservez votre créneau, on s'occupe du reste. Méthode sans rinçage, pas d'eau au sol.";
  var sec = document.getElementById("jour-creneaux"), grille = sec && sec.querySelector(".js-j-creneaux");
  if (!grille) return;
  sec.hidden = false;
  var wa = function(m){ return "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(m); };
  grille.innerHTML = (J.creneaux || []).map(function(h){
    var msg = "Bonjour, je réserve le créneau de " + h + " le " + jour + " pour la Journée Gleam & Go (" + (J.residence || "résidence") + ").";
    var href = J.calendly ? J.calendly + (J.calendly.indexOf("?") > -1 ? "&" : "?") + "a1=" + encodeURIComponent(h + " · " + (J.residence || "")) : wa(msg);
    var t = document.createElement("div"); t.textContent = h;
    return '<article class="bf-card"><p class="bf-paye">Créneau</p><p class="bf-vaut"><b>' + t.innerHTML + '</b></p>' +
      '<a class="btn btn-line" href="' + href + '"' + (J.calendly ? '' : ' target="_blank" rel="noopener"') + '>Réserver ce créneau</a></article>';
  }).join("");
})();


/* Page merci : texte selon le produit acheté, et achat transmis une seule fois */
(function(){
  var box = document.getElementById("merci");
  if (!box) return;
  var q = {};
  location.search.slice(1).split("&").forEach(function(kv){ var p = kv.split("="); if (p[0]) q[decodeURIComponent(p[0])] = decodeURIComponent((p[1] || "").replace(/\+/g, " ")); });
  var cle = q.produit || "", P = (CONFIG.produits || {})[cle], type = P ? P.type : "";
  document.querySelectorAll("[data-pour]").forEach(function(el){
    var pour = el.getAttribute("data-pour").split(" ");
    el.hidden = !(pour.indexOf(type) > -1 || pour.indexOf(cle) > -1 || (pour.indexOf("autre") > -1 && !P));
  });
  box.querySelectorAll(".js-merci-produit").forEach(function(e){ e.textContent = P ? P.nom : ""; });
  if (!P) return;
  var id = q.session_id && q.session_id.indexOf("{") < 0 ? q.session_id : "";
  var cleVue = "gg_achat_" + (id || cle + "_" + new Date().toISOString().slice(0, 10));
  var deja = false;
  try { deja = !!localStorage.getItem(cleVue); } catch (e) {}
  if (deja) return;
  try { localStorage.setItem(cleVue, "1"); } catch (e) {}
  if (window.GG && GG.suivre) GG.suivre("achat", { produit: cle, nom: P.nom, valeur: P.prix, id: id || ("gg-" + cle + "-" + Date.now()) });
})();


/* Rétractation en ligne : le formulaire est envoyé par email (FormSubmit) ; sinon email ou WhatsApp pré-remplis */
(function(){
  var f = document.getElementById("retractForm");
  if (!f) return;
  var ok = document.getElementById("retractOk"), err = document.getElementById("retractErr");
  function texte(){
    var d = new FormData(f), get = function(k){ return (d.get(k) || "").toString().trim(); };
    return "Je vous notifie par la présente ma rétractation du contrat suivant :\n" +
      "Commande : " + get("commande") + "\n" +
      "Payée le : " + get("date") + "\n" +
      (get("numero") ? "N° de carte ou de paiement : " + get("numero") + "\n" : "") +
      "Nom : " + get("nom") + "\n" +
      "Email : " + get("email") + "\n" +
      (get("tel") ? "Téléphone : " + get("tel") + "\n" : "") +
      (get("message") ? "Message : " + get("message") + "\n" : "") +
      "Date de la demande : " + new Date().toLocaleString("fr-BE");
  }
  function secours(){
    var t = texte();
    var m = document.getElementById("retractMail"), w = document.getElementById("retractWa");
    if (m) m.href = "mailto:" + CONFIG.email + "?subject=" + encodeURIComponent("Rétractation") + "&body=" + encodeURIComponent(t);
    if (w) w.href = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent("Rétractation\n" + t);
    var r = document.getElementById("retractRecap"); if (r) r.textContent = t;
  }
  f.addEventListener("input", secours);
  f.addEventListener("submit", function(e){
    e.preventDefault();
    if (!f.reportValidity()) return;
    secours();
    var btn = f.querySelector("button[type=submit]"); btn.disabled = true; btn.textContent = "Envoi…";
    var d = new FormData(f);
    d.append("_subject", "Rétractation : " + (d.get("commande") || ""));
    d.append("_template", "box");
    d.append("_captcha", "false");
    d.append("_autoresponse", "Nous avons bien reçu votre demande de rétractation. Nous vous remboursons dans les 14 jours, par le moyen de paiement utilisé. Gleam & Go, " + CONFIG.email + ", 0478 48 83 34.\n\n" + texte());
    fetch("https://formsubmit.co/ajax/" + encodeURIComponent(CONFIG.email), { method: "POST", headers: { "Accept": "application/json" }, body: d })
      .then(function(r){ return r.json().catch(function(){ return {}; }).then(function(j){ if (!r.ok || j.success === "false" || j.success === false) throw new Error("envoi"); }); })
      .then(function(){ f.hidden = true; ok.hidden = false; ok.focus && ok.focus(); })
      .catch(function(){ err.hidden = false; btn.disabled = false; btn.textContent = "Confirmer ma rétractation"; });
  });
  secours();
})();
