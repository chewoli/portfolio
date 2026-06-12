// ==========================================================================
// 🎡 1. ANA SAYFA - MOVING STUDIES SONSUZ LOOP & BUTON MOTORU
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-carousel-btn");
  const stripTrack = document.querySelector(".strip-track");

  if (stripTrack) {
    // 🎯 SONSUZ LOOP MOTORU: Kartları arkasına otomatik klonlayarak akışı sonsuzlaştırıyoruz
    const originalCards = Array.from(stripTrack.children);
    originalCards.forEach(card => {
      const clonedCard = card.cloneNode(true);
      stripTrack.appendChild(clonedCard);
    });

    // --- BUTTON KONTROL MOTORU ---
    if (toggleBtn) {
      let isPlaying = true;

      toggleBtn.addEventListener("click", () => {
        isPlaying = !isPlaying;

        if (!isPlaying) {
          // Durdurma moduna al
          stripTrack.classList.add("is-paused");
          toggleBtn.querySelector(".btn-icon").textContent = "▶";
          toggleBtn.querySelector(".btn-text").textContent = "CLICK TO PLAY";
        } else {
          // Devam ettir
          stripTrack.classList.remove("is-paused");
          toggleBtn.querySelector(".btn-icon").textContent = "⏸";
          toggleBtn.querySelector(".btn-text").textContent = "CLICK TO STOP";
        }
      });
    }
  }
});

// ==========================================================================
// 🎮 2. INTRO / SPLASH SCREEN SİSTEMİ (AKILLI OTURUM HAFIZALI)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  const introSplash = document.getElementById("splash-screen");

  if (introSplash) {
    // 🎯 OTURUM HAFIZASI KONTROLÜ: Kullanıcı giriş ekranını bu sekmede daha önce geçti mi?
    const isSplashPassed = sessionStorage.getItem("splashPassed");

    if (isSplashPassed === "true") {
      // Eğer daha önce tıklandıysa, yenilemede veya sayfa geçişlerinde HİÇ GÖSTERME
      introSplash.style.display = "none";
      introSplash.remove(); 
    } else {
      // Sekme ilk defa açılıyorsa introyu normal çalıştır
      let isTransitioning = false;

      introSplash.addEventListener("click", () => {
        if (isTransitioning) return;
        isTransitioning = true;

        // 🎯 Hafızaya "giriş yapıldı" notunu düşüyoruz
        sessionStorage.setItem("splashPassed", "true");

        introSplash.classList.add("fade-out");

        // Animasyon bittikten sonra DOM'dan tamamen kaldırıp ana siteyi özgür bırakıyoruz
        setTimeout(() => {
          introSplash.style.display = "none";
          introSplash.remove();
        }, 500);
      });
    }
  }
});

// ==========================================================================
// 👁️ 3. ABOUT SAYFASI - PORTRE GÖZ KIRPMA DÖNGÜSÜ
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('portraitCard');
  if (!card) return;

  function blink() {
    card.classList.add('blinking');
    setTimeout(() => {
      card.classList.remove('blinking');
    }, 150); // Gözlerin kapalı kalma süresi
  }

  function loop() {
    const next = Math.random() * (6000 - 2500) + 2500; // 2.5 ile 6 saniye arası rastgele
    setTimeout(() => {
      blink();
      loop();
    }, next);
  }

  loop();
});

// ==========================================================================
// 🎵 4. ABOUT SAYFASI - KESİNTİSİZ 13'LÜ SES HİKAYESİ MOTORU (RAM CACHE)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  const portraitCard = document.getElementById("portraitCard");

  if (portraitCard) {
    // 🎯 Ses dosyalarının .m4a formatındaki sıralı tam listesi
    const audioSources = [
      "images/voice1.m4a", "images/voice2.m4a", "images/voice3.m4a", 
      "images/voice4.m4a", "images/voice5.m4a", "images/voice6.m4a", 
      "images/voice7.m4a", "images/voice8.m4a", "images/voice9.m4a", 
      "images/voice10.m4a", "images/voice11.m4a", "images/voice12.m4a", 
      "images/voice13.m4a"
    ];

    // 🎯 TARAYICIYI ZORLAMA: Sesleri doğrudan saf RAM belleğe önceden yüklüyoruz.
    const voices = audioSources.map(src => {
      const audio = new Audio(src);
      audio.preload = "auto";
      return audio;
    });

    let currentVoiceIndex = 0; // Replik sayacı

    portraitCard.addEventListener("click", (e) => {
      // 1. Çalan tüm sesleri anında sustur ve sıfırla
      voices.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });

      // 2. Sıradaki m4a sesini oynat
      const playPromise = voices[currentVoiceIndex].play();

      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Ses çalma tarayıcı korumasına takıldı:", error);
        });
      }

      // 3. Sayacı bir artır, 13 bittiğinde 0'a çekip en başa ("Don't bother me") döndür
      currentVoiceIndex = (currentVoiceIndex + 1) % voices.length;
    });
  }
});

