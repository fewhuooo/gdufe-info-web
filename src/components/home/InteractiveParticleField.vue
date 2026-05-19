<template>
  <div class="particle-canvas-container" :class="{ 'hidden-mobile': isMobile }">
    <canvas ref="particleCanvas" class="interactive-canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const particleCanvas = ref<HTMLCanvasElement | null>(null);
const isMobile = ref(false);
let animationFrameId: number;
let ctx: CanvasRenderingContext2D | null = null;

// Advanced Interactive Antigravity Particle Class
class AntigravityParticle {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number; // Interactive velocity X
  vy: number; // Interactive velocity Y
  isDash: boolean;
  
  // Weightless suspension
  phaseX: number;
  phaseY: number;
  floatSpeed: number;
  floatAmp: number;
  
  // Styling attributes
  width: number;
  length: number;
  size: number;
  color: string;
  opacity: number;

  constructor(x: number, y: number, isDash: boolean, screenHeight: number) {
    this.baseX = x;
    this.baseY = y;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.isDash = isDash;

    this.phaseX = Math.random() * 100;
    this.phaseY = Math.random() * 100;
    this.floatSpeed = 0.003 + Math.random() * 0.004; // Extremely slow suspension
    this.floatAmp = 2.5 + Math.random() * 5.0; // Float displacement

    if (this.isDash) {
      this.width = 1.3 + Math.random() * 0.7; // Thin stardust dashes
      this.length = 6 + Math.random() * 8;   // 6px - 14px
      this.color = this.getSpatialColor(y, screenHeight);
      this.opacity = 0.5 + Math.random() * 0.35;
    } else {
      this.size = 0.6 + Math.random() * 0.6; // Square dust specs
      this.color = '#888888';
      this.opacity = 0.08 + Math.random() * 0.12;
    }
  }

  // Google Antigravity spatial pastel spectrum gradient
  private getSpatialColor(y: number, totalH: number): string {
    const ratio = y / (totalH || 1);
    if (ratio < 0.33) {
      const purplePalette = ['#C77DFF', '#9D4EDD', '#DDA15E', '#E0AAFF'];
      return purplePalette[Math.floor(Math.random() * purplePalette.length)];
    } else if (ratio < 0.66) {
      const bluePalette = ['#4EA8DE', '#00F5D4', '#48CAE4', '#90E0EF'];
      return bluePalette[Math.floor(Math.random() * bluePalette.length)];
    } else {
      const warmPalette = ['#FF9E00', '#F15BB5', '#FF85A1', '#FF7096'];
      return warmPalette[Math.floor(Math.random() * warmPalette.length)];
    }
  }

  // Physics update incorporating mouse velocity wind drag & repulsion
  update(mouseX: number, mouseY: number, mouseVx: number, mouseVy: number) {
    // 1. Suspension baseline float
    this.phaseX += this.floatSpeed;
    this.phaseY += this.floatSpeed;
    const floatX = this.baseX + Math.sin(this.phaseX) * this.floatAmp;
    const floatY = this.baseY + Math.cos(this.phaseY) * this.floatAmp;

    // 2. Mouse interactive forces
    const dx = floatX - mouseX;
    const dy = floatY - mouseY;
    const dist = Math.hypot(dx, dy);
    
    let targetX = floatX;
    let targetY = floatY;
    
    const maxDistance = 140; // Force range
    if (dist < maxDistance) {
      const factor = 1 - dist / maxDistance;
      const force = Math.pow(factor, 1.8);
      
      // A. Gentle radial repulsion bubble (pushes them away slightly)
      const angle = Math.atan2(dy, dx);
      targetX += Math.cos(angle) * force * 24;
      targetY += Math.sin(angle) * force * 24;

      // B. Fluid Wind Drag: Particles inherit the direction of the cursor swipe!
      // This drags the particles along in the direction of the mouse stroke!
      this.vx += mouseVx * force * 0.18;
      this.vy += mouseVy * force * 0.18;
    }

    // Apply fluid drag velocity
    this.x += this.vx;
    this.y += this.vy;

    // Friction damping (slowly absorb fluid momentum)
    this.vx *= 0.91;
    this.vy *= 0.91;

    // 3. Smooth Damped Spring Lerp back to target suspended coordinate
    this.x += (targetX - this.x) * 0.07;
    this.y += (targetY - this.y) * 0.07;
  }

