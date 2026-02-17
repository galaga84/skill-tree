// ====== NAV MÓVIL ======
const btn = document.getElementById("navToggle");
const mobileNav = document.getElementById("mobileNav");

function openMenu() {
  if (!mobileNav || !btn) return;
  mobileNav.classList.remove("hidden");
  btn.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  if (!mobileNav || !btn) return;
  mobileNav.classList.add("hidden");
  btn.setAttribute("aria-expanded", "false");
}

btn?.addEventListener("click", () => {
  const isOpen = btn.getAttribute("aria-expanded") === "true";
  isOpen ? closeMenu() : openMenu();
});

// cerrar al hacer click en un link del menú
document.querySelectorAll("#mobileNav .nav-link").forEach((a) => {
  a.addEventListener("click", closeMenu);
});

// cerrar al scrollear (opcional)
window.addEventListener("scroll", () => {
  if (!btn) return;
  if (btn.getAttribute("aria-expanded") === "true") closeMenu();
});

// ====== DOM READY ======
document.addEventListener("DOMContentLoaded", () => {
  // ====== HERO: alternar imágenes ======
  const img = document.getElementById("heroImg");
  if (img) {
    const images = ["./assets/img/cohete.png", "./assets/img/cohete-h.png"];
    const intervalMs = 3000;
    const fadeMs = 350;

    // Precarga para evitar parpadeo
    images.forEach((src) => {
      const pre = new Image();
      pre.src = src;
    });

    let i = 0;

    setInterval(() => {
      img.classList.add("is-fading");

      setTimeout(() => {
        i = (i + 1) % images.length;
        img.src = images[i];
        img.classList.remove("is-fading");
      }, fadeMs);
    }, intervalMs);
  }

  // ====== CARRUSEL: flechas ======
  const track = document.getElementById("cardsCarousel");
  const prev = document.getElementById("carouselPrev");
  const next = document.getElementById("carouselNext");

  if (!track || !prev || !next) return;

  const getStep = () => {
    const firstCard = track.querySelector("a");
    if (!firstCard) return 320;

    const styles = getComputedStyle(track);
    const gap =
      parseFloat(styles.columnGap || styles.gap || "0") || 0;

    return firstCard.getBoundingClientRect().width + gap;
  };

  prev.addEventListener("click", () => {
    track.scrollBy({ left: -getStep(), behavior: "smooth" });
  });

  next.addEventListener("click", () => {
    track.scrollBy({ left: getStep(), behavior: "smooth" });
  });
});



