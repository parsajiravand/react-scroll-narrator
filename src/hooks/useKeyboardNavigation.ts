import { useEffect, useCallback } from 'react'

interface UseKeyboardNavigationOptions {
  enabled: boolean
  currentStep: number
  totalSteps: number
  onStepChange: (stepIndex: number) => void
}

export const useKeyboardNavigation = ({
  enabled,
  currentStep,
  totalSteps,
  onStepChange,
}: UseKeyboardNavigationOptions) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return

      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight':
        case ' ': // Spacebar
        case 'PageDown':
          event.preventDefault()
          if (currentStep < totalSteps - 1) {
            onStepChange(currentStep + 1)
          }
          break

        case 'ArrowUp':
        case 'ArrowLeft':
        case 'PageUp':
          event.preventDefault()
          if (currentStep > 0) {
            onStepChange(currentStep - 1)
          }
          break

        case 'Home':
          event.preventDefault()
          onStepChange(0)
          break

        case 'End':
          event.preventDefault()
          onStepChange(totalSteps - 1)
          break

        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          // Number keys for direct navigation
          const stepIndex = parseInt(event.key) - 1
          if (stepIndex >= 0 && stepIndex < totalSteps) {
            event.preventDefault()
            onStepChange(stepIndex)
          }
          break
      }
    },
    [enabled, currentStep, totalSteps, onStepChange]
  )

  useEffect(() => {
    if (!enabled) return

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown, enabled])
}
