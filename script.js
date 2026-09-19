(() => {
  const canvas = document.getElementById("sequence");
  const ctx = canvas.getContext("2d", { alpha: false });
  const title = document.getElementById("storyTitle");
  const textNode = document.getElementById("storyText");
  const fill = document.getElementById("progressFill");
  const label = document.getElementById("progressLabel");
  const stage = document.querySelector(".scroll-stage");
  const langToggle = document.getElementById("langToggle");

  const frameCount = 160;
  const frames = [];
  let currentFrame = 0;
  let currentLang = "de";
  let lastStory = -1;

  const copy = {
    tr: {
      "nav.services": "Hizmetler",
      "nav.projects": "Projeler",
      "nav.about": "Hakkımızda",
      "nav.contact": "İletişim",
      "nav.cta": "Proje Konuşalım",
      "hero.scroll": "Kaydır",
      "services.kicker": "WERBUNDO DÜNYASI",
      "services.title": "Üç uzmanlık alanı. Tek ekip.",
      "services.intro": "İhtiyacınıza göre bir alana girin ya da hepsini tek projede birleştirin.",
      "services.print.type": "ÜRETİM & UYGULAMA",
      "services.print.desc": "Tabela, folyo, baskı, promosyon, araç kaplama ve uygulama.",
      "services.print.tag1": "Tabela",
      "services.print.tag2": "Folyo",
      "services.print.tag3": "Baskı",
      "services.gastro.type": "MEKAN & ROLLOUT",
      "services.gastro.desc": "Gastro markaları için konsept, Ladenbau, franchise ve rollout.",
      "services.gastro.tag1": "Ladenbau",
      "services.gastro.tag2": "Franchise",
      "services.gastro.tag3": "Rollout",
      "services.digital.type": "CREATIVE & DIGITAL",
      "services.digital.desc": "Branding, grafik, video, sosyal medya, web ve online marketing.",
      "services.digital.tag1": "Branding",
      "services.digital.tag2": "Social",
      "services.digital.tag3": "Web",
      "services.explore": "Alanı keşfet",
      "work.title": "Tasarımdan uygulamaya tek sistem.",
      "work.placeholder": "Portfolio / proje görselleri burada başlayacak.",
      "about.title": "Üretim Almanya'da. Creative iki şehirde tek ekip.",
      "about.wesseling": "Merkez, atölye, baskı, üretim, montaj ve Almanya geneli uygulama.",
      "about.izmir": "Grafik, video, sosyal medya, web, branding ve dijital üretim.",
      "footer.question": "Bir fikriniz mi var?",
      "footer.cta": "Birlikte hayata geçirelim ↗",
      "footer.locations": "Wesseling · İzmir · Almanya geneli"
    },
    de: {
      "nav.services": "Leistungen",
      "nav.projects": "Projekte",
      "nav.about": "Über uns",
      "nav.contact": "Kontakt",
      "nav.cta": "Projekt besprechen",
      "hero.scroll": "Scrollen",
      "services.kicker": "DIE WELT VON WERBUNDO",
      "services.title": "Drei Kompetenzfelder. Ein Team.",
      "services.intro": "Wählen Sie den passenden Bereich – oder verbinden Sie alle Leistungen in einem Projekt.",
      "services.print.type": "PRODUKTION & UMSETZUNG",
      "services.print.desc": "Werbetechnik, Folierung, Druck, Promotion, Fahrzeugbeschriftung und Montage.",
      "services.print.tag1": "Werbetechnik",
      "services.print.tag2": "Folierung",
      "services.print.tag3": "Druck",
      "services.gastro.type": "RAUM & ROLLOUT",
      "services.gastro.desc": "Konzept, Ladenbau, Franchise-Support und Rollout für Gastro-Marken.",
      "services.gastro.tag1": "Ladenbau",
      "services.gastro.tag2": "Franchise",
      "services.gastro.tag3": "Rollout",
      "services.digital.type": "CREATIVE & DIGITAL",
      "services.digital.desc": "Branding, Grafik, Video, Social Media, Webdesign und Online-Marketing.",
      "services.digital.tag1": "Branding",
      "services.digital.tag2": "Social",
      "services.digital.tag3": "Web",
      "services.explore": "Bereich entdecken",
      "work.title": "Von der Idee bis zur Umsetzung. Ein System.",
      "work.placeholder": "Hier beginnen später Portfolio und Projekt-Cases.",
      "about.title": "Produktion in Deutschland. Creative Power aus zwei Standorten.",
      "about.wesseling": "Zentrale, Werkstatt, Druck, Produktion, Montage und deutschlandweite Umsetzung.",
      "about.izmir": "Grafik, Video, Social Media, Web, Branding und digitale Produktion.",
      "footer.question": "Sie haben eine Idee?",
      "footer.cta": "Lassen Sie uns daraus Realität machen ↗",
      "footer.locations": "Wesseling · İzmir · deutschlandweit"
    }
  };

  const stories = {
    tr: [
      { at: 0.00, title: "Her şey bir fikirle başlar.", text: "Fikri tasarlar, üretir, gerçek dünyaya taşır ve dijitalde büyütürüz." },
      { at: 0.22, title: "Fikre kimlik kazandırıyoruz.", text: "Markanın karakterini, görsel dilini ve yaratıcı yönünü oluşturuyoruz." },
      { at: 0.43, title: "Markaları görünür hale getiriyoruz.", text: "Baskı, tabela, folyo ve üretim gücüyle tasarımı fiziksel dünyaya taşıyoruz." },
      { at: 0.65, title: "Markayı mekana taşıyoruz.", text: "Ladenbau, franchise rollout ve montajla gerçek bir marka deneyimine dönüştürüyoruz." },
      { at: 0.84, title: "Dijitalde büyütüyoruz.", text: "Sosyal medya, video, web ve online marketing ile yolculuğu dijitalde sürdürüyoruz." }
    ],
    de: [
      { at: 0.00, title: "Alles beginnt mit einer Idee.", text: "Wir gestalten, produzieren und bringen Marken in die reale und digitale Welt." },
      { at: 0.22, title: "Wir geben Ideen eine Identität.", text: "Wir entwickeln Charakter, visuelle Sprache und kreative Richtung einer Marke." },
      { at: 0.43, title: "Wir machen Marken sichtbar.", text: "Mit Werbetechnik, Druck, Folierung und eigener Produktion wird Design physisch erlebbar." },
      { at: 0.65, title: "Wir bringen Marken in den Raum.", text: "Mit Ladenbau, Franchise-Rollout und Montage entstehen echte Markenerlebnisse." },
      { at: 0.84, title: "Und wir lassen sie digital wachsen.", text: "Social Media, Video, Web und Online-Marketing führen die Markenreise digital weiter." }
    ]
  };

  const pad = n => String(n).padStart(3, "0");
  const frameDir = window.matchMedia("(min-width: 901px)").matches ? "./assets/frames-hq" : "./assets/frames";

  function loadFrame(i) {
    return new Promise(resolve => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => { frames[i] = img; resolve(); };
      img.onerror = resolve;
      img.src = frameDir + "/frame_" + pad(i + 1) + ".webp";
    });
  }

  function drawCover(img) {
    if (!img) return;
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;
    const scale = Math.max(cw / iw, ch / ih);
    const w = iw * scale;
    const h = ih * scale;

    ctx.fillStyle = "#090a0d";
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.8);
    canvas.width = Math.round(innerWidth * dpr);
    canvas.height = Math.round(innerHeight * dpr);
    drawCover(frames[currentFrame]);
  }

  function getProgress() {
    const rect = stage.getBoundingClientRect();
    const max = stage.offsetHeight - innerHeight;
    return Math.max(0, Math.min(1, -rect.top / max));
  }

  function storyIndex(progress) {
    const story = stories[currentLang];
    let idx = 0;
    for (let i = 0; i < story.length; i++) {
      if (progress >= story[i].at) idx = i;
    }
    return idx;
  }

  function updateStory(force = false) {
    const p = getProgress();
    const idx = storyIndex(p);
    const story = stories[currentLang][idx];

    if (force || idx !== lastStory) {
      lastStory = idx;
      title.animate(
        [{ opacity: .18, transform: "translateY(10px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 420, easing: "ease-out" }
      );
      textNode.animate([{ opacity: .18 }, { opacity: 1 }], { duration: 420, easing: "ease-out" });
      title.textContent = story.title;
      textNode.textContent = story.text;
    }

    label.textContent = "0" + (idx + 1) + " / 05";
  }

  function applyLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (copy[lang][key]) el.textContent = copy[lang][key];
    });
    langToggle.textContent = lang === "tr" ? "DE" : "TR";
    langToggle.setAttribute("aria-label", lang === "tr" ? "Almancaya geç" : "Türkçeye geç");
    updateStory(true);
  }

  function update() {
    const p = getProgress();
    const nextFrame = Math.min(frameCount - 1, Math.round(p * (frameCount - 1)));

    if (nextFrame !== currentFrame && frames[nextFrame]) {
      currentFrame = nextFrame;
      drawCover(frames[currentFrame]);
    }

    fill.style.width = (p * 100).toFixed(2) + "%";
    updateStory();
  }

  async function init() {
    resize();

    await loadFrame(0);
    drawCover(frames[0]);

    const initial = [];
    for (let i = 1; i < Math.min(18, frameCount); i++) initial.push(loadFrame(i));
    await Promise.all(initial);

    let index = 18;
    const pump = () => {
      if (index >= frameCount) return;
      const batch = [];
      for (let j = 0; j < 10 && index < frameCount; j++, index++) {
        batch.push(loadFrame(index));
      }
      Promise.all(batch).then(() => setTimeout(pump, 40));
    };
    pump();

    langToggle.addEventListener("click", () => {
      applyLanguage(currentLang === "tr" ? "de" : "tr");
    });

    addEventListener("resize", resize, { passive: true });
    addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });

    applyLanguage("de");
    update();
  }

  init();
})();