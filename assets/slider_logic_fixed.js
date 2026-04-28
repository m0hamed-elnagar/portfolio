  initSlider(card, project) {
    const totalImages = project.images.length;
    const customTabs = project.customTabs;
    const slider = card.querySelector('.image-slider');
    if (!slider || totalImages <= 1) return;

    const container = slider.querySelector('.slider-container');
    const nav = slider.querySelector('.slider-nav');
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    const playPauseBtn = slider.querySelector('.play-pause');
    const playIcon = playPauseBtn ? playPauseBtn.querySelector('i') : null;
    const images = slider.querySelectorAll('.slider-image');

    let currentPage = 0;
    let totalPages = 1;
    let itemsPerView = 1;
    let autoPlayInterval;
    let isPlaying = true;

    const setupPagination = () => {
      // Logic for determining how many items to show
      if (customTabs && window.innerWidth >= 768) {
        // Manual override for desktop
        totalPages = customTabs;
        itemsPerView = Math.ceil(totalImages / totalPages);
      } else {
        // Standard responsive logic
        itemsPerView = window.innerWidth >= 768 ? 3 : 1;
        totalPages = Math.ceil(totalImages / itemsPerView);
      }
      
      // Update CSS variable for the layout
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
    };

    const updateSlider = () => {
      if (totalPages <= 1) {
        container.style.transform = 'translateX(0)';
        return;
      }

      if (currentPage >= totalPages) currentPage = 0;
      if (currentPage < 0) currentPage = totalPages - 1;

      // Calculate translation percentage
      // We translate by (1 / itemsPerView * 100)% for each image step
      // But we slide by "one view" at a time, which is itemsPerView images.
      // So one page = itemsPerView * (1/itemsPerView * 100)% = 100%.
      
      let translatePercent = currentPage * 100;
      
      // Safety check: don't slide past the last image
      const maxTranslate = ((totalImages - itemsPerView) / itemsPerView) * 100;
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
      if (playIcon) playIcon.className = 'fas fa-pause';
      isPlaying = true;
    };

    const stopAutoPlay = () => {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
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
