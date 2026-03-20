/*
====================
 * @2026
 * animation
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
  let observerText;

  function splitElement(el) {
    const originalText = el.dataset.original || el.textContent.trim();
    el.dataset.original = originalText;

    let text = originalText;

    if (
      el.classList.contains("mobile-break") &&
      window.innerWidth <= 768 &&
      window.innerWidth < window.innerHeight

    ) {
      const words = text.split(" ");
      if (words.length > 1) {
        const middleWord = Math.ceil(words.length / 2);
        text =
          words.slice(0, middleWord).join(" ") +
          "\n" +
          words.slice(middleWord).join(" ");
      }
    }

    el.innerHTML = "";

    const characters = text.split("");
    const mid = Math.floor(characters.length / 2);

    characters.forEach((aglChar, i) => {
      if (aglChar === "\n") {
        el.appendChild(document.createElement("br"));
        return;
      }

      const span = document.createElement("span");
      span.textContent = aglChar === " " ? "\u00A0" : aglChar;
      span.style.transitionDelay = `${Math.abs(i - mid) * 0.1}s`;
      el.appendChild(span);
    });
  }

  function initSplit() {
    splitTextElements.forEach((el) => {
      splitElement(el);
    });
  }

  function initObserver() {
    observerText = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;

          if (entry.isIntersecting) {
            el.classList.remove("animate-out");
            el.classList.add("animate");
          } else {
            if (entry.boundingClientRect.top < 0) {
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

if (splitTextElements.length > 0) {
  initSplit();

  let firstLoadDelay = 99;
  let firstAnimDone = false;

  observerText = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target;

      if (entry.isIntersecting) {
        if (!firstAnimDone) {

          setTimeout(() => {
            el.classList.add("animate");
          }, firstLoadDelay);
          firstAnimDone = true;
        } else {

          el.classList.add("animate");
        }
        el.classList.remove("animate-out");
      } else {
        if (entry.boundingClientRect.top < 0) {
          el.classList.remove("animate");
          el.classList.add("animate-out");
        } else {
          el.classList.remove("animate", "animate-out");
        }
      }
    });
  }, { threshold: 0.5 });

  splitTextElements.forEach((el) => observerText.observe(el));

  window.addEventListener("resize", () => {
    initSplit();
  });
}
})();


(() => {
  const splitUpElements = document.querySelectorAll(".agl_split-heading-02");

  if (splitUpElements.length) {
    function splitUp(element) {
      const text = element.textContent;
      element.textContent = "";

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

    let firstLoadDelay = 99;

    const observerUp = new IntersectionObserver(
      (entriesItem) => {
        for (const entryItem of entriesItem) {
          if (entryItem.isIntersecting) {

            if (!entryItem.target.classList.contains("animUp")) {
              setTimeout(() => {
                entryItem.target.classList.add("animUp");
                entryItem.target.classList.remove("animOut");
              }, firstLoadDelay);
            } else {
              entryItem.target.classList.add("animUp");
              entryItem.target.classList.remove("animOut");
            }
          } else {
            entryItem.target.classList.add("animOut");
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
  let uxv26_globalIndex = 0;

  function uxv26_splitLinesEngine(targetElement) {
    if (!targetElement) return;

    const nodes = Array.from(targetElement.childNodes);
    targetElement.innerHTML = "";

    let uxv26_activeLine = document.createElement("div");
    uxv26_activeLine.classList.add("xxxlane");
    targetElement.appendChild(uxv26_activeLine);

    let uxv26_lastHeightValue = 0;

    nodes.forEach((node) => {
      if (node.nodeType === 3) {
        const words = node.textContent.split(" ");
        words.forEach((word, i) => {
          if (!word) return;

          const span = document.createElement("span");
          span.textContent = word + (i < words.length - 1 ? " " : "");
          uxv26_activeLine.appendChild(span);

          const currentHeight = uxv26_activeLine.offsetHeight;

          if (
            currentHeight > uxv26_lastHeightValue &&
            uxv26_lastHeightValue !== 0
          ) {
            uxv26_activeLine.removeChild(span);

            const newLine = document.createElement("div");
            newLine.classList.add("xxxlane");
            newLine.appendChild(span);

            targetElement.appendChild(newLine);
            uxv26_activeLine = newLine;
            uxv26_lastHeightValue = newLine.offsetHeight;
          } else {
            uxv26_lastHeightValue = currentHeight;
          }
        });
      } else if (node.nodeType === 1) {
        const clone = node.cloneNode(true);
        uxv26_activeLine.appendChild(clone);

        if (!/^(BR|DIV)$/i.test(node.tagName)) {
          const space = document.createTextNode(" ");
          uxv26_activeLine.appendChild(space);
        }

        const currentHeight = uxv26_activeLine.offsetHeight;

        if (
          currentHeight > uxv26_lastHeightValue &&
          uxv26_lastHeightValue !== 0
        ) {
          uxv26_activeLine.removeChild(clone);

          if (
            clone.nextSibling &&
            clone.nextSibling.nodeType === 3 &&
            clone.nextSibling.textContent === " "
          ) {
            uxv26_activeLine.removeChild(clone.nextSibling);
          }

          const newLine = document.createElement("div");
          newLine.classList.add("xxxlane");
          newLine.appendChild(clone);

          if (!/^(BR|DIV)$/i.test(node.tagName)) {
            const space = document.createTextNode(" ");
            newLine.appendChild(space);
          }

          targetElement.appendChild(newLine);
          uxv26_activeLine = newLine;
          uxv26_lastHeightValue = newLine.offsetHeight;
        } else {
          uxv26_lastHeightValue = currentHeight;
        }
      }
    });
  }

  const uxv26_observerConfig = {
    root: null,
    rootMargin: "0px 0px -1% 0px",
    threshold: 0,
  };

  const uxv26_viewportWatcher = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const line = entry.target;
      if (!line) return;

      const index = Number(line.dataset.globalIndex);

      if (entry.isIntersecting) {
        line.style.transitionDelay = `${index * 0.08}s`;
        line.classList.add("text-is-visible");
      } else {
        line.classList.remove("text-is-visible");
        line.style.transitionDelay = "0s";
      }
    });
  }, uxv26_observerConfig);

  function uxv26_initializeSlideUpSystem() {
    const elements = document.querySelectorAll(".agl-slide-up-lines");

    elements.forEach((el) => {
      uxv26_splitLinesEngine(el);

      el.classList.add("text-is-ready");

      const lines = el.querySelectorAll(".xxxlane");

      lines.forEach((line) => {
        line.dataset.globalIndex = uxv26_globalIndex++;
        uxv26_viewportWatcher.observe(line);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      uxv26_initializeSlideUpSystem
    );
  } else {
    uxv26_initializeSlideUpSystem();
  }
})();

/*
====================
 * 
 * animation text color
 * 
====================
 */

