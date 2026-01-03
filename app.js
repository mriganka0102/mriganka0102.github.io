const toggle = document.getElementById("theme-toggle");
const root = document.documentElement;

const storedTheme = localStorage.getItem("theme");
if (storedTheme) root.setAttribute("data-theme", storedTheme);

toggle.onclick = () => {
  const isLight = root.getAttribute("data-theme") === "light";
  root.setAttribute("data-theme", isLight ? "dark" : "light");
  localStorage.setItem("theme", isLight ? "dark" : "light");
  toggle.textContent = isLight ? "🌙" : "🌞";
};

/* GitHub Projects */
const username = "mriganka0102";
const grid = document.getElementById("projects-grid");

fetch(`https://api.github.com/users/${username}/repos?sort=stars`)
  .then(res => res.json())
  .then(repos => {
    repos
      .filter(r => !r.fork)
      .slice(0, 4)
      .forEach(repo => {
        const el = document.createElement("article");
        el.className = "card";
        el.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description || "No description provided."}</p>
          <a href="${repo.html_url}" target="_blank">View on GitHub →</a>
        `;
        grid.appendChild(el);
      });
  });
