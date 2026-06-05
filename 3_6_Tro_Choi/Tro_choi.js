// ===================== DU LIEU GIAO DIEN =====================
// Tat ca menu, dich vu va game deu nam trong mang object, HTML chi la khung chua.
const navItems = [
  { label: "Trang Chủ", href: "#trang-chu" },
  { label: "Trò Chơi", href: "#tro-choi", active: true },
  { label: "Nạp Game", href: "#nap-game" },
  { label: "Tin Tức", href: "#tin-tuc" },
  { label: "Hỗ Trợ", href: "#ho-tro" },
];

const serviceItems = [
  { name: "MYE COIN", icon: "coin", href: "#mye-coin" },
  { name: "GIFTCODE", icon: "gift", href: "#giftcode" },
  { name: "VIP CLUB", icon: "crown", href: "#vip-club" },
  { name: "TÀI KHOẢN", icon: "user", href: "#tai-khoan" },
];

const filters = [
  { name: "TẤT CẢ", count: 60, active: false },
  { name: "SIMULATION", count: 4 },
  { name: "ACTION", count: 11 },
  { name: "RPG", count: 37 },
  { name: "SHOOTING", count: 5 },
  { name: "RACING", count: 1 },
];

const games = [
  {
    id: 1,
    name: "Hào Khí Tam Quốc",
    image: "assets/images/hao-khi-tam-quoc.png",
    banner: "assets/images/featured-1.png",
    genre: "RPG",
    tag: "",
    homeLink: "#hao-khi-tam-quoc",
    downloadLink: "#tai-hao-khi-tam-quoc",
    featured: true,
  },
  {
    id: 2,
    name: "Hào Khí Chiến Hồn",
    image: "assets/images/hao-khi-chien-hon.png",
    banner: "assets/images/featured-2.png",
    genre: "Action",
    tag: "HOT",
    homeLink: "#hao-khi-chien-hon",
    downloadLink: "#tai-hao-khi-chien-hon",
    featured: true,
  },
  {
    id: 3,
    name: "Boom Tank",
    image: "assets/images/boom-tank.png",
    banner: "assets/images/featured-3.png",
    genre: "Simulation",
    tag: "",
    homeLink: "#boom-tank",
    downloadLink: "#tai-boom-tank",
    featured: true,
  },
  {
    id: 4,
    name: "Hào Khí Du Hiệp",
    image: "assets/images/hao-khi-du-hiep.png",
    banner: "assets/images/featured-4.png",
    genre: "Shooting",
    tag: "MOI",
    homeLink: "#hao-khi-du-hiep",
    downloadLink: "#tai-hao-khi-du-hiep",
    featured: true,
  },
  {
    id: 5,
    name: "Hào Khí Chiến",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=640&q=90",
    banner: "assets/images/featured-5.png",
    genre: "Racing",
    tag: "",
    homeLink: "#phong-van-ky-hiep",
    downloadLink: "#tai-phong-van-ky-hiep",
    featured: true,
  },
];

const gameListOrder = games.slice(0, 4);

let isExpandedGameList = false;
let currentNewGameSlide = 0;

// ===================== HAM TIEN ICH =====================
function iconSvg(type, className = "h-6 w-6") {
  const icons = {
    coin: `
      <svg class="${className}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="2.4"/>
        <path d="M8.5 15.7v-5.1c0-1.4 1-2.4 2.4-2.4.9 0 1.6.4 2.1 1.1.5-.7 1.2-1.1 2.1-1.1 1.4 0 2.4 1 2.4 2.4v5.1" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
      </svg>`,
    gift: `
      <svg class="${className}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20 7h-2.2A3 3 0 0 0 12 5.7 3 3 0 0 0 6.2 7H4a1 1 0 0 0-1 1v3h18V8a1 1 0 0 0-1-1ZM9 4.8c.8 0 1.5.6 1.8 1.7H9A1.7 1.7 0 0 1 9 4.8Zm6 0a1.7 1.7 0 0 1 0 1.7h-1.8c.3-1.1 1-1.7 1.8-1.7ZM4 13v6a2 2 0 0 0 2 2h5v-8H4Zm9 8h5a2 2 0 0 0 2-2v-6h-7v8Z"/>
      </svg>`,
    crown: `
      <svg class="${className}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4 18.5h16V21H4v-2.5Zm.5-2L3 7.5l5.1 3.2L12 4l3.9 6.7L21 7.5l-1.5 9H4.5Z"/>
      </svg>`,
    user: `
      <svg class="${className}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2c-4.7 0-8 2.6-8 6.1 0 .5.4.9.9.9h14.2c.5 0 .9-.4.9-.9 0-3.5-3.3-6.1-8-6.1Z"/>
      </svg>`,
    home: `
      <svg class="${className}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-4.5v-5.5h-5V21H5a1 1 0 0 1-1-1v-8.5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      </svg>`,
    download: `
      <svg class="${className}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
<path d="M12 4v10m0 0 4-4m-4 4-4-4M5 19h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    arrowRight: `
      <svg class="${className}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12h14m-5-5 5 5-5 5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    chevronLeft: `
      <svg class="${className}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m15 18-6-6 6-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    chevronRight: `
      <svg class="${className}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m9 6 6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
  };

  return icons[type] || "";
}

