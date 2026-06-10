/**
 * IQSTACK Presentation Animations & Interactive 3D Effects
 * Integrates high-performance Canvas rendering, CSS 3D rotations, and tilt parallax.
 */

const IQSTACK_ANIMATIONS = {
  // Canvas Particles State
  canvas: null,
  ctx: null,
  particles: [],
  mouse: { x: null, y: null, radius: 120 },
  animationFrameId: null,

  // --- 1. PARTICLE NETWORKS (Canvas 3D-Like Atmosphere) ---
  initParticles(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();

    // Event listeners
    window.addEventListener('resize', () => this.resizeCanvas());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
    window.addEventListener('click', (e) => this.burstParticles(e.clientX, e.clientY));

    // Spawn initial particles
    this.spawnParticles();
    this.animateParticles();
  },

  resizeCanvas() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },

  spawnParticles() {
    this.particles = [];
    // Calculate count based on viewport size to keep performance optimal
    const density = Math.floor((window.innerWidth * window.innerHeight) / 18000);
    const particleCount = Math.min(density, 80);

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2.5 + 1,
        // Green nodes representing data, Amber representing solar energy photons
        color: Math.random() > 0.4 ? 'rgba(16, 185, 129, 0.4)' : 'rgba(245, 158, 11, 0.3)',
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulseDir: 1,
        alpha: Math.random()
      });
    }
  },

  burstParticles(clickX, clickY) {
    const burstCount = 15;
    for (let i = 0; i < burstCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
      this.particles.push({
        x: clickX,
        y: clickY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 2 + 1,
        color: 'rgba(16, 185, 129, 0.8)',
        pulseSpeed: 0.05,
        pulseDir: -1,
        alpha: 1.0,
        temp: true // marked for cleanup once alpha hit 0
      });
    }
    // Limit max particles
    if (this.particles.length > 150) {
      this.particles.splice(0, this.particles.length - 150);
    }
  },

  animateParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Update positions
      p.x += p.vx;
      p.y += p.vy;

      // Pulse alpha for ambient glow effect
      if (!p.temp) {
        p.alpha += p.pulseSpeed * p.pulseDir;
        if (p.alpha >= 0.8 || p.alpha <= 0.2) {
          p.pulseDir *= -1;
        }
      } else {
        p.alpha -= 0.02;
        if (p.alpha <= 0) {
          this.particles.splice(i, 1);
          i--;
          continue;
        }
      }

      // Border bounds wrapping
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      // Mouse magnetism force
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < this.mouse.radius) {
          // Attract towards mouse
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          p.x -= dx * force * 0.03;
          p.y -= dy * force * 0.03;
        }
      }

      // Draw node
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color.replace(/[\d.]+\)$/g, `${p.alpha})`);
      this.ctx.fill();

      // Connect nodes within distance (3D network effect)
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          const alpha = (110 - dist) / 110 * 0.15;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          // Interpolate connection color
          this.ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }

    this.animationFrameId = requestAnimationFrame(() => this.animateParticles());
  },

  // --- 2. 3D SERVER CUBE ROTATION (CSS 3D) ---
  init3DServer(cubeId) {
    const cube = document.getElementById(cubeId);
    if (!cube) return;

    let rotX = -15;
    let rotY = 45;
    let isDragging = false;
    let startX, startY;

    // Continuous auto-rotation helper
    let autoRotate = true;

    function step() {
      if (autoRotate && !isDragging) {
        rotY += 0.25;
        cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      }
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);

    // Mouse interactive controls
    const container = cube.parentElement;
    
    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      autoRotate = false;
      startX = e.clientX;
      startY = e.clientY;
      container.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      
      rotY += dx * 0.5;
      rotX = Math.max(-60, Math.min(60, rotX - dy * 0.5));
      
      cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      startX = e.clientX;
      startY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        container.style.cursor = 'grab';
        // Delay auto rotation resumption
        setTimeout(() => {
          if (!isDragging) autoRotate = true;
        }, 3000);
      }
    });

    // Mobile touch controls
    container.addEventListener('touchstart', (e) => {
      isDragging = true;
      autoRotate = false;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    container.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;
      
      rotY += dx * 0.5;
      rotX = Math.max(-60, Math.min(60, rotX - dy * 0.5));
      
      cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    container.addEventListener('touchend', () => {
      isDragging = false;
      setTimeout(() => {
        if (!isDragging) autoRotate = true;
      }, 3000);
    });
  },

  // --- 3. 3D TILT EFFECT FOR CARDS (Tilt Parallax) ---
  initTiltCards(classSelector) {
    const cards = document.querySelectorAll(classSelector);
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        
        // Coordinates inside the card
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Relative to center
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Degree calculations (max tilt = 10 deg)
        const tiltX = ((centerY - y) / centerY) * 10;
        const tiltY = ((x - centerX) / centerX) * 10;
        
        // Apply 3D transform
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        
        // Shift reflection glare effect if card has glare element
        const glare = card.querySelector('.card-glare');
        if (glare) {
          const glareX = (x / rect.width) * 100;
          const glareY = (y / rect.height) * 100;
          glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 80%)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        
        const glare = card.querySelector('.card-glare');
        if (glare) {
          glare.style.background = 'none';
        }
      });
      
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
      });
    });
  }
};

// Expose globally
window.IQSTACK_ANIMATIONS = IQSTACK_ANIMATIONS;
