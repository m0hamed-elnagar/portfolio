class PortfolioDataManager {
  constructor() {
    this.aboutContainer = document.getElementById('about-dynamic-content');
    this.aboutImage = document.getElementById('about-image-dynamic');
    this.skillsContainer = document.getElementById('skills-container');
    this.experienceContainer = document.getElementById('experience-timeline');
    this.educationIntro = document.getElementById('education-intro');
    this.educationGrid = document.getElementById('education-grid');
    this.contactDetails = document.querySelector('.contact-details');
    this.footerLinks = document.querySelector('.footer-links');
  }

  async loadPortfolioData(dataFile) {
    try {
      const response = await fetch(dataFile);
      if (!response.ok) throw new Error('Failed to load data');
      const data = await response.json();
      
      if (data.about) this.renderAbout(data.about);
      if (data.skills) this.renderSkills(data.skills);
      if (data.experience) this.renderExperience(data.experience);
      if (data.education) this.renderEducation(data.education);
      if (data.personal) this.renderPersonal(data.personal);

      // Refresh AOS after all dynamic content is rendered
      if (window.AOS) {
        window.AOS.refresh();
      }
    } catch (error) {
      console.error('Error loading portfolio data:', error);
    }
  }

  renderAbout(about) {
    if (this.aboutImage) {
      this.aboutImage.src = about.image;
    }
    if (this.aboutContainer) {
      this.aboutContainer.innerHTML = about.paragraphs.map(p => `<p>${p}</p>`).join('');
    }
  }

  renderSkills(skills) {
    if (!this.skillsContainer) return;
    this.skillsContainer.innerHTML = '';

    skills.forEach(category => {
      const categoryDiv = document.createElement('div');
      categoryDiv.className = 'skill-category';
      categoryDiv.setAttribute('data-aos', 'fade-up');
      
      categoryDiv.innerHTML = `
        <h3><i class="${category.icon}" aria-hidden="true"></i>${category.category}</h3>
        <div class="keywords-grid">
          ${category.items.map(skill => `
            <span class="keyword ${skill.level.toLowerCase()}">
              ${skill.name}
            </span>
          `).join('')}
        </div>
      `;
      this.skillsContainer.appendChild(categoryDiv);
    });
  }

  renderExperience(experience) {
    if (!this.experienceContainer) return;
    this.experienceContainer.innerHTML = '';

    experience.forEach((item, index) => {
      const timelineItem = document.createElement('div');
      timelineItem.className = 'timeline-item';
      
      timelineItem.innerHTML = `
        <div class="timeline-date"><i class="far fa-calendar-alt"></i> ${item.period}</div>
        <div class="timeline-content" data-aos="${index % 2 === 0 ? 'fade-left' : 'fade-right'}" data-aos-delay="100">
          <h3><i class="fas fa-briefcase"></i> ${item.role} – ${item.company}</h3>
          <ul>
            ${item.tasks.map(task => `<li>${task}</li>`).join('')}
          </ul>
        </div>
      `;
      this.experienceContainer.appendChild(timelineItem);
    });
  }

  renderEducation(education) {
    if (this.educationIntro) {
      this.educationIntro.innerHTML = `<p>${education.intro}</p>`;
    }

    if (this.educationGrid) {
      this.educationGrid.innerHTML = '';
      education.cards.forEach((card, index) => {
        const educationCard = document.createElement('div');
        educationCard.className = 'education-card';
        educationCard.setAttribute('data-aos', index % 2 === 0 ? 'fade-left' : 'fade-right');
        educationCard.setAttribute('data-aos-delay', '100');

        educationCard.innerHTML = `
          <h3><i class="${card.icon}"></i> ${card.title}</h3>
          <p class="education-period"><i class="far fa-calendar-alt"></i> ${card.period}</p>
          <div class="education-details">
            <ul>
              ${card.details.map(detail => `<li>${detail}</li>`).join('')}
            </ul>
          </div>
        `;
        this.educationGrid.appendChild(educationCard);
      });
    }
  }

  renderPersonal(personal) {
    if (this.contactDetails) {
      this.contactDetails.innerHTML = `
        <div class="content-item">
            <i class="fas fa-map-marker-alt"></i>
            <p>${personal.location}</p>
        </div>
        <div class="content-item">
            <i class="fas fa-phone-alt"></i>
            <p>${personal.phone}</p>
        </div>
        <div class="content-item">
            <i class="fas fa-envelope"></i>
            <p><a href="mailto:${personal.email}" aria-label="Send me an email" title="Email">${personal.email}</a></p>
        </div>
        <div class="content-item">
            <i class="fab fa-linkedin"></i>
            <p><a href="${personal.linkedin}" target="_blank">LinkedIn</a></p>
        </div>
        <div class="content-item">
            <i class="fab fa-github"></i>
            <p><a href="${personal.github}" target="_blank">GitHub</a></p>
        </div>
      `;
    }

    if (this.footerLinks) {
      this.footerLinks.innerHTML = `
        <a href="${personal.github}" target="_blank" aria-label="Visit my GitHub profile" title="GitHub"><i class="fab fa-github" aria-hidden="true"></i></a>
        <a href="${personal.linkedin}" target="_blank" aria-label="Visit my LinkedIn profile" title="LinkedIn"><i class="fab fa-linkedin-in" aria-hidden="true"></i></a>
        <a href="${personal.telegram}" target="_blank" aria-label="Contact me on Telegram" title="Telegram"><i class="fab fa-telegram" aria-hidden="true"></i></a>
        <a href="${personal.facebook}" target="_blank" aria-label="Visit my Facebook profile" title="Facebook"><i class="fab fa-facebook" aria-hidden="true"></i></a>
        <a href="mailto:${personal.email}" aria-label="Send me an email" title="Email"><i class="fas fa-envelope"></i></a>
      `;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const portfolioData = new PortfolioDataManager();
  portfolioData.loadPortfolioData('data.json');
});