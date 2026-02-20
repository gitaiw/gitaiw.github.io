<!-- ==================== INPUT & BUTTON ==================== -->
    
      const userInput = document.getElementById("userInput");
      userInput?.addEventListener("keydown", (e) => {
        if (e.key === "Enter") return;
      });
      document.querySelector("button")?.addEventListener("click", sendMessage);

      // ==================== INIT ====================
      newChat();
    