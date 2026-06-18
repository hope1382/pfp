// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Subtle hero parallax on mouse move
const parallax = document.querySelector("[data-parallax]");
if (parallax && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.addEventListener("mousemove", (ev) => {
    const x = (ev.clientX / window.innerWidth - 0.5) * 14;
    const y = (ev.clientY / window.innerHeight - 0.5) * 14;
    parallax.style.transform = `translate(${x}px, ${y}px)`;
  });
}

// Animated counters
function animateCount(el) {
  const target = +el.dataset.count;
  const dur = 1400, start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { animateCount(e.target); statObserver.unobserve(e.target); }
  });
}, { threshold: 0.5 });
document.querySelectorAll(".num").forEach((n) => statObserver.observe(n));

// Load portfolio from static JSON (works on GitLab Pages, no server needed)
async function loadGallery() {
  const gallery = document.getElementById("gallery");
  try {
    const res = await fetch("portfolio.json");
    const works = await res.json();
    works.forEach((w, i) => {
      const card = document.createElement("article");
      card.className = "work reveal";
      card.style.transitionDelay = `${i * 60}ms`;
      card.innerHTML = `
        <img src="${w.img}" alt="${w.title}" loading="lazy" />
        <div class="work-meta">
          <h3>${w.title}</h3>
          <span>${w.medium} · ${w.year}</span>
        </div>`;
      gallery.appendChild(card);
      io.observe(card);
    });
  } catch (err) {
    gallery.innerHTML = `<p style="color:var(--muted)">Couldn't load the gallery.</p>`;
  }
}
loadGallery();
