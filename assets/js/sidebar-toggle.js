// for hamburger
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("sidebar-toggle");
  const sidebar = document.getElementById("sidebar");

  function updateButtonText() {
    if (sidebar.classList.contains("collapsed")) {
      toggleButton.textContent = "☰"; // Hamburger
    } else {
      toggleButton.textContent = "✕"; // Cross
    }
  }

  toggleButton.addEventListener("click", function () {
    sidebar.classList.toggle("collapsed");
    updateButtonText();
  });

  updateButtonText(); // Set initial state
});
