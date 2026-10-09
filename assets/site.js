/* Photos intégrées (générées) */
var PHOTO_DATA = {"abo": "/img/abo.jpg", "about-1": "/img/about-1.jpg", "about-2": "/img/about-2.jpg", "about-3": "/img/about-3.jpg", "gal-1": "/img/gal-1.jpg", "gal-2": "/img/gal-2.jpg", "gal-3": "/img/gal-3.jpg", "gal-4": "/img/gal-4.jpg", "gal-5": "/img/gal-5.jpg", "gal-6": "/img/gal-6.jpg", "gal-7": "/img/gal-7.jpg", "gal-8": "/img/gal-8.jpg", "hero-m": "/img/hero-m.jpg", "hero": "/img/hero.jpg", "matheo": "/img/matheo.jpg", "pol-multi": "/img/pol-multi.jpg", "pol-one": "/img/pol-one.jpg", "pop": "/img/pop.jpg", "svc-polish": "/img/svc-polish.jpg", "svc-refresh": "/img/svc-refresh.jpg", "svc-signature": "/img/svc-signature.jpg", "yanis": "/img/yanis.jpg"};


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
    hiver:     "https://calendly.com/gleamandgo/pack-hiver"
  },
  phone: "+32478488334",
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

  taille: [
    { icon:"citadine", id:"citadine", label:"Citadine",          note:"Polo, Clio, 208",       add:0  },
    { icon:"berline", id:"berline",  label:"Berline ou break",  note:"Série 3, Golf, A4",     add:20 },
    { icon:"suv", id:"suv",      label:"SUV ou monospace",  note:"X5, Q7, Classe V",      add:40 }
  ],
  etat: [
    { id:"normal",    label:"Normal",    note:"Entretien courant", add:0  },
    { id:"sale",      label:"Sale",      note:"Plusieurs mois sans nettoyage", add:25 },
    { id:"tres-sale", label:"Très sale", note:"Taches, boue, habitacle chargé", add:50 }
  ],
  options: [
    { id:"exterieur", label:"Extérieur",       note:"Carrosserie, jantes, vitres, protection PW", add:59 },
    { id:"poils",     label:"Poils d'animaux", note:"Retrait complet",             add:40 }
  ],
  zone: [
    { id:"bxl",  label:"Bruxelles",      note:"Les 19 communes",           add:0  },
    { id:"z15",  label:"Jusqu'à 15 km",  note:"Waterloo, Rhode, Zaventem", add:10 },
    { id:"z30",  label:"15 à 30 km",     note:"Wavre, Nivelles, Malines",  add:25 },
    { id:"z50",  label:"30 à 50 km",     note:"Louvain, Namur, Gand",      add:45 },
    { id:"far",  label:"Plus de 50 km",  note:"Sur devis",                 add:null }
  ],
  /* Photos : mets le chemin ou l'URL de chaque image. Vide = emplacement affiché avec sa consigne. */
  photos: {
    "hero":          { src:"", alt:"Nettoyage d'une jante à la brosse dans la mousse", tip:"Hero : voiture foncée en plein lavage, mousse visible, de nuit ou en fin de journée, format paysage" },
    "svc-signature": { src:"", alt:"Habitacle BMW cuir rouge après nettoyage", tip:"Habitacle impeccable, sièges shampouinés, vue depuis la portière ouverte" },
    "svc-refresh":   { src:"", alt:"Habitacle Audi e-tron après entretien", tip:"Voiture propre garée devant une maison, lumière douce" },
    "svc-polish":    { src:"", alt:"Polissage d'un capot à la polisseuse", tip:"Polisseuse Rupes en action sur un capot, reflet visible" },
    "gal-1":  { src:"", alt:"Porsche Panamera noir mat après nettoyage", tip:"La plus belle photo : voiture finie, reflets profonds" },
    "gal-2":  { src:"", alt:"Eau qui perle sur une BMW noire", tip:"Siège avant, avant shampooing" },
    "gal-3":  { src:"", alt:"Logo Porsche nettoyé au pinceau", tip:"Même siège, après shampooing" },
    "gal-4":  { src:"", alt:"Porsche Panamera en prélavage mousse chez le client", tip:"Jante en gros plan, propre" },
    "gal-5":  { src:"", alt:"Audi e-tron en prélavage mousse, rue de Bruxelles", tip:"Gouttes d'eau qui perlent sur la carrosserie" },
    "gal-6":  { src:"", alt:"Habitacle BMW cuir bordeaux", tip:"Photo large : l'équipe au travail devant chez un client" },
    "gal-7":  { src:"", alt:"Habitacle Audi e-tron", tip:"Tapis de sol avant/après côte à côte" },
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

  /* Garantie affichée sur la page Pack Hiver. active:false = on affiche « Pas de surprise » à la place. */
  garantie: {
    active: false,
    titre: "Satisfait, ou on revient",
    texte: "Un point ne vous convient pas ? Dites-le-nous dans les 7 jours : on revient le reprendre gratuitement."
  },

  /* Offre mise en avant (pop-up + pages Offres et Pack Hiver). active:false la désactive partout. */
  offre: {
    active: true,
    kicker: "Offre d'hiver",
    titre: "Pack Hiver",
    prix: 450,
    fin: "2026-11-01T00:00:00+01:00",
    videoMP4: "",                         // ex. "img/mercedes.mp4" : le plus fiable pour la lecture auto sur iPhone/Android
    videoYouTube: "EekPmuMWj3E",          // vidéo preuve avant/après sur la page Pack Hiver (ID YouTube). Vide = pas de vidéo
    videoLegende: "Avant / après · Mercedes",   // fin de l'offre (compte à rebours). Vide = pas de compte à rebours
    /* Prix séparés des éléments en plus du Signature et du polissage (servent au calcul « séparément ») */
    decontamination: 50,
    ceramique: 192,
    lignes: [
      "Signature complet : intérieur et extérieur",
      "Décontamination de la carrosserie",
      "Une passe de polissage",
      "Protection céramique, 3 ans de durée"
    ],
    delaiPopup: 8000,            // délai avant l'apparition du pop-up, en millisecondes
    rappelJours: 7               // on ne le remontre pas avant X jours au même visiteur
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

  /* Avis Google, copiés mot pour mot */
  rating: "5,0",
  reviewCount: 22,              // à mettre à jour quand de nouveaux avis arrivent
  reviews: [
    { name:"Bernard W.",  text:"Ma voiture était une poubelle roulante, je la retrouve neuve, un énorme merci, je recommande à 100%" },
    { name:"Fouad A.",    text:"Nettoyage digne d’une Audi Q8 e-tron. Excellent travail les gars. Je recommande !!!🤩" },
    { name:"cypsi 25",    text:"Super service ! Très pratique de pouvoir faire laver sa voiture directement à domicile, avec un résultat impeccable. Je recommande sans hésiter !" },
    { name:"Tiana D.",    text:"Nettoyage en profondeur réalisé de manière méticuleuse, tout était parfait, aucun dégât 👍" },
    { name:"Stephanie G.",text:"Travail nickel et soigné! Chouette projet porté par des petits jeunes… Je recommande." },
    { name:"Sarah T.",    text:"Service hors pair ! Satisfaite car ils offrent un service impeccable, je recommande à 100% Et tout ça avec le sourire ^^" }
  ],

  rythmes: [
    { id:"2s", label:"Toutes les 2 semaines", rhythm:"Voiture toujours impeccable",            price:79,  tag:"Meilleur prix par passage" },
    { id:"4s", label:"Toutes les 4 semaines", rhythm:"Le plus choisi pour un usage quotidien", price:89,  tag:"Recommandé", pick:true },
    { id:"8s", label:"Tous les 2 mois",       rhythm:"Usage modéré, voiture souvent au garage", price:109, tag:"" }
  ]
};
/* ====================================================================== */

(function(){
  var eur = function(n){ return n + " €"; };
  var wa = function(msg){ return "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(msg); };
  /* key = type de RDV dans CONFIG.cal ; recap = texte pré-rempli dans la question 1 de Calendly */
  var book = function(msg, key, recap){
    var url = (key && CONFIG.cal && CONFIG.cal[key]) || "";
    if (!url) return wa(msg);
    return url + (url.indexOf("?") > -1 ? "&" : "?") + "a1=" + encodeURIComponent(recap || msg);
  };
  document.querySelectorAll(".js-tel").forEach(function(a){ a.href = "tel:" + CONFIG.phone; });
  document.querySelectorAll(".js-cal").forEach(function(a){ a.href = CONFIG.calendly || wa("Bonjour, je voudrais réserver un créneau."); });
  document.querySelectorAll(".js-clients").forEach(function(e){ e.textContent = CONFIG.clients; });

  /* Liens génériques */
  document.querySelectorAll(".js-wa").forEach(function(a){ a.href = wa("Bonjour, j'ai une question sur vos prestations."); });
  document.querySelectorAll(".js-wa-msg").forEach(function(a){ a.href = book(a.getAttribute("data-msg"), a.getAttribute("data-cal"), a.getAttribute("data-recap")); });
  document.querySelectorAll(".js-reviews").forEach(function(a){ a.href = CONFIG.googleReviews; });
  document.querySelectorAll(".js-p-signature").forEach(function(e){ e.textContent = eur(CONFIG.signature); });
  var minRef = Math.min.apply(null, CONFIG.rythmes.map(function(r){ return r.price; }));
  document.querySelectorAll(".js-p-refresh").forEach(function(e){ e.textContent = eur(minRef); });
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
      img.src = src; img.alt = ph.alt || ""; img.loading = "lazy";
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
    box.innerHTML = urls.map(function(u){
      var clean = u.split("?")[0].replace(/\/$/, "");
      return '<div><iframe src="' + clean + '/embed" loading="lazy" scrolling="no" allowtransparency="true" title="Vidéo Instagram"></iframe></div>';
    }).join("");
  })();

  /* Offre mise en avant + pop-up */
  (function(){
    var o = CONFIG.offre || {}, pop = document.getElementById("pop");
    var msg = "Bonjour, je suis intéressé par le " + (o.titre || "pack") + " à " + eur(o.prix) + ".";
    if (!o.active) {
      pop.remove();
      var d = document.getElementById("offre"); if (d) d.remove();
      return;
    }
    document.querySelectorAll(".js-offre-kicker").forEach(function(e){ e.textContent = o.kicker; });
    document.querySelectorAll(".js-offre-titre").forEach(function(e){ e.textContent = o.titre; });
    document.querySelectorAll(".js-offre-prix").forEach(function(e){ e.textContent = eur(o.prix); });
    document.querySelectorAll(".js-offre-lignes").forEach(function(e){ e.innerHTML = o.lignes.map(function(l){ return "<li>" + l + "</li>"; }).join(""); });
    document.querySelectorAll(".js-offre-cta").forEach(function(a){ a.href = book(msg, "hiver", (o.titre || "Pack") + " — " + eur(o.prix)); a.textContent = "Réserver le " + o.titre; });
    document.getElementById("popKicker").textContent = o.kicker;
    document.getElementById("popTitle").textContent = o.titre;
    document.getElementById("popPrice").textContent = eur(o.prix);
    document.getElementById("popList").innerHTML = o.lignes.map(function(l){ return "<li>" + l + "</li>"; }).join("");
    var media = document.getElementById("popMedia");
    if (PD["pop"]) { var pi = document.createElement("img"); pi.src = PD["pop"]; pi.alt = ""; media.appendChild(pi); }
    else { media.remove(); document.querySelector(".pop-card").style.gridTemplateColumns = "1fr"; }
    var cta = document.getElementById("popCta"); cta.href = book(msg, "hiver", (o.titre || "Pack") + " — " + eur(o.prix)); cta.textContent = "Réserver le " + o.titre;

    var KEY = "gg_offre_vue";
    function vueRecemment(){
      try { var t = localStorage.getItem(KEY); return t && (Date.now() - parseInt(t, 10)) < (o.rappelJours || 7) * 864e5; } catch (e) { return false; }
    }
    function ferme(){
      pop.classList.remove("on");
      try { localStorage.setItem(KEY, String(Date.now())); } catch (e) {}
    }
    document.getElementById("popClose").addEventListener("click", ferme);
    document.getElementById("popLater").addEventListener("click", ferme);
    cta.addEventListener("click", ferme);
    pop.addEventListener("click", function(e){ if (e.target === pop) ferme(); });
    document.addEventListener("keydown", function(e){ if (e.key === "Escape") ferme(); });
    if (!vueRecemment() && !document.querySelector('.page[data-page="/pack-hiver/"]')) setTimeout(function(){ pop.classList.add("on"); }, o.delaiPopup || 8000);
  })();

  /* Avis */
  document.querySelectorAll(".js-score").forEach(function(e){ e.textContent = CONFIG.rating + " sur Google, " + CONFIG.reviewCount + " avis"; });
  document.querySelectorAll(".js-count").forEach(function(e){ e.textContent = CONFIG.reviewCount + " avis sur Google"; });
  document.querySelectorAll(".js-count2").forEach(function(e){ e.textContent = CONFIG.reviewCount + " avis Google"; });
  document.querySelectorAll(".js-rating").forEach(function(e){ e.textContent = CONFIG.rating + " ★"; });
  (document.getElementById("reviews") || {}).innerHTML = CONFIG.reviews.map(function(r){
    var d = document.createElement("div"); d.textContent = r.text; var t = d.innerHTML;
    d.textContent = r.name; var n = d.innerHTML;
    return '<blockquote><span class="stars" aria-label="5 étoiles sur 5">★★★★★</span><p>' + t + '</p><cite>' + n + ', avis Google</cite></blockquote>';
  }).join("");

  /* Pages offres : avis ciblés, empilement de valeur, garantie */
  document.querySelectorAll(".js-revs").forEach(function(box){
    var pick = (box.getAttribute("data-pick") || "0,1,2").split(",").map(Number);
    box.innerHTML = pick.map(function(i){ return CONFIG.reviews[i]; }).filter(Boolean).map(function(r){
      var d = document.createElement("div"); d.textContent = r.text; var t = d.innerHTML;
      d.textContent = r.name; var n = d.innerHTML;
      return '<blockquote><span class="stars" aria-label="5 étoiles sur 5">★★★★★</span><p>' + t + '</p><cite>' + n + ', avis Google</cite></blockquote>';
    }).join("");
  });
  var extOpt = CONFIG.options.filter(function(o){ return o.id === "exterieur"; })[0] || {add:0};
  document.querySelectorAll(".js-p-ext").forEach(function(e){ e.textContent = eur(extOpt.add); });
  document.querySelectorAll(".js-stack-sum").forEach(function(e){ e.textContent = eur(CONFIG.signature + extOpt.add + CONFIG.polishOneStep); });
  var OF = CONFIG.offre || {};
  var valeur = CONFIG.signature + extOpt.add + CONFIG.polishOneStep + (OF.decontamination || 0) + (OF.ceramique || 0);
  document.querySelectorAll(".js-p-decon").forEach(function(e){ e.textContent = eur(OF.decontamination || 0); });
  document.querySelectorAll(".js-p-cera").forEach(function(e){ e.textContent = eur(OF.ceramique || 0); });
  document.querySelectorAll(".js-hiver-valeur").forEach(function(e){ e.textContent = eur(valeur); });
  document.querySelectorAll(".js-hiver-eco").forEach(function(e){ e.textContent = eur(valeur - OF.prix); });
  /* Vidéo preuve Pack Hiver (YouTube, lecture auto sans son, en boucle) */
  document.querySelectorAll(".js-proof-vid").forEach(function(fig){
    var id = OF.videoYouTube, mp4 = OF.videoMP4;
    if (!id && !mp4) { fig.remove(); return; }
    var sec = fig.closest(".lp-full"); if (sec) sec.classList.add("has-vid");
    var cap = fig.querySelector(".js-proof-cap"); if (cap && OF.videoLegende) cap.textContent = OF.videoLegende;
    if (mp4) {
      var v = document.createElement("video");
      v.src = mp4; v.muted = true; v.loop = true; v.autoplay = true; v.playsInline = true; v.preload = "auto";
      v.setAttribute("muted",""); v.setAttribute("playsinline",""); v.setAttribute("webkit-playsinline","");
      if (id) v.poster = "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg";
      v.addEventListener("click", function(){ v.paused ? v.play() : v.pause(); });
      fig.querySelector(".pv-frame").appendChild(v);
      var tryPlay = function(){ var pr = v.play(); if (pr && pr.catch) pr.catch(function(){}); };
      tryPlay(); document.addEventListener("touchstart", tryPlay, { once: true, passive: true });
      return;
    }
    var touch = window.matchMedia && matchMedia("(hover: none)").matches;
    if (touch) fig.classList.add("tap");
    var f = document.createElement("iframe");
    f.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&mute=1&loop=1&playlist=" + id + "&controls=" + (touch ? 1 : 0) + "&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1";
    f.title = "Avant / après : exemple réel"; f.allow = "autoplay; encrypted-media; picture-in-picture";
    f.setAttribute("frameborder","0");
    fig.querySelector(".pv-frame").appendChild(f);
  });
  document.querySelectorAll("[data-bg]").forEach(function(sec){
    var src = PD[sec.getAttribute("data-bg")]; if (src) sec.style.setProperty("--bg", "url('" + src + "')");
  });
  (function(){
    var boxes = document.querySelectorAll(".js-countdown"), end = OF.fin ? new Date(OF.fin).getTime() : NaN;
    if (!boxes.length) return;
    if (isNaN(end)) { boxes.forEach(function(b){ b.remove(); }); return; }
    var pad = function(n){ return (n < 10 ? "0" : "") + n; };
    function tick(){
      var d = end - Date.now();
      if (d <= 0) { boxes.forEach(function(b){ b.remove(); }); clearInterval(t); return; }
      var j = Math.floor(d / 864e5), h = Math.floor(d / 36e5) % 24, m = Math.floor(d / 6e4) % 60, sec = Math.floor(d / 1e3) % 60;
      boxes.forEach(function(b){
        b.querySelector(".js-cd-j").textContent = pad(j); b.querySelector(".js-cd-h").textContent = pad(h);
        b.querySelector(".js-cd-m").textContent = pad(m); b.querySelector(".js-cd-s").textContent = pad(sec);
      });
    }
    var t = setInterval(tick, 1000); tick();
  })();
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

  var CARS = {
    citadine:'<svg class="car" viewBox="0 0 120 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M16 38V30c0-3 2-5 6-6l10-2c6-7 12-10 22-10h16c8 0 13 4 18 11l10 2c3 1 4 3 4 6v7z"/><path d="M38 23c5-5 10-7 16-7h6v7zM64 16h6c5 0 9 3 12 7H64z"/><circle cx="33" cy="38" r="7" fill="#000"/><circle cx="85" cy="38" r="7" fill="#000"/></svg>',
    berline:'<svg class="car" viewBox="0 0 120 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M6 38v-4c0-3 3-5 8-6l20-3c8-7 16-11 28-11h12c10 0 16 4 22 11l12 2c4 1 6 3 6 6v5z"/><path d="M40 25c6-5 12-8 20-8h4v8zM68 17h6c7 0 12 3 16 8H68z"/><circle cx="28" cy="38" r="7" fill="#000"/><circle cx="94" cy="38" r="7" fill="#000"/></svg>',
    suv:'<svg class="car" viewBox="0 0 120 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M8 38V24c0-4 2-6 6-7l10-1 7-8c1-1 3-2 5-2h50c4 0 6 1 8 4l6 8 8 2c3 1 4 3 4 6v12z"/><path d="M34 16l5-6h18v6zM61 10h20c2 0 3 1 4 2l3 4H61z"/><circle cx="30" cy="38" r="8" fill="#000"/><circle cx="92" cy="38" r="8" fill="#000"/></svg>'
  };
  /* Configurateur */
  var state = { taille:"citadine", etat:"normal", options:{}, zone:"bxl" };
  function build(group, list, multi){
    var box = document.querySelector('[data-group="'+group+'"]');
    box.innerHTML = list.map(function(o){
      var price = o.add === null ? "Sur devis" : (o.add === 0 ? "Inclus" : "+ " + eur(o.add));
      var type = multi ? "checkbox" : "radio";
      var checked = (!multi && state[group] === o.id) ? " checked" : "";
      return '<div class="choice"><input type="'+type+'" name="'+group+'" id="'+group+'-'+o.id+'" value="'+o.id+'"'+checked+'>' +
             '<label for="'+group+'-'+o.id+'">'+(o.icon && CARS[o.icon] ? CARS[o.icon] : '')+'<b>'+o.label+'</b><span>'+o.note+'<br>'+price+'</span></label></div>';
    }).join("");
    box.addEventListener("change", function(e){
      if (multi) state.options[e.target.value] = e.target.checked; else state[group] = e.target.value;
      update();
    });
  }
  function find(list, id){ for (var i=0;i<list.length;i++) if (list[i].id===id) return list[i]; }
  function update(){
    var t = find(CONFIG.taille, state.taille), e = find(CONFIG.etat, state.etat), z = find(CONFIG.zone, state.zone);
    var lines = [["Taille : " + t.label, t.add], ["État : " + e.label, e.add]];
    CONFIG.options.forEach(function(o){ if (state.options[o.id]) lines.push([o.label, o.add]); });
    lines.push(["Zone : " + z.label, z.add]);
    var total = CONFIG.signature, devis = false;
    document.getElementById("lines").innerHTML = lines.map(function(l){
      if (l[1] === null) devis = true; else total += l[1];
      var v = l[1] === null ? "sur devis" : (l[1] === 0 ? "inclus" : "+ " + eur(l[1]));
      return "<li><span>"+l[0]+"</span><span>"+v+"</span></li>";
    }).join("");
    document.getElementById("total").textContent = devis ? "Sur devis" : eur(total);
    var msg = "Bonjour, je voudrais réserver un Signature :\n" +
      lines.map(function(l){ return "- " + l[0]; }).join("\n") +
      "\nTotal estimé : " + (devis ? "sur devis" : eur(total));
    var recap = lines.map(function(l){ return "- " + l[0]; }).join("\n") + "\nTotal estimé : " + eur(total);
    var btn = document.getElementById("bookSignature");
    btn.href = devis ? wa(msg) : book(msg, state.options.exterieur ? "complet" : "interieur", recap);
    btn.textContent = devis ? "Demander un devis" : "Réserver ce nettoyage";
  }
  if (document.getElementById("configurator")) {
    build("taille", CONFIG.taille); build("etat", CONFIG.etat); build("options", CONFIG.options, true); build("zone", CONFIG.zone);
    update();
  }

  /* Abonnements */
  (document.getElementById("freq") || {}).innerHTML = CONFIG.rythmes.map(function(f){
    var msg = "Bonjour, je voudrais démarrer un abonnement Refresh (" + f.label.toLowerCase() + ", " + eur(f.price) + " par passage).";
    return '<article class="'+(f.pick?"pick":"")+'"><div class="tag">'+(f.tag||"")+'</div><h3>'+f.label+'</h3><p class="rhythm">'+f.rhythm+'</p>' +
      '<p class="price"><b>'+eur(f.price)+'</b> / passage</p>' +
      '<a class="btn '+(f.pick?"btn-gold":"btn-line")+'" href="'+book(msg)+'" target="_blank" rel="noopener">Démarrer ce rythme</a></article>';
  }).join("");

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
  var OLD = {"/": "/", "/offres": "/offres/", "/services": "/offres/", "/pack-hiver": "/pack-hiver/", "/signature": "/nettoyage-interieur-voiture/", "/tarifs": "/nettoyage-interieur-voiture/", "/polissage": "/polissage-voiture/", "/refresh": "/abonnement-entretien-voiture/", "/abonnements": "/abonnement-entretien-voiture/", "/qui-sommes-nous": "/qui-sommes-nous/"};
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
    if (mb && cur) {
      var href = cur.getAttribute("href");
      mb.setAttribute("href", href); mb.textContent = "Réserver";
      if (/^https?:/.test(href)) { mb.target = "_blank"; mb.rel = "noopener"; } else { mb.removeAttribute("target"); }
    }
    if (window.__fitHero) window.__fitHero();
    top.classList.remove("open"); burger.setAttribute("aria-expanded","false"); document.documentElement.style.overflow = ""; if (burger.dataset.ico) burger.innerHTML = burger.dataset.ico;
    onScroll();
  }
  window.addEventListener("hashchange", route);
  route();
})();


