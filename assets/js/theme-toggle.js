document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const icon = toggleBtn.querySelector("i");

  // Load saved preference
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    icon.className = "fa-solid fa-sun"; // sun icon
  } else {
    icon.className = "fa-solid fa-moon"; // moon icon
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      icon.className = "fa-solid fa-sun"; // sun icon
    } else {
      localStorage.setItem("theme", "light");
      icon.className = "fa-solid fa-moon"; // moon icon
    }
  });
});
