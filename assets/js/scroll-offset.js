// assets/js/scroll-offset.js
document.addEventListener("click", (e) => {
  // Catch clicks on any link that starts with "#", including dynamically added ones
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;

  const hash = link.getAttribute("href");
  // ignore plain "#" or empty
  if (!hash || hash === "#") return;

  const target = document.querySelector(hash);
  if (!target) return;

  e.preventDefault();

  // If sidebar is open on mobile, close it and unlock body scroll first
  const isMobile = window.innerWidth <= 768;
  const sidebar = document.getElementById("sidebar");
  const toggleButton = document.getElementById("sidebar-toggle");

  if (isMobile && sidebar && sidebar.classList.contains("active")) {
    sidebar.classList.remove("active");
    document.body.classList.remove("sidebar-open");
    if (toggleButton) toggleButton.textContent = "☰";
  }

  // Smooth scroll to the top of the section
  const y = target.getBoundingClientRect().top + window.pageYOffset;
  window.scrollTo({ top: y, behavior: "smooth" });
});
