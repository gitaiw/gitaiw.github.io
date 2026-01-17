if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js")
      .then(() => console.log("Service Worker registered"))
      .catch(err => console.error("Service Worker failed:", err));
  });
}

const iicons = [
    { 
        title: "Keranjang", 
        link: "#", 
        svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z"/>
              </svg>`
    },
    { 
        title: "Pesan", 
        link: "#", 
        svg: `<svg viewBox="0 0 512 512" width="20" height="20" fill="currentColor">
                <path d="M256 32C114.624 32 0 125.1 0 240c0 49.938 22.656 95.688 59.531 132.844C57.563 418.156 32 445.875 32 446.125c0 2.375 1.844 5.625 5.25 4.281 60.313-27.281 95.594-35.656 123.156-37.094C189.219 418.594 222.531 432 256 432c141.376 0 256-93.125 256-208S397.376 32 256 32zm-96 176c-17.625 0-32-14.375-32-32s14.375-32 32-32 32 14.375 32 32-14.375 32-32 32zm128 0c-17.625 0-32-14.375-32-32s14.375-32 32-32 32 14.375 32 32-14.375 32-32 32zm128 0c-17.625 0-32-14.375-32-32s14.375-32 32-32 32 14.375 32 32-14.375 32-32 32z"/>
              </svg>`
    }
];

const ifixed = document.querySelector(".fixed-icons");

if (ifixed) {
    iicons.forEach(item => {
        const a = document.createElement("a");
        a.href = item.link;
        a.title = item.title;
        a.innerHTML = item.svg;
        ifixed.appendChild(a);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const yearEl = document.getElementById("id___year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  });