// ==========================================================================
// 🏢 5. MODAL, REVEAL, LIGHTBOX, BOOKLET & JUMP LINKS MASTER MOTORU
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  
  /* ---------------- REVEAL SİSTEMİ ---------------- */
  const revealItems = document.querySelectorAll(".reveal");
  if (revealItems.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => { 
        if (entry.isIntersecting) entry.target.classList.add("visible"); 
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => revealObserver.observe(item));
  }

  /* ---------------- TITLE FONT CYCLE ---------------- */
  const cyclingTitle = document.getElementById("cyclingTitle");
  if (cyclingTitle) {
    const titleFonts = ["title-font-1", "title-font-2", "title-font-3", "title-font-4"];
    let currentFontIndex = 0;
    cyclingTitle.classList.add(titleFonts[currentFontIndex]);

    setInterval(() => {
      cyclingTitle.classList.remove(titleFonts[currentFontIndex]);
      currentFontIndex = (currentFontIndex + 1) % titleFonts.length;
      cyclingTitle.classList.add(titleFonts[currentFontIndex]);
      cyclingTitle.classList.add("font-switch");

      setTimeout(() => { cyclingTitle.classList.remove("font-switch"); }, 180);
    }, 1800);
  }

  /* ---------------- LIGHTBOX (BÜYÜTME) MANTIĞI ---------------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');

  const openLightbox = (src) => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightbox.classList.add('active');
  };

  if (lightbox) {
    lightbox.addEventListener('click', () => lightbox.classList.remove('active'));
  }

  /* ---------------- PROJECT MODAL & GALLERY SİSTEMİ ---------------- */
  const projectTriggers = document.querySelectorAll(".project-trigger");
  const projectModal = document.getElementById("projectModal");
  const projectGalleryGrid = document.getElementById("projectGalleryGrid");

  window.openProjectModal = function(card) {
    const projectTitle = document.getElementById("projectTitle");
    const projectText = document.getElementById("projectText");
    const projectSingleArea = document.getElementById("projectSingleArea");
    const projectGalleryArea = document.getElementById("projectGalleryArea");
    const projectImg = document.getElementById("projectImg");

    if (!projectModal || !projectTitle || !projectText) return;

    const title = card.dataset.title;
    const text = card.dataset.text;
    const layout = card.dataset.layout;
    const images = card.dataset.images;
    const imgList = (images || "").split(',').map(s => s.trim()).filter(s => s.length > 0);

    projectTitle.textContent = title || "";
    projectText.textContent = text || "";

    if (layout === "gallery" && projectGalleryGrid && projectGalleryArea && projectSingleArea) {
      projectSingleArea.style.display = "none";
      projectGalleryArea.style.display = "block";
      projectGalleryGrid.innerHTML = "";
      imgList.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        img.loading = "lazy";
        img.addEventListener('click', () => openLightbox(src));
        projectGalleryGrid.appendChild(img);
      });
    } else if (projectSingleArea && projectGalleryArea && projectImg) {
      projectGalleryArea.style.display = "none";
      projectSingleArea.style.display = "block";
      projectImg.src = imgList[0] || "";
      projectImg.style.cursor = "zoom-in";
      projectImg.onclick = () => openLightbox(imgList[0]);
    }
    projectModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  projectTriggers.forEach(card => {
    card.addEventListener('click', () => openProjectModal(card));
  });

  const projectClose = document.getElementById("projectClose");
  if (projectClose && projectModal) {
    projectClose.addEventListener('click', () => {
      projectModal.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  /* ---------------- 🎯 KUSURSUZ KİLİTLENMİŞ BOOKLET MODAL SİSTEMİ ---------------- */
  const bookModal = document.getElementById("bookModal");
  const bookImage = document.getElementById("bookImage");
  const pageCounter = document.getElementById("pageCounter");
  const bookIntroPage = document.getElementById("bookIntroPage");
  const bookPageShell = document.getElementById("bookPageShell");
  const bookTriggers = document.querySelectorAll(".book-trigger");

  let portfolioPages = [
    "images/portfolio-1.png", "images/portfolio-2.png", "images/portfolio-3.png",
    "images/portfolio-4.png", "images/portfolio-5.png", "images/portfolio-6.png",
    "images/portfolio-7.png", "images/portfolio-8.png", "images/portfolio-9.png"
  ];
  let currentBookPage = -1;

  function renderBookPage() {
    if (!bookImage || !pageCounter || !bookIntroPage) return;
    if (currentBookPage === -1) {
      bookIntroPage.classList.remove("book-page-hidden");
      bookImage.classList.add("book-image-hidden");
      pageCounter.textContent = "Intro";
      return;
    }
    bookIntroPage.classList.add("book-page-hidden");
    bookImage.classList.remove("book-image-hidden");
    bookImage.src = portfolioPages[currentBookPage];
    pageCounter.textContent = `${currentBookPage + 1} / ${portfolioPages.length}`;
  }

  window.openBook = function(card) {
    if (!bookModal) return;
    
    // Eğer tetiklenen kartın üzerinde özel data-images varsa dinamik diziyi güncelle
    if (card && card.dataset && card.dataset.images) {
      portfolioPages = card.dataset.images.split(',').map(s => s.trim()).filter(s => s.length > 0);
    }
    
    currentBookPage = -1;
    renderBookPage();
    bookModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  bookTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => { 
      e.preventDefault(); 
      e.stopPropagation(); // Diğer tıklama olaylarıyla çakışmayı önler
      openBook(trigger); 
    });
  });

  window.goNextBookPage = function() {
    if (currentBookPage < portfolioPages.length - 1) {
      currentBookPage++;
      if (bookPageShell) { bookPageShell.className = "book-page-shell flip-next"; void bookPageShell.offsetWidth; }
      renderBookPage();
    }
  }

  window.goPrevBookPage = function() {
    if (currentBookPage > -1) {
      currentBookPage--;
      if (bookPageShell) { bookPageShell.className = "book-page-shell flip-prev"; void bookPageShell.offsetWidth; }
      renderBookPage();
    }
  }
const prevPageBtn = document.getElementById("prevPage");
const nextPageBtn = document.getElementById("nextPage");

if (nextPageBtn) {
  nextPageBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.goNextBookPage(); 
  });
}

