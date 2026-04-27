document.addEventListener('DOMContentLoaded', function () {
  // Initialize AOS (Animate on Scroll)
  if (window.AOS) {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out',
      offset: 50,
    });
  }

  // Typed.js for the hero section typing effect
  const typed = new Typed('#typed-text', {

    strings: [
      'Mohamed Elnagar',
      'Android Developer.',
      'Specialized in Kotlin & Jetpack Components.',
      'I build high-performance mobile apps.',
      'Expert in Clean Architecture & MVVM.',
      'Transforming ideas into production-grade apps.',
      'Passionate about writing maintainable & testable code.'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2500,
    loop: true,
    smartBackspace: true,
    showCursor: true,
    autoInsertCss: true,
  });

  // Hide header on scroll down, show on scroll up
  let lastScrollTop = 0;
  const header = document.querySelector('.main-navbar');

  window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (header) {
        if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
          // Scroll Down
          header.style.top = `-130px`;
        } else {
          // Scroll Up
          header.style.top = '0';
        }
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
  }, false);

});

projectsScroll('scroll-left-android-projects', 'scroll-right-android-projects', '.android-projects');
projectsScroll('scroll-left-flutter-projects', 'scroll-right-flutter-projects', '.flutter-projects');

  function projectsScroll(scroll_left, scroll_right, projects_container) {
  const scrollLeftBtn = document.getElementById(scroll_left);
  const scrollRightBtn = document.getElementById(scroll_right);
  const projectsContainer = document.querySelector(projects_container);

  if (scrollLeftBtn && projectsContainer) {
      scrollLeftBtn.addEventListener('click', () => {
        projectsContainer.scrollBy({ left: -350, behavior: 'smooth' });
      });
  }

  if (scrollRightBtn && projectsContainer) {
      scrollRightBtn.addEventListener('click', () => {
        projectsContainer.scrollBy({ left: 350, behavior: 'smooth' });
      });
  }
};

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    const currentTheme = localStorage.getItem('theme') || 'dark';

    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.innerHTML = currentTheme === 'light'
      ? '<i class="fas fa-moon"></i>'
      : '<i class="fas fa-sun"></i>';

    themeToggle.addEventListener('click', () => {
      let theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      themeToggle.innerHTML = theme === 'light'
        ? '<i class="fas fa-moon"></i>'
        : '<i class="fas fa-sun"></i>';
    });
}