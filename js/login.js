// =========================================================
// LOGIKA HALAMAN LOGIN ADMIN - SD NEGERI 2 CANDISARI
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("usernameInput");
  const passwordInput = document.getElementById("passwordInput");
  const togglePasswordBtn = document.getElementById("togglePassword");
  const submitBtn = document.getElementById("submitBtn");
  const forgotPasswordLink = document.getElementById("forgotPasswordLink");
  const forgotModal = document.getElementById("forgotModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const toastContainer = document.getElementById("toastContainer");
  const btnQuickFill = document.getElementById("btnQuickFill");

  // Quick fill default credentials
  if (btnQuickFill && usernameInput && passwordInput) {
    btnQuickFill.addEventListener("click", () => {
      usernameInput.value = "admin";
      passwordInput.value = "admin123";
      usernameInput.classList.remove("is-invalid");
      passwordInput.classList.remove("is-invalid");
      showToast("Kredensial Dimuat", "Username dan Password default berhasil diisikan.", "success");
    });
  }

  // 1. Toggle Password Visibility
  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener("click", () => {
      const isPassword = passwordInput.getAttribute("type") === "password";
      passwordInput.setAttribute("type", isPassword ? "text" : "password");

      const icon = togglePasswordBtn.querySelector("i");
      if (icon) {
        if (isPassword) {
          icon.classList.remove("fa-eye");
          icon.classList.add("fa-eye-slash");
        } else {
          icon.classList.remove("fa-eye-slash");
          icon.classList.add("fa-eye");
        }
      }
    });
  }

  // 2. Forgot Password Modal Handling
  if (forgotPasswordLink && forgotModal) {
    forgotPasswordLink.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  }

  if (closeModalBtn && forgotModal) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  if (forgotModal) {
    forgotModal.addEventListener("click", (e) => {
      if (e.target === forgotModal) {
        closeModal();
      }
    });
  }

  function openModal() {
    if (forgotModal) forgotModal.classList.add("open");
  }

  function closeModal() {
    if (forgotModal) forgotModal.classList.remove("open");
  }

  // Close modal on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && forgotModal && forgotModal.classList.contains("open")) {
      closeModal();
    }
  });

  // 3. Toast Notification System
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

    setTimeout(() => {
      toast.classList.add("show");
    }, 10);

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 400);
    }, 3800);
  }

  // 4. Form Submission & Client-side Validation
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const username = usernameInput ? usernameInput.value.trim() : "";
      const password = passwordInput ? passwordInput.value.trim() : "";
      let hasError = false;

      // Validate username
      if (!username) {
        if (usernameInput) usernameInput.classList.add("is-invalid");
        hasError = true;
      } else {
        if (usernameInput) usernameInput.classList.remove("is-invalid");
      }

      // Validate password
      if (!password) {
        if (passwordInput) passwordInput.classList.add("is-invalid");
        hasError = true;
      } else if (password.length < 5) {
        if (passwordInput) passwordInput.classList.add("is-invalid");
        hasError = true;
      } else {
        if (passwordInput) passwordInput.classList.remove("is-invalid");
      }

      if (hasError) {
        showToast(
          "Akses Ditolak",
          "Silakan masukkan username/email admin dan kata sandi (minimal 5 karakter).",
          "error"
        );
        return;
      }

      // Show Loading Spinner on Button
      submitBtn.classList.add("loading");
      const btnText = submitBtn.querySelector(".btn-text");
      const originalText = btnText ? btnText.textContent : "Masuk ke Panel Admin";
      if (btnText) btnText.textContent = "Memverifikasi Akses...";

      // Simulate Authentication Process
      setTimeout(() => {
        submitBtn.classList.remove("loading");
        if (btnText) btnText.textContent = originalText;

        showToast(
          "Login Berhasil!",
          "Otentikasi Administrator berhasil. Mengalihkan ke Dashboard...",
          "success"
        );

        setTimeout(() => {
          window.location.href = "admin.html";
        }, 1200);
      }, 1200);
    });

    if (usernameInput) {
      usernameInput.addEventListener("input", () => {
        if (usernameInput.value.trim()) {
          usernameInput.classList.remove("is-invalid");
        }
      });
    }

    if (passwordInput) {
      passwordInput.addEventListener("input", () => {
        if (passwordInput.value.trim().length >= 5) {
          passwordInput.classList.remove("is-invalid");
        }
      });
    }
  }
});
