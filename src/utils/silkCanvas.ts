export const startSilkAnimation = (canvas: HTMLCanvasElement): (() => void) => {
  if (canvas.dataset.silkStarted === '1') {
    return () => {};
  }
  canvas.dataset.silkStarted = '1';

  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  let time = 0;
  const speed = 0.02;
  const scale = 2;
  const noiseIntensity = 0.8;
  let animationRef = 0;

  const resizeCanvas = () => {
    // Scale resolution down slightly for ultra-smooth 60fps rendering
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const renderScale = 0.5; // Smooth performance optimization
    canvas.width = Math.floor((window.innerWidth * dpr) * renderScale);
    canvas.height = Math.floor((window.innerHeight * dpr) * renderScale);
  };

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Simple noise function
  const noise = (x: number, y: number) => {
    const G = 2.71828;
    const rx = G * Math.sin(G * x);
    const ry = G * Math.sin(G * y);
    return (rx * ry * (1 + x)) % 1;
  };

  let isVisible = true;
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animationRef) {
        animate();
      }
    },
    { threshold: 0.05 }
  );
  observer.observe(canvas);

  const handleVisibility = () => {
    if (document.hidden) {
      if (animationRef) {
        cancelAnimationFrame(animationRef);
        animationRef = 0;
      }
    } else if (isVisible && !prefersReducedMotion) {
      animate();
    }
  };
  document.addEventListener('visibilitychange', handleVisibility);

  const animate = () => {
    if (!isVisible || document.hidden || prefersReducedMotion) {
      animationRef = 0;
      return;
    }

    const { width, height } = canvas;
    if (width === 0 || height === 0) return;

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#1a1a1a');
    gradient.addColorStop(0.5, '#2a2a2a');
    gradient.addColorStop(1, '#1a1a1a');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Create silk-like pattern
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    const step = 2;
    const tOffset = speed * time;

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const u = (x / width) * scale;
        const v = (y / height) * scale;

        const tex_x = u;
        const tex_y = v + 0.03 * Math.sin(8.0 * tex_x - tOffset);

        const pattern =
          0.6 +
          0.4 *
            Math.sin(
              5.0 *
                (tex_x +
                  tex_y +
                  Math.cos(3.0 * tex_x + 5.0 * tex_y) +
                  0.02 * tOffset) +
                Math.sin(20.0 * (tex_x + tex_y - 0.1 * tOffset))
            );

        const rnd = noise(x, y);
        const intensity = Math.max(0, pattern - (rnd / 15.0) * noiseIntensity);

        // Purple-gray silk color
        const r = Math.floor(123 * intensity);
        const g = Math.floor(116 * intensity);
        const b = Math.floor(129 * intensity);
        const a = 255;

        // Fill 2x2 block for performance
        for (let dy = 0; dy < step; dy++) {
          for (let dx = 0; dx < step; dx++) {
            const px = x + dx;
            const py = y + dy;
            if (px < width && py < height) {
              const index = (py * width + px) * 4;
              data[index] = r;
              data[index + 1] = g;
              data[index + 2] = b;
              data[index + 3] = a;
            }
          }
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);

    // Add subtle overlay for depth
    const overlayGradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      0,
      width / 2,
      height / 2,
      Math.max(width, height) / 2
    );
    overlayGradient.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
    overlayGradient.addColorStop(1, 'rgba(0, 0, 0, 0.4)');

    ctx.fillStyle = overlayGradient;
    ctx.fillRect(0, 0, width, height);

    time += 1;
    animationRef = requestAnimationFrame(animate);
  };

  animate();

  return () => {
    observer.disconnect();
    window.removeEventListener('resize', resizeCanvas);
    document.removeEventListener('visibilitychange', handleVisibility);
    if (animationRef) {
      cancelAnimationFrame(animationRef);
    }
  };
};
