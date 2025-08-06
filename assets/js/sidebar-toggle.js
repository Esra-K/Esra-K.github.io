// Toggle the sidebar in/out on mobile
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("sidebar-toggle");
  const sidebar = document.getElementById("sidebar");
  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
});
