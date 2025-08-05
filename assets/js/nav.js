document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("dynamic-nav");
    const sections = document.querySelectorAll(".main-content section[id]");

    sections.forEach(section => {
        const id = section.id;
        const title = section.querySelector("h2")?.innerText || id;
        const link = document.createElement("a");
        link.href = `#${id}`;
        link.textContent = title;
        nav.appendChild(link);
    });
});