(() => {
  const container = document.querySelector(".content-wrapper");
  if (!container) return;

  const aglsetting = container.querySelectorAll(".ani-text-color p");
  if (!aglsetting || aglsetting.length === 0) return;

  const aglTextps = [];
  const speedFactor = 3;

  aglsetting.forEach((echoText) => {
    if (!echoText) return;

    const text = echoText.innerText.trim().split(" ");
    echoText.innerHTML = "";

    text.forEach((aglTextp) => {
      if (!aglTextp) return;

      const pingText = document.createElement("span");
      pingText.className = "aglTextp";
      pingText.textContent = aglTextp;

      echoText.appendChild(pingText);
      aglTextps.push(pingText);

      echoText.appendChild(document.createTextNode(" "));
    });
  });

  const aglColorAnimation = () => {
    if (!aglTextps || aglTextps.length === 0) return;

    const scrollTop = container.scrollTop;
    const maxScroll = container.scrollHeight - container.clientHeight;
    let progress = maxScroll > 0 ? scrollTop / maxScroll : 0;

    aglTextps.forEach((aglTextp, index) => {
      if (!aglTextp || !aglTextp.style) return;

      const step = 1 / Math.max(aglTextps.length * speedFactor, 1);
      const start = index * step;
      const end = (index + 1) * step;

      let value = (progress - start) / (end - start);
      value = Math.min(Math.max(value, 0), 1);

      aglTextp.style.backgroundPosition = `${100 - value * 100}% 0`;
    });
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          container.addEventListener("scroll", () => {
            window.requestAnimationFrame(aglColorAnimation);
          });

          aglColorAnimation();
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  aglsetting.forEach((el) => observer.observe(el));
})();

/*
====================
 * 
 * animation text color
 * 
====================
 */

(function(){

  const crElements = document.querySelectorAll(".color-reveal");
  if(!crElements.length) return;

  crElements.forEach(crEl=>{
    let crIndex = 0;
    const crWalker = document.createTreeWalker(
      crEl,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    const crTextNodes = [];
    while(crWalker.nextNode()){
      crTextNodes.push(crWalker.currentNode);
    }

    crTextNodes.forEach(crNode=>{
      const crText = crNode.nodeValue;
      const crFrag = document.createDocumentFragment();

      [...crText].forEach(char=>{
        const crSpan = document.createElement("span");
        crSpan.textContent = char === " " ? "\u00A0" : char;
        crSpan.style.setProperty("--i", crIndex++);
        crFrag.appendChild(crSpan);
      });

      crNode.replaceWith(crFrag);
    });
  });

  const crObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      const crEl = entry.target;

      if(entry.isIntersecting){

        crEl.classList.remove("no-transition");

        const delayBeforeAnimation = 600;

        setTimeout(()=>{
          requestAnimationFrame(()=>{
            crEl.classList.add("animate");
          });
        }, delayBeforeAnimation);

      }else{
        crEl.classList.add("no-transition");
        crEl.classList.remove("animate");
      }
    });
  }, {threshold:0});

  crElements.forEach(el=>crObserver.observe(el));

})();