function logoMarkup(size = "sm") {
  const isLarge = size === "lg";
  return `
    <a href="#trang-chu" class="flex items-end gap-1 font-black italic text-[#0d3b66]" aria-label="MYE">
      <span class="${isLarge ? "text-[38px]" : "text-[34px]"} leading-none">my</span>
      <span class="${isLarge ? "mb-1 gap-1" : "mb-1.5 gap-1"} flex flex-col">
        <span class="block ${isLarge ? "h-2 w-14" : "h-[5px] w-12"} skew-x-[-20deg] rounded-sm bg-green-500"></span>
        <span class="block ${isLarge ? "h-2 w-12" : "h-[5px] w-10"} skew-x-[-20deg] rounded-sm bg-yellow-400"></span>
        <span class="block ${isLarge ? "h-2 w-16" : "h-[5px] w-14"} skew-x-[-20deg] rounded-sm bg-sky-500"></span>
      </span>
    </a>
  `;
}

function sectionTitle(title, extraClass = "") {
  return `<h2 class="text-[36px] font-bold uppercase leading-none tracking-wide text-[#0b3f86] ${extraClass}">${title}</h2>`;
}

function tagMarkup(tag) {
  if (!tag) return "";
  const isHot = tag === "HOT";
  const imgName = isHot ? "game_hot.png" : "game_new.png";
  return `<img src="assets/images/${imgName}" class="absolute -top-1 right-2 w-[72px] h-auto z-10 select-none pointer-events-none transition-all duration-300 group-hover:brightness-0 group-hover:invert" alt="${tag}">`;
}

// ===================== LOAD HEADER & FOOTER COMPONENTS =====================
async function loadComponents() {
  try {
    // Load Header
    const headerResponse = await fetch("Header.html");
    if (headerResponse.ok) {
      const headerContent = await headerResponse.text();
      document.getElementById("header-placeholder").innerHTML = headerContent;
    }

    // Load Footer
    const footerResponse = await fetch("Footer.html");
    if (footerResponse.ok) {
      const footerContent = await footerResponse.text();
      document.getElementById("footer-placeholder").innerHTML = footerContent;
    }
  } catch (error) {
    console.error("Error loading components:", error);
  }
}

// ===================== RENDER NOI DUNG =====================
function renderServiceSection() {
  return `
    <section class="mb-[54px]">
      ${sectionTitle("Dịch vụ", "mb-[30px]")}
      <div class="grid h-[106px] grid-cols-4 items-center overflow-hidden rounded-full border border-slate-100 bg-white shadow-[0_10px_24px_rgba(0,0,0,0.13)]">
        ${serviceItems
      .map(
        (item) => `
              <a href="${item.href}" class="group flex h-16 items-center justify-center gap-2 border-r border-slate-200 px-4 text-[20px] font-semibold uppercase text-[#0070bd] transition last:border-r-0">
                ${item.name === "MYE COIN"
            ? `<img src="assets/images/icon-coin.png" alt="MYE COIN" class="h-8 w-8 object-contain transition-all duration-300 group-hover:opacity-90 group-hover:brightness-[1.15] group-hover:hue-rotate-180">`
            : `<span class="text-[#0070bd] transition-colors duration-300 group-hover:text-[#f26522]">${iconSvg(item.icon, "h-8 w-8")}</span>`
          }
                <span class="whitespace-nowrap text-[#0070bd] transition-colors duration-300 group-hover:text-[#f26522]">${item.name}</span>
              </a>
            `
      )
      .join("")}
      </div>
    </section>
  `;
}

