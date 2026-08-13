const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('nav');

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
  menuButton.textContent = isOpen ? 'Close' : 'Menu';
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  if (menuButton) menuButton.textContent = 'Menu';
}));

const hero = document.querySelector('.hero');
const updateHeroScrollLight = () => {
  if (!hero) return;
  const progress = Math.min(1, Math.max(0, window.scrollY / Math.max(hero.offsetHeight * .65, 1)));
  hero.style.setProperty('--hero-scroll', progress.toFixed(3));
};

updateHeroScrollLight();
window.addEventListener('scroll', updateHeroScrollLight, { passive: true });

const recruiting = document.querySelector('.recruiting');
if (recruiting) {
  const recruitingObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.35 });
  recruitingObserver.observe(recruiting);
}
