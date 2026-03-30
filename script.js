
// Sticky nav active state
const sections = [...document.querySelectorAll('.section-wrap[id]')];
const links    = [...document.querySelectorAll('nav a')];

const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    links.forEach(l => l.classList.remove('active'));
    const active = document.querySelector(`nav a[href="#${e.target.id}"]`);
    if (active) active.classList.add('active');
  });
}, { threshold: 0.35 });

sections.forEach(s => io.observe(s));

// Fade-in on scroll
const fader = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.card, .sh, .mon-diagram').forEach((el, i) => {
  el.style.opacity  = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = `opacity .5s ${i * 0.04}s ease, transform .5s ${i * 0.04}s ease`;
  fader.observe(el);
});

// Auto-show image slots when src is populated
document.querySelectorAll('.card-img, .hero-img').forEach(wrapper => {
  const img = wrapper.querySelector('img');
  if (img && img.src && !img.src.endsWith('/')) {
    wrapper.style.display = 'block';
  }
});