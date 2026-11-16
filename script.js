/**
 * 北大美食探索指南 (NTPU Food Guide) - 主要互動腳本
 * 負責功能：料理分類篩選、關鍵字即時搜尋、卡片動態渲染、店家詳細資訊彈窗、空結果處理
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- 狀態管理 ---
  let currentCategory = "全部";
  let currentSearchQuery = "";
  let isComposing = false; // 追蹤中文輸入法 (IME) 組字狀態

  // 動態取得餐廳資料庫，具備良好容錯性
  function getRestaurantsData() {
    if (typeof window !== "undefined" && Array.isArray(window.restaurants) && window.restaurants.length > 0) {
      return window.restaurants;
    }
    if (typeof restaurantsData !== "undefined" && Array.isArray(restaurantsData)) {
      return restaurantsData;
    }
    return [];
  }

  // --- DOM 元素快取 ---
  const restaurantGrid = document.getElementById("restaurantGrid");
  const emptyState = document.getElementById("emptyState");
  const resultsCount = document.getElementById("resultsCount");
  const searchInput = document.getElementById("searchInput");
  const searchClearBtn = document.getElementById("searchClearBtn");
  const categoryBtns = document.querySelectorAll(".category-btn");
  const btnResetFilters = document.getElementById("btnResetFilters");

  // Modal 元素
  const modalOverlay = document.getElementById("detailModalOverlay");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalCategory = document.getElementById("modalCategory");
  const modalTitle = document.getElementById("modalTitle");
  const modalPrice = document.getElementById("modalPrice");
  const modalDesc = document.getElementById("modalDesc");
  const modalRecommended = document.getElementById("modalRecommended");
  const modalRecommendedSection = document.getElementById("modalRecommendedSection");
  const modalTags = document.getElementById("modalTags");
  const modalAddress = document.getElementById("modalAddress");
  const modalHours = document.getElementById("modalHours");
  const modalHoursRow = document.getElementById("modalHoursRow");
  const modalGmapsBtn = document.getElementById("modalGmapsBtn");
  const modalStatusBadge = document.getElementById("modalStatusBadge");
  const modalNotice = document.getElementById("modalNotice");

  // 料理類別對應 Emoji 小圖示
  const categoryIconMap = {
    "火鍋": "🍲",
    "中式料理": "🥢",
    "義式料理": "🍝",
    "排餐": "🥩",
    "日式料理": "🍱",
    "麵食": "🍜",
    "蔬食": "🥗",
    "全部": "🍽️"
  };

  /**
   * 工具函式：HTML 特殊字元轉義，防止 XSS
   */
  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /**
   * 核心篩選函式：依目前分類與搜尋關鍵字過濾店家
   * 支援：店名、分類、標籤、簡介、推薦品項、地址之多關鍵字複合搜尋
   */
  function getFilteredRestaurants() {
    const allRestaurants = getRestaurantsData();
    const rawQuery = (searchInput ? searchInput.value : currentSearchQuery) || "";
    const cleanQuery = rawQuery.trim().toLowerCase();

    return allRestaurants.filter((store) => {
      // 1. 分類比對（與目前所選分類共同運作）
      const matchesCategory = (currentCategory === "全部") || (store.category === currentCategory);
      if (!matchesCategory) return false;

      // 若未輸入搜尋字串，直接通過分類比對
      if (!cleanQuery) return true;

      // 支援多關鍵字搜尋（以半形/全形空白、逗點分隔）
      const terms = cleanQuery.split(/[\s,，]+/).filter(Boolean);
      if (terms.length === 0) return true;

      // 每個關鍵字都必須在該店家資訊中匹配
      return terms.every((term) => {
        const inName = (store.name || "").toLowerCase().includes(term);
        const inCategory = (store.category || "").toLowerCase().includes(term);
        const inDesc = (store.description || "").toLowerCase().includes(term);
        const inAddress = (store.address || "").toLowerCase().includes(term);
        const inRecommended = (store.recommended || "").toLowerCase().includes(term);
        const inTags = Array.isArray(store.tags) && store.tags.some((t) => (t || "").toLowerCase().includes(term));

        return inName || inCategory || inDesc || inTags || inRecommended || inAddress;
      });
    });
  }

  /**
   * 渲染店家卡片網格
   */
  function renderRestaurants() {
    const filtered = getFilteredRestaurants();

    // 更新統計數量顯示
    if (resultsCount) {
      resultsCount.innerHTML = `目前共找到 <strong>${filtered.length}</strong> 家推薦美食`;
    }

    // 處理查無結果空狀態
    if (filtered.length === 0) {
      restaurantGrid.innerHTML = "";
      restaurantGrid.style.display = "none";
      if (emptyState) emptyState.style.display = "block";
      return;
    }

    // 顯示卡片列表
    restaurantGrid.style.display = "grid";
    if (emptyState) emptyState.style.display = "none";

    const cardsHtml = filtered.map((store) => {
      const catIcon = categoryIconMap[store.category] || "🍴";
      const tagsHtml = (store.tags || [])
        .map((tag) => `<span class="tag-item"># ${escapeHtml(tag)}</span>`)
        .join("");
      const statusBadgeHtml = store.isDemo
        ? `<span class="demo-badge">示範資料 🏷️</span>`
        : `<span class="verified-badge">公開地標 📍</span>`;

      return `
        <article class="restaurant-card" data-id="${escapeHtml(store.id)}" tabindex="0" role="button" aria-label="查看 ${escapeHtml(store.name)} 詳細資訊">
          <div>
            <div class="card-badges">
              <span class="category-tag">${catIcon} ${escapeHtml(store.category)}</span>
              ${statusBadgeHtml}
            </div>

            <div class="card-header-main">
              <h2 class="store-name">${escapeHtml(store.name)}</h2>
              <span class="price-pill">💰 ${escapeHtml(store.priceRange)}</span>
            </div>

            <p class="store-desc">${escapeHtml(store.description)}</p>

            <div class="card-tags">
              ${tagsHtml}
            </div>
          </div>

          <div class="card-footer">
            <span class="store-address-preview" title="${escapeHtml(store.address)}">
              📍 ${escapeHtml(store.address)}
            </span>
            <button type="button" class="card-action-btn" tabindex="-1">
              查看詳情 ➔
            </button>
          </div>
        </article>
      `;
    }).join("");

    restaurantGrid.innerHTML = cardsHtml;

    // 為所有卡片綁定點擊與鍵盤事件
    const cards = restaurantGrid.querySelectorAll(".restaurant-card");
    const allRestaurants = getRestaurantsData();
    cards.forEach((card) => {
      const storeId = card.getAttribute("data-id");
      const storeData = allRestaurants.find((s) => s.id === storeId);

      const triggerOpen = () => {
        if (storeData) openModal(storeData);
      };

      card.addEventListener("click", triggerOpen);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          triggerOpen();
        }
      });
    });
  }

  /**
   * 開啟店家詳細資訊彈窗 (Modal)
   */
  function openModal(store) {
    const catIcon = categoryIconMap[store.category] || "🍴";
    
    modalCategory.textContent = `${catIcon} ${store.category}`;
    modalTitle.textContent = store.name;
    modalPrice.textContent = `💰 價位：${store.priceRange}`;
    modalDesc.textContent = store.description;

    // 狀態標籤與提示文字
    if (modalStatusBadge) {
      modalStatusBadge.className = store.isDemo ? "demo-badge" : "verified-badge";
      modalStatusBadge.textContent = store.isDemo ? "示範資料 🏷️" : "公開地標 📍";
    }

    if (modalNotice) {
      if (store.isDemo) {
        modalNotice.className = "modal-demo-notice";
        modalNotice.textContent = "⚠️ 本店家為初期功能展示示範資料；地址為北大周邊參考示意，點擊下方按鈕將於 Google Maps 搜尋相關地標，非真實店家單一定位。";
      } else {
        modalNotice.className = "modal-verified-notice";
        modalNotice.textContent = "ℹ️ 本店家資訊源自公開地標與登記資料；營業時間、價位與現場供應請以店家官方公告為準。";
      }
    }

    // 推薦品項
    if (store.recommended) {
      modalRecommended.textContent = store.recommended;
      modalRecommendedSection.style.display = "block";
    } else {
      modalRecommendedSection.style.display = "none";
    }

    // 標籤列表
    if (Array.isArray(store.tags) && store.tags.length > 0) {
      modalTags.innerHTML = store.tags
        .map((tag) => `<span class="tag-item"># ${escapeHtml(tag)}</span>`)
        .join("");
    } else {
      modalTags.innerHTML = `<span class="tag-item">北大校園好味</span>`;
    }

    // 地址與營業時間
    modalAddress.textContent = store.address || "台北大學三峽校區周邊商圈";
    if (store.openingHours) {
      modalHours.textContent = store.openingHours;
      modalHoursRow.style.display = "flex";
    } else {
      modalHoursRow.style.display = "none";
    }

    // Google Maps 連結產生邏輯 (標準協定 + encodeURIComponent 確保中文編碼完全正確)
    // 依規範：店名加上完整地址組合成搜尋文字
    const searchQuery = store.address ? `${store.name} ${store.address}` : `${store.name} 三峽`;
    const standardGmapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`;

    if (modalGmapsBtn) {
      modalGmapsBtn.href = standardGmapsUrl;
      modalGmapsBtn.target = "_blank";
      modalGmapsBtn.rel = "noopener noreferrer";
      modalGmapsBtn.setAttribute("title", `在 Google Maps 查看「${store.name}」位置（另開新分頁）`);
      modalGmapsBtn.innerHTML = `<span>在 Google Maps 查看店家位置 ↗</span>`;
    }

    // 顯示彈窗並鎖定背景滾動
    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
    if (modalCloseBtn) modalCloseBtn.focus();
  }

  /**
   * 關閉詳細資訊彈窗
   */
  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  /**
   * 搜尋變更處理函式
   */
  function handleSearchChange() {
    if (isComposing) return; // 中文組字未完成時不中斷，等待選字完成

    const query = searchInput ? searchInput.value : "";
    currentSearchQuery = query;

    if (searchClearBtn) {
      searchClearBtn.style.display = query.trim().length > 0 ? "inline-flex" : "none";
    }

    renderRestaurants();
  }

  // --- 事件監聽 ---

  // 1. 分類按鈕切換 (支援保留當前搜尋或即時連動)
  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      categoryBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.getAttribute("data-category") || "全部";
      renderRestaurants();
    });
  });

  // 2. 搜尋輸入監聽 (完整支援中文注音/拼音等輸入法 IME 及清空即時響應)
  if (searchInput) {
    // 中文輸入法組字開始
    searchInput.addEventListener("compositionstart", () => {
      isComposing = true;
    });

    // 中文輸入法選字完成
    searchInput.addEventListener("compositionend", () => {
      isComposing = false;
      handleSearchChange();
    });

    // 即時輸入、刪除與貼上
    searchInput.addEventListener("input", () => {
      handleSearchChange();
    });

    // 失去焦點或內容變更
    searchInput.addEventListener("change", () => {
      handleSearchChange();
    });

    // 按下 Enter 立即確認搜尋
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        isComposing = false;
        handleSearchChange();
      }
    });
  }

  // 3. 清除搜尋按鈕
  if (searchClearBtn) {
    searchClearBtn.addEventListener("click", () => {
      if (searchInput) {
        searchInput.value = "";
      }
      currentSearchQuery = "";
      searchClearBtn.style.display = "none";
      if (searchInput) searchInput.focus();
      renderRestaurants(); // 清空後立即恢復目前分類清單
    });
  }

  // 4. 重設所有篩選按鈕 (空狀態按鈕)
  if (btnResetFilters) {
    btnResetFilters.addEventListener("click", () => {
      currentCategory = "全部";
      currentSearchQuery = "";
      if (searchInput) searchInput.value = "";
      if (searchClearBtn) searchClearBtn.style.display = "none";

      categoryBtns.forEach((b) => {
        b.classList.toggle("active", b.getAttribute("data-category") === "全部");
      });

      renderRestaurants();
    });
  }

  // 5. 彈窗關閉事件
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }

  // 點擊遮罩背景關閉
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  // 按下 ESC 鍵關閉彈窗
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });

  // --- 初始渲染 ---
  renderRestaurants();
});
