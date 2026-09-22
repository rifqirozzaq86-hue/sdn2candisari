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

// --- 2. Animasi Smooth Scroll untuk Navigasi (Beranda, Profil, Sejarah, Visi Misi, dll) ---
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");

// Fungsi animasi scroll halus dengan easing
function smoothScrollTo(targetElement, duration = 700) {
  if (!targetElement) return;
  const navbar = document.querySelector(".navbar");
  const navOffset = navbar ? navbar.offsetHeight : 80;
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      window.scrollTo(0, targetPosition);
    }
  }

  // Easing cubic in-out untuk animasi lembut & mulus
  function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
  }

  requestAnimationFrame(animation);
}

// Pasang animasi scroll pada semua tautan navigasi dan anchor link
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      e.preventDefault();
      smoothScrollTo(targetSection, 750);

      // Tandai link aktif
      navLinks.forEach((item) => item.classList.remove("active"));
      if (this.closest(".nav-links")) {
        this.classList.add("active");
      }

      // Perbarui hash URL dengan aman
      if (window.history && window.history.pushState) {
        window.history.pushState(null, null, targetId);
      }
    }
  });
});

// Update link aktif saat pengguna menggulir layar
window.addEventListener("scroll", () => {
  let currentSection = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
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

// --- 3. Dropdown Menu Profil ---
(function initDropdowns() {
  const dropdowns = document.querySelectorAll(".nav-dropdown");

  dropdowns.forEach((dropdown) => {
    const btn = dropdown.querySelector(".nav-dropdown-btn");

    if (!btn) return;

    // Toggle saat tombol diklik
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains("open");
      // Tutup semua dropdown lain
      dropdowns.forEach((d) => d.classList.remove("open"));
      if (!isOpen) dropdown.classList.add("open");
      btn.setAttribute("aria-expanded", !isOpen);
    });

    // Klik item di dalam dropdown → tutup dropdown & scroll halus
    const items = dropdown.querySelectorAll(".nav-dropdown-item");
    items.forEach((item) => {
      item.addEventListener("click", function () {
        dropdown.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      });
    });
  });

  // Klik di luar dropdown → tutup semua
  document.addEventListener("click", () => {
    dropdowns.forEach((d) => {
      d.classList.remove("open");
      const b = d.querySelector(".nav-dropdown-btn");
      if (b) b.setAttribute("aria-expanded", "false");
    });
  });

  // Tekan Escape → tutup semua
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      dropdowns.forEach((d) => {
        d.classList.remove("open");
        const b = d.querySelector(".nav-dropdown-btn");
        if (b) b.setAttribute("aria-expanded", "false");
      });
    }
  });
})();

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
    const beritaGrid = document.querySelector(".berita-grid, .news-grid");
    if (beritaGrid && db.berita.length > 0) {
      beritaGrid.innerHTML = "";
      db.berita.forEach((item) => {
        const article = document.createElement("article");
        article.className = "berita-card";
        article.innerHTML = `
          <div class="berita-img-wrapper">
            <img src="${item.gambar}" alt="${item.judul}" class="berita-card-img" onerror="this.src='assets/images/perpus.jpg'" />
            <span class="berita-badge-tag"><i class="fa-solid fa-calendar-day"></i> ${formatDateIndo(item.tanggal)}</span>
          </div>
          <div class="berita-body">
            <span class="berita-kategori-chip"><i class="fa-solid fa-tag"></i> ${item.kategori || "Kegiatan"}</span>
            <h3 class="berita-card-title">${item.judul}</h3>
            <p class="berita-card-text">${item.ringkasan || ""}</p>
            <a href="#" class="berita-readmore"><i class="fa-solid fa-arrow-right"></i> Selengkapnya</a>
          </div>
        `;
        beritaGrid.appendChild(article);
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
          <div class="guru-img-wrapper">
            <img src="${item.gambar}" alt="${item.nama}" onerror="this.src='assets/images/Bapak Seno.jpg'" />
            <span class="guru-role-badge"><i class="fa-solid fa-chalkboard-user"></i> ${item.jabatan || "Tenaga Pendidik"}</span>
          </div>
          <div class="desk-guru">
            <h3>${item.nama}</h3>
            <span class="guru-jabatan-chip">${item.jabatan || "Guru Profesional"}</span>
            <p>NIP: ${item.nip || "-"}</p>
          </div>
        `;
        guruBox.appendChild(card);
      });
    }
  }

  // C. Sinkronisasi Galeri Foto
  if (db.galeri && Array.isArray(db.galeri)) {
    const galleryGrid = document.querySelector(".galeri-grid, .gallery-grid");
    if (galleryGrid && db.galeri.length > 0) {
      galleryGrid.innerHTML = "";
      db.galeri.forEach((item) => {
        const div = document.createElement("div");
        div.className = "galeri-item";
        div.innerHTML = `
          <div class="galeri-img-wrapper">
            <img src="${item.gambar}" alt="${item.judul}" onerror="this.src='assets/images/masjid.jpg'" />
            <div class="galeri-overlay">
              <span class="galeri-overlay-chip"><i class="fa-solid fa-camera"></i> ${item.kategori || item.judul || "Kegiatan"}</span>
            </div>
          </div>
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

  // E. Sinkronisasi Profil Sekolah, Sambutan & Sejarah
  if (db.profil) {
    const profilTable = document.querySelector(".profil-table tbody");
    if (profilTable) {
      const rows = profilTable.querySelectorAll("tr");
      rows.forEach((row) => {
        const tdLabel = row.cells[0]?.textContent.trim() || "";
        if (tdLabel.includes("Nama Sekolah") && db.profil.namaSekolah) row.cells[2].textContent = db.profil.namaSekolah;
        if (tdLabel.includes("Kepala Sekolah") && db.profil.kepalaSekolah) row.cells[2].textContent = db.profil.kepalaSekolah;
        if (tdLabel.includes("NPSN") && db.profil.npsn) row.cells[2].innerHTML = `<span class="data-tag">${db.profil.npsn}</span>`;
        if (tdLabel.includes("Status") && db.profil.statusSekolah) row.cells[2].innerHTML = `<span class="data-badge badge-status">${db.profil.statusSekolah}</span>`;
        if (tdLabel.includes("Akreditasi") && db.profil.akreditasi) row.cells[2].innerHTML = `<span class="data-badge badge-akreditasi">${db.profil.akreditasi}</span>`;
        if (tdLabel.includes("Jumlah Siswa")) {
          const totalMurid = db.siswa?.totalMurid ?? db.profil.jumlahMurid ?? 70;
          row.cells[2].innerHTML = `<strong>${totalMurid} Siswa (Murid)</strong>`;
        }
      });
    }

    const muridCountEl = document.getElementById("jumlahMuridCount");
    const totalMuridValue = db.siswa?.totalMurid ?? db.profil.jumlahMurid ?? 70;
    if (muridCountEl && totalMuridValue) {
      muridCountEl.textContent = totalMuridValue;
    }

    const namaKepalaEl = document.querySelector(".nama-kepala span");
    if (namaKepalaEl && db.profil.kepalaSekolah) {
      namaKepalaEl.textContent = db.profil.kepalaSekolah;
    }

    if (db.profil.sejarah) {
      const sejarahEl = document.querySelector(".sejarah-content p");
      if (sejarahEl) {
        sejarahEl.textContent = db.profil.sejarah;
      }
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

  // G. Sinkronisasi Data Siswa, Rombel & Kelas 1-6
  if (db.siswa) {
    const totalMurid = db.siswa.totalMurid ?? 70;
    const jumlahKelas = db.siswa.jumlahKelas ?? 6;
    const tahunAjaran = db.siswa.tahunAjaran || "2025/2026";

    const elTotalMurid = document.getElementById("totalMuridDisplay");
    if (elTotalMurid) elTotalMurid.textContent = totalMurid;

    const elTotalKelas = document.getElementById("totalKelasDisplay");
    if (elTotalKelas) elTotalKelas.textContent = jumlahKelas;

    const elK1 = document.getElementById("countKelas1");
    if (elK1) elK1.textContent = db.siswa.kelas1 ?? 12;

    const elK2 = document.getElementById("countKelas2");
    if (elK2) elK2.textContent = db.siswa.kelas2 ?? 11;

    const elK3 = document.getElementById("countKelas3");
    if (elK3) elK3.textContent = db.siswa.kelas3 ?? 13;

    const elK4 = document.getElementById("countKelas4");
    if (elK4) elK4.textContent = db.siswa.kelas4 ?? 10;

    const elK5 = document.getElementById("countKelas5");
    if (elK5) elK5.textContent = db.siswa.kelas5 ?? 12;

    const elK6 = document.getElementById("countKelas6");
    if (elK6) elK6.textContent = db.siswa.kelas6 ?? 12;

    const elSummaryMurid = document.getElementById("summaryTotalMurid");
    if (elSummaryMurid) elSummaryMurid.textContent = `${totalMurid} Murid`;

    const elSummaryKelas = document.getElementById("summaryTotalKelas");
    if (elSummaryKelas) elSummaryKelas.textContent = `${jumlahKelas} Kelas`;

    const elSummaryThn = document.getElementById("summaryTahunAjaran");
    if (elSummaryThn) elSummaryThn.textContent = tahunAjaran;

    const elKet = document.getElementById("muridKeteranganText");
    if (elKet && db.siswa.keterangan) {
      elKet.innerHTML = db.siswa.keterangan.replace(/(\d+\s*murid)/i, "<strong>$1</strong>");
    }

    const profilTable = document.querySelector(".profil-table tbody");
    if (profilTable) {
      const rows = profilTable.querySelectorAll("tr");
      rows.forEach((row) => {
        if (row.cells[0]?.textContent.trim().includes("Jumlah Siswa")) {
          row.cells[2].innerHTML = `<strong>${totalMurid} Siswa (${jumlahKelas} Rombel)</strong>`;
        }
      });
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