  draw(c: CanvasRenderingContext2D, orbitCenterX: number, orbitCenterY: number) {
    c.save();
    c.translate(this.x, this.y);
    c.globalAlpha = this.opacity;

    // Dynamic Concentric Vortex Rotation aligning to the dynamic gravity center
    const dx = this.x - orbitCenterX;
    const dy = this.y - orbitCenterY;
    const angle = Math.atan2(dy, dx) + Math.PI / 2;
    c.rotate(angle);

    c.fillStyle = this.color;
    if (this.isDash) {
      c.fillRect(-this.width / 2, -this.length / 2, this.width, this.length);
    } else {
      c.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    }
    c.restore();
  }
}

const particles: AntigravityParticle[] = [];
let width = 0;
let height = 0;

// Mouse coordinates and velocity tracking
let mouseX = -9999;
let mouseY = -9999;
let lastMouseX = -9999;
let lastMouseY = -9999;
let mouseVx = 0;
let mouseVy = 0;

// Dynamic orbit center (smoothly chases the cursor)
let orbitCenterX = 0;
let orbitCenterY = 0;

// Generate beautifully spaced particles using grid jittering
const initParticles = () => {
  particles.length = 0;
  
  const cellSize = 38; 
  const cols = Math.floor(width / cellSize);
  const rows = Math.floor(height / cellSize);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const px = c * cellSize + cellSize * 0.5 + (Math.random() - 0.5) * cellSize * 0.7;
      const py = r * cellSize + cellSize * 0.5 + (Math.random() - 0.5) * cellSize * 0.7;
      
      const leftRatio = 1 - (px / width);
      const isDashProbability = Math.pow(leftRatio, 1.8) * 0.35; // Dense on left side
      const isDash = Math.random() < isDashProbability;

      // Exclusion zone at center
      const distToCenter = Math.hypot(px - width * 0.5, py - height * 0.5);
      if (distToCenter < 100 && isDash) {
        continue;
      }

      particles.push(new AntigravityParticle(px, py, isDash, height));
    }
  }
};

// Mousemove track
const handleMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (lastMouseX === -9999) {
    lastMouseX = mouseX;
    lastMouseY = mouseY;
  }

  // Calculate cursor instant velocity vector
  mouseVx = mouseX - lastMouseX;
  mouseVy = mouseY - lastMouseY;

  lastMouseX = mouseX;
  lastMouseY = mouseY;
};

// Reset mouse
const handleMouseLeave = () => {
  mouseX = -9999;
  mouseY = -9999;
  lastMouseX = -9999;
  lastMouseY = -9999;
  mouseVx = 0;
  mouseVy = 0;
};

// Render Loop
const render = () => {
  if (!ctx) return;

  ctx.clearRect(0, 0, width, height);

  // Smoothly chase target orbit center (towards mouse position, or snap to center if mouse is inactive)
  const targetCX = mouseX !== -9999 ? mouseX : width * 0.5;
  const targetCY = mouseY !== -9999 ? mouseY : height * 0.5;

  orbitCenterX += (targetCX - orbitCenterX) * 0.06;
  orbitCenterY += (targetCY - orbitCenterY) * 0.06;

  // Decay mouse velocity when mouse stops moving
  mouseVx *= 0.9;
  mouseVy *= 0.9;

  // Update and draw
  const total = particles.length;
  for (let i = 0; i < total; i++) {
    const p = particles[i];
    p.update(mouseX, mouseY, mouseVx, mouseVy);
    p.draw(ctx, orbitCenterX, orbitCenterY);
  }

  animationFrameId = requestAnimationFrame(render);
};

// Resize
const handleResize = () => {
  if (!particleCanvas.value) return;
  const dpr = window.devicePixelRatio || 1;
  width = particleCanvas.value.clientWidth;
  height = particleCanvas.value.clientHeight;

  particleCanvas.value.width = width * dpr;
  particleCanvas.value.height = height * dpr;
  ctx = particleCanvas.value.getContext('2d');
  if (ctx) {
    ctx.scale(dpr, dpr);
  }

  // Initialize dynamic center coordinate
  orbitCenterX = width * 0.5;
  orbitCenterY = height * 0.5;

  isMobile.value = window.innerWidth < 1024;
  initParticles();
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
  window.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseleave', handleMouseLeave);

  render();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseleave', handleMouseLeave);
  cancelAnimationFrame(animationFrameId);
});
</script>

<style scoped>
.particle-canvas-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1; /* Floats behind content layout */
  pointer-events: none; /* Fully click-through */
  overflow: hidden;
}

.interactive-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

/* Mobile disabled */
.hidden-mobile {
  display: none !important;
}
</style>
