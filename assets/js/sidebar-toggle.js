document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("sidebar-toggle");
  const sidebar = document.getElementById("sidebar");

  function updateButtonText() {
    // If sidebar is collapsed (desktop) or hidden (mobile)
    if (
      sidebar.classList.contains("collapsed") ||
      !sidebar.classList.contains("active")
    ) {
      toggleButton.textContent = "☰"; // Hamburger
    } else {
      toggleButton.textContent = "✕"; // Cross
    }
  }

  toggleButton.addEventListener("click", function () {
    // Always toggle "active" for mobile slide-in
    sidebar.classList.toggle("active");

    // For desktop: toggle "collapsed"
    if (window.innerWidth > 768) {
      sidebar.classList.toggle("collapsed");
    }

    updateButtonText();
  });

  // Update icon on load
  updateButtonText();

  // Optional: update icon if window resizes across breakpoint
  window.addEventListener("resize", updateButtonText);
});
