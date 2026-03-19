/*
====================
 *
 * fixed menu
 *
====================
 */

/* THEME TOGGLE */

const tombolTema = document.getElementById("tombolTema");
const iconMatahari = document.getElementById("iconMatahari");
const iconBulan = document.getElementById("iconBulan");

if (iconMatahari && iconBulan) {
    const isDark = document.documentElement.classList.contains("dark");
    iconMatahari.style.display = isDark ? "none": "inline";
    iconBulan.style.display = isDark ? "inline": "none";
}

if (tombolTema) {
    tombolTema.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");
        const darkSekarang = document.documentElement.classList.contains("dark");
        localStorage.setItem("tema", darkSekarang ? "dark": "light");

        if (iconMatahari && iconBulan) {
            iconMatahari.style.display = darkSekarang ? "none": "inline";
            iconBulan.style.display = darkSekarang ? "inline": "none";
        }
    });
}

/*
====================
 *
 * hide header
 *
====================
 */

const header = document.querySelector(".header");
const targets = document.querySelectorAll(".no-header");

if (header && targets.length) {
  targets.forEach(target => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          header.classList.toggle("hide-header", entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(target);
  });
}

/*
====================
 *
 * fixed menu
 *
====================
 */

document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.querySelector(".content-wrapper");
    const stickyEl = document.querySelector(".section-menu-services-home");

    if (!wrapper || !stickyEl) return;

    let triggerPoint = 0;
    let ticking = false;

    function calculateTrigger() {
        const rect = stickyEl.getBoundingClientRect();
        triggerPoint = wrapper.scrollTop + rect.top - 35;
    }

    calculateTrigger();
    window.addEventListener("resize", calculateTrigger);

    wrapper.addEventListener("scroll", () => {
        if (ticking) return;

        ticking = true;

        window.requestAnimationFrame(() => {
            if (wrapper.scrollTop >= triggerPoint) {
                if (!stickyEl.classList.contains("is-fixed")) {
                    const rect = stickyEl.getBoundingClientRect();

                    stickyEl.style.position = "fixed";
                    stickyEl.style.top = rect.top + "px";
                    stickyEl.style.width = rect.width + "px";
                    stickyEl.style.right = "15px";
                    stickyEl.style.left = "auto";

                    requestAnimationFrame(() => {
                        stickyEl.style.top = "35px";
                        stickyEl.classList.add("is-fixed");
                    });
                }
            } else {
                if (stickyEl.classList.contains("is-fixed")) {
                    stickyEl.removeAttribute("style");
                    stickyEl.classList.remove("is-fixed");
                }
            }

            ticking = false;
        });
    });
});

/*
====================
 *
 * faq
 *
====================
 */

const questions = document.querySelectorAll(".faq-question");
const faqWrapp = document.getElementById("faq-faqWrapp");

if (questions.length && faqWrapp) {
    function closeAll() {
        questions.forEach((q) => {
            q.classList.remove("active");

            const answer = q.nextElementSibling;
            if (answer) answer.style.maxHeight = null;
        });
    }

    questions.forEach((question) => {
        question.addEventListener("click", (e) => {
            e.stopPropagation();

            const isActive = question.classList.contains("active");
            closeAll();

            if (!isActive) {
                question.classList.add("active");

                const answer = question.nextElementSibling;
                if (answer) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }
            }
        });
    });

    document.addEventListener("click", function (e) {
        if (!faqWrapp.contains(e.target)) {
            closeAll();
        }
    });
}

const yearEl = document.getElementById("autoYear");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

/*
====================
 *
 * Canvas
 *
====================
 */

