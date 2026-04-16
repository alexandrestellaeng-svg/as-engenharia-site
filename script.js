
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const closeBtn = document.getElementById('lightboxClose');

document.querySelectorAll('.project-image').forEach(btn => {
  btn.addEventListener('click', () => {
    lightboxImg.src = btn.dataset.full;
    lightboxImg.alt = btn.dataset.title;
    lightboxTitle.textContent = btn.dataset.title;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImg.src = '';
  document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});


const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.target || 0);
    let start = 0;
    const duration = 1200;
    const stepTime = Math.max(20, duration / Math.max(target, 1));
    const timer = setInterval(() => {
      start += 1;
      if (start >= target) {
        el.textContent = target === 100 ? '100%' : `+${target}`;
        clearInterval(timer);
      } else {
        el.textContent = target === 100 ? `${start}%` : `+${start}`;
      }
    }, stepTime);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.4 });

counters.forEach(counter => counterObserver.observe(counter));




const header = document.querySelector('.site-header');
const onScroll = () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 12);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });
