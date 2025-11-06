// No special behavior needed, but good practice to add smooth scrolling
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Scroll reveal for sections with .reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Subtle custom cursor dot
const cursorDot = document.querySelector('.cursor-dot');
if (cursorDot) {
  let x = 0, y = 0;
  let tx = 0, ty = 0;
  const speed = 0.18; // trailing speed

  const onMove = (e) => {
    x = e.clientX; y = e.clientY;
  };
  window.addEventListener('mousemove', onMove);

  const raf = () => {
    tx += (x - tx) * speed;
    ty += (y - ty) * speed;
    cursorDot.style.transform = `translate(${tx - 0}px, ${ty - 0}px)`;
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
}

// Add a slight tilt effect to interactive cards
document.querySelectorAll('.interactive-card').forEach(card => {
  const damp = 30;
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const rx = ((cy / rect.height) - 0.5) * -damp;
    const ry = ((cx / rect.width) - 0.5) * damp;
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});