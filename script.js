const body = document.body;
const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const year = document.querySelector("[data-year]");

year.textContent = new Date().getFullYear();

const closeMenu = () => {
  body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
};

menuButton.addEventListener("click", () => {
  const isOpen = body.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const updateHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal:not(.is-visible)").forEach((element) => observer.observe(element));
