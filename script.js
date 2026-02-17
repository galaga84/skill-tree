// ====== NAV MÓVIL ======
const btn = document.getElementById("navToggle");
const mobileNav = document.getElementById("mobileNav");

let openedAt = 0;

function isOpen() {
  return btn?.getAttribute("aria-expanded") === "true";
}

function openMenu() {
  if (!mobileNav || !btn) return;
  mobileNav.classList.remove("hidden");
  btn.setAttribute("aria-expanded", "true");
  openedAt = Date.now();
}

function closeMenu() {
  if (!mobileNav || !btn) return;
  mobileNav.classList.add("hidden");
  btn.setAttribute("aria-expanded", "false");
}

btn?.addEventListener("click", (e) => {
  e.preventDefault();
  isOpen() ? closeMenu() : openMenu();
});

// Cerrar al hacer click en un link del menú (IMPORTANTE: tus <a> no tienen .nav-link)
document.querySelectorAll("#mobileNav a").forEach((a) => {
  a.addEventListener("click", closeMenu);
});

// Cerrar al hacer click fuera del header
document.addEventListener("click", (e) => {
  if (!btn || !mobileNav) return;
  if (!isOpen()) return;

  const header = btn.closest("header");
  const clickedInsideHeader = header?.contains(e.target);

  if (!clickedInsideHeader) closeMenu();
});

// Cerrar al scrollear, PERO no al tiro (evita cierre instantáneo al abrir)
window.addEventListener(
  "scroll",
  () => {
    if (!btn) return;
    if (!isOpen()) return;

    // espera un poquito después de abrir para no “autocerrarse”
    if (Date.now() - openedAt < 250) return;

    closeMenu();
  },
  { passive: true }
);

// ====== HERO: alternar imágenes ======
document.addEventListener("DOMContentLoaded", () => {
  const img = document.getElementById("heroImg");
  if (!img) return;

  const images = ["./assets/img/cohete.png", "./assets/img/cohete-h.png"];
  const intervalMs = 3000;
  const fadeMs = 350;

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
});

// ====== CARRUSEL: flechas ======
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("cardsCarousel");
  const prev = document.getElementById("carouselPrev");
  const next = document.getElementById("carouselNext");

  if (!track || !prev || !next) return;

  const getStep = () => {
    const firstCard = track.querySelector("a");
    if (!firstCard) return 320;

    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;

    return firstCard.getBoundingClientRect().width + gap;
  };

  prev.addEventListener("click", () => {
    track.scrollBy({ left: -getStep(), behavior: "smooth" });
  });

  next.addEventListener("click", () => {
    track.scrollBy({ left: getStep(), behavior: "smooth" });
  });
});
