const projectLinks = [...document.querySelectorAll('.project-intro nav a')];
const projectGroups = [...document.querySelectorAll('.project-group')];

const setActiveProjectGroup = (id) => {
  projectLinks.forEach((link) => {
    const active = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
};

projectLinks.forEach((link) => {
  link.addEventListener('click', () => setActiveProjectGroup(link.getAttribute('href').slice(1)));
});

const projectObserver = new IntersectionObserver((entries) => {
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
    setActiveProjectGroup(projectGroups.at(-1).id);
    return;
  }

  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (visible) setActiveProjectGroup(visible.target.id);
}, { rootMargin: '-18% 0px -58% 0px', threshold: [0.1, 0.35, 0.6] });

projectGroups.forEach((group) => projectObserver.observe(group));

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
    setActiveProjectGroup(projectGroups.at(-1).id);
  }
}, { passive: true });
