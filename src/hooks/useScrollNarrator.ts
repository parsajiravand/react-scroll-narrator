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
  threshold = 0.5,
  rootMargin = '-50% 0px -50% 0px',
}: UseScrollNarratorOptions): UseScrollNarratorReturn => {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const stepRefs = useRef<(HTMLElement | null)[]>([])
  const currentStepRef = useRef<number>(0)

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

    // Create IntersectionObserver
    observerRef.current = new IntersectionObserver(handleIntersection, {
      root: container,
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

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [containerRef, handleIntersection, rootMargin, threshold])

  return {
    observerRefs,
    currentStep: currentStepRef.current,
  }
}
