/* ==========================================================================
   交互逻辑：项目渲染、类别筛选、导航、滚动淡入
   ========================================================================== */

(function () {
  "use strict";

  const worksList = document.getElementById("worksList");
  const filterBar = document.getElementById("filterBar");
  const header = document.getElementById("siteHeader");
  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;

  /* ---------- 0. 深浅色主题 ---------- */

  function getPreferredTheme() {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    const isDark = theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "切换到浅色主题" : "切换到深色主题");
    localStorage.setItem("theme", theme);
  }

  themeToggle.addEventListener("click", function () {
    applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });

  /* ---------- 1. 渲染项目 ---------- */

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function renderWorks() {
    worksList.innerHTML = PROJECTS.map(function (p, i) {
      const num = String(i + 1).padStart(2, "0");
      const link = p.link
        ? '<a class="work-link" href="' + escapeHtml(p.link) +
          '" target="_blank" rel="noopener">查看项目 &rarr;</a>'
        : "";
      return (
        '<article class="work layout-' + escapeHtml(p.layout || "a") + ' reveal" data-category="' +
        escapeHtml(p.category) + '">' +
          '<div class="work-grid">' +
            '<figure class="work-figure" data-category="' + escapeHtml(p.category) + '">' +
              '<img src="' + escapeHtml(p.image) + '" alt="' + escapeHtml(p.title) + ' 项目配图">' +
            "</figure>" +
            '<div class="work-body">' +
              '<div class="work-index">' + num + "</div>" +
              '<p class="work-tag">' + escapeHtml(p.category) + "</p>" +
              '<h3 class="work-title">' + escapeHtml(p.title) + "</h3>" +
              (p.subtitle ? '<p class="work-sub">' + escapeHtml(p.subtitle) + "</p>" : "") +
              '<div class="work-divider"></div>' +
              '<p class="work-desc">' + escapeHtml(p.desc) + "</p>" +
              '<dl class="work-facts">' +
                "<div><dt>技术栈</dt><dd>" + p.tech.map(escapeHtml).join(" / ") + "</dd></div>" +
                "<div><dt>完成时间</dt><dd>" + escapeHtml(p.date) + "</dd></div>" +
                "<div><dt>类别</dt><dd>" + escapeHtml(p.category) + "</dd></div>" +
              "</dl>" +
              link +
            "</div>" +
          "</div>" +
        "</article>"
      );
    }).join("");
  }

  /* ---------- 2. 类别筛选 ---------- */

  function renderFilters() {
    const cats = ["全部"].concat(
      Array.from(new Set(PROJECTS.map(function (p) { return p.category; })))
    );
    filterBar.innerHTML = cats
      .map(function (c, i) {
        const count =
          c === "全部" ? PROJECTS.length : PROJECTS.filter(function (p) { return p.category === c; }).length;
        return (
          '<button class="filter-btn' + (i === 0 ? " is-active" : "") +
          '" type="button" data-filter="' + escapeHtml(c) + '">' +
          escapeHtml(c) + '<span class="filter-count">' + count + "</span></button>"
        );
      })
      .join("");
  }

  function applyFilter(category) {
    let visible = 0;
    worksList.querySelectorAll(".work").forEach(function (el) {
      const show = category === "全部" || el.dataset.category === category;
      el.style.display = show ? "" : "none";
      if (show) visible++;
    });
    let empty = worksList.querySelector(".works-empty");
    if (!visible && !empty) {
      empty = document.createElement("p");
      empty.className = "works-empty";
      empty.textContent = "该类别下暂无作品。";
      worksList.appendChild(empty);
    } else if (visible && empty) {
      empty.remove();
    }
  }

  filterBar.addEventListener("click", function (e) {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    filterBar.querySelectorAll(".filter-btn").forEach(function (b) {
      b.classList.toggle("is-active", b === btn);
    });
    applyFilter(btn.dataset.filter);
  });

  /* ---------- 3. 移动端菜单 ---------- */

  navToggle.addEventListener("click", function () {
    const open = siteNav.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  });

  siteNav.addEventListener("click", function (e) {
    if (e.target.closest(".nav-link")) {
      siteNav.classList.remove("is-open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- 4. 滚动：导航描边 + 当前区域高亮 ---------- */

  const sections = ["works", "about", "contact"].map(function (id) {
    return document.getElementById(id);
  });
  const navLinks = Array.from(siteNav.querySelectorAll(".nav-link"));

  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);

    let current = "";
    sections.forEach(function (sec) {
      if (sec && window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(function (a) {
      a.classList.toggle("is-active", a.getAttribute("href") === "#" + current);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- 5. 滚动淡入 ---------- */

  function initReveal() {
    const targets = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 启动 ---------- */

  applyTheme(getPreferredTheme());
  renderWorks();
  renderFilters();
  initReveal();
  onScroll();
})();
