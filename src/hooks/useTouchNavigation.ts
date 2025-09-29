import { useEffect, useRef, useCallback } from 'react'

interface UseTouchNavigationOptions {
  enabled: boolean
  containerRef: React.RefObject<HTMLElement>
  currentStep: number
  onStepChange: (stepIndex: number) => void
  totalSteps: number
  minSwipeDistance?: number
}

interface TouchPosition {
  x: number
  y: number
  time: number
}

export const useTouchNavigation = ({
  enabled,
  containerRef,
  currentStep,
  onStepChange,
  totalSteps,
  minSwipeDistance = 50,
}: UseTouchNavigationOptions) => {
  const touchStartRef = useRef<TouchPosition | null>(null)
  const touchEndRef = useRef<TouchPosition | null>(null)

  const handleTouchStart = useCallback((event: TouchEvent) => {
    if (!enabled) return

    const touch = event.touches[0]
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    }
  }, [enabled])

  const handleTouchEnd = useCallback(
    (event: TouchEvent) => {
      if (!enabled || !touchStartRef.current) return

      const touch = event.changedTouches[0]
      touchEndRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
      }

      handleSwipe()
    },
    [enabled]
  )

  const handleSwipe = useCallback(() => {
    if (!touchStartRef.current || !touchEndRef.current) return

    const start = touchStartRef.current
    const end = touchEndRef.current

    const deltaX = end.x - start.x
    const deltaY = end.y - start.y
    const deltaTime = end.time - start.time

    // Check if it's a quick swipe (less than 500ms) and minimum distance
    if (deltaTime > 500) return

    const absDeltaX = Math.abs(deltaX)
    const absDeltaY = Math.abs(deltaY)

    // Determine if it's a vertical swipe (more vertical than horizontal)
    if (absDeltaY > absDeltaX && absDeltaY > minSwipeDistance) {
      if (deltaY > 0) {
        // Swipe down - go to previous step
        onStepChange(Math.max(0, currentStep - 1))
      } else {
        // Swipe up - go to next step
        onStepChange(Math.min(totalSteps - 1, currentStep + 1))
      }
    }
  }, [minSwipeDistance, onStepChange, totalSteps])


  useEffect(() => {
    const container = containerRef.current
    if (!container || !enabled) return

    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [containerRef, enabled, handleTouchStart, handleTouchEnd])
}
