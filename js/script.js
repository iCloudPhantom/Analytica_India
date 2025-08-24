document.addEventListener('DOMContentLoaded', function() {
  /** -------------------------------
   *  Background Slideshow
   * ------------------------------- */
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;

  // Function to show the next slide
  function nextSlide() {
    slides[currentSlide].classList.remove('active'); // Hide current
    currentSlide = (currentSlide + 1) % slides.length; // Move to next (loop back at end)
    slides[currentSlide].classList.add('active'); // Show next
  }

  // Auto-change slide every 5 seconds
  if (slides.length > 0) {
    setInterval(nextSlide, 5000);
  }

  /** -------------------------------
   *  Smooth Scrolling for Links
   * ------------------------------- */
  document.querySelectorAll('nav a, .footer-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      // Only handle internal (#id) links
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  /** -------------------------------
   *  Contact Form Submission
   * ------------------------------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent page refresh

      // Get form input values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();

      // Normally you would send form data to a server (AJAX / fetch / API)
      // For demo, just show a thank-you message
      alert(`Thank you for your message, ${name}! We'll get back to you soon at ${email}.`);

      // Reset form after submission
      this.reset();
    });
  }

  /** -------------------------------
   *  Animated Stats Counter
   * ------------------------------- */
  const statElements = document.querySelectorAll('.stat-number');
  if (statElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const stat = entry.target;

          // Extract number from element (ignore + if present)
          const target = parseInt(stat.textContent.replace(/\D/g, ''), 10);
          const hasPlus = stat.textContent.includes('+');

          let count = 0;
          const duration = 2000; // Animation runs for 2s
          const frameDuration = 1000 / 60; // ~60 fps
          const totalFrames = Math.round(duration / frameDuration);
          const increment = target / totalFrames;

          // Counter animation
          const timer = setInterval(() => {
            count += increment;

            if (count >= target) {
              stat.textContent = target + (hasPlus ? '+' : '');
              clearInterval(timer);
            } else {
              stat.textContent = Math.round(count) + (hasPlus ? '+' : '');
            }
          }, frameDuration);

          // Stop observing this element once animated
          observer.unobserve(stat);
        }
      });
    }, { threshold: 0.5 }); // Trigger when element is 50% visible

    // Observe each stat element
    statElements.forEach(stat => observer.observe(stat));
  }
});
