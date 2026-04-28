class ProjectManager {
  constructor() {
    this.imageModal = document.getElementById('imageDialog');
    this.modalImage = document.getElementById('modalImage');
    this.closeModal = document.getElementById('closeModal');
    this.projectsRendered = false; // Flag to prevent double rendering
    
    if (!this.imageModal) {
      console.warn("⚠️ Warning: <dialog id='imageDialog'> not found in DOM yet.");
    }

    this.addModalEventListeners();
    console.log("🚀 ProjectManager initialized (v1.3 - Cache Buster applied)");
  }

  // Fetches project data and renders all projects
  async fetchAndShowProjects(projectsFile) {
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

  showErrorState(containers, message) {
    containers.forEach(container => {
      container.innerHTML = `<div class="error-message" style="grid-column: 1/-1; text-align: center; padding: 20px; color: var(--primary-dark);">
        <i class="fas fa-exclamation-circle" style="font-size: 2rem; margin-bottom: 10px;"></i>
        <p>${message}</p>
      </div>`;
    });
  }

  renderProjects(projects) {
    if (this.projectsRendered) return;

    const allContainers = document.querySelectorAll('[data-category]');
    allContainers.forEach(container => {
      container.innerHTML = ''; 
      const category = container.getAttribute('data-category');
      
      const filteredProjects = category === 'all' 
        ? projects 
        : projects.filter(p => p.category === category);
      
      if (filteredProjects.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; opacity: 0.7;">No projects found.</p>';
        return;
      }

      filteredProjects.forEach((p, idx) => {
        const card = this.createProjectCard(p, `${category}-${idx}`);
        container.appendChild(card);
        this.initSlider(card, p);
      });
    });

    this.projectsRendered = true;
    if (window.AOS) window.AOS.refresh();
  }

  createProjectCard(project, uniqueId) {
    const card = document.createElement('article');
    card.className = `card ${project.featured ? 'featured' : ''}`;
    
    const validImages = project.images.filter(img => img && img.trim() !== '');
    const hasMultipleImages = validImages.length > 1;
    
    const uiBadge = project.uiFramework ? `<div class="featured-badge ${project.uiFramework.toLowerCase()}">${project.uiFramework}</div>` : '';

    card.innerHTML = `
      ${uiBadge}
      <div class="project-image">
        <div class="image-slider" id="slider-${uniqueId}">
          <div class="slider-container" role="region" aria-label="Project image slider">
            ${validImages.map(img => `<img src="${img}" alt="${project.title} screenshot" class="slider-image" loading="lazy">`).join('')}
          </div>
          ${hasMultipleImages ? `
          <div class="slider-nav" role="tablist"></div>
          <div class="slider-arrows">
            <button class="slider-arrow prev" title="Previous Image" aria-label="Previous slide"><i class="fas fa-chevron-left"></i></button>
            <button class="slider-arrow next" title="Next Image" aria-label="Next slide"><i class="fas fa-chevron-right"></i></button>
          </div>
          <div class="slider-controls">
            <button class="control-btn play-pause" title="Play/Pause Slideshow" aria-label="Toggle slideshow">
              <i class="fas fa-pause"></i>
            </button>
          </div>
          ` : ''}
          <div class="external-links">
            ${project.github ? `<a class="icon-link github" href="${project.github}" target="_blank" rel="noopener noreferrer" title="View Source on GitHub" aria-label="GitHub Repository"><i class="fab fa-github"></i></a>` : ''}
            ${project.demo ? `<a class="icon-link demo" href="${project.demo}" target="_blank" rel="noopener noreferrer" title="View Live Demo" aria-label="Live Demo"><i class="fas fa-external-link-alt"></i></a>` : ''}
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
            <p style="color:var(--dark-text)">${project.description}</p>
            <h4 style="margin:10px 0 6px;color:var(--primary-color)">Features</h4>
            <ul class="project-features" style="color:var(--dark-text)">${project.features.map(f => `<li>${f}</li>`).join('')}</ul>
            <h4 style="margin:10px 0 6px;color:var(--primary-color)">Tech Stack</h4>
            <div class="project-tags">${project.tech.map(t => `<span class="tag">${t}</span>`).join('')}</div>
          </div>
        </div>
      </div>
    `;

    card.querySelector('.project-title').addEventListener('click', () => this.toggleCard(card));
    return card;
  }

  initSlider(card, project) {
    const validImages = project.images.filter(img => img && img.trim() !== '');
    const totalImages = validImages.length;
    let customTabs = project.customTabs;
    
    // Explicit hardcoded fix for Sheet Compute
    if (project.title.toLowerCase().includes('sheet compute')) {
        customTabs = 2;
    }

    const slider = card.querySelector('.image-slider');
    if (!slider || totalImages <= 1) return;

    const container = slider.querySelector('.slider-container');
    const nav = slider.querySelector('.slider-nav');
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    const playPauseBtn = slider.querySelector('.play-pause');
    const images = slider.querySelectorAll('.slider-image');

    let currentPage = 0;
    let totalPages = 1;
    let itemsPerView = 1;
    let autoPlayInterval;
    let isPlaying = true;

    const setupPagination = () => {
      requestAnimationFrame(() => {
        // MATCH CSS BREAKPOINT EXACTLY (>= 768px)
        const isDesktop = window.innerWidth >= 768;

        if (customTabs && isDesktop) {
          totalPages = customTabs;
          itemsPerView = Math.ceil(totalImages / totalPages);
        } else {
          itemsPerView = isDesktop ? 3 : 1;
          totalPages = Math.ceil(totalImages / itemsPerView);
        }
        
        // Force layout synchronization
        slider.style.setProperty('--items-per-view', itemsPerView);
        
        if (nav) {
          nav.innerHTML = '';
          if (totalPages > 1) {
            for (let i = 0; i < totalPages; i++) {
              const dot = document.createElement('button');
              dot.className = `slider-dot ${i === currentPage ? 'active' : ''}`;
              dot.setAttribute('role', 'tab');
              dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
              dot.setAttribute('aria-selected', i === currentPage);
              dot.addEventListener('click', (e) => {
                e.stopPropagation();
                currentPage = i;
                updateSlider();
                if (isPlaying) { stopAutoPlay(); startAutoPlay(); }
              });
              nav.appendChild(dot);
            }
          }
        }

        const arrowContainer = slider.querySelector('.slider-arrows');
        if (arrowContainer) {
          arrowContainer.style.display = totalPages > 1 ? 'flex' : 'none';
        }

        updateSlider();
      });
    };

    const updateSlider = () => {
      if (totalPages <= 1) {
        container.style.transform = 'translateX(0)';
        return;
      }

      if (currentPage >= totalPages) currentPage = 0;
      if (currentPage < 0) currentPage = totalPages - 1;

      let translatePercent = currentPage * 100;
      
      // Prevent sliding into empty space
      const maxScrollItems = totalImages - itemsPerView;
      const maxTranslate = (maxScrollItems / itemsPerView) * 100;
      if (translatePercent > maxTranslate && totalImages > itemsPerView) {
        translatePercent = maxTranslate;
      }

      container.style.transform = `translateX(-${translatePercent}%)`;

      const dots = slider.querySelectorAll('.slider-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentPage);
        dot.setAttribute('aria-selected', i === currentPage);
      });
    };

    const nextSlide = () => {
      currentPage = (currentPage + 1) % totalPages;
      updateSlider();
    };

    const prevSlide = () => {
      currentPage = (currentPage - 1 + totalPages) % totalPages;
      updateSlider();
    };

    const startAutoPlay = () => {
      if (autoPlayInterval) clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(() => {
        if (totalPages > 1) nextSlide();
      }, 3000);
      const playIcon = playPauseBtn ? playPauseBtn.querySelector('i') : null;
      if (playIcon) playIcon.className = 'fas fa-pause';
      isPlaying = true;
    };

    const stopAutoPlay = () => {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
      const playIcon = playPauseBtn ? playPauseBtn.querySelector('i') : null;
      if (playIcon) playIcon.className = 'fas fa-play';
      isPlaying = false;
    };

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

    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        isPlaying ? stopAutoPlay() : startAutoPlay();
      });
    }

    images.forEach(img => {
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openImageModal(img.src);
      });
    });

    window.addEventListener('resize', setupPagination);
    setupPagination();
    startAutoPlay();
  }

  toggleCard(card) {
    const currentlyOpen = document.querySelector('.card.open');
    if (currentlyOpen && currentlyOpen !== card) this.closeCard(currentlyOpen);
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

  openImageModal(src) {
    if (!this.modalImage) return;
    this.modalImage.src = src;
    this.modalImage.alt = "Project screenshot enlarged";
    this.imageModal.showModal();
  }

  addModalEventListeners() {
    if (this.closeModal) this.closeModal.addEventListener('click', () => this.imageModal.close());
    if (this.imageModal) {
        this.imageModal.addEventListener('click', (e) => {
          const rect = this.imageModal.getBoundingClientRect();
          if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
            this.imageModal.close();
          }
        });
    }
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.card')) {
        const open = document.querySelector('.card.open');
        if (open) this.closeCard(open);
      }
    });
  }
}

window.projectManager = new ProjectManager();
