document.addEventListener('DOMContentLoaded', function() {
      const progressBar = document.querySelector('.progress-bar');

      function updateProgressBar() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const maxScroll = documentHeight - windowHeight;

        const scrollPercentage = (scrollY / maxScroll);

        progressBar.style.transform = `scaleX(${scrollPercentage})`;

        if (scrollPercentage > 0.2 && scrollPercentage <= 0.5) {
          progressBar.style.backgroundColor = '#007bff';
        } else if (scrollPercentage > 0.5 && scrollPercentage <= 0.8) {
          progressBar.style.backgroundColor = '#ffc107';
        } else if (scrollPercentage > 0.8) {
          progressBar.style.backgroundColor = '#dc3545';
        } else {
          progressBar.style.backgroundColor = '#00ff00';
        }
      }

      window.addEventListener('scroll', updateProgressBar);
      updateProgressBar();
    });
