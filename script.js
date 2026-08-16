// ===== Mobile nav toggle =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("mobile-open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("mobile-open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
}

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-link");

const setActiveLink = () => {
  let current = "";
  sections.forEach((section) => {
    const top = section.offsetTop - 140;
    if (window.scrollY >= top) {
      current = section.getAttribute("id");
    }
  });

  navAnchors.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`,
    );
  });
};

window.addEventListener("scroll", setActiveLink);
setActiveLink();

// ===== Scroll reveal =====
const revealTargets = document.querySelectorAll(
  ".timeline-card, .info-card, .skill-group, .contact-card, .project-showcase",
);
revealTargets.forEach((el) => el.classList.add("reveal"));

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (prefersReducedMotion) {
  revealTargets.forEach((el) => el.classList.add("in-view"));
} else if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("in-view"));
}

// ===== Copy email button (separate from the mailto link/card) =====
const copyEmailBtn = document.getElementById("copy-email-btn");
if (copyEmailBtn) {
  copyEmailBtn.addEventListener("click", (e) => {
    e.preventDefault(); // don't trigger the card's mailto navigation
    e.stopPropagation();

    const email = "omkarwakchaure2019@gmail.com";
    const showCopied = () => {
      const original = copyEmailBtn.textContent;
      copyEmailBtn.textContent = "✓";
      copyEmailBtn.classList.add("copied");
      setTimeout(() => {
        copyEmailBtn.textContent = original;
        copyEmailBtn.classList.remove("copied");
      }, 1500);
    };

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(email)
        .then(showCopied)
        .catch(() => {});
    }
  });
}
