// Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or use preferred color scheme
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      html.classList.add('dark');
    }
    
    themeToggle.addEventListener('click', () => {
      html.classList.toggle('dark');
      localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    });
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Video Unmute Functionality
    const unmuteButtons = document.querySelectorAll('.unmute-btn');
    const videos = document.querySelectorAll('.video-container video');
    
    unmuteButtons.forEach(button => {
      button.addEventListener('click', () => {
        const videoIndex = parseInt(button.getAttribute('data-video'));
        const video = videos[videoIndex];
        
        if (video.muted) {
          video.muted = false;
          button.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
          video.muted = true;
          button.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
      });
    });
    
    // Review Slider
    const reviewTrack = document.querySelector('.review-track');
    const reviewCards = document.querySelectorAll('.review-card');
    const reviewPrev = document.querySelector('.review-prev');
    const reviewNext = document.querySelector('.review-next');
    
    let currentReview = 0;
    
    function updateReviewPosition() {
      reviewTrack.style.transform = `translateX(-${currentReview * 100}%)`;
      
      // Update active class for animation
      reviewCards.forEach((card, index) => {
        if (index === currentReview) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });
    }
    
    reviewNext.addEventListener('click', () => {
      currentReview = (currentReview + 1) % reviewCards.length;
      updateReviewPosition();
    });
    
    reviewPrev.addEventListener('click', () => {
      currentReview = (currentReview - 1 + reviewCards.length) % reviewCards.length;
      updateReviewPosition();
    });
    
    // Auto-slide reviews
    setInterval(() => {
      currentReview = (currentReview + 1) % reviewCards.length;
      updateReviewPosition();
    }, 5000);
    
    // Rating Stars
    const stars = document.querySelectorAll('.rating-stars .fa-star');
    const ratingInput = document.getElementById('reviewRating');
    
    stars.forEach(star => {
      star.addEventListener('click', () => {
        const rating = parseInt(star.getAttribute('data-rating'));
        ratingInput.value = rating;
        
        stars.forEach((s, index) => {
          if (index < rating) {
            s.classList.remove('far');
            s.classList.add('fas');
          } else {
            s.classList.remove('fas');
            s.classList.add('far');
          }
        });
      });
    });
    
    // Review Form Submission
    const reviewForm = document.getElementById('reviewForm');
    
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // In a real application, you would send this data to your backend (Firebase/Supabase)
      const name = document.getElementById('reviewName').value;
      const title = document.getElementById('reviewTitle').value;
      const text = document.getElementById('reviewText').value;
      const rating = document.getElementById('reviewRating').value;
      
      if (!name || !text || rating === '0') {
        alert('Please fill in all fields and select a rating');
        return;
      }
      
      // Simulate successful submission
      alert('Thank you for your review! It will appear after moderation.');
      reviewForm.reset();
      
      // Reset stars
      stars.forEach(star => {
        star.classList.remove('fas');
        star.classList.add('far');
      });
      ratingInput.value = '0';
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // In a real application, you would send this data to your backend
      const name = document.getElementById('contactName').value;
      const email = document.getElementById('contactEmail').value;
      const subject = document.getElementById('contactSubject').value;
      const message = document.getElementById('contactMessage').value;
      
      if (!name || !email || !message) {
        alert('Please fill in all required fields');
        return;
      }
      
      // Simulate successful submission
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    });
    
    // Portfolio items animation on scroll
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    const portfolioObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1
    });
    
    portfolioItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      portfolioObserver.observe(item);
    });
