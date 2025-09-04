document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");

  // Load saved preference
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️";
  } else {
    toggleBtn.textContent = "🌙";
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      toggleBtn.textContent = "☀️"; // sun icon
    } else {
      localStorage.setItem("theme", "light");
      toggleBtn.textContent = "🌙"; // moon icon
    }
  });
});