/*
====================
 * 
 * STICKY
 * 
====================
 */

(function(){

const sections = document.querySelectorAll(".this_content-animation-sticky");
const container = document.querySelector(".sticky-wrapper");
const wrapper = document.querySelector(".content-wrapper");

if(sections.length && container && wrapper){

  let currentScroll = 0;
  let smoothScroll = 0;
  const easing = 0.1;

  function setHeight(){
    const viewport = window.innerHeight;
    const scrollSpace = sections.length * viewport * 1.2;
    container.style.height = scrollSpace + "px";
  }

  setHeight();
  window.addEventListener("resize", setHeight);

  function animate(){

    smoothScroll += (currentScroll - smoothScroll) * easing;

    const start = container.offsetTop;
    const end = start + container.offsetHeight - wrapper.clientHeight;

    let scrollY = smoothScroll - start;
    scrollY = Math.max(0, Math.min(scrollY, end-start));

    const totalHeight = end-start;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    sections.forEach((sec,i)=>{

      if(!sec) return;

      if(i===0) return;

      const sectionHeight = totalHeight/(sections.length-1);
      const sectionStart = (i-1)*sectionHeight;

      let p = (scrollY-sectionStart)/sectionHeight;
      p = Math.max(0,Math.min(p,1));

      const ease = p*p*(3-2*p);

      let x,y,r;

      if(ease>=0.99){
        x=0;y=0;r=0;
      }
      else if(ease>0){

        if(ease<0.5){
          const t = ease/0.5;

          x=-0.5 * vw;
          y=vh-(vh*t);
          r=50-(50*t);

        }else{

          const t=(ease-0.5)/0.5;

          x=(-0.5*vw)+(0.5*vw*t);
          y=0;
          r=0;

        }

      }else{
        x=-1 * vw;
        y=1 * vh;
        r=50;
      }
      sec.style.transform =
      `translate3d(${x}px, ${y}px,0) rotate(${r}deg)`;

    });

    requestAnimationFrame(animate);
  }

  wrapper.addEventListener("scroll", () => {
    currentScroll = wrapper.scrollTop;
  });

  animate();

}

})();

/*
====================
 * 
 * Card Drag
 * 
====================
 */

