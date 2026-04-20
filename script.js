/* ---------------- REVEAL ---------------- */
const revealItems = document.querySelectorAll(".reveal");

if (revealItems.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

/* ---------------- TITLE FONT CYCLE ---------------- */
const cyclingTitle = document.getElementById("cyclingTitle");

if (cyclingTitle) {
  const titleFonts = [
    "title-font-1",
    "title-font-2",
    "title-font-3",
    "title-font-4",
  ];

  let currentFontIndex = 0;
  cyclingTitle.classList.add(titleFonts[currentFontIndex]);

  setInterval(() => {
    cyclingTitle.classList.remove(titleFonts[currentFontIndex]);
    currentFontIndex = (currentFontIndex + 1) % titleFonts.length;
    cyclingTitle.classList.add(titleFonts[currentFontIndex]);
    cyclingTitle.classList.add("font-switch");

    setTimeout(() => {
      cyclingTitle.classList.remove("font-switch");
    }, 180);
  }, 1800);
}

/* ---------------- BOOK MODAL ---------------- */
const bookTriggers = document.querySelectorAll(".book-trigger");
const bookModal = document.getElementById("bookModal");
const bookOverlay = document.getElementById("bookOverlay");
const bookClose = document.getElementById("bookClose");
const bookImage = document.getElementById("bookImage");
const pageCounter = document.getElementById("pageCounter");
const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");
const bookPageShell = document.getElementById("bookPageShell");
const bookIntroPage = document.getElementById("bookIntroPage");

const portfolioPages = [
  "images/portfolio-1.png",
  "images/portfolio-2.png",
  "images/portfolio-3.png",
  "images/portfolio-4.png",
  "images/portfolio-5.png",
  "images/portfolio-6.png",
  "images/portfolio-7.png",
  "images/portfolio-8.png",
  "images/portfolio-9.png",
];

let currentBookPage = -1;

function playBookFlip(direction) {
  if (!bookPageShell) return;

  bookPageShell.classList.remove("flip-next", "flip-prev");
  void bookPageShell.offsetWidth;

  if (direction === "next") {
    bookPageShell.classList.add("flip-next");
  } else {
    bookPageShell.classList.add("flip-prev");
  }
}

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
  bookImage.alt = `Portfolio page ${currentBookPage + 1}`;
  pageCounter.textContent = `${currentBookPage + 1} / ${portfolioPages.length}`;
}

function openBook() {
  if (!bookModal) return;

  currentBookPage = -1;
  renderBookPage();

  bookModal.classList.add("active");
  bookModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeBookModal() {
  if (!bookModal) return;

  bookModal.classList.remove("active");
  bookModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function goNextBookPage() {
  if (currentBookPage < portfolioPages.length - 1) {
    currentBookPage += 1;
    playBookFlip("next");
    renderBookPage();
  }
}

function goPrevBookPage() {
  if (currentBookPage > -1) {
    currentBookPage -= 1;
    playBookFlip("prev");
    renderBookPage();
  }
}

bookTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openBook();
  });
});

if (bookClose) {
  bookClose.addEventListener("click", closeBookModal);
}

if (bookOverlay) {
  bookOverlay.addEventListener("click", closeBookModal);
}

if (nextPage) {
  nextPage.addEventListener("click", goNextBookPage);
}

if (prevPage) {
  prevPage.addEventListener("click", goPrevBookPage);
}

/* ---------------- PROJECT MODAL ---------------- */
const projectTriggers = document.querySelectorAll(".project-trigger");
const projectModal = document.getElementById("projectModal");
const projectOverlay = document.getElementById("projectOverlay");
const projectClose = document.getElementById("projectClose");
const projectImg = document.getElementById("projectImg");
const projectTitle = document.getElementById("projectTitle");
const projectText = document.getElementById("projectText");
const projectSingleArea = document.getElementById("projectSingleArea");
const projectGalleryArea = document.getElementById("projectGalleryArea");
const projectGalleryGrid = document.getElementById("projectGalleryGrid");

function openProjectModal(card) {
  if (
    !projectModal ||
    !projectTitle ||
    !projectText ||
    !projectSingleArea ||
    !projectGalleryArea ||
    !projectGalleryGrid ||
    !projectImg
  ) {
    return;
  }

  const layout = card.dataset.layout || "single";
  const imageList = (card.dataset.images || "")
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  projectTitle.textContent = card.dataset.title || "";
  projectText.textContent = card.dataset.text || "";

  if (layout === "gallery") {
    projectSingleArea.style.display = "none";
    projectGalleryArea.style.display = "block";
    projectGalleryGrid.innerHTML = "";

    imageList.forEach((src, index) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = `${card.dataset.title || "Project"} image ${index + 1}`;
      projectGalleryGrid.appendChild(img);
    });
  } else {
    projectGalleryArea.style.display = "none";
    projectSingleArea.style.display = "block";
    projectImg.src = imageList[0] || "";
    projectImg.alt = card.dataset.title || "Project preview";
  }

  projectModal.classList.add("active");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  if (!projectModal) return;

  projectModal.classList.remove("active");
  projectModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

