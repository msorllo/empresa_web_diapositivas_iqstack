/**
 * IQSTACK Slide Controller
 * Manages presentation state, slide transitions, keyboard controls, progress indicators,
 * and page-specific callback triggers (for charts, particles, etc.).
 */

const IQSTACK_SLIDES = {
  currentSlideIdx: 0,
  slides: [],
  progressBar: null,
  counterEl: null,
  speakerNotesEl: null,

  init() {
    this.slides = document.querySelectorAll('.slide-section');
    this.progressBar = document.getElementById('slide-progress-bar');
    this.counterEl = document.getElementById('slide-counter-val');
    this.speakerNotesEl = document.getElementById('speaker-notes-content');

    if (this.slides.length === 0) return;

    // Direct binding of control elements
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    
    if (btnPrev) btnPrev.addEventListener('click', () => this.prevSlide());
    if (btnNext) btnNext.addEventListener('click', () => this.nextSlide());

    // Keyboard controls
    window.addEventListener('keydown', (e) => this.handleKeyboard(e));

    // Touch swipe gestures
    this.initTouchGestures();

    // Direct dot navigation markers
    this.buildNavDots();

    // Show initial slide
    this.showSlide(0);
  },

  showSlide(index) {
    if (index < 0 || index >= this.slides.length) return;

    // Deactivate previous slide
    const oldSlide = this.slides[this.currentSlideIdx];
    if (oldSlide) {
      oldSlide.classList.remove('active');
    }

    // Set new slide state
    this.currentSlideIdx = index;
    const newSlide = this.slides[this.currentSlideIdx];
    newSlide.classList.add('active');

    // Update progress bar
    if (this.progressBar) {
      const percentage = ((index) / (this.slides.length - 1)) * 100;
      this.progressBar.style.width = `${percentage}%`;
    }

    // Update Counter indicator
    if (this.counterEl) {
      this.counterEl.textContent = `${index + 1} / ${this.slides.length}`;
    }

    // Update speaker notes
    if (this.speakerNotesEl) {
      const slideData = IQSTACK_DATA.slides[index];
      this.speakerNotesEl.textContent = slideData ? slideData.notes : "";
    }

    // Update navigation dots active status
    const dots = document.querySelectorAll('.nav-dot');
    dots.forEach((dot, idx) => {
      if (idx === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Fire specific triggers depending on the slide revealed
    this.onSlideActive(newSlide.id, index);
  },

  nextSlide() {
    if (this.currentSlideIdx < this.slides.length - 1) {
      this.showSlide(this.currentSlideIdx + 1);
    }
  },

  prevSlide() {
    if (this.currentSlideIdx > 0) {
      this.showSlide(this.currentSlideIdx - 1);
    }
  },

  handleKeyboard(e) {
    // Avoid hijacking keystrokes if the user is typing in a slider or form element
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
      return;
    }

    switch (e.key) {
      case 'ArrowRight':
      case 'Space':
      case 'PageDown':
        e.preventDefault();
        this.nextSlide();
        break;
      case 'ArrowLeft':
      case 'PageUp':
        e.preventDefault();
        this.prevSlide();
        break;
      case 'Home':
        e.preventDefault();
        this.showSlide(0);
        break;
      case 'End':
        e.preventDefault();
        this.showSlide(this.slides.length - 1);
        break;
    }
  },

  initTouchGestures() {
    let startX = 0;
    let startY = 0;

    window.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      if (e.changedTouches.length === 0) return;
      
      const diffX = e.changedTouches[0].clientX - startX;
      const diffY = e.changedTouches[0].clientY - startY;

      // Check horizontal swipe threshold (e.g. 50px) and ensure it's mostly horizontal
      if (Math.abs(diffX) > 60 && Math.abs(diffY) < 100) {
        if (diffX < 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }
    }, { passive: true });
  },

  buildNavDots() {
    const dotsContainer = document.getElementById('slide-dots-container');
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = "";
    this.slides.forEach((slide, idx) => {
      const dot = document.createElement('button');
      dot.className = 'nav-dot';
      dot.setAttribute('aria-label', `Ir a diapositiva ${idx + 1}`);
      dot.addEventListener('click', () => this.showSlide(idx));
      dotsContainer.appendChild(dot);
    });
  },

  onSlideActive(slideId, idx) {
    // Trigger callbacks when slides are revealed to ensure animations start at correct timing
    
    // Slide 3: Solution - Trigger Simulator UI init
    if (slideId === 'slide-3') {
      const slider = document.getElementById('visitor-slider');
      if (slider) {
        IQSTACK_CHARTS.updateSimulatorUI(parseInt(slider.value));
      }
    }

    // Slide 5: Team - Init Card Tilt and reveal effect
    if (slideId === 'slide-5') {
      setTimeout(() => {
        IQSTACK_ANIMATIONS.initTiltCards('.team-card-split');
      }, 100);
    }
    
    // Slide 2: Problem - Init Card Tilt
    if (slideId === 'slide-2') {
      setTimeout(() => {
        IQSTACK_ANIMATIONS.initTiltCards('.col-web-card');
      }, 100);
    }

    // Slide 8: Finances - Render dynamic charts
    if (slideId === 'slide-8') {
      // Small timeout to let elements display first before calculating bounds
      setTimeout(() => {
        IQSTACK_CHARTS.renderBudgetPie('budget-chart-container');
        IQSTACK_CHARTS.renderBreakEven('breakeven-chart-container');
      }, 100);
    }
  }
};

// Expose globally
window.IQSTACK_SLIDES = IQSTACK_SLIDES;
