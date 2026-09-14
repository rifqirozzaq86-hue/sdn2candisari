// =========================================================
// SCRIPT UTAMA WEBSITE SD NEGERI 2 CANDISARI
// =========================================================

// --- 1. Tombol Scroll Up ---
const scrollUpBtn = document.querySelector(".scroll-up");
if (scrollUpBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollUpBtn.classList.add("scroll-active");
    } else {
      scrollUpBtn.classList.remove("scroll-active");
    }
  });
}

// --- 2. Navbar Active Link on Scroll & Click ---
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((item) => item.classList.remove("active"));
    this.classList.add("active");
  });
});

window.addEventListener("scroll", () => {
  let currentSection = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");
    }
  });
});

// =========================================================
// 3. SINKRONISASI DATA DARI PANEL ADMINISTRATOR (localStorage)
// =========================================================

function loadAdminData() {
  const saved = localStorage.getItem("sdn2_admin_data");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Gagal membaca data dari panel admin", e);
    }
  }
  return null;
}

function syncWebsiteContent() {
  const db = loadAdminData();
  if (!db) return;

  // A. Sinkronisasi Berita Terbaru
  if (db.berita && Array.isArray(db.berita)) {
    const newsGrid = document.querySelector(".news-grid");
    if (newsGrid && db.berita.length > 0) {
      newsGrid.innerHTML = "";
      db.berita.forEach((item) => {
        const article = document.createElement("article");
        article.className = "news-card";
        article.innerHTML = `
          <div class="news-img-box">
            <img src="${item.gambar}" alt="${item.judul}" class="news-img" onerror="this.src='assets/images/perpus.jpg'" />
          </div>
          <div class="news-content">
            <div class="news-date">
              <span class="calendar-icon"></span>
              ${formatDateIndo(item.tanggal)}
            </div>
            <h3 class="news-card-title">${item.judul}</h3>
            <p class="news-card-desc">${item.ringkasan}</p>
            <a href="#" class="news-link">Selengkapnya &rarr;</a>
          </div>
        `;
        newsGrid.appendChild(article);
      });
    }
  }

  // B. Sinkronisasi Data Guru & Tenaga Pendidik
  if (db.guru && Array.isArray(db.guru)) {
    const guruBox = document.querySelector(".guru-box");
    if (guruBox && db.guru.length > 0) {
      guruBox.innerHTML = "";
      db.guru.forEach((item) => {
        const card = document.createElement("div");
        card.className = "guru-card";
        card.innerHTML = `
          <img src="${item.gambar}" alt="${item.nama}" onerror="this.src='assets/images/Bapak Seno.jpg'" />
          <div class="desk-guru">
            <h3>${item.nama}</h3>
            <span>${item.jabatan}</span>
            <p>NIP: ${item.nip || "-"}</p>
          </div>
        `;
        guruBox.appendChild(card);
      });
    }
  }

  // C. Sinkronisasi Galeri Foto
  if (db.galeri && Array.isArray(db.galeri)) {
    const galleryGrid = document.querySelector(".gallery-grid");
    if (galleryGrid && db.galeri.length > 0) {
      galleryGrid.innerHTML = "";
      db.galeri.forEach((item) => {
        const div = document.createElement("div");
        div.className = "gallery-item";
        div.innerHTML = `
          <img src="${item.gambar}" alt="${item.judul}" onerror="this.src='assets/images/masjid.jpg'" />
        `;
        galleryGrid.appendChild(div);
      });
    }
  }

  // D. Sinkronisasi PPDB Online
  if (db.ppdb) {
    const ppdbDesc = document.querySelector(".ppdb-main-desc");
    if (ppdbDesc && db.ppdb.deskripsi) {
      ppdbDesc.textContent = db.ppdb.deskripsi;
    }

    const ppdbBtn = document.querySelector(".btn-ppdb-register-cta");
    if (ppdbBtn && db.ppdb.linkForm) {
      ppdbBtn.setAttribute("href", db.ppdb.linkForm);
    }
  }

  // E. Sinkronisasi Profil Sekolah & Sambutan
  if (db.profil) {
    const profilTable = document.querySelector(".profil-table tbody");
    if (profilTable) {
      const rows = profilTable.querySelectorAll("tr");
      rows.forEach((row) => {
        const tdLabel = row.cells[0]?.textContent.trim();
        if (tdLabel === "Nama Sekolah" && db.profil.namaSekolah) row.cells[2].textContent = db.profil.namaSekolah;
        if (tdLabel === "Kepala Sekolah" && db.profil.kepalaSekolah) row.cells[2].textContent = db.profil.kepalaSekolah;
        if (tdLabel === "NPSN" && db.profil.npsn) row.cells[2].textContent = db.profil.npsn;
        if (tdLabel === "Status" && db.profil.statusSekolah) row.cells[2].textContent = db.profil.statusSekolah;
        if (tdLabel === "Akreditasi" && db.profil.akreditasi) row.cells[2].textContent = db.profil.akreditasi;
      });
    }

    const namaKepalaEl = document.querySelector(".nama-kepala span");
    if (namaKepalaEl && db.profil.kepalaSekolah) {
      namaKepalaEl.textContent = db.profil.kepalaSekolah;
    }
  }

  // F. Sinkronisasi Kontak
  if (db.kontak) {
    const contactItems = document.querySelectorAll(".footer-contact .contact-item span");
    if (contactItems.length >= 3) {
      if (db.kontak.alamatLengkap) contactItems[0].textContent = db.kontak.alamatLengkap;
      if (db.kontak.emailUtama) contactItems[1].textContent = db.kontak.emailUtama;
      if (db.kontak.noTelepon) contactItems[2].textContent = db.kontak.noTelepon;
    }
  }
}

function formatDateIndo(dateString) {
  if (!dateString) return "";
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  try {
    const parts = dateString.split("-");
    if (parts.length === 3) {
      const day = parseInt(parts[2], 10);
      const month = months[parseInt(parts[1], 10) - 1];
      const year = parts[0];
      return `${day < 10 ? "0" + day : day} ${month} ${year}`;
    }
  } catch (e) {}
  return dateString;
}

// Jalankan sinkronisasi saat dokumen dimuat
document.addEventListener("DOMContentLoaded", () => {
  syncWebsiteContent();
});

// Dengarkan perubahan data jika admin mengupdate di tab lain
window.addEventListener("storage", (e) => {
  if (e.key === "sdn2_admin_data") {
    syncWebsiteContent();
  }
});
