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
    const hueStart = 330; // pink
    const hueEnd = 180; // teal
    const hue = Math.round(hueStart + (hueEnd - hueStart) * t);
    const sat = 85;
    const light = 55 - 12 * (1 - t);
    return `hsl(${hue} ${sat}% ${light}%)`;
  }

  // ONLY find li items inside .with-progress containers
  const liNodes = document.querySelectorAll(
    ".skills-grid .with-progress ul > li"
  );

  liNodes.forEach((li) => {
    if (li.querySelector(".skill-bar")) return;

    const percent = parsePercentFromLi(li);

    if (percent !== null) {
      const pctSpan = document.createElement("span");
      pctSpan.className = "skill-percentage";
      pctSpan.textContent = `${percent}%`;
      li.appendChild(pctSpan);
    }

    const bar = document.createElement("div");
    bar.className = "skill-bar";
    const fill = document.createElement("div");
    fill.className = "skill-fill";

    const usePct = percent === null ? 50 : percent;
    const color = percentToHsl(usePct);
    fill.style.backgroundColor = color;

    // ARIA
    fill.setAttribute("role", "progressbar");
    fill.setAttribute("aria-valuemin", "0");
    fill.setAttribute("aria-valuemax", "100");
    fill.setAttribute("aria-valuenow", String(usePct));
    fill.setAttribute("aria-label", `Skill level ${usePct} percent`);

    bar.appendChild(fill);
    li.appendChild(bar);

    // animate
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fill.style.width = `${usePct}%`;
      });
    });
  });
});
