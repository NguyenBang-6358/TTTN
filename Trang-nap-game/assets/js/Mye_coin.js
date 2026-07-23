/**
 * Mye_coin.js
 * Logic for MyE Coin recharge page
 */
document.addEventListener("DOMContentLoaded", async function () {
  await loadComponents();
  initAuthToggle();
  initPaymentSelection();
  initPackageSelection();
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
 * Payment method selection logic
 */
function initPaymentSelection() {
  const paymentCards = document.querySelectorAll(".payment-card");

  paymentCards.forEach((card) => {
    card.addEventListener("click", function () {
      paymentCards.forEach((c) => c.classList.remove("active"));
      this.classList.add("active");
    });
  });
}

/**
 * Package selection & Buy button logic
 */
function initPackageSelection() {
  const packageCards = document.querySelectorAll(".package-card");

  packageCards.forEach((card) => {
    const handleRedirect = function (e) {
      if (e) e.stopPropagation();
      const pkgCoins = card.getAttribute("data-package") || "500";
      const packagePrice = card.querySelector(".package-price").textContent;
      
      const activeMethod = document.querySelector(".payment-card.active");
      const methodName = activeMethod ? activeMethod.querySelector(".payment-title").textContent.replace(/<br>/gi, " ").trim() : "Momo";

      window.location.href = `Thong_tin_giao_dich.html?package=${encodeURIComponent(pkgCoins)}&price=${encodeURIComponent(packagePrice)}&method=${encodeURIComponent(methodName)}`;
    };

    card.addEventListener("click", handleRedirect);
    
    const buyBtn = card.querySelector(".btn-buy-orange");
    if (buyBtn) {
      buyBtn.addEventListener("click", handleRedirect);
    }
  });
}
