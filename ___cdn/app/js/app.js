/*
====================
 * @2026
 * js header, js sidebar
 * published: aiw.boo
====================
 */

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

  if (!sidebar || !main || !overlay || !menuBtn) return;

  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let isDragging = false;
  let sidebarWidth = 0;

  let hasMoved = false;
  const dragThreshold = 50;

  let isDirectionLocked = false;
  let isHorizontal = false;

  function updateWidth() {
    sidebarWidth = sidebar.offsetWidth;
  }

  function lockScroll() {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }

  function unlockScroll() {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
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

    lockScroll();

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

    unlockScroll();

    sidebar.style.transition = "transform 0.3s cubic-bezier(.4,0,.2,1)";
    main.style.transition = "transform 0.3s cubic-bezier(.4,0,.2,1)";

    sidebar.style.transform = `translateX(-${sidebarWidth}px)`;
    main.style.transform = `translateX(0px)`;

    main.style.transform = "";
    main.style.transition = "";
    sidebar.style.transform = "";
    sidebar.style.transition = "";
  }

  menuBtn.addEventListener("click", () => {
    sidebar.classList.contains("active") ? closeSidebar() : openSidebar();
  });

  overlay.addEventListener("click", closeSidebar);

  document.addEventListener("touchstart", (e) => {
    updateWidth();

    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    currentX = startX;

    isDragging = true;
    hasMoved = false;

    isDirectionLocked = false;
    isHorizontal = false;

    sidebar.style.willChange = "transform";
    main.style.willChange = "transform";

    sidebar.style.transition = "none";
    main.style.transition = "none";
  });

  document.addEventListener("touchmove", (e) => {
    if (!isDragging) return;

    currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;

    let diffX = currentX - startX;
    let diffY = currentY - startY;

    if (!isDirectionLocked) {
      if (Math.abs(diffX) > 10 || Math.abs(diffY) > 10) {
        isHorizontal = Math.abs(diffX) > Math.abs(diffY);

        isDirectionLocked = true;

        if (!isHorizontal) {
          isDragging = false;
          return;
        }
      }
    }

    if (!isHorizontal) return;

    let diff = diffX;

    if (!hasMoved) {
      if (Math.abs(diff) < dragThreshold) return;
      hasMoved = true;
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

  window.addEventListener("resize", updateWidth);
});

/*
====================
 * 
 * scroll / header
 * 
====================
 */

document.addEventListener("DOMContentLoaded", () => {
  const pengamatScroll = document.querySelector("[data-data='scroll']");
  const header = document.querySelector(".header");
  if (!pengamatScroll || !header) return;

  let scrollTerakhir = pengamatScroll.scrollTop;
  const perangkatMobileTablet = window.innerWidth <= 1024;

  function cekAkhirKonten(posisiScroll) {
    const scrollMaks = pengamatScroll.scrollHeight - pengamatScroll.clientHeight;
    return posisiScroll >= scrollMaks - 50;
  }

  function halloHeader(posisiScroll) {
    if (posisiScroll <= 10) {

      header.classList.add("visible");
      header.classList.remove("hidden", "transparent");

    } else if (cekAkhirKonten(posisiScroll) || posisiScroll > scrollTerakhir) {

      if (cekAkhirKonten(posisiScroll)) {
        header.classList.add("transparent");
        header.classList.remove("visible", "hidden");
      } else {
        header.classList.add("hidden");
        header.classList.remove("visible", "transparent");
      }

    } else if (posisiScroll < scrollTerakhir) {

      header.classList.add("transparent");
      header.classList.remove("visible", "hidden");
    }
  }

  if (perangkatMobileTablet) {
    let posisiSekarang = pengamatScroll.scrollTop;
    let targetScroll = pengamatScroll.scrollTop;
    const ambangPerubahan = 10;
    const kecepatanDasar = 1;

    pengamatScroll.addEventListener("scroll", () => {
      targetScroll = pengamatScroll.scrollTop;
    }, { passive: true });

    function animasiScroll() {
      const selisih = targetScroll - posisiSekarang;
      const kecepatan = Math.min(0.35, Math.abs(selisih) * 0.002 + kecepatanDasar);

      if (Math.abs(selisih) > 0.1) {
        posisiSekarang += selisih * kecepatan;
        pengamatScroll.scrollTop = posisiSekarang;
      }

      if (Math.abs(posisiSekarang - scrollTerakhir) > ambangPerubahan) {
        halloHeader(posisiSekarang);
        scrollTerakhir = posisiSekarang;
      }

      requestAnimationFrame(animasiScroll);
    }

    animasiScroll();

  } else {
    pengamatScroll.addEventListener("scroll", () => {
      const posisiScrollSekarang = pengamatScroll.scrollTop;
      halloHeader(posisiScrollSekarang);
      scrollTerakhir = posisiScrollSekarang;
    }, { passive: true });
  }
});

/*
====================
 * 
 * Trasisi Efek
 * 
====================
 */

document.addEventListener("DOMContentLoaded", () => {
  const transisi = document.querySelector(".name___transition");
  const gelombang = document.getElementById("wavewave");

  async function pergiDenganTransisi(url) {
    let warnaTarget = getComputedStyle(document.documentElement)
      .getPropertyValue("--data-background-theme-light")
      .trim();

    try {
      const hasilFetch = await fetch(url);
      const teksHtml = await hasilFetch.text();
      const parser = new DOMParser();
      const dokumenBaru = parser.parseFromString(teksHtml, "text/html");

      const styleAttr = dokumenBaru.body.getAttribute("style");

      if (styleAttr) {
        const match = styleAttr.match(/--this-data-background-theme:\s*([^;]+)/);
        if (match) {
          warnaTarget = match[1].trim();

          if (warnaTarget.startsWith("var(")) {
            const varName = warnaTarget
              .replace("var(", "")
              .replace(")", "")
              .trim();

            warnaTarget = getComputedStyle(document.documentElement)
              .getPropertyValue(varName)
              .trim();
          }
        }
      }
    } catch (e) {
      console.warn("Fetch gagal:", e);
    }

    if (gelombang) {
      gelombang.setAttribute("fill", warnaTarget);
    }

    if (transisi) {
      let sudahPindah = false;

      const pindahHalaman = () => {
        if (sudahPindah) return;
        sudahPindah = true;
        window.location.href = url;
      };

      transisi.addEventListener("transitionend", pindahHalaman, { once: true });

      setTimeout(pindahHalaman, 1200);

      requestAnimationFrame(() => {
        transisi.style.transform = "translateY(-100%)";
      });
    } else {
      window.location.href = url;
    }
  }

  document.addEventListener("click", (e) => {
    const elemen = e.target.closest("a");
    if (!elemen) return;

    const tautan = elemen.getAttribute("href");

    if (
      !tautan ||
      tautan.startsWith("#") ||
      tautan.startsWith("http") ||
      elemen.hasAttribute("target")
    )
      return;

    e.preventDefault();
    pergiDenganTransisi(tautan);
  });
});

/*
====================
 * 
 * SCROLL
 * 
====================
 */

document.addEventListener("DOMContentLoaded", () => {
  const pembungkus = document.querySelector(".content-wrapper");

  let sasaran = 0;
  let posisiSaatIni = 0;

  const intensitasGetar = 29;
  const ambangGetar = 0.01;

  let sedangScroll = false;
  let timerScroll;

  let inputMode = "wheel";

  function scrollAktif() {
    sedangScroll = true;
    clearTimeout(timerScroll);
    timerScroll = setTimeout(() => {
      sedangScroll = false;
    }, 80);
  }

  function clampScroll() {
    const maxScroll = pembungkus.scrollHeight - pembungkus.clientHeight;
    sasaran = Math.max(0, Math.min(sasaran, maxScroll));
  }

  pembungkus.addEventListener("wheel", (e) => {
    inputMode = "wheel";

    e.preventDefault();
    scrollAktif();

    sasaran += e.deltaY * 0.6;
    clampScroll();
  }, { passive: false });

  let waktuSentuh = 0;
  let sentuhAwal = 0;

  pembungkus.addEventListener("touchstart", (e) => {
    inputMode = "touch";
    sentuhAwal = e.touches[0].clientY;
    waktuSentuh = Date.now();
  }, { passive: false });

  pembungkus.addEventListener("touchmove", (e) => {
    if (e.touches.length > 1) return;

    const sentuhY = e.touches[0].clientY;
    const delta = sentuhAwal - sentuhY;

    const diAtas = pembungkus.scrollTop <= 2;
    const tarikKeBawah = delta < 0;

    if (diAtas && tarikKeBawah) return;

    e.preventDefault();
    scrollAktif();

    sentuhAwal = sentuhY;

    sasaran += delta * 2;
    clampScroll();

  }, { passive: false });

  pembungkus.addEventListener("touchend", () => {
    waktuSentuh = 0;
  });

  document.addEventListener("keydown", (e) => {
    inputMode = "keyboard";

    const viewHeight = pembungkus.clientHeight;
    const step = 80;

    switch (e.key) {
      case "ArrowDown":
        sasaran += step;
        break;
      case "ArrowUp":
        sasaran -= step;
        break;
      case "PageDown":
        sasaran += viewHeight * 0.9;
        break;
      case "PageUp":
        sasaran -= viewHeight * 0.9;
        break;
      case " ":
        if (e.shiftKey) {
          sasaran -= viewHeight * 0.9;
        } else {
          sasaran += viewHeight * 0.9;
        }
        break;
      case "Home":
        sasaran = 0;
        break;
      case "End":
        sasaran = pembungkus.scrollHeight;
        break;
      default:
        return;
    }

    scrollAktif();
    clampScroll();
    e.preventDefault();
  });

  function scrollHalus() {
    let selisih = sasaran - posisiSaatIni;
    posisiSaatIni += selisih * 0.045;

    let jitter = 0;

    if (
      inputMode === "touch" &&
      sedangScroll &&
      Math.abs(selisih) > ambangGetar
    ) {
      jitter = (Math.random() - 0.5) * intensitasGetar;
    }

    if (waktuSentuh > 0) {
      const durasi = Date.now() - waktuSentuh;

      if (durasi > 200) {
        const faktorFade = Math.exp(-(durasi - 200) / 500);
        jitter *= faktorFade;
      }
    }

    pembungkus.scrollTop = posisiSaatIni + jitter;

    requestAnimationFrame(scrollHalus);
  }

  scrollHalus();
});