function renderFilterTabs() {
  return `
    <div class="mt-[28px] grid w-full grid-cols-2 gap-2 pb-[28px] sm:grid-cols-3 md:grid-cols-6">
      ${filters
      .map((filter) => {
        const activeClass = filter.active
          ? "bg-[#f7f7f8] border-[#f26522] text-[#f26522] shadow-[0_5px_8px_rgba(0,0,0,0.28)]"
          : "bg-white border-slate-300 hover:border-[#f26522] text-slate-800 hover:text-[#f26522] shadow-[0_5px_8px_rgba(0,0,0,0.28)]";
        const labelClass = "text-current";

        return `
<button class="group flex h-[36px] w-full cursor-pointer items-center justify-between gap-2 rounded-[6px] border px-5 transition-colors duration-300 ${activeClass}">
              <span class="text-[13px] font-bold uppercase tracking-normal transition-colors duration-300 ${labelClass} group-hover:text-[#f26522]">${filter.name}</span>
              <span class="flex h-7 min-w-7 items-center justify-center rounded-full bg-[#e1e3e6] px-2 text-center text-[13px] font-bold text-slate-700 transition-colors duration-300 group-hover:bg-[#f26522] group-hover:text-white">${filter.count}</span>
            </button>
          `;
      })
      .join("")}
    </div>
  `;
}

function renderGameCard(game) {
  const isBoomTank = game.name && game.name.toUpperCase() === "BOOM TANK";
  const isTamQuoc = game.name && game.name === "Hào Khí Tam Quốc";
  const needsCornerFix = isBoomTank || isTamQuoc;

  return `
    <article class="group bg-white rounded-2xl shadow-[0_12px_28px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col h-full transition-all duration-300 hover:bg-[#f26522]">
      <div class="relative p-4 pb-2.5">
        ${tagMarkup(game.tag)}
        <h3 class="text-[#0b3f86] group-hover:text-white font-bold text-[14px] tracking-wide uppercase truncate pr-12 transition-colors duration-300" title="${game.name}">${game.name}</h3>
      </div>

      <div class="px-4 flex-1">
        <p class="text-slate-400 group-hover:text-white text-[11px] font-medium uppercase mb-3 transition-colors duration-300">THỂ LOẠI</p>

        <div class="overflow-hidden rounded-none aspect-square">
          <img
            class="w-full h-full object-cover rounded-none transition-transform duration-300 ease-in-out ${needsCornerFix ? "scale-110 group-hover:scale-125" : "group-hover:scale-105"}"
            src="${game.image}"
            alt="${game.name}"
          >
        </div>
      </div>

      <div class="flex items-center justify-center gap-4 pt-3 pb-4 px-4 border-t border-slate-200 mt-auto transition-all duration-300 group-hover:border-transparent">
        <a href="${game.homeLink}" class="flex items-center gap-1.5 text-[#0b3f86] group-hover:text-white transition-colors duration-300 text-[12px] font-medium">
          <span class="text-current">${iconSvg("home", "h-4 w-4")}</span>
          Trang chủ
        </a>
        <span class="w-[1.5px] h-4 bg-slate-400 mx-3 inline-block group-hover:bg-white/80 transition-colors duration-300"></span>
        <a href="${game.downloadLink}" class="flex items-center gap-1.5 text-[#0b3f86] group-hover:text-white transition-colors duration-300 text-[12px] font-medium">
          <span class="text-current">${iconSvg("download", "h-4 w-4")}</span>
          Tải xuống
        </a>
      </div>
    </article>
  `;
}

function renderGameListSection() {
  const buttonText = "Xem thêm";
  const marginClass = isExpandedGameList ? "mb-6" : "mb-[82px]";

  return `
    <section class="${marginClass}">
      <div class="flex items-center justify-between mb-6">
        ${sectionTitle("Danh sách game")}
        <button id="toggle-more-games" class="flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide text-[#0b3f86] transition hover:text-orange-500">
          ${buttonText}
          ${iconSvg("arrowRight", "h-4 w-4")}
        </button>
      </div>
      ${renderFilterTabs()}
      <div id="game-list-grid" class="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        ${gameListOrder.slice(0, 4).map((game) => renderGameCard(game)).join("")}
      </div>
    </section>
  `;
}

function renderExpandedGameSection() {
  if (!isExpandedGameList) return "";

  return `
    <section class="mb-[82px]">
      <div class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        ${gameListOrder.slice(0, 4).map((game) => renderGameCard(game)).join("")}
      </div>
    </section>
  `;
}

function getDisplayedNewGames() {
  const originalGames = gameListOrder;
  if (currentNewGameSlide === 0) return originalGames;
  return [originalGames[3], originalGames[0], originalGames[1], originalGames[2]];
}

