document.addEventListener('DOMContentLoaded', function() {
      const progressBar = document.querySelector('.progress-bar');
      const sections = document.querySelectorAll('.section');
      let isScrolling;

      function updateProgressBar() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const maxScroll = documentHeight - windowHeight;
        const scrollPercentage = Math.min((scrollY / maxScroll), 1);

        progressBar.style.transform = `scaleX(${scrollPercentage})`;
      }

      function checkSectionVisibility() {
        sections.forEach((section, index) => {
          const rect = section.getBoundingClientRect();
          const isVisible = (rect.top <= window.innerHeight * 0.8);

          if (isVisible) {
            setTimeout(() => {
              section.classList.add('active');
            }, index * 100);
          }
        });
      }

      function onScroll() {
        window.clearTimeout(isScrolling);
        
        updateProgressBar();
        checkSectionVisibility();

        isScrolling = setTimeout(() => {
          progressBar.style.transition = 'transform 0.3s ease';
        }, 100);
      }

      window.addEventListener('scroll', onScroll, { passive: true });
      
      // Initial check
      updateProgressBar();
      checkSectionVisibility();

      // Add hover effect to experience items
      const experienceItems = document.querySelectorAll('.experience-item, .education-item');
      experienceItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
          item.style.transition = 'transform 0.3s ease';
        });
      });
    });
