/**
 * Header_active.js
 * Automatically highlights the active navigation menu item based on current page URL.
 */
document.addEventListener("DOMContentLoaded", function () {
  highlightActiveNav();
});

function highlightActiveNav() {
  const currentPath = window.location.pathname.toLowerCase();
  const navLinks = document.querySelectorAll(".mye-header .nav-link");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    const lowerHref = href.toLowerCase();

    // Check matching filename
    if (currentPath.includes("nap_game") && lowerHref.includes("nap_game")) {
      link.classList.add("nav-link-active");
    } else if (currentPath.includes("trang_chu") && lowerHref.includes("trang_chu")) {
      link.classList.add("nav-link-active");
    } else if (currentPath.includes("tro_choi") && lowerHref.includes("tro_choi")) {
      link.classList.add("nav-link-active");
    }
  });
}
