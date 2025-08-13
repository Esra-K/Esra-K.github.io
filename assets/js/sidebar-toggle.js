document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("sidebar-toggle");
  const sidebar = document.getElementById("sidebar");
  const body = document.body;

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

  function openSidebar() {
    sidebar.classList.add("active");
    body.classList.add("sidebar-open"); // Lock background scroll
    if (window.innerWidth > 768) {
      sidebar.classList.remove("collapsed");
    }
    updateButtonText();
  }

  function closeSidebar() {
    sidebar.classList.remove("active");
    body.classList.remove("sidebar-open"); // Unlock background scroll
    if (window.innerWidth > 768) {
      sidebar.classList.add("collapsed");
    }
    updateButtonText();
  }

  toggleButton.addEventListener("click", function () {
    if (
      sidebar.classList.contains("active") ||
      (window.innerWidth > 768 && !sidebar.classList.contains("collapsed"))
    ) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  // Prevent closing when clicking sidebar links
  sidebar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function (e) {
      // Allow default scrolling to section
      if (window.innerWidth > 768) {
        // Desktop: do nothing special
      } else {
        // Mobile: keep sidebar open
        e.preventDefault();
        const targetId = this.getAttribute("href");
        if (targetId && targetId.startsWith("#")) {
          document
            .querySelector(targetId)
            .scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // Initial state
  updateButtonText();
  window.addEventListener("resize", updateButtonText);
});
