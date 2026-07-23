/**
 * Thong_tin_giao_dich.js
 * Logic for Transaction Details page
 */
document.addEventListener("DOMContentLoaded", async function () {
  await loadComponents();
  initAuthToggle();
  initQueryParams();
  initPackageSelection();
  initPaymentModal();
});

/**
 * Loads Footer.html dynamically into #footer-container
 */
async function loadComponents() {
  const footerContainer = document.getElementById("footer-container");

  if (footerContainer) {
    try {
      const response = await fetch("Footer.html");
      if (response.ok) {
        footerContainer.innerHTML = await response.text();
      }
    } catch (e) {
      console.log("Error loading footer content:", e);
    }
  }
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

/**
 * Initialize query parameters from URL if present
 */
function initQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const pkgParam = urlParams.get("package");
  const priceParam = urlParams.get("price");
  const methodParam = urlParams.get("method");

  const coinsElem = document.getElementById("val-coins");
  const priceElem = document.getElementById("val-price");
  const methodNameElem = document.getElementById("val-method-name");

  const targetCoins = pkgParam ? pkgParam : "500";
  const targetPrice = priceParam ? priceParam : "500.000 VNĐ";
  const targetMethod = methodParam ? methodParam : "Momo";

  if (coinsElem) coinsElem.textContent = targetCoins;
  if (priceElem) priceElem.textContent = targetPrice;
  if (methodNameElem) methodNameElem.textContent = targetMethod;

  // Highlight matching package card
  const cards = document.querySelectorAll(".package-card");
  cards.forEach(card => {
    if (card.getAttribute("data-package") === targetCoins) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }
  });
}

/**
 * Package selection logic for "CHỌN GÓI NẠP KHÁC"
 */
function initPackageSelection() {
  const packageCards = document.querySelectorAll(".package-card");
  const coinsElem = document.getElementById("val-coins");
  const priceElem = document.getElementById("val-price");

  packageCards.forEach(card => {
    const selectHandler = function(e) {
      if (e) e.stopPropagation();

      packageCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");

      const pkgCoins = card.getAttribute("data-package");
      const pkgPrice = card.getAttribute("data-price");

      if (coinsElem && pkgCoins) coinsElem.textContent = pkgCoins;
      if (priceElem && pkgPrice) priceElem.textContent = pkgPrice;
    };

    card.addEventListener("click", selectHandler);
    const buyBtn = card.querySelector(".btn-buy-orange");
    if (buyBtn) {
      buyBtn.addEventListener("click", selectHandler);
    }
  });
}

/**
 * Payment Modal logic (THANH TOÁN button handler)
 */
function initPaymentModal() {
  const btnPayNow = document.getElementById("btn-pay-now");
  const modalOverlay = document.getElementById("payment-modal");
  const btnCloseModal = document.getElementById("btn-close-modal");

  const modalAccount = document.getElementById("modal-val-account");
  const modalCoins = document.getElementById("modal-val-coins");
  const modalPrice = document.getElementById("modal-val-price");

  if (btnPayNow && modalOverlay) {
    btnPayNow.addEventListener("click", function () {
      const currentCoins = document.getElementById("val-coins").textContent;
      const currentPrice = document.getElementById("val-price").textContent;
      const currentAccount = document.getElementById("val-account").textContent;

      if (modalAccount) modalAccount.textContent = currentAccount;
      if (modalCoins) modalCoins.textContent = `${currentCoins} MyE Coin`;
      if (modalPrice) modalPrice.textContent = currentPrice;

      modalOverlay.classList.remove("d-none");
    });
  }

  if (btnCloseModal && modalOverlay) {
    btnCloseModal.addEventListener("click", function () {
      modalOverlay.classList.add("d-none");
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", function (e) {
      if (e.target === modalOverlay) {
        modalOverlay.classList.add("d-none");
      }
    });
  }
}
