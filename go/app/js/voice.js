// ==================== VOICE ====================
const voiceBtn = document.getElementById("voiceBtn");
const addIcon = voiceBtn.querySelector(".add-voice");
const stopIcon = voiceBtn.querySelector(".stop-voice");

let recognition, isListening = false;

stopIcon.style.display = "none";

if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = "id-ID";
  recognition.continuous = true;
  recognition.interimResults = true;

  let timeoutSend;

  recognition.onresult = function(event) {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; i++)
      transcript += event.results[i][0]?.transcript || "";

    const userInput = document.getElementById("userInput");
    if (userInput) userInput.value = transcript;

    clearTimeout(timeoutSend);
    if (transcript.trim() !== "")
      timeoutSend = setTimeout(() => {
        if (transcript.trim()) sendMessage();
      }, 800);
  };

  recognition.onend = function() {
    resetIcons();
  };

  voiceBtn.addEventListener("click", () => {
    if (!isListening) {
      recognition.start();
      isListening = true;
      showStopIcon();
    } else {
      isListening = false;
      recognition.stop();
    }
  });
} else {
  console.warn("Browser tidak mendukung voice recognition");
}

// ==================== HELPERS ====================
function showStopIcon() {
  addIcon.style.display = "none";
  stopIcon.style.display = "inline";
}

function resetIcons() {
  addIcon.style.display = "inline";
  stopIcon.style.display = "none";
}