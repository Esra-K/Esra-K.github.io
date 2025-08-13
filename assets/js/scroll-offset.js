/* smooth scrolling */
// assets/js/scroll-offset.js
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 30, // adjust offset (e.g., for fixed headers)
        behavior: "smooth",
      });
    }
  });
});
