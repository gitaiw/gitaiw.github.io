<!-- ==================== PLUS MENU ==================== -->
    
      const plusBtn = document.getElementById("plusBtn");
      const uMenu = document.getElementById("uMenu");
      const imageBtn = document.getElementById("imageBtn");
      const fileBtn = document.getElementById("fileBtn");

      plusBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        uMenu.style.display = uMenu.style.display === "flex" ? "none" : "flex";
      });
      imageBtn?.addEventListener("click", () => {
        uMenu.style.display = "none";
        imageInput?.click();
      });
      fileBtn?.addEventListener("click", () => {
        uMenu.style.display = "none";
        fileInput?.click();
      });

      document.addEventListener("click", (e) => {
        if (!plusBtn.contains(e.target) && !uMenu.contains(e.target))
          uMenu.style.display = "none";
      });
    