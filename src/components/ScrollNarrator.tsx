import React, { useRef, useState, useCallback } from 'react'
import { useScroll, useTransform } from 'framer-motion'
import clsx from 'clsx'
import { ScrollNarratorProps, ScrollState } from '../types'
import { useScrollNarrator } from '../hooks/useScrollNarrator'
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation'
import { useTouchNavigation } from '../hooks/useTouchNavigation'

const ScrollNarrator: React.FC<ScrollNarratorProps> = ({
  height = '100vh',
  animation = 'fade',
  onStepChange,
  sticky = true,
  parallax = false,
  parallaxSpeed = 0.5,
  keyboardNavigation = true,
  touchNavigation = true,
  className,
  style,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollState, setScrollState] = useState<ScrollState>({
    currentStep: 0,
    progress: 0,
    direction: null,
    isScrolling: false,
  })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', `${parallaxSpeed * 100}%`])

  const handleStepChange = useCallback((stepIndex: number, stepId?: string) => {
    setScrollState(prev => ({
      ...prev,
      currentStep: stepIndex,
    }))
    onStepChange?.(stepIndex, stepId)
  }, [onStepChange])

  const { observerRefs } = useScrollNarrator({
    containerRef,
    onStepChange: handleStepChange,
    totalSteps: React.Children.count(children),
  })

  // Keyboard navigation
  useKeyboardNavigation({
    enabled: keyboardNavigation,
    currentStep: scrollState.currentStep,
    totalSteps: React.Children.count(children),
    onStepChange: handleStepChange,
  })

  // Touch navigation
  useTouchNavigation({
    enabled: touchNavigation,
    containerRef,
    currentStep: scrollState.currentStep,
    onStepChange: handleStepChange,
    totalSteps: React.Children.count(children),
  })

  const containerStyle: React.CSSProperties = {
    height: typeof height === 'number' ? `${height}px` : height,
    ...style,
  }

  return (
    <div
      ref={containerRef}
      className={clsx(
        'scroll-narrator-container',
        sticky && 'sticky',
        className
      )}
      style={containerStyle}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return null

        const stepProps = {
          key: child.props.id || `step-${index}`,
          index,
          isActive: scrollState.currentStep === index,
          animation: child.props.animation || animation,
          parallax,
          parallaxY,
          observerRef: observerRefs[index],
          ...child.props,
        }

        return React.cloneElement(child, stepProps)
      })}
    </div>
  )
}

export default ScrollNarrator
