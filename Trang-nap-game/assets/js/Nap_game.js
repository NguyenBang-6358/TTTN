/**
 * Nap_game.js
 * Controls dynamic component loading, category filtering, search, and interactions on Nap_game page.
 */

document.addEventListener("DOMContentLoaded", async function () {
  await loadComponents();
  initAuthToggle();
  initSearch();
  initCategoryFilter();
  initPagination();
  initCardSelection();
});

/**
 * Loads Header.html and Footer.html dynamically into their container elements
 */
async function loadComponents() {
  const footerContainer = document.getElementById("footer-container");

  // Load Footer
  if (footerContainer) {
    try {
      const response = await fetch("Footer.html");
      if (response.ok) {
        footerContainer.innerHTML = await response.text();
      } else {
        throw new Error("Fetch failed");
      }
    } catch (e) {
      console.log("Using fallback footer content for file:// context");
      footerContainer.innerHTML = `
        <footer class="mye-footer py-5 bg-light-gray text-center text-secondary fs-7">
          <div class="container d-flex flex-column align-items-center">
            <div class="mb-3">
              <img src="../assets/images/Nap_Game/logo.png" alt="MyE Logo" class="mye-footer-logo" height="48">
            </div>
            <p class="mb-1">Email: <a href="mailto:hotro@mye.vn" class="text-secondary text-decoration-none">hotro@mye.vn</a></p>
            <p class="mb-3">Hotline: <a href="tel:0902500198" class="text-secondary text-decoration-none">0902 500 198</a></p>
            <h6 class="fw-bold text-dark text-uppercase mb-2">CÔNG TY CỔ PHẦN MYE</h6>
            <p class="mb-1">Chịu trách nhiệm quản lý nội dung: Ông Lâm Trung Hiệp</p>
            <p class="mb-1">Địa chỉ: 477/22 Âu Cơ, Phường Phú Trung, Quận Tân Phú, Thành phố Hồ Chí Minh, Việt Nam</p>
            <p class="mb-3">Giấy phép G1 số: Số 297/GP-BTTTT, Ngày cấp 14/07/2020, Nơi cấp Bộ Thông Tin và Truyền Thông</p>
            <div class="mb-3">
              <a href="#" class="text-secondary text-decoration-none me-2">Điều khoản dịch vụ</a> | 
              <a href="#" class="text-secondary text-decoration-none ms-2">Chính sách bảo mật</a>
            </div>
            <p class="mb-0 text-muted small">&copy;Copyright &copy; 2026 MYE. All Rights Reserved.</p>
          </div>
        </footer>`;
    }
  }
}

/**
 * Filter games by search input
 */
function initSearch() {
  const searchInput = document.getElementById("game-search-input");
  if (!searchInput) return;

  searchInput.addEventListener("input", function (e) {
    const term = e.target.value.trim().toLowerCase();
    const gameCards = document.querySelectorAll(".game-card");

    gameCards.forEach((card) => {
      const title = card.querySelector(".game-card-title").textContent.toLowerCase();
      if (title.includes(term)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
}

/**
 * Filter games by category tabs
 */
function initCategoryFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const gameCards = document.querySelectorAll(".game-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const category = this.getAttribute("data-category");

      gameCards.forEach((card) => {
        const cardCat = card.getAttribute("data-category");
        if (category === "ALL" || category === "TẤT CẢ" || cardCat === category) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/**
 * Pagination dot selection
 */
function initPagination() {
  const dots = document.querySelectorAll(".pagination-dot");
  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      dots.forEach((d) => d.classList.remove("active"));
      this.classList.add("active");
    });
  });
}

/**
 * Card click selection effect
 */
function initCardSelection() {
  const cards = document.querySelectorAll(".game-card");
  cards.forEach((card) => {
    card.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href !== "#" && href !== "javascript:void(0)") {
        // Allow standard page navigation if card has a target URL
        return;
      }
      e.preventDefault();
      cards.forEach((c) => c.classList.remove("highlight-orange"));
      this.classList.add("highlight-orange");
    });
  });
}

/**
 * Login button toggle & Avatar Dropdown Popup with persistent auth state
 */
function initAuthToggle() {
  const btnLogin = document.getElementById("btn-login");
  const userProfileBar = document.getElementById("user-profile-bar");
  const userProfileToggle = document.getElementById("user-profile-toggle");
  const userDropdownMenu = document.getElementById("user-dropdown-menu");
  const btnLogout = document.getElementById("btn-logout");

  if (!userProfileBar || !userDropdownMenu) return;

  // Restore auth state from localStorage
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (isLoggedIn) {
    if (btnLogin) btnLogin.classList.add("d-none");
    userProfileBar.classList.remove("d-none");
    userProfileBar.classList.add("d-flex");
  } else {
    userProfileBar.classList.remove("d-flex");
    userProfileBar.classList.add("d-none");
    if (btnLogin) btnLogin.classList.remove("d-none");
  }

  // Click Avatar/User info -> Toggle Dropdown Popup
  if (userProfileToggle) {
    userProfileToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      userDropdownMenu.classList.toggle("d-none");
    });
  }

  // Click Logout -> Switch to Login Button & persist state
  if (btnLogout) {
    btnLogout.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.setItem("isLoggedIn", "false");
      userDropdownMenu.classList.add("d-none");
      userProfileBar.classList.remove("d-flex");
      userProfileBar.classList.add("d-none");
      if (btnLogin) btnLogin.classList.remove("d-none");
    });
  }

  // Click Login -> Switch to Profile Bar & persist state
  if (btnLogin) {
    btnLogin.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.setItem("isLoggedIn", "true");
      btnLogin.classList.add("d-none");
      userProfileBar.classList.remove("d-none");
      userProfileBar.classList.add("d-flex");
    });
  }

  // Click Outside -> Close Dropdown Popup
  document.addEventListener("click", function (e) {
    if (!userDropdownMenu.classList.contains("d-none")) {
      if (!userProfileBar.contains(e.target)) {
        userDropdownMenu.classList.add("d-none");
      }
    }
  });
}
