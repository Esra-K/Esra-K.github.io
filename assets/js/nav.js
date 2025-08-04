document.addEventListener("DOMContentLoaded", function () {
    const nav = document.getElementById("dynamic-nav");
    const sections = document.querySelectorAll("main section[id]");
  
    nav.innerHTML = ''; // Clear existing nav content
  
    sections.forEach(section => {
      const id = section.id;
      const heading = section.querySelector("h2");
      if (heading) {
        const title = heading.textContent.trim();
        const link = document.createElement("a");
        link.href = `#${id}`;
        link.textContent = title;
        nav.appendChild(link);
      }
    });
  });
  