// assets/js/skills-progress.js
document.addEventListener("DOMContentLoaded", () => {
  function parsePercentFromLi(li) {
    const attr = li.getAttribute("data-percent");
    if (attr !== null) {
      const n = parseFloat(attr);
      if (!Number.isNaN(n)) return Math.max(0, Math.min(100, n));
    }
    return null; // only accept data-percent
  }

  function percentToHsl(percent) {
    const t = Math.max(0, Math.min(100, percent)) / 100;
    const hueStart = 330; // pink
    const hueEnd = 180; // teal
    const hue = Math.round(hueStart + (hueEnd - hueStart) * t);
    const sat = 85;
    const light = 55 - 12 * (1 - t);
    return `hsl(${hue} ${sat}% ${light}%)`;
  }

  const liNodes = document.querySelectorAll(
    ".skills-grid .with-progress ul > li"
  );

  liNodes.forEach((li) => {
    if (li.querySelector(".skill-bar")) return;

    const percent = parsePercentFromLi(li);
    if (percent === null) return; // skip if no valid data-percent

    const bar = document.createElement("div");
    bar.className = "skill-bar";
    const fill = document.createElement("div");
    fill.className = "skill-fill";

    fill.style.backgroundColor = percentToHsl(percent);
    fill.style.width = "0%"; // start empty, animate later

    // ARIA
    fill.setAttribute("role", "progressbar");
    fill.setAttribute("aria-valuemin", "0");
    fill.setAttribute("aria-valuemax", "100");
    fill.setAttribute("aria-valuenow", String(percent));
    fill.setAttribute("aria-label", `Skill level ${percent} percent`);

    bar.appendChild(fill);
    li.appendChild(bar);

    // Save reference for animation
    li.dataset.targetPercent = percent;
    li._skillFill = fill;
  });

  // Animate when visible
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const li = entry.target;
          if (li.dataset.targetPercent && li._skillFill) {
            li._skillFill.style.width = `${li.dataset.targetPercent}%`;
          }
          obs.unobserve(li); // only animate once
        }
      });
    },
    { threshold: 0.3 }
  );

  liNodes.forEach((li) => {
    if (li.dataset.targetPercent && li._skillFill) {
      observer.observe(li);
    }
  });
});
