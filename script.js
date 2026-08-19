const body = document.body;
const header = document.getElementById("header");
const progressBar = document.getElementById("progressBar");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const links = [...document.querySelectorAll(".nav-links a")];

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

links.forEach(link => link.addEventListener("click", () => navLinks.classList.remove("open")));

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  const light = body.classList.contains("light");
  themeToggle.textContent = light ? "☀" : "☾";
  localStorage.setItem("portfolio-theme", light ? "light" : "dark");
});

if (localStorage.getItem("portfolio-theme") === "light") {
  body.classList.add("light");
  themeToggle.textContent = "☀";
}

function updateScrollUI() {
  header.classList.toggle("scrolled", window.scrollY > 20);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;

  const current = [...document.querySelectorAll("section[id]")]
    .filter(section => window.scrollY >= section.offsetTop - 180)
    .pop();

  links.forEach(link => link.classList.toggle("active", current && link.getAttribute("href") === `#${current.id}`));
}
window.addEventListener("scroll", updateScrollUI);
updateScrollUI();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const type = document.getElementById("projectType").value;
  const message = document.getElementById("message").value.trim();
  const status = document.getElementById("formStatus");

  if (!name || !email || !message) {
    status.textContent = "Please complete all required fields.";
    return;
  }

  const subject = encodeURIComponent(`Portfolio enquiry — ${type}`);
  const bodyText = encodeURIComponent(`Hello Presidio,\n\nMy name is ${name} (${email}).\n\nProject type: ${type}\n\n${message}`);
  window.location.href = `mailto:nd407902@gmail.com.com?subject=${subject}&body=${bodyText}`;
  status.textContent = "Opening your email client…";
});