document.addEventListener("DOMContentLoaded", () => {

document.querySelectorAll(".this-animasi-card").forEach(parent => {

  const cards = [];
  const cardElements = parent.querySelectorAll(".this-card");

  function randomPos(max){ 
    return Math.random()*max; 
  }

  function isOverlapping(x,y,width,height,others){

    for(const c of others){

      const cx=parseFloat(c.el.style.left);
      const cy=parseFloat(c.el.style.top);
      const cw=c.el.offsetWidth;
      const ch=c.el.offsetHeight;

      if(
        x < cx+cw+20 &&
        x+width+20 > cx &&
        y < cy+ch+20 &&
        y+height+20 > cy
      ){
        return true;
      }
    }

    return false;
  }

  cardElements.forEach(card => {

    const cardWidth = card.offsetWidth || 200;
    const cardHeight = card.offsetHeight || 200;

    let posX,posY,attempts=0;
    const buffer=20;

    do{

      const maxX = parent.clientWidth-cardWidth-buffer*2;
      const maxY = parent.clientHeight-cardHeight-buffer*2;

      posX=randomPos(maxX)+buffer;
      posY=randomPos(maxY)+buffer;

      attempts++;

    }while(isOverlapping(posX,posY,cardWidth,cardHeight,cards)&&attempts<500)

    card.style.left=posX+"px";
    card.style.top=posY+"px";

    const cObj={
      el:card,
      velocityX:0,
      velocityY:0,
      dragging:false,
      offsetX:0,
      offsetY:0
    };

    cards.push(cObj);

    card.addEventListener("touchstart",(e)=>{
      e.stopPropagation();
    },{passive:false});

    card.addEventListener("touchmove",(e)=>{
      e.stopPropagation();
    },{passive:false});

    card.addEventListener("pointerdown",e=>{

      e.stopPropagation();

      cObj.dragging=true;
      card.setPointerCapture(e.pointerId);

      cObj.offsetX=e.clientX-parseFloat(card.style.left);
      cObj.offsetY=e.clientY-parseFloat(card.style.top);

      card.style.cursor="grabbing";
    });

    card.addEventListener("pointermove",e=>{

      if(!cObj.dragging) return;

      e.preventDefault();

      let newX=e.clientX-cObj.offsetX;
      let newY=e.clientY-cObj.offsetY;

      cObj.velocityX=newX-parseFloat(card.style.left);
      cObj.velocityY=newY-parseFloat(card.style.top);

      card.style.left=newX+"px";
      card.style.top=newY+"px";
    });

    card.addEventListener("pointerup",()=>{
      cObj.dragging=false;
      card.style.cursor="grab";
    });

  });

  function animate(){

    cards.forEach(c=>{

      if(!c.dragging){

        let left=parseFloat(c.el.style.left);
        let top=parseFloat(c.el.style.top);

        const maxX=parent.clientWidth-c.el.offsetWidth;
        const maxY=parent.clientHeight-c.el.offsetHeight;

        const minX=0;
        const minY=0;

        const stiffness=0.1;
        const damping=0.7;

        if(left<minX){

          let force=(minX-left)*stiffness;
          c.velocityX+=force;
          c.velocityX*=damping;
          left+=c.velocityX;

        }else if(left>maxX){

          let force=(maxX-left)*stiffness;
          c.velocityX+=force;
          c.velocityX*=damping;
          left+=c.velocityX;

        }else{

          left+=c.velocityX;
          c.velocityX*=0.95;

        }

        if(top<minY){

          let force=(minY-top)*stiffness;
          c.velocityY+=force;
          c.velocityY*=damping;
          top+=c.velocityY;

        }else if(top>maxY){

          let force=(maxY-top)*stiffness;
          c.velocityY+=force;
          c.velocityY*=damping;
          top+=c.velocityY;

        }else{

          top+=c.velocityY;
          c.velocityY*=0.95;

        }

        c.el.style.left=left+"px";
        c.el.style.top=top+"px";

      }

    });

    requestAnimationFrame(animate);

  }

  animate();

});

});


let scrollY = window.scrollY;
let targetScroll = scrollY;

window.addEventListener("scroll",()=>{
  targetScroll = window.scrollY;
});

