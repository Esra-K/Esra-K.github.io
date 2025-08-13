// assets/js/skills-progress.js
document.addEventListener("DOMContentLoaded", () => {
  // Helper: parse percent from data-percent attribute OR from text like "Python (90%)" or "C++ - 40%"
  function parsePercentFromLi(li) {
    // 1) data-percent attribute
    const attr = li.getAttribute("data-percent");
    if (attr !== null) {
      const n = parseFloat(attr);
      if (!Number.isNaN(n)) return Math.max(0, Math.min(100, n));
    }
    // 2) parse trailing parenthesis or dash: "Name (90%)" or "Name - 90%"
    const text = li.textContent || "";
    const regex = /(?:\(|-)\s*(\d{1,3})\s*%?\)?\s*$/;
    const m = text.match(regex);
    if (m && m[1]) {
      const n = parseFloat(m[1]);
      if (!Number.isNaN(n)) return Math.max(0, Math.min(100, n));
    }
    return null; // not found
  }

  // Helper: map percent (0..100) to a hue between pink -> teal
  // Pink hue ~ 330, teal hue ~ 180
  function percentToHsl(percent) {
    const t = Math.max(0, Math.min(100, percent)) / 100;
    const hueStart = 330; // pink
    const hueEnd = 180; // teal
    const hue = Math.round(hueStart + (hueEnd - hueStart) * t);
    const sat = 85; // saturation %
    const light = 55 - 12 * (1 - t); // slightly brighter for higher percent
    return `hsl(${hue} ${sat}% ${light}%)`; // using modern HSL with spaces
  }

  // For each li inside .skills-grid > div > ul
  const liNodes = document.querySelectorAll(".skills-grid > div ul > li");
  liNodes.forEach((li) => {
    // don't add twice
    if (li.querySelector(".skill-bar")) return;

    const percent = parsePercentFromLi(li);
    // create percent label (optional)
    if (percent !== null) {
      const pctSpan = document.createElement("span");
      pctSpan.className = "skill-percentage";
      pctSpan.textContent = `${percent}%`;
      li.appendChild(pctSpan);
    }

    // create wrapper and fill
    const bar = document.createElement("div");
    bar.className = "skill-bar";
    const fill = document.createElement("div");
    fill.className = "skill-fill";

    // set fill color based on percent
    const usePct = percent === null ? 50 : percent; // default 50 if unknown
    const color = percentToHsl(usePct);
    fill.style.backgroundColor = color;

    // accessibility: ARIA attributes
    fill.setAttribute("role", "progressbar");
    fill.setAttribute("aria-valuemin", "0");
    fill.setAttribute("aria-valuemax", "100");
    fill.setAttribute("aria-valuenow", String(usePct));
    fill.setAttribute("aria-label", `Skill level ${usePct} percent`);

    bar.appendChild(fill);
    li.appendChild(bar);

    // animate the width after a short delay so transition shows
    requestAnimationFrame(() => {
      // one more RAF to ensure CSS applied
      requestAnimationFrame(() => {
        fill.style.width = `${usePct}%`;
      });
    });
  });
});
