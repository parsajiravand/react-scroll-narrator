import { useEffect, useRef, useCallback, RefCallback } from 'react'

interface UseScrollNarratorOptions {
  containerRef: React.RefObject<HTMLElement>
  onStepChange: (stepIndex: number, stepId?: string) => void
  totalSteps: number
  threshold?: number
  rootMargin?: string
}

interface UseScrollNarratorReturn {
  observerRefs: RefCallback<HTMLElement>[]
  currentStep: number
}

export const useScrollNarrator = ({
  containerRef,
  onStepChange,
  totalSteps,
  threshold = 0.1,
  rootMargin = '0px 0px -10% 0px',
}: UseScrollNarratorOptions): UseScrollNarratorReturn => {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const stepRefs = useRef<(HTMLElement | null)[]>([])
  const currentStepRef = useRef<number>(0)

  // Calculate which step is currently most visible in the viewport
  const updateCurrentStepFromScroll = useCallback(() => {
    const scrollY = window.scrollY
    const windowHeight = window.innerHeight

    let maxVisibleArea = 0
    let currentStep = 0

    stepRefs.current.forEach((stepRef, index) => {
      if (stepRef) {
        const rect = stepRef.getBoundingClientRect()
        const elementTop = rect.top + scrollY
        const elementBottom = rect.bottom + scrollY

        // Calculate visible area of this element
        const visibleTop = Math.max(scrollY, elementTop)
        const visibleBottom = Math.min(scrollY + windowHeight, elementBottom)
        const visibleArea = Math.max(0, visibleBottom - visibleTop)

        if (visibleArea > maxVisibleArea) {
          maxVisibleArea = visibleArea
          currentStep = index
        }
      }
    })

    if (currentStep !== currentStepRef.current) {
      currentStepRef.current = currentStep
      onStepChange(currentStep, `step-${currentStep}`)
    }
  }, [onStepChange])

  // Create refs for each step
  const observerRefs: RefCallback<HTMLElement>[] = []

  for (let i = 0; i < totalSteps; i++) {
    observerRefs.push((element: HTMLElement | null) => {
      stepRefs.current[i] = element
    })
  }

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stepIndex = stepRefs.current.indexOf(entry.target as HTMLElement)
          if (stepIndex !== -1 && stepIndex !== currentStepRef.current) {
            currentStepRef.current = stepIndex
            const stepElement = entry.target as HTMLElement
            const stepId = stepElement.getAttribute('data-step-id')
            onStepChange(stepIndex, stepId || undefined)
          }
        }
      })
    },
    [onStepChange]
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create IntersectionObserver as backup
    observerRef.current = new IntersectionObserver(handleIntersection, {
      root: null, // Use viewport as root since we scroll the window
      rootMargin,
      threshold,
    })

    // Observe all step elements
    stepRefs.current.forEach((stepRef, index) => {
      if (stepRef && observerRef.current) {
        stepRef.setAttribute('data-step-id', `step-${index}`)
        observerRef.current.observe(stepRef)
      }
    })

    // Add scroll listener as primary method
    const handleScroll = () => {
      updateCurrentStepFromScroll()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Initial check
    updateCurrentStepFromScroll()

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      window.removeEventListener('scroll', handleScroll)
    }
  }, [containerRef, handleIntersection, updateCurrentStepFromScroll, rootMargin, threshold])

  return {
    observerRefs,
    currentStep: currentStepRef.current,
  }
}
