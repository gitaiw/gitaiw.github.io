<!-- ==================== SIDEBAR ==================== -->
    
      const sidebar = document.getElementById("sidebar");
      const main = document.getElementById("main");
      const overlay = document.getElementById("overlay");
      const menuBtn = document.getElementById("menuBtn");

      let startX = 0;
      let currentX = 0;
      let isDragging = false;
      let sidebarWidth = 0;

      function updateWidth() {
        sidebarWidth = sidebar.offsetWidth;
      }

      function setPosition(x) {
        sidebar.style.transform = `translateX(${x - sidebarWidth}px)`;
        main.style.transform = `translateX(${x}px)`;
      }

      function openSidebar() {
        updateWidth(); // FIX

        sidebar.classList.add("active");
        overlay.classList.add("active");
        menuBtn.classList.add("sidebar-open");

        sidebar.style.transition = "transform 0.3s ease";
        main.style.transition = "transform 0.3s ease";

        sidebar.style.transform = `translateX(0px)`;
        main.style.transform = `translateX(${sidebarWidth}px)`;
      }

      function closeSidebar() {
        updateWidth();

        sidebar.classList.remove("active");
        overlay.classList.remove("active");
        menuBtn.classList.remove("sidebar-open");

        sidebar.style.transition = "transform 0.3s ease";
        main.style.transition = "transform 0.3s ease";

        sidebar.style.transform = `translateX(-${sidebarWidth}px)`;
        main.style.transform = `translateX(0px)`;
      }

      menuBtn?.addEventListener("click", () => {
        sidebar.classList.contains("active") ? closeSidebar() : openSidebar();
      });

      overlay?.addEventListener("click", closeSidebar);

      document.addEventListener("touchstart", (e) => {
        updateWidth(); // FIX
        startX = e.touches[0].clientX;
        currentX = startX; // FIX
        isDragging = true;

        sidebar.style.transition = "none";
        main.style.transition = "none";
      });

      document.addEventListener("touchmove", (e) => {
        if (!isDragging) return;

        currentX = e.touches[0].clientX;
        let diff = currentX - startX;

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

        sidebar.style.transition = "transform 0.3s ease";
        main.style.transition = "transform 0.3s ease";

        const moved = currentX - startX;

        if (moved > sidebarWidth / 3) {
          openSidebar();
        } else if (moved < -sidebarWidth / 3) {
          closeSidebar();
        } else {
          sidebar.classList.contains("active") ? openSidebar() : closeSidebar();
        }
      });
    