/*
====================
 * @2026
 * animation text
 * published: aiw.boo
====================
 */

/*
====================
 * 
 * animation text heading
 * 
====================
 */
(() => {
  const splitTextElements = document.querySelectorAll(".agl_split-heading-01");

  if (splitTextElements.length > 0) {
    splitTextElements.forEach((el) => {
      const text = el.textContent;
      el.textContent = "";
      const mid = Math.floor(text.length / 2);

      text.split("").forEach((aglChar, i) => {
        const dataspan = document.createElement("span");
        dataspan.textContent = aglChar === " " ? "\u00A0" : aglChar;
        dataspan.style.transitionDelay = `${Math.abs(i - mid) * 0.1}s`;
        el.appendChild(dataspan);
      });
    });

    const observerText = new IntersectionObserver(
      (entriesItem) => {
        entriesItem.forEach((entryItem) => {
          const el = entryItem.target;

          if (entryItem.isIntersecting) {
            el.classList.remove("animate-out");
            el.classList.add("animate");
          } else {
            if (entryItem.boundingClientRect.top < 0) {
              el.classList.remove("animate");
              el.classList.add("animate-out");
            } else {
              el.classList.remove("animate", "animate-out");
            }
          }
        });
      },
      { threshold: 0.5 },
    );

    splitTextElements.forEach((el) => observerText.observe(el));
  }
})();

(() => {
  const splitUpElements = document.querySelectorAll(".agl_split-heading-02");

  if (splitUpElements.length) {
    function splitUp(element) {
      const text = element.textContent;
      element.textContent = "";
      const middle = Math.floor(text.length / 2);

      for (let i = 0; i < text.length; i++) {
        const sUp = document.createElement("span");
        sUp.textContent = text[i] === " " ? "\u00A0" : text[i];
        sUp.style.animationDelay = `${i * 0.05}s`;
        const offsetY = 80;
        sUp.style.setProperty("--offsetY", `${offsetY}px`);
        element.appendChild(sUp);
      }
    }

    for (const el of splitUpElements) {
      splitUp(el);
    }

    const observerUp = new IntersectionObserver(
      (entriesItem) => {
        for (const entryItem of entriesItem) {
          if (entryItem.isIntersecting) {
            entryItem.target.classList.add("animUp");
          } else {
            entryItem.target.classList.remove("animUp");
          }
        }
      },
      { threshold: 0.4 },
    );

    for (const el of splitUpElements) {
      observerUp.observe(el);
    }
  }
})();

/*
====================
 * 
 * animation text lines
 * 
====================
 */

(function () {
  function uxv26_splitLinesEngine(targetElement) {
    if (!targetElement) return;

    const uxv26_wordsArray = targetElement.innerText.split(" ");
    targetElement.innerHTML = "";

    let uxv26_activeLine = document.createElement("div");
    uxv26_activeLine.classList.add("xxxlane");
    targetElement.appendChild(uxv26_activeLine);

    let uxv26_lastHeightValue = 0;

    uxv26_wordsArray.forEach((word) => {
      const uxv26_wordSpan = document.createElement("span");
      uxv26_wordSpan.textContent = word + " ";
      uxv26_activeLine.appendChild(uxv26_wordSpan);

      const uxv26_currentHeightValue = uxv26_activeLine.offsetHeight;

      if (
        uxv26_currentHeightValue > uxv26_lastHeightValue &&
        uxv26_lastHeightValue !== 0
      ) {
        uxv26_activeLine.removeChild(uxv26_wordSpan);

        const uxv26_newLineBlock = document.createElement("div");
        uxv26_newLineBlock.classList.add("xxxlane");
        uxv26_newLineBlock.appendChild(uxv26_wordSpan);

        targetElement.appendChild(uxv26_newLineBlock);
        uxv26_activeLine = uxv26_newLineBlock;
        uxv26_lastHeightValue = uxv26_newLineBlock.offsetHeight;
      } else {
        uxv26_lastHeightValue = uxv26_currentHeightValue;
      }
    });
  }

  const uxv26_observerConfig = {
    root: null,
    rootMargin: "0px 0px -2% 0px",
    threshold: 0,
  };

  const uxv26_viewportWatcher = new IntersectionObserver((uxv26_entries) => {
    uxv26_entries.forEach((entry) => {
      const uxv26_lineElement = entry.target;
      if (!uxv26_lineElement) return;

      const uxv26_parentWrapper = uxv26_lineElement.parentElement;
      const uxv26_allLineElements = Array.from(uxv26_parentWrapper.children);
      const uxv26_lineIndex = uxv26_allLineElements.indexOf(uxv26_lineElement);

      if (entry.isIntersecting) {
        uxv26_lineElement.style.transitionDelay = `${uxv26_lineIndex * 0.1}s`;
        uxv26_lineElement.classList.add("text-is-visible");
      } else {
        uxv26_lineElement.classList.remove("text-is-visible");
        uxv26_lineElement.style.transitionDelay = "0s";
      }
    });
  }, uxv26_observerConfig);

  function uxv26_initializeSlideUpSystem() {
    const uxv26_elements = document.querySelectorAll(".agl-slide-up-lines");

    uxv26_elements.forEach((el) => {
      uxv26_splitLinesEngine(el);

      el.classList.add("text-is-ready");

      const uxv26_lines = el.querySelectorAll(".xxxlane");
      uxv26_lines.forEach((line) => {
        uxv26_viewportWatcher.observe(line);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      uxv26_initializeSlideUpSystem,
    );
  } else {
    uxv26_initializeSlideUpSystem();
  }
})();
