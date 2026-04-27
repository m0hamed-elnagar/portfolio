document.addEventListener('DOMContentLoaded', function () {
  // Initialize AOS (Animate on Scroll)
  AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-in-out',
    offset: 50,
  });

  // Typed.js for the hero section typing effect
  const typed = new Typed('#typed-text', {

    strings: ['Turning Ideas Into Mobile Experiences.',
      'I transform innovative ideas into powerful mobile applications.',
      'I specialize in turning your concepts into beautiful, functional mobile apps.',
      'I craft seamless and intuitive mobile experiences from the ground up.',
      'Expert in building high-quality mobile apps that users love.',
      'Creating engaging mobile applications with a focus on performance and design.',
      'Bringing your mobile app visions to life with modern architecture and stunning UI/UX.',
      'Passionate about developing mobile solutions that make a difference.',
      'Dedicated to delivering top-notch mobile applications tailored to your needs.',
      'Transforming ideas into sleek, user-friendly mobile apps with cutting-edge technology.',
      'Building mobile applications that combine innovation, usability, and aesthetics.',
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
  const header = document.querySelector('.main-header');

  window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
      // Scroll Down
      header.style.top = `-130px`;
    } else {
      // Scroll Up
      header.style.top = '0';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  }, false);

});

projectsScroll('scroll-left-android-projects', 'scroll-right-android-projects', '.android-projects');
projectsScroll('scroll-left-flutter-projects', 'scroll-right-flutter-projects', '.flutter-projects');

  function projectsScroll(scroll_left, scroll_right, projects_container) {
  // أزرار التمرير يمين ويسار
  const scrollLeftBtn = document.getElementById(scroll_left);
  const scrollRightBtn = document.getElementById(scroll_right);
  const projectsContainer = document.querySelector(projects_container);

  scrollLeftBtn.addEventListener('click', () => {
    projectsContainer.scrollBy({ left: -350, behavior: 'smooth' });
  });

  scrollRightBtn.addEventListener('click', () => {
    projectsContainer.scrollBy({ left: 350, behavior: 'smooth' });
  });
};

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
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