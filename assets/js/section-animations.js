document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target); // animate only once
        }
      });
    },
    { threshold: 0.2 } // trigger when 20% of section is visible
  );

  sections.forEach((section) => observer.observe(section));
});