projectTriggers.forEach((card) => {
  card.addEventListener("click", () => {
    openProjectModal(card);
  });
});

if (projectClose) {
  projectClose.addEventListener("click", closeProjectModal);
}

if (projectOverlay) {
  projectOverlay.addEventListener("click", closeProjectModal);
}

/* ---------------- PORTRAIT NOTE TOGGLE ---------------- */
const portraitCard = document.getElementById("portraitCard");

if (portraitCard) {
  portraitCard.addEventListener("click", () => {
    portraitCard.classList.toggle("active");
  });
}

/* ---------------- KEYBOARD SUPPORT ---------------- */
document.addEventListener("keydown", (event) => {
  if (bookModal && bookModal.classList.contains("active")) {
    if (event.key === "Escape") closeBookModal();
    if (event.key === "ArrowRight") goNextBookPage();
    if (event.key === "ArrowLeft") goPrevBookPage();
  }

  if (projectModal && projectModal.classList.contains("active")) {
    if (event.key === "Escape") closeProjectModal();
  }
});
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. REVEAL & TITLE CYCLE (Aynı Kalıyor)
  const revealItems = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("visible"); });
  }, { threshold: 0.12 });
  revealItems.forEach(item => revealObserver.observe(item));

  // 2. LIGHTBOX MANTIĞI
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');

  const openLightbox = (src) => {
    lightboxImg.src = src;
    lightbox.classList.add('active');
  };

  lightbox.addEventListener('click', () => lightbox.classList.remove('active'));

  // 3. PROJECT MODAL & GALLERY
  const projectTriggers = document.querySelectorAll(".project-trigger");
  const projectModal = document.getElementById("projectModal");
  const projectGalleryGrid = document.getElementById("projectGalleryGrid");

  projectTriggers.forEach(card => {
    card.addEventListener('click', () => {
      const { title, text, layout, images } = card.dataset;
      const imgList = images.split(',').map(s => s.trim());

      document.getElementById("projectTitle").textContent = title;
      document.getElementById("projectText").textContent = text;

      if (layout === "gallery") {
        document.getElementById("projectSingleArea").style.display = "none";
        document.getElementById("projectGalleryArea").style.display = "block";
        projectGalleryGrid.innerHTML = "";
        imgList.forEach(src => {
          const img = document.createElement("img");
          img.src = src;
          img.loading = "lazy";
          img.addEventListener('click', () => openLightbox(src)); // Tıklayınca Büyüt
          projectGalleryGrid.appendChild(img);
        });
      } else {
        document.getElementById("projectGalleryArea").style.display = "none";
        document.getElementById("projectSingleArea").style.display = "block";
        const singleImg = document.getElementById("projectImg");
        singleImg.src = imgList[0];
        singleImg.style.cursor = "zoom-in";
        singleImg.onclick = () => openLightbox(imgList[0]);
      }
      projectModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // 4. BOOK MODAL (Aynı Kalıyor)
  // ... (Daha önce yazdığımız Book Modal kodlarını buraya ekleyebilirsin) ...

  // KAPATMA TUŞLARI
  document.getElementById("projectClose").addEventListener('click', () => {
    projectModal.classList.remove("active");
    document.body.style.overflow = "";
  });
});

const jumpLinks = document.querySelectorAll('.jump-link');
const allCards = document.querySelectorAll('.study-card');

jumpLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const projectId = e.target.getAttribute('data-id');
    const targetCard = allCards[projectId];
    
    if (targetCard) {
      // Eğer projen 0 (kitapçık) ise openBook, değilse openProjectModal çalıştır
      if (projectId === "0") {
        openBook();
      } else {
        openProjectModal(targetCard);
      }
    }
    // Menüyü kapat
    document.getElementById('projectsMenu').style.display = 'none';
    // Fareyi menüden çekince tekrar çalışması için hover stilini sıfırla
    setTimeout(() => document.getElementById('projectsMenu').style.removeProperty('display'), 500);
  });
});
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
    const next = Math.random() * (6000 - 2500) + 2500; // 2.5 - 6 sn arası
    setTimeout(() => {
      blink();
      loop();
    }, next);
  }

  loop();
});