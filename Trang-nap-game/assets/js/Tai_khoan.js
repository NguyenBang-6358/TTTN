/**
 * Tai_khoan.js
 * Account Management functionality: component loading, auth state, profile editing, phone verification, and sync state.
 */

document.addEventListener("DOMContentLoaded", async function () {
  await loadComponents();
  initAuthToggle();
  initNavTabs();
  initEditProfileModal();
  initVerifyPhoneModal();
  initSyncAccount();
  initAccountSyncAccordion();
  initActivityHistoryAccordion();
});

/**
 * Loads Footer.html dynamically into container
 */
async function loadComponents() {
  const footerContainer = document.getElementById("footer-container");

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
        <footer class="mye-footer pt-4 pb-2 bg-light-gray text-center text-secondary">
          <div class="container d-flex flex-column align-items-center">
            <div class="mb-2">
              <img src="../assets/images/Nap_Game/logo.png" alt="MyE Logo" class="mye-footer-logo" width="150" height="150">
            </div>
            <p class="mb-1">Email: <a href="mailto:hotro@mye.vn" class="text-secondary text-decoration-none">hotro@mye.vn</a></p>
            <p class="mb-1">Hotline: <a href="tel:0902500198" class="text-secondary text-decoration-none">0902 500 198</a></p>
            <h6 class="fw-bold text-dark text-uppercase mb-1">CÔNG TY CỔ PHẦN MYE</h6>
            <p class="mb-1">Chịu trách nhiệm quản lý nội dung: Ông Lâm Trung Hiệp</p>
            <p class="mb-1">Địa chỉ: 477/22 Âu Cơ, Phường Phú Trung, Quận Tân Phú, Thành phố Hồ Chí Minh, Việt Nam</p>
            <p class="mb-1">Giấy phép G1 số: Số 297/GP-BTTTT, Ngày cấp 14/07/2020, Nơi cấp Bộ Thông Tin và Truyền Thông</p>
            <div class="mb-1">
              <a href="#" class="text-secondary text-decoration-none me-2">Điều khoản dịch vụ</a> | 
              <a href="#" class="text-secondary text-decoration-none ms-2">Chính sách bảo mật</a>
            </div>
            <p class="mb-0 text-muted">&copy;Copyright &copy; 2026 MYE. All Rights Reserved.</p>
          </div>
        </footer>`;
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

  // Restore auth state from localStorage (default to logged in on account page)
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === null) {
    localStorage.setItem("isLoggedIn", "true");
    isLoggedIn = "true";
  }

  if (isLoggedIn === "true") {
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
    if (userDropdownMenu && !userDropdownMenu.classList.contains("d-none")) {
      if (!userProfileBar.contains(e.target)) {
        userDropdownMenu.classList.add("d-none");
      }
    }
  });
}

/**
 * Edit Profile Inline Card Logic
 */
function initEditProfileModal() {
  const btnEdit = document.getElementById("btn-edit-profile");
  const editActions = document.getElementById("profile-edit-actions");
  const btnCancel = document.getElementById("btn-cancel-profile-edit");
  const btnSave = document.getElementById("btn-save-profile-edit");

  // Value Spans
  const valFullname = document.getElementById("val-fullname");
  const valGender = document.getElementById("val-gender");
  const valDob = document.getElementById("val-dob");
  const valAddress = document.getElementById("val-address");

  // Edit Inputs
  const inputFullname = document.getElementById("edit-fullname");
  const wrapperGender = document.getElementById("edit-gender-wrapper");
  const selectGender = document.getElementById("edit-gender");
  const wrapperDob = document.getElementById("edit-dob-wrapper");
  const inputDob = document.getElementById("edit-dob");
  const inputAddress = document.getElementById("edit-address");

  if (!btnEdit) return;

  function showEditMode() {
    // Fill current values into inputs
    if (inputFullname && valFullname) inputFullname.value = valFullname.textContent.trim();
    if (selectGender && valGender) selectGender.value = valGender.textContent.trim();
    if (inputDob && valDob) inputDob.value = valDob.textContent.trim();
    if (inputAddress && valAddress) inputAddress.value = valAddress.textContent.trim();

    // Toggle Header Action Buttons
    btnEdit.classList.add("d-none");
    if (editActions) {
      editActions.classList.remove("d-none");
      editActions.classList.add("d-flex");
    }

    // Hide Spans, Show Inputs
    if (valFullname) valFullname.classList.add("d-none");
    if (inputFullname) inputFullname.classList.remove("d-none");

    if (valGender) valGender.classList.add("d-none");
    if (wrapperGender) wrapperGender.classList.remove("d-none");

    if (valDob) valDob.classList.add("d-none");
    if (wrapperDob) wrapperDob.classList.remove("d-none");

    if (valAddress) valAddress.classList.add("d-none");
    if (inputAddress) inputAddress.classList.remove("d-none");
  }

  function hideEditMode() {
    // Toggle Header Action Buttons
    if (editActions) {
      editActions.classList.remove("d-flex");
      editActions.classList.add("d-none");
    }
    btnEdit.classList.remove("d-none");

    // Show Spans, Hide Inputs
    if (valFullname) valFullname.classList.remove("d-none");
    if (inputFullname) inputFullname.classList.add("d-none");

    if (valGender) valGender.classList.remove("d-none");
    if (wrapperGender) wrapperGender.classList.add("d-none");

    if (valDob) valDob.classList.remove("d-none");
    if (wrapperDob) wrapperDob.classList.add("d-none");

    if (valAddress) valAddress.classList.remove("d-none");
    if (inputAddress) inputAddress.classList.add("d-none");
  }

  btnEdit.addEventListener("click", showEditMode);

  if (btnCancel) {
    btnCancel.addEventListener("click", hideEditMode);
  }

  if (btnSave) {
    btnSave.addEventListener("click", function () {
      const newName = inputFullname ? inputFullname.value.trim() : "";
      const newGender = selectGender ? selectGender.value.trim() : "";
      const newDob = inputDob ? inputDob.value.trim() : "";
      const newAddress = inputAddress ? inputAddress.value.trim() : "";

      if (newName && valFullname) {
        valFullname.textContent = newName;
        const heroName = document.getElementById("hero-user-fullname");
        if (heroName) heroName.textContent = newName;
      }
      if (newGender && valGender) valGender.textContent = newGender;
      if (newDob && valDob) valDob.textContent = newDob;
      if (newAddress && valAddress) valAddress.textContent = newAddress;

      hideEditMode();
    });
  }
}

/**
 * Verify Phone Modal Logic
 */
function initVerifyPhoneModal() {
  const btnVerifyPhone = document.getElementById("btn-verify-phone");
  const modalPhone = document.getElementById("modal-verify-phone");
  const btnClosePhoneModal = document.getElementById("btn-close-phone-modal");
  const formPhone = document.getElementById("form-verify-phone");

  if (!btnVerifyPhone) return;

  // Do nothing when clicking "Liên kết xác thực" button as requested
  btnVerifyPhone.addEventListener("click", function (e) {
    e.preventDefault();
  });

  if (btnClosePhoneModal) {
    btnClosePhoneModal.addEventListener("click", function () {
      modalPhone.classList.add("d-none");
    });
  }

  if (formPhone) {
    formPhone.addEventListener("submit", function (e) {
      e.preventDefault();
      const phoneNum = document.getElementById("input-phone-number").value.trim();

      if (phoneNum) {
        const phoneValContainer = document.getElementById("phone-value-container");
        phoneValContainer.innerHTML = `
          <span class="fw-bold text-dark me-2">${phoneNum}</span>
          <span class="check-icon-circle">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
        `;
        showToast("Xác thực số điện thoại thành công!");
      }
      modalPhone.classList.add("d-none");
    });
  }
}

/**
 * Account Sync Logic
 */
function initSyncAccount() {
  // Disabled direct click toggle on status badge
}

/**
 * Helper to display temporary toast message
 */
function showToast(msg) {
  const toast = document.createElement("div");
  toast.className = "position-fixed bottom-0 end-0 p-3";
  toast.style.zIndex = "9999";
  toast.innerHTML = `
    <div class="toast show align-items-center text-white bg-success border-0 rounded-3 shadow-lg" role="alert">
      <div class="d-flex">
        <div class="toast-body fw-bold">
          ${msg}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" onclick="this.parentElement.parentElement.remove()"></button>
      </div>
    </div>
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    if (toast.parentElement) toast.remove();
  }, 3500);
}