/* Réservation Calendly dans une fenêtre, sans quitter le site */
(function(){
  if (!CONFIG.calendly) return;
  var l = document.createElement("link"); l.rel = "stylesheet";
  l.href = "https://assets.calendly.com/assets/external/widget.css"; document.head.appendChild(l);
  var s = document.createElement("script"); s.async = true;
  s.src = "https://assets.calendly.com/assets/external/widget.js"; document.head.appendChild(s);

  var box = document.getElementById("calbox"), w = document.getElementById("calwidget");
  var base = "https://calendly.com/gleamandgo";

  function open(url){
    if (!window.Calendly) { window.open(url, "_blank"); return; }   // secours si le script Calendly n'a pas chargé
    w.innerHTML = "";
    url += (url.indexOf("?") > -1 ? "&" : "?") +
      "hide_gdpr_banner=1&background_color=0e0e0e&text_color=f3f0ea&primary_color=c9a96a";
    Calendly.initInlineWidget({ url: url, parentElement: w });
    box.classList.add("on"); document.body.style.overflow = "hidden";
    if (window.fbq) fbq("track", "InitiateCheckout");
  }
  function close(){ box.classList.remove("on"); document.body.style.overflow = ""; w.innerHTML = ""; }

  document.addEventListener("click", function(e){
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a || a.href.indexOf(base) !== 0) return;
    e.preventDefault();
    var pop = document.getElementById("pop"); if (pop && pop.classList) pop.classList.remove("on");
    open(a.href);
  });
  document.getElementById("calclose").addEventListener("click", close);
  box.addEventListener("click", function(e){ if (e.target === box) close(); });
  document.addEventListener("keydown", function(e){ if (e.key === "Escape" && box.classList.contains("on")) close(); });

  window.addEventListener("message", function(e){
    if (e.origin !== "https://calendly.com" || !e.data || e.data.event !== "calendly.event_scheduled") return;
    if (window.fbq) fbq("track", "Schedule", { value: 40, currency: "EUR" });
  });
})();
