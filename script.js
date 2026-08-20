const yearTarget = document.getElementById("year");
if (yearTarget) {
  yearTarget.textContent = String(new Date().getFullYear());
}

const bodyEl = document.body;
if (bodyEl) {
  window.requestAnimationFrame(() => {
    bodyEl.classList.add("page-ready");
  });
}

const createStarfield = () => {
  if (!bodyEl || bodyEl.querySelector(".starfield")) {
    return;
  }

  const starfield = document.createElement("div");
  starfield.className = "starfield";
  starfield.setAttribute("aria-hidden", "true");

  const starCount = window.innerWidth < 720 ? 46 : 86;
  for (let i = 0; i < starCount; i += 1) {
    const star = document.createElement("i");
    star.style.setProperty("--top", `${Math.random() * 100}%`);
    star.style.setProperty("--left", `${Math.random() * 100}%`);
    star.style.setProperty("--size", `${(Math.random() * 1.9 + 0.65).toFixed(2)}px`);
    star.style.setProperty("--alpha", `${(Math.random() * 0.7 + 0.2).toFixed(2)}`);
    star.style.setProperty("--duration", `${(Math.random() * 5.2 + 3.4).toFixed(2)}s`);
    star.style.setProperty("--delay", `${(Math.random() * 5).toFixed(2)}s`);
    starfield.appendChild(star);
  }

  bodyEl.prepend(starfield);
};

createStarfield();

const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 95}ms`;
  observer.observe(item);
});

const internalLinks = document.querySelectorAll(
  "a[href]:not([target='_blank']):not([href^='mailto:']):not([href^='tel:']):not([href^='#'])"
);

internalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href) {
      return;
    }

    const destination = new URL(href, window.location.href);
    if (destination.origin !== window.location.origin) {
      return;
    }

    event.preventDefault();
    bodyEl.classList.add("page-transitioning");

    window.setTimeout(() => {
      window.location.assign(destination.href);
    }, 270);
  });
});
