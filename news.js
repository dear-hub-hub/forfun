const yearLinks = [...document.querySelectorAll('.year-nav a')];
const yearSections = [...document.querySelectorAll('.year')];

const setActiveYear = (id) => {
  yearLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`));
};

yearLinks.forEach((link) => link.addEventListener('click', () => setActiveYear(link.getAttribute('href').slice(1))));

const yearObserver = new IntersectionObserver((entries) => {
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
    setActiveYear(yearSections.at(-1).id);
    return;
  }
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (visible) setActiveYear(visible.target.id);
}, { rootMargin: '-18% 0px -58% 0px', threshold: [0.1, 0.35, 0.6] });

yearSections.forEach((section) => yearObserver.observe(section));

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) setActiveYear(yearSections.at(-1).id);
}, { passive: true });