if (prevPageBtn) {
  prevPageBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.goPrevBookPage(); 
  });
}
  const bookClose = document.getElementById("bookClose");
  if (bookClose && bookModal) {
    bookClose.addEventListener('click', () => { 
      bookModal.classList.remove("active"); 
      document.body.style.overflow = ""; 
    });
  }

  /* ---------------- JUMP LINKS MENU MOTORU ---------------- */
  const jumpLinks = document.querySelectorAll('.jump-link');

  jumpLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = e.target.getAttribute('data-id');
      
      // 🎯 "ADI YOK" Değişken Hatasını Kökten Sildik!
      const currentCards = document.querySelectorAll('.study-card');
      const targetCard = currentCards[projectId];
      
      if (projectId === "0") {
        openBook(targetCard);
      } else if (targetCard) {
        openProjectModal(targetCard);
      }
      
      const menu = document.getElementById('projectsMenu');
      if (menu) {
        menu.style.display = 'none';
        setTimeout(() => menu.style.removeProperty('display'), 500);
      }
    });
  });

  /* ---------------- KLAVYE DESTEĞİ ---------------- */
  document.addEventListener("keydown", (event) => {
    if (bookModal && bookModal.classList.contains("active")) {
      if (event.key === "Escape") { bookModal.classList.remove("active"); document.body.style.overflow = ""; }
      if (event.key === "ArrowRight") goNextBookPage();
      if (event.key === "ArrowLeft") goPrevBookPage();
    }
    if (projectModal && projectModal.classList.contains("active")) {
      if (event.key === "Escape") { projectModal.classList.remove("active"); document.body.style.overflow = ""; }
    }
  });
});