function parallaxLoop(){

  scrollY += (targetScroll - scrollY) * 0.1;

  document.querySelectorAll(".this-card").forEach((card,i)=>{

    const rect = card.getBoundingClientRect();

    const speed = 0.1 + (i * 0.05);

    const offset = (rect.top - window.innerHeight/2) * speed;

    const rotate = offset * 0.02;

    card.style.transform =
      `translateY(${offset}px) rotate(${rotate}deg)`;

  });

  requestAnimationFrame(parallaxLoop);
}

parallaxLoop();

/*
====================
 * 
 * animation text tipyng
 * 
====================
 */

    (() => {
      function parseHTMLLine(id) {
        const el = document.getElementById(id);
        if (!el) return [];

        const spans = el.querySelectorAll("span");
        const chars = [];

        spans.forEach((span) => {
          const color = span.style.color || "#ffffff";
          const text = span.textContent;

          for (let c of text) {
            chars.push({
              char: c,
              color: color
            });
          }
        });

        el.innerHTML = "";
        return chars;
      }

      const aglLines = [{
          textEl: document.getElementById("text-01"),
          cursorEl: document.getElementById("cursor-01"),
          texts: parseHTMLLine("text-01"),
        },
        {
          textEl: document.getElementById("text-02"),
          cursorEl: document.getElementById("cursor-02"),
          texts: parseHTMLLine("text-02"),
        },
        {
          textEl: document.getElementById("text-03"),
          cursorEl: document.getElementById("cursor-03"),
          texts: parseHTMLLine("text-03"),
        },
      ];

      const typingSpeed = 100;
      const delayBetweenTexts = 1000;
      let currentTextIndexes = [0, 0, 0];

      function aglTypeLine(line,
        lineIndex,
        callback) {
        if (!line.textEl || !line.cursorEl) {
          callback();
          return;
        }

        let charIndex = 0;
        const text = line.texts;

        line.textEl.innerHTML = "";

        function aglType() {
          line.cursorEl.style.display = "inline-block";

          if (charIndex < text.length) {
            const {
              char,
              color
            } = text[charIndex];
            line.textEl.innerHTML += `<span style="color:${color}">${char}</span>`;
            charIndex++;
            setTimeout(aglType, typingSpeed);
          } else {
            setTimeout(callback, delayBetweenTexts);
          }
        }

        aglType();
      }

      function aglTypeSequential(index = 0) {
        if (index < aglLines.length) {
          aglTypeLine(aglLines[index], index, () => {
            aglTypeSequential(index + 1);
          });
        } else {
          setTimeout(() => {
              if (aglLines[0].textEl) {
                aglLines[0].textEl.innerHTML = "";
                currentTextIndexes[0] =
                  (currentTextIndexes[0] + 1) % aglLines[0].texts.length;
              }
              aglTypeSequential(0);
            },
            2000);
        }
      }

      aglTypeSequential();
    })();