/**
 * Tab switching logic for banner buttons (Tài khoản, Bảo mật, Lịch sử giao dịch)
 */
function initNavTabs() {
  const tabs = document.querySelectorAll(".account-nav-btn");
  tabs.forEach((tab) => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();
      tabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
    });
  });
}

/**
 * Activity History Accordion toggle & session logout action
 */
function initActivityHistoryAccordion() {
  const headerToggle = document.getElementById("toggle-activity-history");
  const btnToggle = document.getElementById("btn-toggle-activity");
  const content = document.getElementById("activity-history-content");
  const btnLogoutAll = document.getElementById("btn-logout-all-sessions");

  if (!content) return;

  function toggleAccordion(e) {
    if (e) e.preventDefault();
    const isHidden = content.classList.contains("d-none");
    if (isHidden) {
      content.classList.remove("d-none");
      if (btnToggle) btnToggle.classList.add("expanded");
    } else {
      content.classList.add("d-none");
      if (btnToggle) btnToggle.classList.remove("expanded");
    }
  }

  if (headerToggle) {
    headerToggle.addEventListener("click", toggleAccordion);
  }

  if (btnLogoutAll) {
    btnLogoutAll.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
    });
  }
}

/**
 * Account Sync Accordion Logic
 */
function initAccountSyncAccordion() {
  const headerToggle = document.getElementById("toggle-account-sync-header");
  const btnToggle = document.getElementById("btn-toggle-account-sync");
  const summaryBox = document.getElementById("sync-summary-box");
  const expandedContent = document.getElementById("account-sync-content");
  const formSync = document.getElementById("form-account-sync");

  if (!expandedContent) return;

  function toggleAccordion(e) {
    if (e) e.preventDefault();
    const isExpanded = !expandedContent.classList.contains("d-none");

    if (isExpanded) {
      // Collapse: show summary box, hide expanded content
      expandedContent.classList.add("d-none");
      if (summaryBox) summaryBox.classList.remove("d-none");
      if (btnToggle) btnToggle.classList.remove("expanded");
    } else {
      // Expand: hide summary box, show expanded content
      if (summaryBox) summaryBox.classList.add("d-none");
      expandedContent.classList.remove("d-none");
      if (btnToggle) btnToggle.classList.add("expanded");
    }
  }

  if (headerToggle) {
    headerToggle.addEventListener("click", toggleAccordion);
  }

  if (btnToggle) {
    btnToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleAccordion(e);
    });
  }

  const syncedCases = {
    facebook: false,
    google: false,
    mye: false
  };

  const syncedUsernames = {
    facebook: "myepro456",
    google: "myepro456",
    mye: "myepro456"
  };

  let currentSyncCase = "facebook";

  const btnSubmitSync = document.getElementById("btn-submit-sync");

  function performSync() {
    const userInput = document.getElementById("sync-mye-username");
    const typedUser = (userInput && userInput.value.trim()) ? userInput.value.trim() : "myepro456";

    syncedCases[currentSyncCase] = true;
    syncedUsernames[currentSyncCase] = typedUser;

    updateCaseView(currentSyncCase);
  }

  if (btnSubmitSync) {
    btnSubmitSync.addEventListener("click", performSync);
  }

  if (formSync) {
    formSync.addEventListener("submit", function (e) {
      e.preventDefault();
      performSync();
    });
  }

  // --- Account Sync Dropdown & Case Switching Logic ---
  const triggerSummary = document.getElementById("account-dropdown-trigger-summary");
  const triggerExpanded = document.getElementById("account-dropdown-trigger-expanded");
  const dropdownMenu = document.getElementById("account-sync-dropdown-menu");
  const dropdownOptions = document.querySelectorAll(".account-dropdown-option");

  function toggleDropdown(e) {
    if (e) e.stopPropagation();
    if (!dropdownMenu) return;

    const isHidden = dropdownMenu.classList.contains("d-none");
    if (isHidden) {
      dropdownMenu.classList.remove("d-none");
      if (triggerSummary) triggerSummary.classList.add("active-open");
      if (triggerExpanded) triggerExpanded.classList.add("active-open");
    } else {
      dropdownMenu.classList.add("d-none");
      if (triggerSummary) triggerSummary.classList.remove("active-open");
      if (triggerExpanded) triggerExpanded.classList.remove("active-open");
    }
  }

  function closeDropdown() {
    if (dropdownMenu) dropdownMenu.classList.add("d-none");
    if (triggerSummary) triggerSummary.classList.remove("active-open");
    if (triggerExpanded) triggerExpanded.classList.remove("active-open");
  }

  if (triggerSummary) {
    triggerSummary.addEventListener("click", toggleDropdown);
  }

  if (triggerExpanded) {
    triggerExpanded.addEventListener("click", toggleDropdown);
  }

  document.addEventListener("click", function (e) {
    if (dropdownMenu && !dropdownMenu.contains(e.target) &&
        (!triggerSummary || !triggerSummary.contains(e.target)) &&
        (!triggerExpanded || !triggerExpanded.contains(e.target))) {
      closeDropdown();
    }
  });

  const fbSvg = `<div class="facebook-icon-bg" style="width: 48px; height: 48px;">
    <svg width="48" height="48" viewBox="0 0 46 46" fill="none">
      <circle cx="23" cy="23" r="23" fill="#1877F2" />
      <path d="M30.5 23H25.25V38.5H19V23H16V17.75H19V14.5C19 11.6 21.1 9.25 24.75 9.25H29.5V14.5H26.375C25.5 14.5 25.25 16 25.25 16.125V17.75H30L30.5 23Z" fill="white" />
    </svg>
  </div>`;

  const ggSvg = `<div class="google-icon-bg" style="width: 48px; height: 48px;">
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
      <path fill="#FBBC05" d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z"/>
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"/>
    </svg>
  </div>`;

  const myeSvg = `<div class="mye-placeholder-avatar" style="width: 48px; height: 48px; border-radius: 10px; background: #DCE6F5; display: flex; align-items: center; justify-content: center;">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#0C3875">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 9a7 7 0 1 1 14 0H5z" />
    </svg>
  </div>`;

  function updateCaseView(cName) {
    dropdownOptions.forEach((opt) => {
      const isCurrent = opt.getAttribute("data-sync-case") === cName;
      opt.classList.toggle("active", isCurrent);
      const chk = opt.querySelector(".check-mark");
      if (chk) chk.classList.toggle("d-none", !isCurrent);
    });

    const summaryLeftIcon = document.getElementById("summary-left-icon");
    const summaryLeftName = document.getElementById("summary-left-name");
    const summaryLeftId = document.getElementById("summary-left-id");

    const expandedLeftIcon = document.getElementById("expanded-left-icon");
    const expandedLeftName = document.getElementById("expanded-left-name");
    const expandedLeftSub = document.getElementById("expanded-left-sub");
    const expandedLeftId = document.getElementById("expanded-left-id");

    const syncedLeftIcon = document.getElementById("synced-left-icon");
    const syncedLeftName = document.getElementById("synced-left-name");
    const syncedLeftSub = document.getElementById("synced-left-sub");
    const syncedLeftId = document.getElementById("synced-left-id");

    const myeSyncNameTitle = document.getElementById("mye-sync-name-title");
    const myeSyncStatusTitle = document.getElementById("mye-sync-status-title");
    const btnSyncAction = document.getElementById("btn-sync-action");

    const formContainer = document.getElementById("sync-form-container");
    const successView = document.getElementById("sync-success-view");

    const syncFormSection = document.getElementById("sync-form-section");
    const myeUnavailableBanner = document.getElementById("mye-unavailable-banner");

    const isSynced = syncedCases[cName];
    const username = syncedUsernames[cName] || "myepro456";

    // 1. Update Left Card Info
    if (cName === "facebook") {
      if (summaryLeftIcon) summaryLeftIcon.innerHTML = fbSvg;
      if (summaryLeftName) summaryLeftName.textContent = "Nguyễn Văn A";
      if (summaryLeftId) summaryLeftId.textContent = "fb.231244";

      if (expandedLeftIcon) expandedLeftIcon.innerHTML = fbSvg;
      if (expandedLeftName) expandedLeftName.textContent = "Nguyễn Văn A";
      if (expandedLeftSub) {
        expandedLeftSub.textContent = "facebook.com/nguyenvana";
        expandedLeftSub.classList.remove("d-none");
      }
      if (expandedLeftId) expandedLeftId.textContent = "fb.01020";

      if (syncedLeftIcon) syncedLeftIcon.innerHTML = fbSvg;
      if (syncedLeftName) syncedLeftName.textContent = "Nguyễn Văn A";
      if (syncedLeftSub) {
        syncedLeftSub.textContent = "facebook.com/nguyenvana";
        syncedLeftSub.classList.remove("d-none");
      }
      if (syncedLeftId) syncedLeftId.textContent = "fb.01020";

    } else if (cName === "google") {
      if (summaryLeftIcon) summaryLeftIcon.innerHTML = ggSvg;
      if (summaryLeftName) summaryLeftName.textContent = "Nguyễn Văn A";
      if (summaryLeftId) summaryLeftId.textContent = "gg.01020";

      if (expandedLeftIcon) expandedLeftIcon.innerHTML = ggSvg;
      if (expandedLeftName) expandedLeftName.textContent = "Nguyễn Văn A";
      if (expandedLeftSub) {
        expandedLeftSub.textContent = "nguyenvana@gmail.com";
        expandedLeftSub.classList.remove("d-none");
      }
      if (expandedLeftId) expandedLeftId.textContent = "gg.01020";

      if (syncedLeftIcon) syncedLeftIcon.innerHTML = ggSvg;
      if (syncedLeftName) syncedLeftName.textContent = "Nguyễn Văn A";
      if (syncedLeftSub) {
        syncedLeftSub.textContent = "nguyenvana@gmail.com";
        syncedLeftSub.classList.remove("d-none");
      }
      if (syncedLeftId) syncedLeftId.textContent = "gg.01020";

    } else if (cName === "mye") {
      if (summaryLeftIcon) summaryLeftIcon.innerHTML = myeSvg;
      if (summaryLeftName) summaryLeftName.textContent = "Tài khoản MYE";
      if (summaryLeftId) summaryLeftId.textContent = "myepro1123";

      if (expandedLeftIcon) expandedLeftIcon.innerHTML = myeSvg;
      if (expandedLeftName) expandedLeftName.textContent = "Tài khoản MYE";
      if (expandedLeftSub) expandedLeftSub.classList.add("d-none");
      if (expandedLeftId) expandedLeftId.textContent = "myepro1123";

      if (syncedLeftIcon) syncedLeftIcon.innerHTML = myeSvg;
      if (syncedLeftName) syncedLeftName.textContent = "Tài khoản MYE";
      if (syncedLeftSub) syncedLeftSub.classList.add("d-none");
      if (syncedLeftId) syncedLeftId.textContent = "myepro1123";
    }

    // 2. Update Synced vs Unsynced View for this case
    if (isSynced) {
      if (formContainer) formContainer.classList.add("d-none");
      if (successView) successView.classList.remove("d-none");

      const syncedTextElem = document.getElementById("synced-mye-username-text");
      if (syncedTextElem) syncedTextElem.textContent = username;

      if (btnSyncAction) {
        btnSyncAction.textContent = "Đã đồng bộ";
        btnSyncAction.style.background = "#DCFCE7";
        btnSyncAction.style.color = "#166534";
        btnSyncAction.style.cursor = "default";
      }

      if (myeSyncNameTitle) {
        myeSyncNameTitle.style.display = "block";
        myeSyncNameTitle.textContent = "Tài khoản MYE";
      }

      if (myeSyncStatusTitle) {
        myeSyncStatusTitle.textContent = username;
        myeSyncStatusTitle.className = "sync-id";
        myeSyncStatusTitle.style.fontSize = "12px";
        myeSyncStatusTitle.style.color = "#94A3B8";
        myeSyncStatusTitle.style.maxWidth = "none";
        myeSyncStatusTitle.style.lineHeight = "normal";
      }

    } else {
      if (formContainer) formContainer.classList.remove("d-none");
      if (successView) successView.classList.add("d-none");

      if (cName === "mye") {
        if (myeSyncNameTitle) myeSyncNameTitle.style.display = "none";
        if (myeSyncStatusTitle) {
          myeSyncStatusTitle.textContent = "Chỉ khả dụng với tài khoản đăng nhập qua Facebook hoặc Google.";
          myeSyncStatusTitle.className = "sync-id text-secondary font-12 fw-medium";
          myeSyncStatusTitle.style.fontSize = "12px";
          myeSyncStatusTitle.style.maxWidth = "220px";
          myeSyncStatusTitle.style.lineHeight = "1.35";
          myeSyncStatusTitle.style.color = "#475569";
        }

        if (btnSyncAction) {
          btnSyncAction.textContent = "Không khả dụng";
          btnSyncAction.style.background = "#BEBEBE";
          btnSyncAction.style.color = "#4E4E4E";
          btnSyncAction.style.cursor = "not-allowed";
        }

        if (syncFormSection) syncFormSection.classList.add("d-none");
        if (myeUnavailableBanner) myeUnavailableBanner.classList.remove("d-none");

      } else {
        if (myeSyncNameTitle) myeSyncNameTitle.style.display = "none";
        if (myeSyncStatusTitle) {
          myeSyncStatusTitle.textContent = "Chưa có tài khoản MYE";
          myeSyncStatusTitle.className = "sync-id text-dark fw-bold";
          myeSyncStatusTitle.style.fontSize = "14px";
          myeSyncStatusTitle.style.maxWidth = "none";
          myeSyncStatusTitle.style.lineHeight = "normal";
        }

        if (btnSyncAction) {
          btnSyncAction.textContent = "Chưa đồng bộ";
          btnSyncAction.style.background = "#F6C5C6";
          btnSyncAction.style.color = "#D33033";
          btnSyncAction.style.cursor = "default";
        }

        if (syncFormSection) syncFormSection.classList.remove("d-none");
        if (myeUnavailableBanner) myeUnavailableBanner.classList.add("d-none");
      }
    }
  }

  function switchSyncCase(cName) {
    currentSyncCase = cName;
    updateCaseView(cName);
    closeDropdown();
  }

  dropdownOptions.forEach((opt) => {
    opt.addEventListener("click", function (e) {
      e.stopPropagation();
      const caseVal = this.getAttribute("data-sync-case");
      if (caseVal) switchSyncCase(caseVal);
    });
  });
}

