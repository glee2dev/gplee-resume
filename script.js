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
  let isTransitioning = false;

  function switchLanguage(lang) {
    if (isTransitioning) return;
    isTransitioning = true;

    // Update button states
    tabButtons.forEach(button => {
      button.classList.toggle('active', button.dataset.lang === lang);
    });

    // Reset scroll position
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Get current and next content
    const currentContent = Array.from(resumeContents).find(content => !content.classList.contains('hidden'));
    const nextContent = Array.from(resumeContents).find(content => content.dataset.lang === lang);

    if (currentContent === nextContent) {
      isTransitioning = false;
      return;
    }

    // Reset section animations for next content
    if (nextContent) {
      nextContent.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
      });
    }

    // Switch content with transform transitions
    if (currentContent) {
      currentContent.style.transform = 'translateX(-100%)';
      currentContent.style.opacity = '0';
      
      setTimeout(() => {
        currentContent.classList.add('hidden');
        currentContent.style.transform = '';
        
        if (nextContent) {
          nextContent.classList.remove('hidden');
          nextContent.style.transform = 'translateX(0)';
          nextContent.style.opacity = '1';
          
          // Trigger section animations
          setTimeout(() => {
            nextContent.querySelectorAll('.section').forEach(section => {
              requestAnimationFrame(() => {
                section.classList.add('active');
              });
            });
          }, 50);
        }
        
        isTransitioning = false;
      }, 300);
    } else if (nextContent) {
      nextContent.classList.remove('hidden');
      nextContent.style.transform = 'translateX(0)';
      nextContent.style.opacity = '1';
      
      setTimeout(() => {
        nextContent.querySelectorAll('.section').forEach(section => {
          requestAnimationFrame(() => {
            section.classList.add('active');
          });
        });
        isTransitioning = false;
      }, 50);
    }
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
