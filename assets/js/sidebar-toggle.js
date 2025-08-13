document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("sidebar-toggle");
  const sidebar = document.querySelector(".sidebar"); // now by class

  function updateButtonText() {
    // If sidebar is collapsed (desktop) or not active (mobile)
    const isCollapsedDesktop =
      window.innerWidth > 768 && sidebar.classList.contains("collapsed");
    const isHiddenMobile =
      window.innerWidth <= 768 && !sidebar.classList.contains("active");

    if (isCollapsedDesktop || isHiddenMobile) {
      toggleButton.textContent = "☰"; // Hamburger
    } else {
      toggleButton.textContent = "✕"; // Cross
    }
  }

  toggleButton.addEventListener("click", function () {
    // Always toggle "active" (for mobile visibility)
    sidebar.classList.toggle("active");

    // For desktop: toggle "collapsed" class
    if (window.innerWidth > 768) {
      sidebar.classList.toggle("collapsed");
    }

    updateButtonText();
  });

  // Update icon on load
  updateButtonText();

  // Also update icon when resizing the window
  window.addEventListener("resize", updateButtonText);

  // Prevent main content from scrolling when using sidebar scroll
  sidebar.addEventListener(
    "wheel",
    function (e) {
      e.stopPropagation();
    },
    { passive: true }
  );

  sidebar.addEventListener(
    "touchmove",
    function (e) {
      e.stopPropagation();
    },
    { passive: true }
  );
});
