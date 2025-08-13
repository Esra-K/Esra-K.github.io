document.addEventListener("DOMContentLoaded", () => {
  // Only run animation on desktop
  // if (window.innerWidth > 768) {
  if (window.innerWidth > 1) {
    const items = document.querySelectorAll(".skills-grid > div");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("slide-in");
            obs.unobserve(entry.target); // Trigger once per item
          }
        });
      },
      { threshold: 0.2 }
    );

    items.forEach((item) => observer.observe(item));
  }
});
