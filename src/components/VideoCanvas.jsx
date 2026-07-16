import React, { useRef, useEffect } from 'react';

export default function VideoCanvas({
  slides,
  currentTime,
  analyser,
  isPlaying,
  canvasRef
}) {
  const imageCacheRef = useRef({});

  // Helper to load and cache images to avoid flicker during render loops
  useEffect(() => {
    slides.forEach(slide => {
      if (slide.bgType === 'image' && slide.bgImage && !imageCacheRef.current[slide.bgImage]) {
        const img = new Image();
        img.src = slide.bgImage;
        img.onload = () => {
          imageCacheRef.current[slide.bgImage] = img;
        };
      }
    });
  }, [slides]);

  // Find active slide and transition details for a given timestamp
  const getSlideAtTime = (time) => {
    let accumulatedTime = 0;
    
    for (let i = 0; i < slides.length; i++) {
      const duration = slides[i].duration || 7.5;
      if (time >= accumulatedTime && time <= accumulatedTime + duration) {
        const elapsed = time - accumulatedTime;
        const progress = elapsed / duration;
        
        // Check if we are in a transition from the previous slide
        const transitionDuration = 0.6; // seconds
        if (i > 0 && elapsed < transitionDuration) {
          const prevDuration = slides[i - 1].duration || 7.5;
          return {
            currentIdx: i,
            prevIdx: i - 1,
            inTransition: true,
            transitionProgress: elapsed / transitionDuration,
            currentProgress: progress,
            prevProgress: 1.0 - (transitionDuration - elapsed) / prevDuration,
            elapsed
          };
        }
        
        return {
          currentIdx: i,
          prevIdx: -1,
          inTransition: false,
          transitionProgress: 0,
          currentProgress: progress,
          elapsed
        };
      }
      accumulatedTime += duration;
    }
    
    // Fallback if time overflows total duration
    const lastIdx = slides.length - 1;
    return {
      currentIdx: lastIdx,
      prevIdx: -1,
      inTransition: false,
      transitionProgress: 0,
      currentProgress: 1.0,
      elapsed: slides[lastIdx]?.duration || 7.5
    };
  };

  // Draw a single slide state onto a specific context
  const drawSlide = (ctx, slide, progress, width, height, slideTime) => {
    if (!slide) return;

    ctx.save();

    // 1. Draw Background
    if (slide.bgType === 'color') {
      ctx.fillStyle = slide.bgColor || '#0f172a';
      ctx.fillRect(0, 0, width, height);
    } else if (slide.bgType === 'gradient') {
      const grad = slide.bgGradient || { from: '#1e1b4b', to: '#4c1d95', angle: 135 };
      const angleRad = (grad.angle * Math.PI) / 180;
      const x1 = Math.cos(angleRad + Math.PI) * width/2 + width/2;
      const y1 = Math.sin(angleRad + Math.PI) * height/2 + height/2;
      const x2 = Math.cos(angleRad) * width/2 + width/2;
      const y2 = Math.sin(angleRad) * height/2 + height/2;

      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      gradient.addColorStop(0, grad.from);
      gradient.addColorStop(1, grad.to);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    } else if (slide.bgType === 'image') {
      // Draw solid color fallback first
      ctx.fillStyle = '#0f1015';
      ctx.fillRect(0, 0, width, height);
      
      const img = imageCacheRef.current[slide.bgImage];
      if (img && img.complete) {
        // Implement Ken Burns Effect: Slow Zoom and slight pan
        ctx.save();
        const kenBurnsScale = 1.0 + 0.12 * progress; // zoom in up to 12%
        const translationX = -((img.width * kenBurnsScale - img.width) / 2) * progress * 0.1;
        const translationY = -((img.height * kenBurnsScale - img.height) / 2) * progress * 0.1;
        
        ctx.translate(width / 2, height / 2);
        ctx.scale(kenBurnsScale, kenBurnsScale);
        ctx.translate(-width / 2, -height / 2);
        
        // Draw image cover-style
        const imgRatio = img.width / img.height;
        const canvasRatio = width / height;
        let dWidth, dHeight, dx, dy;
        
        if (imgRatio > canvasRatio) {
          dHeight = height;
          dWidth = height * imgRatio;
          dx = (width - dWidth) / 2 + translationX;
          dy = translationY;
        } else {
          dWidth = width;
          dHeight = width / imgRatio;
          dx = translationX;
          dy = (height - dHeight) / 2 + translationY;
        }
        
        ctx.drawImage(img, dx, dy, dWidth, dHeight);
        ctx.restore();
      }
    }

    // 2. Draw Glowing Particles Overlay (deterministic based on slideTime)
    ctx.save();
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
      // Seed values based on index to make them move deterministically
      const seedX = (i * 73 + 12) % width;
      const seedY = (i * 97 + 45) % height;
      const speed = 25 + (i * 13) % 40; // pixels per second
      const radius = 2 + (i * 7) % 8;
      
      // Calculate current position
      const x = (seedX + slideTime * speed * 0.3) % width;
      const y = (seedY - slideTime * speed) % height;
      const opacity = 0.05 + 0.15 * Math.sin(slideTime * 2 + i);
      
      ctx.fillStyle = i % 2 === 0 ? `rgba(6, 182, 212, ${opacity})` : `rgba(168, 85, 247, ${opacity})`;
      ctx.shadowColor = i % 2 === 0 ? 'rgba(6, 182, 212, 0.4)' : 'rgba(168, 85, 247, 0.4)';
      ctx.shadowBlur = radius * 2;
      ctx.beginPath();
      ctx.arc(x, y < 0 ? height + y : y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 3. Draw Captions (Title & Subtitle with transition offsets)
    let textAlpha = 1.0;
    let textOffsetY = 0;
    let textScale = 1.0;

    const animType = slide.textAnimation || 'slide-up';
    // Intro text animation occurs in the first 0.8 seconds
    const introDuration = 0.8; 
    
    if (slideTime < introDuration) {
      const animProgress = slideTime / introDuration;
      // Cubic ease-out
      const ease = 1 - Math.pow(1 - animProgress, 3);
      
      if (animType === 'fade') {
        textAlpha = ease;
      } else if (animType === 'slide-up') {
        textAlpha = ease;
        textOffsetY = 50 * (1 - ease);
      } else if (animType === 'zoom') {
        textAlpha = ease;
        textScale = 0.6 + 0.4 * ease;
      }
    }

    // Wrap title text if long
    const drawText = (text, x, y, font, color, maxW, align = 'center') => {
      ctx.font = font;
      ctx.fillStyle = color;
      ctx.textAlign = align;
      ctx.textBaseline = 'middle';
      
      const words = text.split(' ');
      let line = '';
      const lines = [];
      const lineHeight = parseInt(font) * 1.2;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxW && n > 0) {
          lines.push(line);
          line = words[n] + ' ';
        } else {
          line = testLine;
        }
      }
      lines.push(line);

      let startY = y - ((lines.length - 1) * lineHeight) / 2;
      lines.forEach((l, index) => {
        ctx.fillText(l.trim(), x, startY + index * lineHeight);
      });
      return lines.length * lineHeight;
    };

    ctx.save();
    ctx.globalAlpha = textAlpha;
    ctx.translate(width / 2, height / 2 + textOffsetY);
    ctx.scale(textScale, textScale);

    // Title Font
    const titleFont = `700 ${slide.titleSize || 64}px Outfit, var(--font-title), sans-serif`;
    const titleColor = slide.titleColor || '#ffffff';
    
    // Draw Title (centered at Y: -30 relative to center)
    const titleHeight = drawText(
      slide.titleText || 'Your Title Here',
      0,
      -40,
      titleFont,
      titleColor,
      width - 200
    );

    // Subtitle Font
    const subtitleFont = `400 ${slide.subtitleSize || 28}px "Plus Jakarta Sans", sans-serif`;
    const subtitleColor = slide.subtitleColor || '#9ca3af';

    // Draw Subtitle (positioned below title)
    if (slide.subtitleText) {
      drawText(
        slide.subtitleText,
        0,
        40 + titleHeight / 4,
        subtitleFont,
        subtitleColor,
        width - 240
      );
    }
    
    ctx.restore();
    ctx.restore();
  };

  // Core render canvas loop
  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Get active slide info
    const info = getSlideAtTime(currentTime);
    const activeSlide = slides[info.currentIdx];

    if (!info.inTransition || info.prevIdx === -1) {
      // Draw single slide
      drawSlide(ctx, activeSlide, info.currentProgress, width, height, info.elapsed);
    } else {
      // Handle Slide Transition Blend
      const prevSlide = slides[info.prevIdx];
      const transitionType = activeSlide.transition || 'crossfade';

      if (transitionType === 'crossfade') {
        // Draw previous slide fully
        drawSlide(ctx, prevSlide, info.prevProgress, width, height, prevSlide.duration || 7.5);
        
        // Draw current slide with opacity overlay
        ctx.save();
        ctx.globalAlpha = info.transitionProgress;
        drawSlide(ctx, activeSlide, info.currentProgress, width, height, info.elapsed);
        ctx.restore();
      } else if (transitionType === 'slide') {
        // Slide left: outgoing slides left, incoming slides in from right
        ctx.save();
        
        // Draw previous slide shifted left
        ctx.save();
        ctx.translate(-width * info.transitionProgress, 0);
        drawSlide(ctx, prevSlide, info.prevProgress, width, height, prevSlide.duration || 7.5);
        ctx.restore();

        // Draw current slide shifting from right to left
        ctx.save();
        ctx.translate(width * (1 - info.transitionProgress), 0);
        drawSlide(ctx, activeSlide, info.currentProgress, width, height, info.elapsed);
        ctx.restore();

        ctx.restore();
      } else if (transitionType === 'zoom') {
        // Zoom transition
        drawSlide(ctx, prevSlide, info.prevProgress, width, height, prevSlide.duration || 7.5);
        
        ctx.save();
        ctx.globalAlpha = info.transitionProgress;
        ctx.translate(width / 2, height / 2);
        ctx.scale(0.8 + 0.2 * info.transitionProgress, 0.8 + 0.2 * info.transitionProgress);
        ctx.translate(-width / 2, -height / 2);
        drawSlide(ctx, activeSlide, info.currentProgress, width, height, info.elapsed);
        ctx.restore();
      } else {
        // 'none' - snap transition
        drawSlide(ctx, activeSlide, info.currentProgress, width, height, info.elapsed);
      }
    }

    // 4. Draw Branding Watermark (Top Right)
    ctx.save();
    ctx.font = '500 16px Outfit, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.textAlign = 'right';
    ctx.fillText('Tạo Video Tự Động 30s', width - 30, 40);
    
    // Tiny glowing recording dot if playing/exporting
    if (isPlaying) {
      ctx.fillStyle = '#ef4444';
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(width - 200, 34, 5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 5. Draw Dynamic Audio Visualizer (Bottom Overlay)
    ctx.save();
    const visualizerHeight = 80;
    const barWidth = 6;
    const gap = 3;
    const totalBars = Math.floor(width / (barWidth + gap));
    
    const grad = ctx.createLinearGradient(0, height - visualizerHeight, 0, height);
    grad.addColorStop(0, 'rgba(168, 85, 247, 0.8)'); // Purple neon
    grad.addColorStop(0.5, 'rgba(6, 182, 212, 0.6)'); // Cyan neon
    grad.addColorStop(1, 'rgba(6, 182, 212, 0)'); // fade out
    
    ctx.fillStyle = grad;

    if (analyser && isPlaying) {
      // 5a. Render from active frequency data
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      // Downsample to fit totalBars
      for (let i = 0; i < totalBars; i++) {
        const dataIdx = Math.floor((i / totalBars) * bufferLength * 0.6); // focus on low-mid frequencies
        const val = dataArray[dataIdx] || 0;
        const barHeight = (val / 255) * visualizerHeight * 1.2;
        
        const x = i * (barWidth + gap);
        const y = height - barHeight;
        
        ctx.fillRect(x, y, barWidth, barHeight);
      }
    } else {
      // 5b. Render elegant idle sine wave when paused
      for (let i = 0; i < totalBars; i++) {
        const waveOffset = currentTime * 4 + i * 0.05;
        const idleHeight = 15 + 15 * Math.sin(waveOffset) * Math.cos(waveOffset * 0.5);
        
        const x = i * (barWidth + gap);
        const y = height - idleHeight;
        
        ctx.fillRect(x, y, barWidth, idleHeight);
      }
    }
    ctx.restore();
  };

  // Re-run render whenever time, slides, or play states change
  useEffect(() => {
    render();
  }, [slides, currentTime, isPlaying]);

  return (
    <div className="relative w-full aspect-video glass-panel overflow-hidden glow-effect">
      <canvas
        ref={canvasRef}
        width={1280}
        height={720}
        className="w-full h-full block"
        style={{ background: '#0a0b10' }}
      />
      {/* Visual Overlay indicating progress */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <div 
          className="h-full bg-gradient-to-r from-purple via-pink to-cyan transition-all duration-100 ease-linear"
          style={{ width: `${(currentTime / 30) * 100}%` }}
        />
      </div>
    </div>
  );
}
