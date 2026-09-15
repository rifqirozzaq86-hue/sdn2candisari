// =========================================================
// LOGIKA DASHBOARD ADMINISTRATOR - SD NEGERI 2 CANDISARI
// =========================================================

// ─── PROTEKSI SESI: Hanya boleh diakses setelah login ────
(function checkAdminSession() {
  if (!sessionStorage.getItem("isAdminLoggedIn")) {
    // Tampilkan pesan singkat lalu redirect ke halaman login
    alert("⚠️ Sesi tidak valid. Silakan login terlebih dahulu untuk mengakses halaman admin.");
    window.location.replace("login.html");
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  // --- State & Default Initial Data ---
  const initialData = {
    profil: {
      namaSekolah: "SD Negeri 2 Candisari",
      kepalaSekolah: "Bapak Kepala Sekolah, S.Pd.",
      npsn: "20309158",
      statusSekolah: "Negeri",
      akreditasi: "A",
      alamat: "Candisari, Kec. Ampel, Kabupaten Boyolali, Jawa Tengah 57352",
      telepon: "(0276) 000000",
      email: "sdn2candisari@example.com",
      visi: "Mewujudkan peserta didik yang berkarakter, berprestasi, berakhlak mulia, berwawasan lingkungan dan siap menghadapi perkembangan teknologi.",
      misi: "1. Menumbuhkan penghayatan terhadap ajaran agama yang dianut.\n2. Melaksanakan pembelajaran dan bimbingan secara efektif.\n3. Mengembangkan bakat, minat, dan kreativitas siswa.\n4. Membina kemandirian peserta didik melalui kegiatan pembiasaan dan kewirausahaan.",
      sejarah: "SD Negeri 2 Candisari didirikan untuk melayani kebutuhan pendidikan dasar masyarakat Candisari dan sekitarnya dengan komitmen mencetak generasi berkarakter dan cerdas.",
    },
    berita: [
      {
        id: 1,
        judul: "Kegiatan Siswa SD Negeri 2 Candisari",
        tanggal: "2026-05-02",
        kategori: "Kegiatan",
        gambar: "assets/images/perpus.jpg",
        ringkasan: "Berbagai kegiatan sekolah dilaksanakan untuk meningkatkan prestasi dan karakter siswa.",
        status: "Published",
      },
      {
        id: 2,
        judul: "Kegiatan Kreativitas Siswa",
        tanggal: "2026-04-30",
        kategori: "Akademik",
        gambar: "assets/images/kreatifitas.webp",
        ringkasan: "Siswa mengikuti kegiatan kreatif sebagai sarana mengembangkan bakat dan kemampuan.",
        status: "Published",
      },
      {
        id: 3,
        judul: "Kegiatan Literasi Bersama",
        tanggal: "2026-04-25",
        kategori: "Literasi",
        gambar: "assets/images/literasi.webp",
        ringkasan: "Program literasi menjadi salah satu kegiatan rutin untuk meningkatkan minat baca siswa.",
        status: "Published",
      },
    ],
    guru: [
      {
        id: 1,
        nama: "Bapak Seno, S.Pd.",
        nip: "198005122008011004",
        jabatan: "Guru Kelas VI",
        gambar: "assets/images/Bapak Seno.jpg",
      },
      {
        id: 2,
        nama: "Bapak Sidik, S.Pd.",
        nip: "198207152010011012",
        jabatan: "Guru Penjasorkes",
        gambar: "assets/images/Bapak Sidik.jpg",
      },
      {
        id: 3,
        nama: "Ibu Haryanti, S.Pd.",
        nip: "198511202014022003",
        jabatan: "Guru Kelas III",
        gambar: "assets/images/Bu Haryanti.jpg",
      },
      {
        id: 4,
        nama: "Ibu Rini, S.Pd.",
        nip: "198803142019032007",
        jabatan: "Guru Kelas I",
        gambar: "assets/images/Bu Rini.jpg",
      },
    ],
    galeri: [
      { id: 1, judul: "Kegiatan Masjid Sekolah", gambar: "assets/images/masjid.jpg", kategori: "Keagamaan" },
      { id: 2, judul: "Laboratorium Komputer", gambar: "assets/images/lab.jpg", kategori: "Fasilitas" },
      { id: 3, judul: "Perpustakaan Sekolah", gambar: "assets/images/perpus.jpg", kategori: "Fasilitas" },
      { id: 4, judul: "Ruang Kelas Pembelajaran", gambar: "assets/images/kelas.jpg", kategori: "Fasilitas" },
      { id: 5, judul: "Area Parkir Sekolah", gambar: "assets/images/parkir.jpg", kategori: "Sarana" },
      { id: 6, judul: "Gerbang Depan Sekolah", gambar: "assets/images/gerbangg.jpg", kategori: "Lingkungan" },
    ],
    ppdb: {
      statusPpdb: "Buka",
      linkForm: "https://forms.gle/Hxp8Z2s2zKN4gYae6",
      tahunAjaran: "2026/2027",
      kuota: "60 Siswa",
      biaya: "Gratis (0 Rupiah)",
      deskripsi: "Tujuan PPDB adalah untuk memastikan penerimaan peserta didik baru berjalan secara objektif, transparan, akuntabel, non diskriminatif, dan berkeadilan.",
    },
    siswa: {
      jumlahKelas: 6,
      tahunAjaran: "2025/2026",
      kelas1: 12,
      kelas2: 11,
      kelas3: 13,
      kelas4: 10,
      kelas5: 12,
      kelas6: 12,
      totalMurid: 70,
      keterangan: "SD Negeri 2 Candisari membina dan mendidik 70 murid aktif dengan lingkungan belajar yang kondusif, interaktif, dan berakhlak mulia.",
    },
    kontak: {
      alamatLengkap: "Candisari, Kec. Ampel, Kabupaten Boyolali, Jawa Tengah 57352",
      emailUtama: "sdn2candisari@example.com",
      noTelepon: "(0276) 000000",
      whatsapp: "081234567890",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
      tiktok: "https://tiktok.com",
    },
  };

  // Load from localStorage or initialize
  function loadData() {
    const saved = localStorage.getItem("sdn2_admin_data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.prestasi) {
          delete parsed.prestasi;
          localStorage.setItem("sdn2_admin_data", JSON.stringify(parsed));
        }
        if (!parsed.siswa) {
          parsed.siswa = { ...initialData.siswa };
          localStorage.setItem("sdn2_admin_data", JSON.stringify(parsed));
        }
        return parsed;
      } catch (e) {
        console.error("Error parsing localStorage data", e);
      }
    }
    localStorage.setItem("sdn2_admin_data", JSON.stringify(initialData));
    return initialData;
  }

  function saveData(data) {
    localStorage.setItem("sdn2_admin_data", JSON.stringify(data));
    updateStatsUI();
  }

  let db = loadData();

  // --- UI Elements ---
  const menuButtons = document.querySelectorAll(".menu-item button");
  const tabPanels = document.querySelectorAll(".tab-panel");
  const pageTitle = document.getElementById("pageTitle");
  const pageSubtitle = document.getElementById("pageSubtitle");
  const btnToggleSidebar = document.getElementById("btnToggleSidebar");
  const sidebar = document.querySelector(".admin-sidebar");
  const toastContainer = document.getElementById("toastContainer");
  const btnSaveAll = document.getElementById("btnSaveAll");

  // --- 1. Tab Navigation ---
  menuButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab");
      const title = btn.getAttribute("data-title") || "Dashboard";
      const subtitle = btn.getAttribute("data-subtitle") || "";

      // Active menu item
      document.querySelectorAll(".menu-item").forEach((item) => item.classList.remove("active"));
      btn.parentElement.classList.add("active");

      // Active tab panel
      tabPanels.forEach((panel) => {
        if (panel.id === `panel-${targetTab}`) {
          panel.classList.add("active");
        } else {
          panel.classList.remove("active");
        }
      });

      // Update Header Text
      if (pageTitle) pageTitle.textContent = title;
      if (pageSubtitle) pageSubtitle.textContent = subtitle;

      // Close sidebar on mobile
      if (window.innerWidth <= 900 && sidebar) {
        sidebar.classList.remove("sidebar-open");
      }
    });
  });

  // Toggle Sidebar on mobile
  if (btnToggleSidebar && sidebar) {
    btnToggleSidebar.addEventListener("click", () => {
      sidebar.classList.toggle("sidebar-open");
    });
  }

  // --- 2. Toast Notification ---
  function showToast(title, message, type = "success") {
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    const iconHtml =
      type === "success"
        ? '<i class="fa-solid fa-circle-check toast-icon"></i>'
        : '<i class="fa-solid fa-triangle-exclamation toast-icon"></i>';

    toast.innerHTML = `
      ${iconHtml}
      <div class="toast-content">
        <h4>${title}</h4>
        <p>${message}</p>
      </div>
    `;

    toastContainer.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 400);
    }, 3800);
  }

  // --- 3. Render Overview Statistics ---
  function updateStatsUI() {
    const statNews = document.getElementById("statTotalNews");
    const statGuru = document.getElementById("statTotalGuru");
    const statGaleri = document.getElementById("statTotalGaleri");
    const statPpdb = document.getElementById("statPpdbStatus");

    if (statNews) statNews.textContent = db.berita.length;
    if (statGuru) statGuru.textContent = db.guru.length;
    if (statGaleri) statGaleri.textContent = db.galeri.length;
    if (statPpdb) statPpdb.textContent = db.ppdb.statusPpdb || "Buka";

    const statSiswa = document.getElementById("statTotalSiswa");
    if (statSiswa) statSiswa.textContent = db.siswa?.totalMurid ?? 70;
  }

  // --- 4. Render Modul Profil ---
  function initProfilForm() {
    const form = document.getElementById("formProfilSekolah");
    if (!form) return;

    document.getElementById("profNama").value = db.profil.namaSekolah || "";
    document.getElementById("profKepala").value = db.profil.kepalaSekolah || "";
    document.getElementById("profNpsn").value = db.profil.npsn || "";
    document.getElementById("profStatus").value = db.profil.statusSekolah || "Negeri";
    document.getElementById("profAkreditasi").value = db.profil.akreditasi || "A";
    document.getElementById("profVisi").value = db.profil.visi || "";
    document.getElementById("profMisi").value = db.profil.misi || "";
    document.getElementById("profSejarah").value = db.profil.sejarah || "";

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      db.profil.namaSekolah = document.getElementById("profNama").value.trim();
      db.profil.kepalaSekolah = document.getElementById("profKepala").value.trim();
      db.profil.npsn = document.getElementById("profNpsn").value.trim();
      db.profil.statusSekolah = document.getElementById("profStatus").value;
      db.profil.akreditasi = document.getElementById("profAkreditasi").value;
      db.profil.visi = document.getElementById("profVisi").value.trim();
      db.profil.misi = document.getElementById("profMisi").value.trim();
      db.profil.sejarah = document.getElementById("profSejarah").value.trim();

      saveData(db);
      showToast("Berhasil Disimpan", "Profil, Visi-Misi, dan Sejarah sekolah berhasil diperbarui.");
    });
  }

  // --- 5. Render Modul Berita ---
  function renderBeritaTable() {
    const tbody = document.getElementById("tableBodyBerita");
    if (!tbody) return;
    tbody.innerHTML = "";

    db.berita.forEach((item, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>
          <img src="${item.gambar}" alt="${item.judul}" class="table-thumb" onerror="this.src='assets/images/sd.jpg'" />
        </td>
        <td>
          <strong>${item.judul}</strong>
          <p style="font-size: 0.76rem; color: #64748b; margin-top: 2px;">${item.ringkasan.substring(0, 50)}...</p>
        </td>
        <td>${item.kategori}</td>
        <td>${item.tanggal}</td>
        <td><span class="badge-status active">${item.status}</span></td>
        <td>
          <div class="table-actions">
            <button class="btn-action edit" data-id="${item.id}" title="Edit Berita"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="btn-action delete" data-id="${item.id}" title="Hapus Berita"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </td>
      `;

      tr.querySelector(".btn-action.delete").addEventListener("click", () => {
        if (confirm(`Apakah Anda yakin ingin menghapus berita "${item.judul}"?`)) {
          db.berita = db.berita.filter((b) => b.id !== item.id);
          saveData(db);
          renderBeritaTable();
          showToast("Berita Dihapus", "Data berita berhasil dihapus dari sistem.");
        }
      });

      tr.querySelector(".btn-action.edit").addEventListener("click", () => {
        openBeritaModal(item);
      });

      tbody.appendChild(tr);
    });
  }

  // Modal Berita
  const modalBerita = document.getElementById("modalBerita");
  const formBerita = document.getElementById("formBerita");
  const btnAddBerita = document.getElementById("btnAddBerita");
  const closeBeritaModalBtn = document.getElementById("closeBeritaModalBtn");
  let editBeritaId = null;
  let beritaGambarDataUrl = null;

  // File picker: Berita
  const beritaFileInput = document.getElementById("beritaGambar");
  const beritaImgPreview = document.getElementById("beritaImgPreview");
  const beritaImgPreviewWrapper = document.getElementById("beritaImgPreviewWrapper");
  const beritaGambarName = document.getElementById("beritaGambarName");
  const beritaClearImg = document.getElementById("beritaClearImg");

  function setupBeritaFilePicker() {
    if (!beritaFileInput) return;
    beritaFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        beritaGambarDataUrl = ev.target.result;
        beritaImgPreview.src = beritaGambarDataUrl;
        beritaImgPreviewWrapper.style.display = "flex";
        beritaGambarName.textContent = file.name;
      };
      reader.readAsDataURL(file);
    });
    if (beritaClearImg) {
      beritaClearImg.addEventListener("click", () => {
        beritaGambarDataUrl = null;
        beritaFileInput.value = "";
        beritaImgPreview.src = "";
        beritaImgPreviewWrapper.style.display = "none";
        beritaGambarName.textContent = "Klik untuk memilih foto dari komputer...";
      });
    }
  }
  setupBeritaFilePicker();

  function openBeritaModal(item = null) {
    if (!modalBerita) return;
    // Reset file picker state
    beritaGambarDataUrl = null;
    if (beritaFileInput) beritaFileInput.value = "";
    if (beritaImgPreviewWrapper) beritaImgPreviewWrapper.style.display = "none";
    if (beritaGambarName) beritaGambarName.textContent = "Klik untuk memilih foto dari komputer...";

    if (item) {
      editBeritaId = item.id;
      document.getElementById("modalBeritaTitle").textContent = "Edit Berita";
      document.getElementById("beritaJudul").value = item.judul;
      document.getElementById("beritaKategori").value = item.kategori;
      document.getElementById("beritaTanggal").value = item.tanggal;
      document.getElementById("beritaRingkasan").value = item.ringkasan;
      // Show existing image
      if (item.gambar) {
        beritaGambarDataUrl = item.gambar;
        if (beritaImgPreview) beritaImgPreview.src = item.gambar;
        if (beritaImgPreviewWrapper) beritaImgPreviewWrapper.style.display = "flex";
        if (beritaGambarName) beritaGambarName.textContent = "(foto sebelumnya)";
      }
    } else {
      editBeritaId = null;
      document.getElementById("modalBeritaTitle").textContent = "Tambah Berita Baru";
      formBerita.reset();
      document.getElementById("beritaTanggal").value = new Date().toISOString().split("T")[0];
    }
    modalBerita.classList.add("open");
  }

  if (btnAddBerita) btnAddBerita.addEventListener("click", () => openBeritaModal(null));
  if (closeBeritaModalBtn) closeBeritaModalBtn.addEventListener("click", () => modalBerita.classList.remove("open"));

  if (formBerita) {
    formBerita.addEventListener("submit", (e) => {
      e.preventDefault();
      const judul = document.getElementById("beritaJudul").value.trim();
      const kategori = document.getElementById("beritaKategori").value;
      const tanggal = document.getElementById("beritaTanggal").value;
      const gambar = beritaGambarDataUrl || "assets/images/perpus.jpg";
      const ringkasan = document.getElementById("beritaRingkasan").value.trim();

      if (editBeritaId) {
        const item = db.berita.find((b) => b.id === editBeritaId);
        if (item) {
          item.judul = judul;
          item.kategori = kategori;
          item.tanggal = tanggal;
          item.gambar = gambar;
          item.ringkasan = ringkasan;
        }
        showToast("Berita Diperbarui", "Data berita berhasil diperbarui.");
      } else {
        const newId = db.berita.length > 0 ? Math.max(...db.berita.map((b) => b.id)) + 1 : 1;
        db.berita.unshift({
          id: newId,
          judul,
          kategori,
          tanggal,
          gambar,
          ringkasan,
          status: "Published",
        });
        showToast("Berita Ditambahkan", "Berita baru berhasil ditayangkan.");
      }

      saveData(db);
      renderBeritaTable();
      modalBerita.classList.remove("open");
    });
  }

  // --- 6. Render Modul Guru ---
  function renderGuruTable() {
    const tbody = document.getElementById("tableBodyGuru");
    if (!tbody) return;
    tbody.innerHTML = "";

    db.guru.forEach((item, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>
          <img src="${item.gambar}" alt="${item.nama}" class="table-thumb" onerror="this.src='assets/images/guru4.jpg'" />
        </td>
        <td><strong>${item.nama}</strong></td>
        <td>${item.nip}</td>
        <td><span class="badge-status active">${item.jabatan}</span></td>
        <td>
          <div class="table-actions">
            <button class="btn-action edit" data-id="${item.id}" title="Edit Data Guru"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="btn-action delete" data-id="${item.id}" title="Hapus Guru"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </td>
      `;

      tr.querySelector(".btn-action.delete").addEventListener("click", () => {
        if (confirm(`Apakah Anda yakin ingin menghapus data "${item.nama}"?`)) {
          db.guru = db.guru.filter((g) => g.id !== item.id);
          saveData(db);
          renderGuruTable();
          showToast("Data Guru Dihapus", "Data tenaga pendidik berhasil dihapus.");
        }
      });

      tr.querySelector(".btn-action.edit").addEventListener("click", () => {
        openGuruModal(item);
      });

      tbody.appendChild(tr);
    });
  }

  // Modal Guru
  const modalGuru = document.getElementById("modalGuru");
  const formGuru = document.getElementById("formGuru");
  const btnAddGuru = document.getElementById("btnAddGuru");
  const closeGuruModalBtn = document.getElementById("closeGuruModalBtn");
  let editGuruId = null;
  let guruGambarDataUrl = null;

  // File picker: Guru
  const guruFileInput = document.getElementById("guruGambar");
  const guruImgPreview = document.getElementById("guruImgPreview");
  const guruImgPreviewWrapper = document.getElementById("guruImgPreviewWrapper");
  const guruGambarName = document.getElementById("guruGambarName");
  const guruClearImg = document.getElementById("guruClearImg");

  function setupGuruFilePicker() {
    if (!guruFileInput) return;
    guruFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        guruGambarDataUrl = ev.target.result;
        guruImgPreview.src = guruGambarDataUrl;
        guruImgPreviewWrapper.style.display = "flex";
        guruGambarName.textContent = file.name;
      };
      reader.readAsDataURL(file);
    });
    if (guruClearImg) {
      guruClearImg.addEventListener("click", () => {
        guruGambarDataUrl = null;
        guruFileInput.value = "";
        guruImgPreview.src = "";
        guruImgPreviewWrapper.style.display = "none";
        guruGambarName.textContent = "Klik untuk memilih foto dari komputer...";
      });
    }
  }
  setupGuruFilePicker();

  function openGuruModal(item = null) {
    if (!modalGuru) return;
    // Reset file picker state
    guruGambarDataUrl = null;
    if (guruFileInput) guruFileInput.value = "";
    if (guruImgPreviewWrapper) guruImgPreviewWrapper.style.display = "none";
    if (guruGambarName) guruGambarName.textContent = "Klik untuk memilih foto dari komputer...";

    if (item) {
      editGuruId = item.id;
      document.getElementById("modalGuruTitle").textContent = "Edit Data Guru";
      document.getElementById("guruNama").value = item.nama;
      document.getElementById("guruNip").value = item.nip;
      document.getElementById("guruJabatan").value = item.jabatan;
      // Show existing image
      if (item.gambar) {
        guruGambarDataUrl = item.gambar;
        if (guruImgPreview) guruImgPreview.src = item.gambar;
        if (guruImgPreviewWrapper) guruImgPreviewWrapper.style.display = "flex";
        if (guruGambarName) guruGambarName.textContent = "(foto sebelumnya)";
      }
    } else {
      editGuruId = null;
      document.getElementById("modalGuruTitle").textContent = "Tambah Guru / Tendik";
      formGuru.reset();
    }
    modalGuru.classList.add("open");
  }

  if (btnAddGuru) btnAddGuru.addEventListener("click", () => openGuruModal(null));
  if (closeGuruModalBtn) closeGuruModalBtn.addEventListener("click", () => modalGuru.classList.remove("open"));

  if (formGuru) {
    formGuru.addEventListener("submit", (e) => {
      e.preventDefault();
      const nama = document.getElementById("guruNama").value.trim();
      const nip = document.getElementById("guruNip").value.trim();
      const jabatan = document.getElementById("guruJabatan").value.trim();
      const gambar = guruGambarDataUrl || "assets/images/sd.jpg";

      if (editGuruId) {
        const item = db.guru.find((g) => g.id === editGuruId);
        if (item) {
          item.nama = nama;
          item.nip = nip;
          item.jabatan = jabatan;
          item.gambar = gambar;
        }
        showToast("Data Guru Diperbarui", "Data tenaga pendidik berhasil diubah.");
      } else {
        const newId = db.guru.length > 0 ? Math.max(...db.guru.map((g) => g.id)) + 1 : 1;
        db.guru.push({ id: newId, nama, nip, jabatan, gambar });
        showToast("Data Guru Ditambahkan", "Tenaga pendidik baru berhasil disimpan.");
      }

      saveData(db);
      renderGuruTable();
      modalGuru.classList.remove("open");
    });
  }

  // --- 7. Render Modul Galeri & Fasilitas ---
  function renderGaleriGrid() {
    const grid = document.getElementById("gridGaleri");
    if (!grid) return;
    grid.innerHTML = "";

    db.galeri.forEach((item) => {
      const card = document.createElement("div");
      card.className = "gallery-admin-card";
      card.innerHTML = `
        <img src="${item.gambar}" alt="${item.judul}" onerror="this.src='assets/images/sd.jpg'" />
        <div class="gallery-admin-info">
          <h4>${item.judul}</h4>
          <p><span class="badge-status active">${item.kategori}</span></p>
          <div class="gallery-admin-actions">
            <button class="btn-action delete" title="Hapus Foto"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </div>
      `;

      card.querySelector(".btn-action.delete").addEventListener("click", () => {
        if (confirm(`Hapus foto "${item.judul}" dari galeri?`)) {
          db.galeri = db.galeri.filter((g) => g.id !== item.id);
          saveData(db);
          renderGaleriGrid();
          showToast("Foto Dihapus", "Foto berhasil dihapus dari galeri.");
        }
      });

      grid.appendChild(card);
    });
  }

  // Modal Galeri
  const modalGaleri = document.getElementById("modalGaleri");
  const formGaleri = document.getElementById("formGaleri");
  const btnAddGaleri = document.getElementById("btnAddGaleri");
  const closeGaleriModalBtn = document.getElementById("closeGaleriModalBtn");
  let galeriGambarDataUrl = null;

  // File picker: Galeri
  const galeriFileInput = document.getElementById("galeriGambar");
  const galeriImgPreview = document.getElementById("galeriImgPreview");
  const galeriImgPreviewWrapper = document.getElementById("galeriImgPreviewWrapper");
  const galeriGambarName = document.getElementById("galeriGambarName");
  const galeriClearImg = document.getElementById("galeriClearImg");

  function setupGaleriFilePicker() {
    if (!galeriFileInput) return;
    galeriFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        galeriGambarDataUrl = ev.target.result;
        galeriImgPreview.src = galeriGambarDataUrl;
        galeriImgPreviewWrapper.style.display = "flex";
        galeriGambarName.textContent = file.name;
      };
      reader.readAsDataURL(file);
    });
    if (galeriClearImg) {
      galeriClearImg.addEventListener("click", () => {
        galeriGambarDataUrl = null;
        galeriFileInput.value = "";
        galeriImgPreview.src = "";
        galeriImgPreviewWrapper.style.display = "none";
        galeriGambarName.textContent = "Klik untuk memilih foto dari komputer...";
      });
    }
  }
  setupGaleriFilePicker();

  if (btnAddGaleri) {
    btnAddGaleri.addEventListener("click", () => {
      formGaleri.reset();
      galeriGambarDataUrl = null;
      if (galeriFileInput) galeriFileInput.value = "";
      if (galeriImgPreviewWrapper) galeriImgPreviewWrapper.style.display = "none";
      if (galeriGambarName) galeriGambarName.textContent = "Klik untuk memilih foto dari komputer...";
      modalGaleri.classList.add("open");
    });
  }

  if (closeGaleriModalBtn) closeGaleriModalBtn.addEventListener("click", () => modalGaleri.classList.remove("open"));

  if (formGaleri) {
    formGaleri.addEventListener("submit", (e) => {
      e.preventDefault();
      const judul = document.getElementById("galeriJudul").value.trim();
      const kategori = document.getElementById("galeriKategori").value;
      const gambar = galeriGambarDataUrl || "assets/images/masjid.jpg";

      const newId = db.galeri.length > 0 ? Math.max(...db.galeri.map((g) => g.id)) + 1 : 1;
      db.galeri.push({ id: newId, judul, kategori, gambar });

      saveData(db);
      renderGaleriGrid();
      modalGaleri.classList.remove("open");
      showToast("Foto Ditambahkan", "Foto baru berhasil ditambahkan ke galeri.");
    });
  }

  // --- 8. Render Modul PPDB ---
  function initPpdbForm() {
    const form = document.getElementById("formPpdb");
    if (!form) return;

    document.getElementById("ppdbStatus").value = db.ppdb.statusPpdb || "Buka";
    document.getElementById("ppdbLink").value = db.ppdb.linkForm || "https://forms.gle/Hxp8Z2s2zKN4gYae6";
    document.getElementById("ppdbTahun").value = db.ppdb.tahunAjaran || "2026/2027";
    document.getElementById("ppdbKuota").value = db.ppdb.kuota || "60 Siswa";
    document.getElementById("ppdbBiaya").value = db.ppdb.biaya || "Gratis (0 Rupiah)";
    document.getElementById("ppdbDesc").value = db.ppdb.deskripsi || "";

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      db.ppdb.statusPpdb = document.getElementById("ppdbStatus").value;
      db.ppdb.linkForm = document.getElementById("ppdbLink").value.trim();
      db.ppdb.tahunAjaran = document.getElementById("ppdbTahun").value.trim();
      db.ppdb.kuota = document.getElementById("ppdbKuota").value.trim();
      db.ppdb.biaya = document.getElementById("ppdbBiaya").value.trim();
      db.ppdb.deskripsi = document.getElementById("ppdbDesc").value.trim();

      saveData(db);
      showToast("Pengaturan PPDB Disimpan", "Informasi dan link PPDB berhasil diperbarui.");
    });
  }

  // --- 9. Render Modul Siswa & Rombel ---
  function initSiswaForm() {
    const form = document.getElementById("formSiswa");
    if (!form) return;

    if (!db.siswa) {
      db.siswa = { ...initialData.siswa };
    }

    const inputJmlKelas = document.getElementById("siswaJumlahKelas");
    const inputThnAjaran = document.getElementById("siswaTahunAjaran");
    const inputK1 = document.getElementById("siswaKelas1");
    const inputK2 = document.getElementById("siswaKelas2");
    const inputK3 = document.getElementById("siswaKelas3");
    const inputK4 = document.getElementById("siswaKelas4");
    const inputK5 = document.getElementById("siswaKelas5");
    const inputK6 = document.getElementById("siswaKelas6");
    const inputTotal = document.getElementById("siswaTotalMurid");
    const inputKet = document.getElementById("siswaKeterangan");

    if (inputJmlKelas) inputJmlKelas.value = db.siswa.jumlahKelas || 6;
    if (inputThnAjaran) inputThnAjaran.value = db.siswa.tahunAjaran || "2025/2026";
    if (inputK1) inputK1.value = db.siswa.kelas1 ?? 12;
    if (inputK2) inputK2.value = db.siswa.kelas2 ?? 11;
    if (inputK3) inputK3.value = db.siswa.kelas3 ?? 13;
    if (inputK4) inputK4.value = db.siswa.kelas4 ?? 10;
    if (inputK5) inputK5.value = db.siswa.kelas5 ?? 12;
    if (inputK6) inputK6.value = db.siswa.kelas6 ?? 12;
    if (inputTotal) inputTotal.value = db.siswa.totalMurid ?? 70;
    if (inputKet) inputKet.value = db.siswa.keterangan || "";

    // Kalkulasi otomatis saat input murid per kelas diubah
    const classInputs = [inputK1, inputK2, inputK3, inputK4, inputK5, inputK6];
    classInputs.forEach((input) => {
      if (input) {
        input.addEventListener("input", () => {
          let sum = 0;
          classInputs.forEach((inp) => {
            const val = parseInt(inp && inp.value ? inp.value : 0, 10);
            if (!isNaN(val)) sum += val;
          });
          if (inputTotal) inputTotal.value = sum;
        });
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      db.siswa = {
        jumlahKelas: parseInt(inputJmlKelas.value, 10) || 6,
        tahunAjaran: inputThnAjaran.value.trim(),
        kelas1: parseInt(inputK1.value, 10) || 0,
        kelas2: parseInt(inputK2.value, 10) || 0,
        kelas3: parseInt(inputK3.value, 10) || 0,
        kelas4: parseInt(inputK4.value, 10) || 0,
        kelas5: parseInt(inputK5.value, 10) || 0,
        kelas6: parseInt(inputK6.value, 10) || 0,
        totalMurid: parseInt(inputTotal.value, 10) || 0,
        keterangan: inputKet.value.trim(),
      };

      saveData(db);
      showToast("Data Siswa Disimpan", `Data statistik siswa (${db.siswa.totalMurid} murid) berhasil diperbarui.`);
    });
  }

  // --- 10. Render Modul Kontak ---
  function initKontakForm() {
    const form = document.getElementById("formKontak");
    if (!form) return;

    document.getElementById("kontakAlamat").value = db.kontak.alamatLengkap || "";
    document.getElementById("kontakEmail").value = db.kontak.emailUtama || "";
    document.getElementById("kontakTelp").value = db.kontak.noTelepon || "";
    document.getElementById("kontakWa").value = db.kontak.whatsapp || "";
    document.getElementById("kontakFb").value = db.kontak.facebook || "";
    document.getElementById("kontakIg").value = db.kontak.instagram || "";
    document.getElementById("kontakYt").value = db.kontak.youtube || "";
    document.getElementById("kontakTt").value = db.kontak.tiktok || "";

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      db.kontak.alamatLengkap = document.getElementById("kontakAlamat").value.trim();
      db.kontak.emailUtama = document.getElementById("kontakEmail").value.trim();
      db.kontak.noTelepon = document.getElementById("kontakTelp").value.trim();
      db.kontak.whatsapp = document.getElementById("kontakWa").value.trim();
      db.kontak.facebook = document.getElementById("kontakFb").value.trim();
      db.kontak.instagram = document.getElementById("kontakIg").value.trim();
      db.kontak.youtube = document.getElementById("kontakYt").value.trim();
      db.kontak.tiktok = document.getElementById("kontakTt").value.trim();

      saveData(db);
      showToast("Kontak Disimpan", "Informasi kontak dan media sosial berhasil diperbarui.");
    });
  }

  // Button Save All in Header
  if (btnSaveAll) {
    btnSaveAll.addEventListener("click", () => {
      saveData(db);
      showToast("Semua Data Tersimpan", "Seluruh konfigurasi dan konten website berhasil disimpan ke sistem.");
    });
  }

  // Logout Handler
  const btnLogout = document.getElementById("btnLogout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      if (confirm("Keluar dari Panel Administrator?")) {
        // Hapus sesi login agar URL admin tidak bisa diakses langsung
        sessionStorage.removeItem("isAdminLoggedIn");
        window.location.href = "login.html";
      }
    });
  }

  // Initialize all components
  updateStatsUI();
  initProfilForm();
  renderBeritaTable();
  renderGuruTable();
  renderGaleriGrid();
  initPpdbForm();
  initSiswaForm();
  initKontakForm();
});
