<!-- ==================== UPLOAD ==================== -->

const cameraInput = document.getElementById("cameraInput");
const imageInput = document.getElementById("imageInput");
const fileInput = document.getElementById("fileInput");

document.getElementById("cameraBtn")?.addEventListener("click", () => {
  cameraInput.click();
});

cameraInput?.addEventListener("change", function () {
  const file = this.files[0];
  if (!file || !currentChatId) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const chat = chats.find((c) => c.id === currentChatId);
    chat?.messages.push({
      sender: "user",
      text: `<img src="${e.target.result}" style="max-width:200px;border-radius:10px;margin-top:5px;">`,
    });
    renderChat();
    triggerBotReply(
      'DEMO: <span style="color:red">[</span> Foto kamera diterima <span style="color:red">]</span>'
    );
  };
  reader.readAsDataURL(file);
  this.value = "";
});

imageInput?.addEventListener("change", function () {
  const file = this.files[0];
  if (!file || !currentChatId) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    const chat = chats.find((c) => c.id === currentChatId);
    chat?.messages.push({
      sender: "user",
      text: `<img src="${e.target.result}" style="max-width:200px;border-radius:10px;margin-top:5px;">`,
    });
    renderChat();
    triggerBotReply(
      'DEMO: <span style="color:red">[</span> Gambar diterima <span style="color:red">]</span>'
    );
  };
  reader.readAsDataURL(file);
  this.value = "";
});

fileInput?.addEventListener("change", function () {
  const file = this.files[0];
  if (!file || !currentChatId) return;
  const chat = chats.find((c) => c.id === currentChatId);
  chat?.messages.push({
    sender: "user",
    text: `<strong>${escapeHtml(file.name)}</strong><br>`,
  });
  renderChat();
  triggerBotReply(
    'DEMO: <span style="color:red">[</span> File diterima <span style="color:red">]</span>'
  );
  this.value = "";
});