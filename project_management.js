class ProjectManager {
  constructor() {
    this.imageModal = document.getElementById('imageDialog');
    this.modalImage = document.getElementById('modalImage');
    this.closeModal = document.getElementById('closeModal');
    this.projectsRendered = false; // Flag to prevent double rendering
    
    if (!this.imageModal) {
      console.error("⛔ Error: <dialog id='imageDialog'> not found.");
      return;
    }

    this.addModalEventListeners();
  }

  // Fetches project data and renders all projects
  async fetchAndShowProjects(projectsFile) {
    // If projects are already rendered (from local data), skip fetching
    if (this.projectsRendered) return;

    const allContainers = document.querySelectorAll('[data-category]');
    
    try {
      const response = await fetch(projectsFile);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      this.renderProjects(data.projects);
    } catch (error) {
      console.error('Failed to load projects:', error);
      this.showErrorState(allContainers, 'Failed to load projects. Please try again later.');
    }
  }

  // Displays an error message in the project containers
  showErrorState(containers, message) {
    containers.forEach(container => {
      container.innerHTML = `<div class="error-message" style="grid-column: 1/-1; text-align: center; padding: 20px; color: var(--primary-dark);">
        <i class="fas fa-exclamation-circle" style="font-size: 2rem; margin-bottom: 10px;"></i>
        <p>${message}</p>
      </div>`;
    });
  }

  // Renders projects into their respective containers
  renderProjects(projects) {
    if (this.projectsRendered) return;

    const allContainers = document.querySelectorAll('[data-category]');
    allContainers.forEach(container => {
      container.innerHTML = ''; // Clear loading/error states
      const category = container.getAttribute('data-category');
      const filteredProjects = projects.filter(p => p.category === category);
      
      if (filteredProjects.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; opacity: 0.7;">No projects found in this category.</p>';
        return;
      }

      filteredProjects.forEach((p, idx) => {
        const card = this.createProjectCard(p, `${category}-${idx}`);
        container.appendChild(card);
        this.initSlider(card, p.images.length);
      });
    });

    this.projectsRendered = true;

    if (window.AOS) {
      window.AOS.refresh();
    }
  }

  // Creates a single project card element
  createProjectCard(project, uniqueId) {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="project-image">
        <div class="image-slider" id="slider-${uniqueId}">
          <div class="slider-container" role="region" aria-label="Project image slider">
            ${project.images.map(img => `<img src="${img}" alt="${project.title} screenshot" class="slider-image" loading="lazy">`).join('')}
          </div>
          <div class="slider-nav" role="tablist">
            ${project.images.map((_, i) => `<button class="slider-dot ${i === 0 ? 'active' : ''}" data-index="${i}" role="tab" aria-label="Go to slide ${i + 1}" aria-selected="${i === 0}"></button>`).join('')}
          </div>
          <div class="slider-arrows">
            <button class="slider-arrow prev" title="Previous Image" aria-label="Previous slide"><i class="fas fa-chevron-left"></i></button>
            <button class="slider-arrow next" title="Next Image" aria-label="Next slide"><i class="fas fa-chevron-right"></i></button>
          </div>
          <div class="slider-controls">
            <button class="control-btn play-pause" title="Play/Pause Slideshow" aria-label="Toggle slideshow">
              <i class="fas fa-play"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="project-content">
        <button class="project-title" aria-expanded="false" aria-controls="details-${uniqueId}">
          <h3>${project.title}</h3>
          <span class="toggle-arrow" aria-hidden="true">▾</span>
        </button>
        <div class="details" id="details-${uniqueId}" aria-hidden="true">
          <div class="details-inner">
            <p>${project.description}</p>
            <h4 style="margin:10px 0 6px;color:var(--primary-dark)">Features</h4>
            <ul class="project-features">${project.features.map(f => `<li>${f}</li>`).join('')}</ul>
            <h4 style="margin:10px 0 6px;color:var(--primary-dark)">Tech Stack</h4>
            <div class="project-tags">${project.tech.map(t => `<span class="tag">${t}</span>`).join('')}</div>
            <div class="project-links">
              ${project.github ? `<a class="btn-github" href="${project.github}" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i>View Code</a>` : ''}
              ${project.demo ? `<a class="btn-github demo" href="${project.demo}" target="_blank" rel="noopener noreferrer"><i class="fas fa-eye"></i>View Demo</a>` : ''}
            </div>
          </div>
        </div>
      </div>
    `;

    card.querySelector('.project-title').addEventListener('click', () => this.toggleCard(card));
    return card;
  }

  // Initializes the image slider for a given card
  initSlider(card, totalImages) {
    const slider = card.querySelector('.image-slider');
    if (!slider) return;

    const container = slider.querySelector('.slider-container');
    const dots = slider.querySelectorAll('.slider-dot');
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    const playPauseBtn = slider.querySelector('.play-pause');
    const playIcon = playPauseBtn.querySelector('i');
    const images = slider.querySelectorAll('.slider-image');

    let currentIndex = 0;
    let autoPlayInterval;
    let isPlaying = true;

    const updateSlider = () => {
      container.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
        dot.setAttribute('aria-selected', i === currentIndex);
      });
    };

    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % totalImages;
      updateSlider();
    };

    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + totalImages) % totalImages;
      updateSlider();
    };

    const startAutoPlay = () => {
      if (autoPlayInterval) clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(nextSlide, 3000);
      if (playIcon) playIcon.className = 'fas fa-pause';
      isPlaying = true;
    };

    const stopAutoPlay = () => {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
      if (playIcon) playIcon.className = 'fas fa-play';
      isPlaying = false;
    };

    const toggleAutoPlay = () => isPlaying ? stopAutoPlay() : startAutoPlay();

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          nextSlide();
          if (isPlaying) { stopAutoPlay(); startAutoPlay(); }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          prevSlide();
          if (isPlaying) { stopAutoPlay(); startAutoPlay(); }
        });
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = i;
        updateSlider();
        if (isPlaying) { stopAutoPlay(); startAutoPlay(); }
      });
    });

    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleAutoPlay();
        });
    }

    images.forEach(img => {
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openImageModal(img.src);
      });
    });

    startAutoPlay();
  }

  // Toggles the details section of a project card
  toggleCard(card) {
    const currentlyOpen = document.querySelector('.card.open');
    if (currentlyOpen && currentlyOpen !== card) {
      this.closeCard(currentlyOpen);
    }
    card.classList.contains('open') ? this.closeCard(card) : this.openCard(card);
  }

  openCard(card) {
    const details = card.querySelector('.details');
    const button = card.querySelector('.project-title');
    if (details && button) {
        details.style.maxHeight = details.scrollHeight + 'px';
        details.style.padding = '12px 18px';
        details.setAttribute('aria-hidden', 'false');
        button.setAttribute('aria-expanded', 'true');
        card.classList.add('open');
    }
  }

  closeCard(card) {
    const details = card.querySelector('.details');
    const button = card.querySelector('.project-title');
    if (details && button) {
        details.style.maxHeight = null;
        details.style.padding = '0 18px';
        details.setAttribute('aria-hidden', 'true');
        button.setAttribute('aria-expanded', 'false');
        card.classList.remove('open');
    }
  }

  // Opens the image modal
  openImageModal(src) {
    this.modalImage.src = src;
    this.modalImage.alt = "Project screenshot enlarged";
    this.imageModal.showModal();
  }

  // Adds event listeners for the image modal
  addModalEventListeners() {
    if (this.closeModal) {
      this.closeModal.addEventListener('click', () => {
        this.imageModal.close();
      });
    }

    // Close on backdrop click
    this.imageModal.addEventListener('click', (e) => {
      const dialogDimensions = this.imageModal.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        this.imageModal.close();
      }
    });

    document.addEventListener('click', (e) => {
      const insideCard = e.target.closest('.card');
      if (!insideCard) {
        const openCardEl = document.querySelector('.card.open');
        if (openCardEl) this.closeCard(openCardEl);
      }
    });
  }
}

// Initialize the ProjectManager
window.projectManager = new ProjectManager();
const PROJECTS_JSON_URL = "https://gist.githubusercontent.com/ramzy-ahmed/8174f35a6ea699bebef04fe877745899/raw/projects.json?timestamp=" + Date.now();
// Delay slightly to allow local data to load first if it exists
setTimeout(() => {
    window.projectManager.fetchAndShowProjects(PROJECTS_JSON_URL);
}, 100);