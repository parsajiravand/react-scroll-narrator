import React, { useRef, forwardRef } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { NarrationStepProps, AnimationType } from '../types'
import { getAnimationVariants } from '../utils/animations'

interface ExtendedNarrationStepProps extends NarrationStepProps {
  index: number
  isActive: boolean
  animation: AnimationType
  parallax?: boolean
  parallaxY?: any
  observerRef?: (element: HTMLElement | null) => void
}

const NarrationStep = forwardRef<HTMLDivElement, ExtendedNarrationStepProps>(({
  index,
  isActive,
  animation,
  parallax = false,
  parallaxY,
  observerRef,
  className,
  backgroundImage,
  backgroundColor,
  style,
  children,
  ...props
}, ref) => {
  const [isVisible, setIsVisible] = React.useState(false)
  const stepRef = useRef<HTMLDivElement | null>(null)

  const combinedRef = (element: HTMLDivElement | null) => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(element)
      } else if (ref) {
        ;(ref as React.MutableRefObject<HTMLDivElement | null>).current = element
      }
    }
    if (observerRef) {
      observerRef(element)
    }
    stepRef.current = element
  }

  // Viewport visibility observer for animations
  React.useEffect(() => {
    const element = stepRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '0px 0px -10% 0px' // Trigger slightly before fully out of view
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const variants = getAnimationVariants(animation)

  const stepStyle: React.CSSProperties = {
    backgroundColor,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: parallax ? 'fixed' : 'scroll',
    ...style,
  }

  if (parallax && parallaxY) {
    stepStyle.transform = `translateY(${parallaxY})`
  }

  return (
    <motion.div
      ref={combinedRef}
      className={clsx(
        'narration-step',
        'relative w-full h-full flex items-center justify-center',
        'overflow-hidden',
        className
      )}
      style={stepStyle}
      initial="initial"
      animate={isVisible ? "animate" : "exit"}
      variants={variants}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1], // Custom easing for smooth animations
      }}
      {...props}
    >
      <div className="narration-step-content w-full h-full flex items-center justify-center">
        {children}
      </div>
    </motion.div>
  )
})

NarrationStep.displayName = 'NarrationStep'

export default NarrationStep
