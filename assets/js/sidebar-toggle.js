document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("sidebar-toggle");
  const sidebar = document.getElementById("sidebar");

  function updateButtonText() {
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
    // Toggle "active" for mobile slide-in
    sidebar.classList.toggle("active");

    // Toggle "collapsed" for desktop
    if (window.innerWidth > 768) {
      sidebar.classList.toggle("collapsed");
    }

    // Prevent main content scroll when sidebar is open on mobile
    if (sidebar.classList.contains("active") && window.innerWidth <= 768) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }

    updateButtonText();
  });

  // Update icon on load
  updateButtonText();

  // Update icon and scroll lock state on resize
  window.addEventListener("resize", function () {
    updateButtonText();

    // Remove scroll lock if switching to desktop view
    if (window.innerWidth > 768) {
      document.body.classList.remove("sidebar-open");
    }
  });
});