/*
====================
 * 
 * animation marquee
 * 
====================
 */

    (() => {

class _marqueeWithDelimiterAlways {
  constructor(selector, options = {}) {
    this.elements = document.querySelectorAll(selector);
    this.speed = options.speed || 1;
    this.slowSpeed = options.slowSpeed || 0.3;
    this.delimiter = options.delimiter || '/';
    this.direction = options.direction || -1; 

    this.instances = [];
    this.handleResize = this.debounce(this.onResize.bind(this), 150);

    window.addEventListener('resize', this.handleResize);

    this.init();
  }

  createContent(inner, words) {
    inner.innerHTML = '';

    const spanText = document.createElement('span');
    spanText.textContent = words.join(' ');

    const spanDelimiter = document.createElement('span');
    spanDelimiter.className = '_marquee__delimiter';
    spanDelimiter.textContent = ' ' + this.delimiter;

    inner.appendChild(spanText);
    inner.appendChild(spanDelimiter);
  }

  init() {
    this.elements.forEach(_marquee => {
      const inner = document.createElement('div');
      inner.classList.add('_marquee__inner');

      const words = _marquee.textContent.trim().split(/\s+/);

      this.createContent(inner, words);

      _marquee.innerHTML = '';
      _marquee.appendChild(inner);

      const instance = {
        _marquee,
        inner,
        words,
        clones: [],
        pos: 0,
        speed: this.speed,
        direction: this.direction,
        rafId: null
      };

      this.buildClones(instance);

      _marquee.addEventListener('mouseenter', () => {
        instance.speed = this.slowSpeed;
      });

      _marquee.addEventListener('mouseleave', () => {
        instance.speed = this.speed;
      });

      this.animate(instance);
      this.instances.push(instance);
    });
  }

  buildClones(instance) {
    const { _marquee, inner } = instance;

    instance.clones.forEach(c => c.remove());
    instance.clones = [];

    let totalWidth = inner.scrollWidth;
    const containerWidth = _marquee.offsetWidth;

    let maxClones = 20;

    while (totalWidth < containerWidth * 2 && maxClones--) {
      const clone = inner.cloneNode(true);
      _marquee.appendChild(clone);
      instance.clones.push(clone);
      totalWidth += clone.scrollWidth;
    }
  }

  animate(instance) {
    const step = (now) => {
      if (!document.body.contains(instance.inner)) return;

      if (!instance.lastTime) instance.lastTime = now;

      const delta = (now - instance.lastTime) / 16.67;
      instance.lastTime = now;

      instance.pos += instance.speed * instance.direction * delta;

      const totalWidth = instance.inner.scrollWidth;

      if (instance.direction === -1 && instance.pos <= -totalWidth) {
        instance.pos += totalWidth;
      }

      if (instance.direction === 1 && instance.pos >= 0) {
        instance.pos -= totalWidth;
      }

      const smooth = Math.round(instance.pos * 100) / 100;

      [instance.inner, ...instance.clones].forEach(el => {
        el.style.transform = `translate3d(${smooth}px,0,0)`;
      });

      instance.rafId = requestAnimationFrame(step);
    };

    instance.rafId = requestAnimationFrame(step);
  }

  onResize() {
    this.instances.forEach(instance => {
      instance.pos = 0;
      this.createContent(instance.inner, instance.words);
      this.buildClones(instance);
    });
  }

  debounce(fn, delay) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), delay);
    };
  }
}

// kiri
new _marqueeWithDelimiterAlways('._marquee-kiri', { 
  speed: 0.7,
  slowSpeed: 0.3,
  delimiter: '/',
  direction: -1
});

// kanan
new _marqueeWithDelimiterAlways('._marquee-kanan', { 
  speed: 0.7,
  slowSpeed: 0.3,
  delimiter: '/',
  direction: 1
});

    })();

/*
====================
 * 
 * SRAMBLE TEXT
 * 
====================
 */

(function(){

document.addEventListener("DOMContentLoaded", () => {

  const chars = "█▓▒░<>/[]{}—=#&";
  const duration = 1200;
  const charLength = chars.length;

  const elements = document.querySelectorAll(".textSramble");
  if (!elements.length) return;

  elements.forEach(el => {
    if (!el) return;

    const text = el.textContent.trim();
    if (!text) return;

    el.textContent = "";

    const thisReal = document.createElement("span");
    thisReal.className = "thisReal";
    thisReal.textContent = text;

    const thisFake = document.createElement("span");
    thisFake.className = "thisFake";
    thisFake.textContent = text;

    el.appendChild(thisReal);
    el.appendChild(thisFake);
  });

  function scramble(el) {
    if (!el) return;

    const layer = el.querySelector(".thisFake");
    if (!layer) return;

    if (layer.dataset.running) return;
    layer.dataset.running = "true";

    const original = layer.textContent;
    let start = null;

    function frame(t) {
      if (!start) start = t;

      const elapsed = t - start;
      const progress = Math.floor((elapsed / duration) * original.length);

      let result = "";

      for (let i = 0; i < original.length; i++) {
        result += (i < progress)
          ? original[i]
          : chars[Math.floor(Math.random() * charLength)];
      }

      layer.textContent = result;

      if (elapsed < duration) {
        requestAnimationFrame(frame);
      } else {
        layer.textContent = original;
        delete layer.dataset.running;
      }
    }

    requestAnimationFrame(frame);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e && e.isIntersecting && e.target) {
        scramble(e.target);
      }
    });
  }, { threshold: 0.4 });

  elements.forEach(el => {
    if (el) observer.observe(el);
  });

});

})();