function renderNewGameCardsHtml() {
  return getDisplayedNewGames()
    .map(
      (game) => `
      <div class="min-w-0 flex-1 basis-0">
        ${renderGameCard(game)}
      </div>
    `
    )
    .join("");
}

function renderNewGameSection() {
  return `
    <section class="mb-[82px]">
      <div class="mb-4 flex items-center justify-between">
        ${sectionTitle("Game mới phát hành và sắp ra mắt")}
        <div class="flex gap-3 self-start mt-1.5">
          <button type="button" id="new-game-prev" class="h-11 w-11 rounded-full border border-sky-100 bg-white/85 text-[#0b3f86] grid place-items-center transition-all duration-[180ms] cursor-pointer shadow-[0_1px_4px_rgba(11,63,134,0.06)] hover:border-[#0b3f86] hover:bg-[#f7fbff] disabled:opacity-50 disabled:pointer-events-none ${isExpandedGameList ? "hidden" : ""}">${iconSvg("chevronLeft", "h-4 w-4")}</button>
          <button type="button" id="new-game-next" class="h-11 w-11 rounded-full border border-sky-100 bg-white/85 text-[#0b3f86] grid place-items-center transition-all duration-[180ms] cursor-pointer shadow-[0_1px_4px_rgba(11,63,134,0.06)] hover:border-[#0b3f86] hover:bg-[#f7fbff] disabled:opacity-50 disabled:pointer-events-none ${isExpandedGameList ? "hidden" : ""}">${iconSvg("chevronRight", "h-4 w-4")}</button>
        </div>
      </div>
      <div id="new-game-cards" class="flex w-full gap-4 transition-all duration-700 ease-in-out">
        ${renderNewGameCardsHtml()}
      </div>
    </section>
  `;
}

function updateNewGameNavButtons() {
  const prevBtn = document.getElementById("new-game-prev");
  const nextBtn = document.getElementById("new-game-next");
  if (!prevBtn || !nextBtn) return;

  prevBtn.disabled = currentNewGameSlide === 0;
  nextBtn.disabled = currentNewGameSlide === 1;
}

function setCurrentNewGameSlide(slide) {
  currentNewGameSlide = slide === 1 ? 1 : 0;
  const cards = document.getElementById("new-game-cards");
  if (cards) {
    cards.innerHTML = renderNewGameCardsHtml();
  }
  updateNewGameNavButtons();
}

function renderFeaturedBanner(game, spanClass = "", isSmall = false) {
  const avatarSizeClass = isSmall ? "w-10 h-10 md:w-11 md:h-11" : "w-14 h-14 md:w-16 md:h-16";
  const titleSizeClass = isSmall ? "text-xs md:text-sm" : "text-sm md:text-lg";
  const genreSizeClass = isSmall ? "text-[10px] md:text-xs" : "text-xs md:text-sm";
  const paddingClass = isSmall ? "p-4" : "p-5 md:p-6";
  const spacingClass = isSmall ? "gap-2" : "gap-3";
  const actionsPositionClass = isSmall ? "right-2 bottom-2 md:right-3 md:bottom-3" : "right-4 bottom-4 md:right-5 md:bottom-5";
  const actionTextSizeClass = isSmall ? "text-[9px] md:text-[10px]" : "text-[10px] md:text-xs";

  return `
    <div class="group relative overflow-hidden rounded-2xl shadow-[0_12px_28px_rgba(0,0,0,0.15)] transition-all duration-500 ${spanClass}">
      <!-- Background Image -->
      <img 
        src="${game.banner}" 
        alt="Hào Khí Chiến Hồn" 
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-125"
      >

      <!-- Diagonal overlay (always present, morphs to full overlay on hover) -->
      <div class="absolute inset-y-0 left-0 w-[60%] bg-black/40 [clip-path:polygon(0_0,_100%_0,_75%_100%,_0_100%)] transition-all duration-500 ease-in-out pointer-events-none group-hover:w-full group-hover:bg-black/60 group-hover:[clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)] z-20"></div>

      <!-- Content Container (above overlays) -->
      <div class="absolute inset-0 z-30 pointer-events-none">
        
        <!-- Left column: Avatar and Text block (vertical flex-col aligned to bottom) -->
        <div class="flex flex-col justify-end items-start gap-2 h-full max-w-[55%] ${paddingClass}">
          <!-- Avatar -->
          <a href="${game.homeLink}" class="pointer-events-auto">
            <img 
              src="assets/images/featured-avatar.png" 
              alt="Hào Khí Chiến Hồn Avatar" 
              class="${avatarSizeClass} rounded-[12px] border-2 border-white/90 object-cover shadow-md transition-transform duration-500 ease-in-out group-hover:scale-150 origin-bottom-left"
            >
          </a>

          <!-- Title -->
          <a href="${game.homeLink}" class="pointer-events-auto hover:text-orange-400 transition-colors mt-1">
            <h3 class="text-white font-bold leading-tight truncate ${titleSizeClass} tracking-wide" title="Hào Khí Chiến Hồn">
              Hào Khí Chiến Hồn
            </h3>
          </a>

          <!-- Genre -->
          <span class="text-white/70 ${genreSizeClass} font-medium">
            Thế loại game
          </span>
        </div>

        <!-- Actions (positioned at bottom-right) -->
        <div class="absolute ${actionsPositionClass} flex items-center ${spacingClass} bg-transparent shrink-0 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 pointer-events-auto">
          <a 
            href="${game.homeLink}" 
            class="flex items-center gap-1 text-white hover:underline underline-offset-4 decoration-white transition-all ${actionTextSizeClass} font-bold uppercase tracking-wider whitespace-nowrap"
          >
            ${iconSvg("home", "h-3.5 w-3.5 md:h-4 md:w-4")}
            Trang chủ
          </a>
          <span class="text-white/40 select-none">|</span>
          <a 
            href="${game.downloadLink}" 
            class="flex items-center gap-1 text-white hover:underline underline-offset-4 decoration-white transition-all ${actionTextSizeClass} font-bold uppercase tracking-wider whitespace-nowrap"
          >
            ${iconSvg("download", "h-3.5 w-3.5 md:h-4 md:w-4")}
            Tải xuống
          </a>
        </div>

      </div>
    </div>
  `;
}

