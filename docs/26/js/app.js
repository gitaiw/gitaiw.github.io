/*
====================
 * 2026
 * js header, js sidebar
 * published: aiw.boo
====================
 */

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");
  const content = document.querySelector(".content-wrapper");

  if (!header || !content) return;

  let lastScrollTop = 0;

  content.addEventListener("scroll", function () {
    let currentScroll = content.scrollTop;

    if (currentScroll > lastScrollTop) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });
});

/*
====================
 * 
 * sidebar
 * 
====================
 */

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const main = document.getElementById("main");
  const overlay = document.getElementById("overlay");
  const menuBtn = document.getElementById("menuBtn");

  if (!sidebar || !main || !overlay || !menuBtn) {
    console.warn("Sidebar elements not found. Script stopped safely.");
    return;
  }

  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  let sidebarWidth = 0;

  let hasMoved = false;
  const dragThreshold = 50;

  function updateWidth() {
    sidebarWidth = sidebar.offsetWidth;
  }

  function setPosition(x) {
    sidebar.style.transform = `translateX(${x - sidebarWidth}px)`;
    main.style.transform = `translateX(${x}px)`;
  }

  function openSidebar() {
    updateWidth();

    sidebar.classList.add("active");
    overlay.classList.add("active");
    menuBtn.classList.add("sidebar-open");

    sidebar.style.transition = "transform 0.3s cubic-bezier(.4,0,.2,1)";
    main.style.transition = "transform 0.3s cubic-bezier(.4,0,.2,1)";

    sidebar.style.transform = `translateX(0px)`;
    main.style.transform = `translateX(${sidebarWidth}px)`;
  }

  function closeSidebar() {
    updateWidth();

    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    menuBtn.classList.remove("sidebar-open");

    sidebar.style.transition = "transform 0.3s cubic-bezier(.4,0,.2,1)";
    main.style.transition = "transform 0.3s cubic-bezier(.4,0,.2,1)";

    sidebar.style.transform = `translateX(-${sidebarWidth}px)`;
    main.style.transform = `translateX(0px)`;
  }

  menuBtn.addEventListener("click", () => {
    sidebar.classList.contains("active") ? closeSidebar() : openSidebar();
  });

  overlay.addEventListener("click", closeSidebar);

  document.addEventListener("touchstart", (e) => {
    updateWidth();
    startX = e.touches[0].clientX;
    currentX = startX;
    isDragging = true;
    hasMoved = false;

    sidebar.style.willChange = "transform";
    main.style.willChange = "transform";

    sidebar.style.transition = "none";
    main.style.transition = "none";
  });

  document.addEventListener("touchmove", (e) => {
    if (!isDragging) return;

    currentX = e.touches[0].clientX;
    let diff = currentX - startX;

    if (!hasMoved) {
      if (Math.abs(diff) < dragThreshold) return;
      hasMoved = true;
      startX = currentX;
      return;
    }

    let position;

    if (sidebar.classList.contains("active")) {
      position = Math.min(sidebarWidth, Math.max(sidebarWidth + diff, 0));
    } else {
      position = Math.min(sidebarWidth, Math.max(diff, 0));
    }

    setPosition(position);
  });

  document.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;

    sidebar.style.transition = "transform 0.3s cubic-bezier(.4,0,.2,1)";
    main.style.transition = "transform 0.3s cubic-bezier(.4,0,.2,1)";

    sidebar.style.willChange = "auto";
    main.style.willChange = "auto";

    const moved = currentX - startX;

    if (moved > sidebarWidth / 3) {
      openSidebar();
    } else if (moved < -sidebarWidth / 3) {
      closeSidebar();
    } else {
      sidebar.classList.contains("active") ? openSidebar() : closeSidebar();
    }
  });
});
