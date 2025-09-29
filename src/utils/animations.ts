import { AnimationVariants, AnimationType } from '../types'

export const getAnimationVariants = (animation: AnimationType): AnimationVariants => {
  switch (animation) {
    case 'fade':
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }

    case 'slide':
      return {
        initial: { x: 100, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: -100, opacity: 0 },
      }

    case 'slideUp':
      return {
        initial: { y: 100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: -50, opacity: 0 },
      }

    case 'slideDown':
      return {
        initial: { y: -100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: 100, opacity: 0 },
      }

    case 'slideLeft':
      return {
        initial: { x: 100, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: -100, opacity: 0 },
      }

    case 'slideRight':
      return {
        initial: { x: -100, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: 100, opacity: 0 },
      }

    case 'scale':
      return {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 1.1, opacity: 0 },
      }

    case 'scaleFade':
      return {
        initial: { scale: 0.9, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.95, opacity: 0 },
      }

    case 'reveal':
      return {
        initial: {
          clipPath: 'inset(0 100% 0 0)',
          opacity: 0
        },
        animate: {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1
        },
        exit: {
          clipPath: 'inset(0 0% 0 100%)',
          opacity: 0
        },
      }

    case 'parallax':
      return {
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: -30, opacity: 0 },
      }

    case 'none':
    default:
      return {
        initial: {},
        animate: {},
        exit: {},
      }
  }
}

// Apple-style smooth easing function
export const appleEasing = [0.25, 0.1, 0.25, 1]

// Bounce animation for playful effects
export const bounceVariants = {
  initial: { scale: 0.3, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  },
  exit: { scale: 0.3, opacity: 0 }
}

// Stagger animation for child elements
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const staggerItem = {
  initial: { y: 20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: appleEasing
    }
  }
}

// Parallax transform utilities
export const createParallaxTransform = (progress: number, speed: number = 0.5) => {
  return `translateY(${progress * speed * 100}px)`
}

// Scroll-triggered animations
export const scrollTriggeredVariants = {
  hidden: { opacity: 0, y: 75 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: appleEasing
    }
  }
}