function renderFeaturedSection() {
  const featuredGames = games.filter((game) => game.featured);
  // Desired layout (matching mockup): two large banners on top, three smaller below.
  // Use the first 5 games (games[0..4]) as featured slots to ensure unique titles.
  const slots = [
    { span: "md:col-span-3 h-[240px]", idx: 0, isSmall: false },
    { span: "md:col-span-3 h-[240px]", idx: 1, isSmall: false },
    { span: "md:col-span-2 h-[180px]", idx: 2, isSmall: true },
    { span: "md:col-span-2 h-[180px]", idx: 3, isSmall: true },
    { span: "md:col-span-2 h-[180px]", idx: 4, isSmall: true },
  ];

  const sourceGames = featuredGames.length ? featuredGames : games.slice(0, 5);

  const items = slots
    .map((slot) => {
      const game = sourceGames[slot.idx] || sourceGames[0];
      return renderFeaturedBanner(game, `${slot.span} rounded-2xl`, slot.isSmall);
    })
    .join("");

  return `
    <section class="mt-8">
      ${sectionTitle("Game nổi bật", "mb-6")}
      <div class="grid grid-cols-1 gap-4 md:grid-cols-6">
        ${items}
      </div>
    </section>
  `;
}


function bindEvents() {
  const toggleButton = document.getElementById("toggle-more-games");
  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      isExpandedGameList = !isExpandedGameList;
      renderMainContent();
    });
  }

  const prevBtn = document.getElementById("new-game-prev");
  const nextBtn = document.getElementById("new-game-next");
  if (prevBtn) {
    prevBtn.addEventListener("click", () => setCurrentNewGameSlide(0));
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => setCurrentNewGameSlide(1));
  }
  updateNewGameNavButtons();
}

function renderMainContent() {
  const container = document.getElementById("game-container");
  const main = container.closest("main");
  const oldTitle = main.querySelector("h1");

  currentNewGameSlide = 0;

  document.body.className = "min-h-screen bg-white font-sans text-slate-800 antialiased";
  main.className = "mx-auto max-w-[1040px] flex-grow px-0 pb-5 pt-[56px] font-sans antialiased";
  if (oldTitle) oldTitle.className = "hidden";
  container.className = "w-full";
  container.innerHTML = `
    ${renderServiceSection()}
    ${renderGameListSection()}
    ${renderExpandedGameSection()}
    ${renderNewGameSection()}
    ${renderFeaturedSection()}
  `;
  bindEvents();
}
// ===================== KHOI CHAY =====================
document.addEventListener("DOMContentLoaded", async () => {
  await loadComponents();
  renderMainContent();
});
