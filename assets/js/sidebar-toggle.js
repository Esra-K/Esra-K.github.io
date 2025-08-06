// for hamburger
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("sidebar-toggle");
  const sidebar = document.getElementById("sidebar");

  toggle.addEventListener("click", () => {
    console.log("Hamburger clicked");
    sidebar.classList.toggle("collapsed");
    sidebar.classList.toggle("active");
  });
});
