// for hamburger
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("sidebar-toggle");
  const sidebar = document.getElementById("sidebar");

  // start “collapsed” on page load if you want:
  // sidebar.classList.add('collapsed');

  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    sidebar.classList.toggle("collapsed");
  });
});
