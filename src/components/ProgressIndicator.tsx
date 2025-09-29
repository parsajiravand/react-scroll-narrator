import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { ProgressIndicatorProps } from '../types'

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  total,
  current,
  style = 'dots',
  className,
  position = 'right',
  onStepClick,
  showNumbers = false,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  }

  const progressBarHeight = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  }

  const positionClasses = {
    top: 'top-8 left-1/2 transform -translate-x-1/2 flex-row',
    bottom: 'bottom-8 left-1/2 transform -translate-x-1/2 flex-row',
    left: 'left-8 top-1/2 transform -translate-y-1/2 flex-col',
    right: 'right-8 top-1/2 transform -translate-y-1/2 flex-col',
  }

  if (style === 'bar') {
    const progressPercentage = ((current + 1) / total) * 100

    return (
      <div
        className={clsx(
          'fixed z-50',
          positionClasses[position],
          className
        )}
      >
        <div className="bg-white/20 rounded-full backdrop-blur-sm p-1">
          <div className={clsx('bg-white rounded-full relative overflow-hidden', progressBarHeight[size])}>
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    )
  }

  if (style === 'minimal') {
    return (
      <div
        className={clsx(
          'fixed z-50 flex',
          positionClasses[position],
          className
        )}
      >
        <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
          {current + 1} / {total}
        </div>
      </div>
    )
  }

  // Default dots style
  return (
    <div
      className={clsx(
        'fixed z-50 flex gap-2',
        positionClasses[position],
        className
      )}
    >
      {Array.from({ length: total }, (_, index) => (
        <button
          key={index}
          onClick={() => onStepClick?.(index)}
          className={clsx(
            'rounded-full transition-all duration-300 backdrop-blur-sm',
            'hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50',
            sizeClasses[size],
            index === current
              ? 'bg-white shadow-lg'
              : 'bg-white/40 hover:bg-white/60'
          )}
          aria-label={`Go to step ${index + 1}`}
        >
          {showNumbers && (
            <span className="text-xs text-black font-medium">
              {index + 1}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

export default ProgressIndicator
