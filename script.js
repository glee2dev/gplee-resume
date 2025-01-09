document.addEventListener('DOMContentLoaded', () => {
  // Initialize sections animation
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    observer.observe(section);
  });

  // Progress bar functionality
  const progressBar = document.querySelector('.progress-bar');
  window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
    progressBar.style.transform = `scaleX(${progress / 100})`;
  });

  // Language switching functionality
  const tabButtons = document.querySelectorAll('.tab-button');
  const resumeContents = document.querySelectorAll('.resume-content');

  function switchLanguage(lang) {
    // Update button states
    tabButtons.forEach(button => {
      button.classList.toggle('active', button.dataset.lang === lang);
    });

    // Reset scroll position
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // First hide all content
    resumeContents.forEach(content => {
      content.classList.add('hidden');
    });

    // Then show the selected content after a small delay
    setTimeout(() => {
      resumeContents.forEach(content => {
        if (content.dataset.lang === lang) {
          content.classList.remove('hidden');
          // Re-trigger section animations
          content.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
            requestAnimationFrame(() => {
              section.classList.add('active');
            });
          });
        }
      });
    }, 300); // Delay matches CSS transition duration
  }

  // Add click handlers to language buttons
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const lang = button.dataset.lang;
      if (!button.classList.contains('active')) {
        switchLanguage(lang);
      }
    });
  });

  // Initialize with English version
  switchLanguage('en');
});
