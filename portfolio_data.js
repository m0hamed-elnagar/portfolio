class PortfolioDataManager {
  constructor() {
    this.aboutContainer = document.getElementById('about-dynamic-content');
    this.aboutImage = document.getElementById('about-image-dynamic');
    this.skillsContainer = document.getElementById('skills-container');
    this.experienceContainer = document.getElementById('experience-timeline');
    this.educationIntro = document.getElementById('education-intro');
    this.educationGrid = document.getElementById('education-grid');
    this.contactContainer = document.getElementById('contact-container');
    this.footerLinks = document.querySelector('.footer-links');
    this.copyrightText = document.querySelector('.copyright');
    
    this.logoElements = document.querySelectorAll('.logo');
    this.heroSubtitle = document.querySelector('.subtitle');
  }

  async loadPortfolioData(dataFile) {
    try {
      const response = await fetch(dataFile);
      if (!response.ok) throw new Error('Failed to load data');
      const data = await response.json();
      
      if (data.personal) this.renderPersonal(data.personal);
      if (data.about) this.renderAbout(data.about);
      if (data.skills) this.renderSkills(data.skills);
      if (data.experience) this.renderExperience(data.experience);
      if (data.education) this.renderEducation(data.education);
      if (data.personal) this.renderContact(data.personal);

      if (data.projects && window.projectManager) {
        window.projectManager.renderProjects(data.projects);
      }

      if (window.AOS) {
        window.AOS.refresh();
      }
    } catch (error) {
      console.error('Error loading portfolio data:', error);
    }
  }

  renderAbout(about) {
    if (this.aboutImage) this.aboutImage.src = about.image;
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
        <div class="keywords-grid">${category.items.map(skill => `<span class="keyword ${skill.level.toLowerCase()}">${skill.name}</span>`).join('')}</div>
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
          <ul>${item.tasks.map(task => `<li>${task}</li>`).join('')}</ul>
        </div>
      `;
      this.experienceContainer.appendChild(timelineItem);
    });
  }

  renderEducation(education) {
    if (this.educationIntro) this.educationIntro.innerHTML = `<p>${education.intro}</p>`;
    if (this.educationGrid) {
      this.educationGrid.innerHTML = '';
      education.cards.forEach((card, index) => {
        const educationCard = document.createElement('div');
        educationCard.className = 'education-card';
        educationCard.setAttribute('data-aos', index % 2 === 0 ? 'fade-left' : 'fade-right');
        educationCard.innerHTML = `
          <h3><i class="${card.icon}"></i> ${card.title}</h3>
          <p class="education-period"><i class="far fa-calendar-alt"></i> ${card.period}</p>
          <div class="education-details"><ul>${card.details.map(detail => `<li>${detail}</li>`).join('')}</ul></div>
        `;
        this.educationGrid.appendChild(educationCard);
      });
    }
  }

  renderPersonal(personal) {
    if (this.logoElements) {
      this.logoElements.forEach(el => el.textContent = personal.logoName || personal.name);
    }
    if (this.heroSubtitle) {
      this.heroSubtitle.textContent = personal.heroSubtitle;
    }
    if (this.copyrightText) {
      const year = new Date().getFullYear();
      this.copyrightText.innerHTML = `&copy;${year} ${personal.name}. All Rights Reserved.`;
    }
    
    if (this.footerLinks) {
        let footerHtml = '';
        if (personal.github && personal.github !== '#') footerHtml += `<a href="${personal.github}" target="_blank" title="GitHub"><i class="fab fa-github"></i></a>`;
        if (personal.linkedin && personal.linkedin !== '#') footerHtml += `<a href="${personal.linkedin}" target="_blank" title="LinkedIn"><i class="fab fa-linkedin-in"></i></a>`;
        if (personal.telegram && personal.telegram !== '#') footerHtml += `<a href="${personal.telegram}" target="_blank" title="Telegram"><i class="fab fa-telegram"></i></a>`;
        if (personal.whatsapp && personal.whatsapp !== '#') footerHtml += `<a href="${personal.whatsapp}" target="_blank" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>`;
        if (personal.email && personal.email !== '#') footerHtml += `<a href="mailto:${personal.email}" title="Email"><i class="fas fa-envelope"></i></a>`;
        this.footerLinks.innerHTML = footerHtml;
    }
  }

  renderContact(personal) {
    if (!this.contactContainer) return;

    let actionsHtml = '';
    if (personal.email && personal.email !== '#') {
        actionsHtml += `<a href="mailto:${personal.email}" class="action-btn email"><i class="fas fa-envelope"></i> <span>Email</span></a>`;
    }
    if (personal.whatsapp && personal.whatsapp !== '#') {
        actionsHtml += `<a href="${personal.whatsapp}" target="_blank" class="action-btn whatsapp"><i class="fab fa-whatsapp"></i> <span>WhatsApp</span></a>`;
    }

    let socialsHtml = '';
    if (personal.linkedin && personal.linkedin !== '#') socialsHtml += `<a href="${personal.linkedin}" target="_blank" title="LinkedIn"><i class="fab fa-linkedin"></i></a>`;
    if (personal.github && personal.github !== '#') socialsHtml += `<a href="${personal.github}" target="_blank" title="GitHub"><i class="fab fa-github"></i></a>`;
    if (personal.telegram && personal.telegram !== '#') socialsHtml += `<a href="${personal.telegram}" target="_blank" title="Telegram"><i class="fab fa-telegram"></i></a>`;

    this.contactContainer.innerHTML = `
      <div class="contact-bar" data-aos="fade-up">
          <div class="contact-actions">${actionsHtml}</div>
          <div class="contact-divider"></div>
          <div class="contact-socials">${socialsHtml}</div>
          <div class="contact-meta">
              <span><i class="fas fa-map-marker-alt"></i> ${personal.location}</span>
              ${personal.languages ? `<span class="contact-divider-small">|</span> <span><i class="fas fa-globe"></i> ${personal.languages}</span>` : ''}
          </div>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.portfolioData = new PortfolioDataManager();
  window.portfolioData.loadPortfolioData('data.json');
});