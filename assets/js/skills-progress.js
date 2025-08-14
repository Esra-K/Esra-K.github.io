// assets/js/skills-progress.js
document.addEventListener("DOMContentLoaded", () => {
  function parsePercentFromLi(li) {
    const attr = li.getAttribute("data-percent");
    if (attr !== null) {
      const n = parseFloat(attr);
      if (!Number.isNaN(n)) return Math.max(0, Math.min(100, n));
    }
    const text = li.textContent || "";
    const regex = /(?:\(|-)\s*(\d{1,3})\s*%?\)?\s*$/;
    const m = text.match(regex);
    if (m && m[1]) {
      const n = parseFloat(m[1]);
      if (!Number.isNaN(n)) return Math.max(0, Math.min(100, n));
    }
    return null;
  }

  function percentToHsl(percent) {
    const t = Math.max(0, Math.min(100, percent)) / 100;
    // spectrum: hsl(339°, 82%, 56%) -> hsl(185°, 99%, 80%)
    const hueStart = 339;
    const satStart = 82;
    const lightStart = 56;

    const hueEnd = 185;
    const satEnd = 99;
    const lightEnd = 80;

    const hue = Math.round(hueStart + (hueEnd - hueStart) * t);
    const sat = Math.round(satStart + (satEnd - satStart) * t);
    const light = Math.round(lightStart + (lightEnd - lightStart) * t);

    return `hsl(${hue} ${sat}% ${light}%)`;
  }

  const liNodes = document.querySelectorAll(
    ".skills-grid .with-progress ul > li"
  );

  liNodes.forEach((li) => {
    if (li.querySelector(".skill-bar")) return;

    const percent = parsePercentFromLi(li);
    const usePct = percent === null ? 50 : percent;

    const bar = document.createElement("div");
    bar.className = "skill-bar";
    const fill = document.createElement("div");
    fill.className = "skill-fill";

    // set color, but keep width at 0 until animation trigger
    fill.style.backgroundColor = percentToHsl(usePct);
    fill.style.width = "0%";

    // ARIA
    fill.setAttribute("role", "progressbar");
    fill.setAttribute("aria-valuemin", "0");
    fill.setAttribute("aria-valuemax", "100");
    fill.setAttribute("aria-valuenow", String(usePct));
    fill.setAttribute("aria-label", `Skill level ${usePct} percent`);

    bar.appendChild(fill);
    li.appendChild(bar);

    // store target percent for later animation
    li.dataset.targetPercent = usePct;
  });

  // IntersectionObserver to trigger animation on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const li = entry.target;
          const fill = li.querySelector(".skill-fill");
          if (fill && !li.dataset.animated) {
            const target = li.dataset.targetPercent || 0;
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                fill.style.width = `${target}%`;
              });
            });
            li.dataset.animated = "true"; // ensure one-time animation
          }
        }
      });
    },
    { threshold: 0.3 } // trigger when 30% visible
  );

  liNodes.forEach((li) => observer.observe(li));
});
