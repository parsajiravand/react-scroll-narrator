import { ReactNode, CSSProperties } from 'react'

export type AnimationType =
  | 'fade'
  | 'slide'
  | 'scale'
  | 'slideUp'
  | 'slideDown'
  | 'slideLeft'
  | 'slideRight'
  | 'scaleFade'
  | 'parallax'
  | 'reveal'
  | 'none'

export type ProgressStyle = 'dots' | 'bar' | 'minimal'

export interface ScrollNarratorProps {
  /** Height of each step section */
  height?: string | number
  /** Default animation style for all steps */
  animation?: AnimationType
  /** Callback when step becomes active */
  onStepChange?: (index: number, stepId?: string) => void
  /** Callback when user clicks on progress indicator */
  onStepClick?: (stepIndex: number) => void
  /** Whether steps are sticky scroll */
  sticky?: boolean
  /** Enable parallax backgrounds */
  parallax?: boolean
  /** Parallax speed multiplier */
  parallaxSpeed?: number
  /** Enable keyboard navigation */
  keyboardNavigation?: boolean
  /** Enable touch/swipe navigation on mobile */
  touchNavigation?: boolean
  /** Custom className for the container */
  className?: string
  /** Custom styles for the container */
  style?: CSSProperties
  /** Children should be NarrationStep components */
  children: ReactNode
}

export interface NarrationStepProps {
  /** Unique step ID */
  id?: string
  /** Custom styling className */
  className?: string
  /** Override animation for this specific step */
  animation?: AnimationType
  /** Background image URL for parallax effect */
  backgroundImage?: string
  /** Background color */
  backgroundColor?: string
  /** Custom styles */
  style?: CSSProperties
  /** Step content */
  children: ReactNode
}

export interface ProgressIndicatorProps {
  /** Total number of steps */
  total: number
  /** Current active step index */
  current: number
  /** Style of progress indicator */
  style?: ProgressStyle
  /** Custom className */
  className?: string
  /** Position of the indicator */
  position?: 'top' | 'bottom' | 'left' | 'right'
  /** Callback when user clicks on progress indicator */
  onStepClick?: (index: number) => void
  /** Whether to show step numbers */
  showNumbers?: boolean
  /** Size of the indicator */
  size?: 'sm' | 'md' | 'lg'
}

export interface ScrollState {
  currentStep: number
  progress: number
  direction: 'up' | 'down' | null
  isScrolling: boolean
}

export interface AnimationVariants {
  initial: Record<string, any>
  animate: Record<string, any>
  exit: Record<string, any>
  [key: string]: Record<string, any>
}

export interface ScrollNarratorRef {
  scrollToStep: (stepIndex: number) => void
}
