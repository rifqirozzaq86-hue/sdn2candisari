// ==========================================
// SCROLL UP BUTTON
// ==========================================

const scrollUpBtn = document.querySelector(".scroll-up");

window.addEventListener("scroll", () => {
  // Tombol muncul setelah scroll lebih dari 500px
  if (window.scrollY > 500) {
    scrollUpBtn.classList.add("scroll-active");
  } else {
    scrollUpBtn.classList.remove("scroll-active");
  }
});

// ==========================================
// NAVBAR ACTIVE
// ==========================================

const navLinks = document.querySelectorAll(".nav-links a");

// Mengambil section yang memiliki ID
const sections = document.querySelectorAll("section[id]");

// ==========================================
// ACTIVE SAAT MENU DIKLIK
// ==========================================

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    // Hapus active dari semua menu
    navLinks.forEach((item) => {
      item.classList.remove("active");
    });

    // Tambahkan active ke menu yang diklik
    this.classList.add("active");
  });
});

// ==========================================
// ACTIVE OTOMATIS SAAT SCROLL
// ==========================================

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  // Mengubah active navbar
  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");
    }
  });
});