document.addEventListener("DOMContentLoaded", function() {

    const canvas = document.getElementById('c-love');
    if (canvas) {

        const ctx = canvas.getContext('2d');
        let hearts = [];
        let lastMouse = {
            x: 0,
            y: 0
        };

        function getColorFromRoot() {
            return getComputedStyle(document.body)
            .getPropertyValue('--this-data-color-theme').trim() || '--this-data-color-theme';
        }

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        class Heart {
            constructor(x, y, color) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 5 + 12;
                this.life = 1.0;
                this.color = color;
                this.vx = (Math.random() - 0.5) * 2;
                this.vy = (Math.random() - 0.5) * 2;
                this.rotate = Math.random() * Math.PI * 2;
            }

            draw() {
                if (this.life <= 0) return;
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotate);
                ctx.globalAlpha = Math.max(0, this.life);
                ctx.fillStyle = this.color;

                ctx.beginPath();
                const s = this.size;
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(-s/2, -s/2, -s, s/3, 0, s);
                ctx.bezierCurveTo(s, s/3, s/2, -s/2, 0, 0);
                ctx.fill();
                ctx.restore();
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.life -= 0.005;
                this.size *= 0.998;
            }
        }

        function handleMove(e) {
            const x = e.clientX || (e.touches && e.touches[0].clientX);
            const y = e.clientY || (e.touches && e.touches[0].clientY);

            if (x !== undefined && y !== undefined) {
                const dist = Math.hypot(x - lastMouse.x, y - lastMouse.y);

                if (dist > 30) {
                    const rootColor = getColorFromRoot();
                    hearts.push(new Heart(x, y, rootColor));

                    lastMouse.x = x;
                    lastMouse.y = y;
                }
            }
        }

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('touchmove', handleMove);

        function loop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < hearts.length; i++) {
                hearts[i].update();
                hearts[i].draw();
            }

            hearts = hearts.filter(h => h.life > 0);

            requestAnimationFrame(loop);
        }
        loop();
    }

});

/*
====================
 *
 * Letter
 *
====================
 */


