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

const syncActiveProjectGroup = () => {
  const readingLine = window.innerHeight * 0.35;
  let activeGroup = projectGroups[0];

  projectGroups.forEach((group) => {
    if (group.getBoundingClientRect().top <= readingLine) activeGroup = group;
  });

  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
    activeGroup = projectGroups.at(-1);
  }

  if (activeGroup) setActiveProjectGroup(activeGroup.id);
};

let projectScrollTicking = false;
window.addEventListener('scroll', () => {
  if (projectScrollTicking) return;
  projectScrollTicking = true;
  window.requestAnimationFrame(() => {
    syncActiveProjectGroup();
    projectScrollTicking = false;
  });
}, { passive: true });

window.addEventListener('resize', syncActiveProjectGroup);
syncActiveProjectGroup();
