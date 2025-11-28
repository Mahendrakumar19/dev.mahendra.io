// Modern portfolio JavaScript - Navigation and smooth scrolling

// Page Loader
window.addEventListener('load', function() {
  const loader = document.getElementById('page-loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 500);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.querySelector('.nav');
  const header = document.querySelector('.site-header');

  // Mobile navigation toggle
  if (navToggle && nav) {
    navToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      nav.classList.toggle('active');
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Close mobile nav after clicking
          if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            if (navToggle) {
              navToggle.setAttribute('aria-expanded', 'false');
            }
          }
        }
      }
    });
  });

  // Header scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.boxShadow = '0 10px 30px -10px rgba(2, 12, 27, 0.7)';
    } else {
      header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  });

  // Close mobile nav when clicking outside
  document.addEventListener('click', function(e) {
    if (nav && nav.classList.contains('active')) {
      if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
        nav.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // Add fade-in animation on scroll for sections
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all sections for animation
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
  });

  // Tech quotes that change based on time
  const techQuotes = [
    "Code is like humor. When you have to explain it, it's bad. — Cory House",
    "First, solve the problem. Then, write the code. — John Johnson",
    "Experience is the name everyone gives to their mistakes. — Oscar Wilde",
    "In order to be irreplaceable, one must always be different. — Coco Chanel",
    "Java is to JavaScript what car is to Carpet. — Chris Heilmann",
    "Knowledge is power. — Francis Bacon",
    "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code. — Dan Salomon",
    "Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away. — Antoine de Saint-Exupery",
    "Code never lies, comments sometimes do. — Ron Jeffries",
    "Simplicity is the soul of efficiency. — Austin Freeman",
    "Make it work, make it right, make it fast. — Kent Beck",
    "The best error message is the one that never shows up. — Thomas Fuchs",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. — Martin Fowler",
    "Programming isn't about what you know; it's about what you can figure out. — Chris Pine",
    "The only way to learn a new programming language is by writing programs in it. — Dennis Ritchie"
  ];

  function displayQuote() {
    const quoteElement = document.getElementById('tech-quote');
    if (quoteElement) {
      // Use current time to generate a consistent quote for the session
      const now = new Date();
      const hourIndex = now.getHours() % techQuotes.length;
      quoteElement.textContent = techQuotes[hourIndex];
      quoteElement.style.opacity = '0';
      
      setTimeout(() => {
        quoteElement.style.opacity = '1';
      }, 100);
    }
  }

  // Display quote on load
  displayQuote();

  // Change quote every hour
  setInterval(displayQuote, 3600000);

  // Staggered animation for project cards
  const projects = document.querySelectorAll('.project');
  projects.forEach((project, index) => {
    project.style.animationDelay = `${index * 0.1}s`;
  });

  // Staggered animation for skill categories
  const skillCategories = document.querySelectorAll('.skill-category');
  skillCategories.forEach((category, index) => {
    category.style.animationDelay = `${index * 0.15}s`;
  });

  // Smooth reveal for skill tags
  const skillTags = document.querySelectorAll('.skill-tag');
  skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.02}s`;
  });
});