document.addEventListener("DOMContentLoaded", () => {
    const teks = "AIW";

    document
    .querySelectorAll(".this-animation-text-loncat-dari-atas")
    .forEach((bagian) => {
        const wadah = bagian.querySelector(".letters");
        if (!wadah) return;

        let kumpulanHuruf = [];
        let idAnimasi = null;
        let sudahAnimasi = false;

        wadah.style.visibility = "hidden";

        function buatHuruf() {
            if (idAnimasi) cancelAnimationFrame(idAnimasi);
            idAnimasi = null;

            kumpulanHuruf.forEach((h) => h.el.remove());
            kumpulanHuruf = [];

            const lebarBagian = bagian.offsetWidth;
            const tinggiBagian = bagian.offsetHeight;
            const jarak = lebarBagian / (teks.length + 1);
            const posisiAwalX = jarak / 2;

            const contoh = document.createElement("div");
            contoh.className = "letter";
            contoh.innerText = "A";
            contoh.style.visibility = "hidden";
            wadah.appendChild(contoh);
            wadah.offsetHeight;
            const tinggiFont = contoh.offsetHeight;
            contoh.remove();

            const batasTanah = tinggiBagian - tinggiFont;

            for (let i = 0; i < teks.length; i++) {
                const elemen = document.createElement("div");
                elemen.className = "letter";
                elemen.innerText = teks[i];
                elemen.style.position = "absolute";
                elemen.style.transform = `translate(${posisiAwalX + i * jarak}px, ${-tinggiBagian}px) rotate(0deg)`;
                wadah.appendChild(elemen);

                const hurufObj = {
                    el: elemen,
                    x: posisiAwalX + i * jarak,
                    y: -tinggiBagian,
                    velocityY: 0,
                    velocityX: (Math.random() - 0.5) * 2,
                    rotation: (Math.random() - 0.5) * 15,
                    rotationSpeed: (Math.random() - 0.5) * 5,
                    groundY: batasTanah,
                    maxWidth: lebarBagian,
                    isDragging: false,
                };

                let dragOffsetX = 0;
                let dragOffsetY = 0;

                const startDrag = (e) => {
                    e.preventDefault();
                    hurufObj.isDragging = true;

                    const clientX = e.touches ? e.touches[0].clientX: e.clientX;
                    const clientY = e.touches ? e.touches[0].clientY: e.clientY;

                    dragOffsetX = clientX - hurufObj.x;
                    dragOffsetY = clientY - hurufObj.y;

                    document.addEventListener("mousemove", onDrag);
                    document.addEventListener("mouseup", endDrag);
                    document.addEventListener("touchmove", onDrag, {
                        passive: false
                    });
                    document.addEventListener("touchend", endDrag);
                };

                const onDrag = (e) => {
                    if (!hurufObj.isDragging) return;

                    const clientX = e.touches ? e.touches[0].clientX: e.clientX;
                    const clientY = e.touches ? e.touches[0].clientY: e.clientY;

                    hurufObj.x = clientX - dragOffsetX;
                    hurufObj.y = clientY - dragOffsetY;

                    hurufObj.velocityX = 0;
                    hurufObj.velocityY = 0;
                };

                const endDrag = () => {
                    if (!hurufObj.isDragging) return;
                    hurufObj.isDragging = false;

                    hurufObj.velocityX = (Math.random() - 0.5) * 5;
                    hurufObj.velocityY = -Math.random() * 1;
                    hurufObj.rotationSpeed = (Math.random() - 0.5) * 10;

                    document.removeEventListener("mousemove", onDrag);
                    document.removeEventListener("mouseup", endDrag);
                    document.removeEventListener("touchmove", onDrag);
                    document.removeEventListener("touchend", endDrag);
                };

                elemen.addEventListener("mousedown", startDrag);
                elemen.addEventListener("touchstart", startDrag, {
                    passive: false
                });

                kumpulanHuruf.push(hurufObj);
            }

            requestAnimationFrame(() => {
                wadah.style.visibility = "visible";
                wadah.style.opacity = 0;
                wadah.style.transition = "opacity 0.2s";
                requestAnimationFrame(() => {
                    wadah.style.opacity = 1;
                });
            });
        }

        function jalankanAnimasi() {
            kumpulanHuruf.forEach((h) => {
                if (!h.isDragging) {
                    h.velocityY += 0.05;
                    h.y += h.velocityY;
                    h.x += h.velocityX;
                    h.rotation += h.rotationSpeed;

                    if (h.x <= 0) {
                        h.x = 0;
                        h.velocityX *= -0.8;
                    }
                    if (h.x + h.el.offsetWidth >= h.maxWidth) {
                        h.x = h.maxWidth - h.el.offsetWidth;
                        h.velocityX *= -0.8;
                    }

                    if (h.y >= h.groundY) {
                        h.y = h.groundY;
                        h.velocityY *= 0.2;
                        h.velocityX *= 0.95;
                        h.rotationSpeed *= 0.95;

                        if (Math.abs(h.velocityY) < 0.05) h.velocityY = 0.05;
                        if (Math.abs(h.velocityX) < 0.05)
                            h.velocityX = (Math.random() - 0.5) * 0.1;
                        if (Math.abs(h.rotationSpeed) < 0.05)
                            h.rotationSpeed = (Math.random() - 0.5) * 0.1;
                    }

                    const ceilingY = 0;

                    if (h.y <= ceilingY) {
                        h.y = ceilingY;
                        h.velocityY *= -0.5;
                        h.rotationSpeed *= 0.9;
                    }
                }

                h.el.style.transform = `translate(${h.x}px, ${h.y}px) rotate(${h.rotation}deg)`;
            });

            idAnimasi = requestAnimationFrame(jalankanAnimasi);
        }

        function ukuranSaatResize() {
            const lebarBagian = bagian.offsetWidth;
            const tinggiBagian = bagian.offsetHeight;

            const contoh = document.createElement("div");
            contoh.className = "letter";
            contoh.innerText = "A";
            contoh.style.visibility = "hidden";
            wadah.appendChild(contoh);
            wadah.offsetHeight;
            const tinggiFont = contoh.offsetHeight;
            contoh.remove();

            const batasTanah = tinggiBagian - tinggiFont;

            kumpulanHuruf.forEach((h) => {
                h.maxWidth = lebarBagian;
                h.groundY = batasTanah;

                if (h.x + h.el.offsetWidth > lebarBagian) {
                    h.x = lebarBagian - h.el.offsetWidth;
                }
                if (h.y > batasTanah) {
                    h.y = batasTanah;
                }
            });
        }

        window.addEventListener("resize",
            ukuranSaatResize);
        window.addEventListener("orientationchange",
            ukuranSaatResize);

        const pengamat = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !sudahAnimasi) {
                        sudahAnimasi = true;
                        setTimeout(() => {
                            jalankanAnimasi();
                        }, 1000);
                    }
                });
            },
            {
                threshold: 0.2
            }
        );

        pengamat.observe(bagian);

        buatHuruf();
    });
});

/*
====================
 *
 * ANIMASI BORDER BOTTOM
 *
====================
 */

const elements = document.querySelectorAll('.animasi-border-bottom');

if(elements.length){

  const delayAwal = 1000;
  const delayAntar = 200;

  elements.forEach((el,i)=>{
    el.dataset.index = i;
  });

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{

      const index = entry.target.dataset.index;

      if(entry.isIntersecting){

        entry.target.classList.remove("active");

        setTimeout(()=>{
          entry.target.classList.add("active");
        }, delayAwal + (index * delayAntar));

      }else{
        entry.target.classList.remove("active");
      }

    });
  },{
    threshold:0.3
  });

  elements.forEach(el=>observer.observe(el));

}