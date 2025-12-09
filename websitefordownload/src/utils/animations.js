// Advanced Animation Utilities & Configuration
import { useEffect, useState, useCallback, useRef } from 'react';

// ==================== EASING CURVES ====================
export const easings = {
  // Exponential
  easeOutExpo: [0.19, 1, 0.22, 1],
  easeInExpo: [0.95, 0.05, 0.795, 0.035],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  
  // Quartic
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInQuart: [0.76, 0, 0.24, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  
  // Cubic
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  
  // Circ
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  
  // Back (overshoot)
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6],
  
  // Elastic
  elastic: [0.51, 0.92, 0.24, 1.15],
  elasticOut: [0.68, -0.55, 0.265, 1.55],
  elasticInOut: [0.87, 0, 0.13, 1],
  
  // Bounce
  bounce: [0.68, -0.55, 0.265, 1.55],
  bounceOut: [0.34, 1.56, 0.64, 1],
  bounceInOut: [0.68, -0.55, 0.32, 1.55],
};

// ==================== SPRING CONFIGURATIONS ====================
export const springs = {
  // Gentle springs
  gentle: { stiffness: 80, damping: 14, mass: 1 },
  soft: { stiffness: 100, damping: 20, mass: 1 },
  smooth: { stiffness: 120, damping: 18, mass: 0.8 },
  
  // Medium springs
  default: { stiffness: 170, damping: 26, mass: 1 },
  snappy: { stiffness: 200, damping: 20, mass: 0.8 },
  bouncy: { stiffness: 300, damping: 15, mass: 1 },
  
  // Fast springs
  fast: { stiffness: 400, damping: 30, mass: 0.6 },
  instant: { stiffness: 500, damping: 35, mass: 0.5 },
  
  // Special effects
  wobbly: { stiffness: 180, damping: 8, mass: 1 },
  stiff: { stiffness: 500, damping: 50, mass: 1 },
  slow: { stiffness: 60, damping: 20, mass: 2 },
};

// ==================== STAGGER UTILITIES ====================
export const staggerConfig = {
  // Timing
  fast: 0.03,
  default: 0.05,
  slow: 0.1,
  verySlow: 0.15,
  
  // Generators
  fromCenter: (index, total) => {
    const center = Math.floor(total / 2);
    return Math.abs(index - center) * staggerConfig.default;
  },
  
  fromEdges: (index, total) => {
    const center = Math.floor(total / 2);
    return (center - Math.abs(index - center)) * staggerConfig.default;
  },
  
  random: () => Math.random() * 0.2,
  
  grid: (row, col, totalRows, totalCols) => {
    return (row + col) * staggerConfig.fast;
  },
};

// ==================== SCROLL UTILITIES ====================

// Hook: Scroll Progress (0 to 1)
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = scrollHeight > 0 ? scrolled / scrollHeight : 0;
      setProgress(progress);
    };
    
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);
  
  return progress;
};

// Hook: Scroll Velocity
export const useScrollVelocity = () => {
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTimestamp = useRef(Date.now());
  
  useEffect(() => {
    let rafId;
    
    const updateVelocity = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const deltaY = currentScrollY - lastScrollY.current;
      const deltaTime = currentTime - lastTimestamp.current;
      
      if (deltaTime > 0) {
        const newVelocity = deltaY / deltaTime;
        setVelocity(newVelocity);
      }
      
      lastScrollY.current = currentScrollY;
      lastTimestamp.current = currentTime;
      
      rafId = requestAnimationFrame(updateVelocity);
    };
    
    rafId = requestAnimationFrame(updateVelocity);
    
    return () => cancelAnimationFrame(rafId);
  }, []);
  
  return velocity;
};

// Hook: Scroll Direction
export const useScrollDirection = () => {
  const [direction, setDirection] = useState('up');
  const lastScrollY = useRef(0);
  
  useEffect(() => {
    const updateDirection = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current) {
        setDirection('down');
      } else if (currentScrollY < lastScrollY.current) {
        setDirection('up');
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', updateDirection, { passive: true });
    
    return () => window.removeEventListener('scroll', updateDirection);
  }, []);
  
  return direction;
};

// ==================== MOUSE TRACKING ====================

// Hook: Mouse Position
export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', updatePosition);
    
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);
  
  return position;
};

// Hook: Mouse Velocity
export const useMouseVelocity = () => {
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const lastPosition = useRef({ x: 0, y: 0 });
  const lastTimestamp = useRef(Date.now());
  
  useEffect(() => {
    const updateVelocity = (e) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTimestamp.current;
      const deltaX = e.clientX - lastPosition.current.x;
      const deltaY = e.clientY - lastPosition.current.y;
      
      if (deltaTime > 0) {
        setVelocity({
          x: deltaX / deltaTime,
          y: deltaY / deltaTime,
        });
      }
      
      lastPosition.current = { x: e.clientX, y: e.clientY };
      lastTimestamp.current = currentTime;
    };
    
    window.addEventListener('mousemove', updateVelocity);
    
    return () => window.removeEventListener('mousemove', updateVelocity);
  }, []);
  
  return velocity;
};

// Hook: Normalized Mouse Position (-1 to 1)
export const useNormalizedMouse = () => {
  const [normalized, setNormalized] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const updateNormalized = (e) => {
      setNormalized({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    
    window.addEventListener('mousemove', updateNormalized);
    
    return () => window.removeEventListener('mousemove', updateNormalized);
  }, []);
  
  return normalized;
};

// ==================== INTERSECTION OBSERVER ====================

// Hook: Element in View
export const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          setHasBeenInView(true);
          if (options.once) {
            observer.disconnect();
          }
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, options.once]);
  
  return [ref, isInView, hasBeenInView];
};

// ==================== PERFORMANCE UTILITIES ====================

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function
export const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Request Animation Frame wrapper
export const useAnimationFrame = (callback) => {
  const requestRef = useRef();
  const previousTimeRef = useRef();
  
  const animate = useCallback((time) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, [callback]);
  
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);
};

// Reduced motion preference
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const listener = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);
  
  return prefersReducedMotion;
};

// ==================== PARALLAX UTILITIES ====================

export const parallaxConfig = {
  // Speed multipliers for different layers
  slowest: 0.1,
  slow: 0.3,
  medium: 0.5,
  fast: 0.7,
  fastest: 0.9,
  
  // Calculate parallax offset
  getOffset: (scrollY, speed) => scrollY * speed,
  
  // Create parallax transform
  getTransform: (scrollY, speed, direction = 'y') => {
    const offset = scrollY * speed;
    return direction === 'y' 
      ? `translateY(${offset}px)` 
      : `translateX(${offset}px)`;
  },
};

// Hook: Parallax Effect
export const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);
  
  return offset;
};

export default {
  easings,
  springs,
  staggerConfig,
  parallaxConfig,
  useScrollProgress,
  useScrollVelocity,
  useScrollDirection,
  useMousePosition,
  useMouseVelocity,
  useNormalizedMouse,
  useInView,
  useAnimationFrame,
  useReducedMotion,
  useParallax,
  debounce,
  throttle,
};
