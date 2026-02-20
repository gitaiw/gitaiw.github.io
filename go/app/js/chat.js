<!-- ==================== CHAT ==================== -->

      let chats = [],
        currentChatId = null;

      function newChat() {
        const chatId = Date.now();
        chats.push({
          id: chatId,
          title: `Chat ${chats.length + 1}`,
          messages: [],
        });
        currentChatId = chatId;
        renderChatList();
        renderChat();
        triggerBotReply("Hallo, ada yang bisa saya bantu?");
      }

      function selectChat(id) {
        currentChatId = id;
        renderChatList();
        renderChat();
      }
      function deleteChat(id) {
        const index = chats.findIndex((c) => c.id === id);
        if (index !== -1) {
          chats.splice(index, 1);
          if (currentChatId === id)
            currentChatId = chats.length ? chats[0].id : null;
          renderChatList();
          renderChat();
        }
      }

      function renderChatList() {
        const chatList = document.getElementById("chatList");
        if (!chatList) return;
        chatList.innerHTML = "";
        chats.forEach((chat) => {
          const div = document.createElement("div");
          div.className =
            "chat-item" + (chat.id === currentChatId ? " active" : "");
          const titleSpan = document.createElement("span");
          titleSpan.textContent = chat.title;
          titleSpan.style.flex = "1";
          titleSpan.onclick = () => selectChat(chat.id);
          const closeBtn = document.createElement("span");
          closeBtn.textContent = "×";
          closeBtn.className = "close-btn";
          closeBtn.onclick = (e) => {
            e.stopPropagation();
            deleteChat(chat.id);
          };
          div.appendChild(titleSpan);
          div.appendChild(closeBtn);
          chatList.appendChild(div);
        });
      }

      function renderChat() {
        const container = document.getElementById("chatContainer");
        const headerChat = document.getElementById("headerChatTitle");
        const chat = chats.find((c) => c.id === currentChatId);
        if (!chat || !container) {
          if (container) container.innerHTML = "";
          if (headerChat) headerChat.textContent = "";
          return;
        }
        if (headerChat) headerChat.textContent = chat.title;
        container.innerHTML = "";
        chat.messages.forEach((msg) => {
          const div = document.createElement("div");
          div.className = "message " + msg.sender;
          div.innerHTML = msg.text.replace(/\n/g, "<br>");
          container.appendChild(div);
        });
        container.scrollTop = container.scrollHeight;
      }

      function sendMessage() {
        const userInput = document.getElementById("userInput");
        if (!userInput || !currentChatId) return;
        let text = userInput.value.trim();
        if (!text) return;
        if (text.length > 2000) text = text.slice(0, 2000);
        const sanitized = escapeHtml(text);
        const chat = chats.find((c) => c.id === currentChatId);
        if (!chat) return;
        chat.messages.push({ sender: "user", text: sanitized });
        userInput.value = "";
        renderChat();
        const botMsg = `<i>"Mohon maaf, saya belum diberikan kecerdasan oleh developer"</i>\n\nTapi kamu telah mengetik:\n<span style="color: blue;">[ </span><span style="color: red;">${sanitized}</span><span style="color: blue;"> ]</span>`;
        chat.messages.push({
          sender: "bot",
          text: `<div class="typing"><span></span><span></span><span></span></div>`,
          typing: true,
        });
        renderChat();
        setTimeout(() => {
          chat.messages = chat.messages.filter((m) => !m.typing);
          chat.messages.push({ sender: "bot", text: botMsg });
          renderChat();
        }, 1000);
      }

      function triggerBotReply(botMessage) {
        const chat = chats.find((c) => c.id === currentChatId);
        if (!chat) return;
        chat.messages.push({
          sender: "bot",
          text: `<div class="typing"><span></span><span></span><span></span></div>`,
          typing: true,
        });
        renderChat();
        setTimeout(() => {
          chat.messages = chat.messages.filter((m) => !m.typing);
          chat.messages.push({ sender: "bot", text: botMessage });
          renderChat();
        }, 2000);
      }
    