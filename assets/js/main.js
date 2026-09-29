(() => {
  const header = document.getElementById('site-header');
  const progress = document.querySelector('.header-progress');
  const menu = document.getElementById('site-nav');
  const toggle = document.querySelector('.menu-toggle');
  const glow = document.querySelector('.cursor-glow');

  const onScroll = () => {
    const y = window.scrollY || 0;
    if (header) header.classList.toggle('is-scrolled', y > 24);
    if (progress) {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      progress.style.width = `${Math.min(100, (y / max) * 100)}%`;
    }
  };
  onScroll(); window.addEventListener('scroll', onScroll, { passive:true });

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
      menu.classList.toggle('is-open', !open);
      document.body.style.overflow = open ? '' : 'hidden';
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded','false'); menu.classList.remove('is-open'); document.body.style.overflow='';
    }));
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
    }, { threshold: .12, rootMargin:'0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    if (glow && window.matchMedia('(pointer:fine)').matches) {
      window.addEventListener('mousemove', e => {
        glow.style.left = `${e.clientX}px`; glow.style.top = `${e.clientY}px`; glow.style.opacity = '1';
      }, { passive:true });
      document.documentElement.addEventListener('mouseleave', () => glow.style.opacity = '0');
    }
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }
})();
