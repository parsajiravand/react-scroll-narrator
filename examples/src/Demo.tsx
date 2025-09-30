import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ScrollNarrator, NarrationStep, ProgressIndicator, ScrollNarratorRef } from '../../src'
import { staggerContainer, staggerItem, appleEasing } from '../../src/utils/animations'

export const Demo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const scrollNarratorRef = useRef<ScrollNarratorRef>(null)


  const handleStepChange = (step: number) => {
    setCurrentStep(step)
  }

  const handleStepClick = (stepIndex: number) => {
    scrollNarratorRef.current?.scrollToStep(stepIndex)
  }

  return (
    <div className="relative">
      {/* Progress Indicator */}
      <ProgressIndicator
        total={6}
        current={currentStep}
        style="dots"
        position="right"
        size="lg"
        className="z-[100]"
        onStepClick={handleStepClick}
      />

      <ScrollNarrator
        ref={scrollNarratorRef}
        animation="fade"
        onStepChange={handleStepChange}
        keyboardNavigation={true}
        touchNavigation={true}
        parallax={true}
        parallaxSpeed={0.3}
        sticky={false}
        className="scroll-narrator-container"
      >
        {/* Hero Section */}
        <NarrationStep
          id="hero"
          animation="scale"
          className="flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        >
          <motion.div
            className="text-center px-6 max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.h1
              className="hero-text mb-6"
              variants={staggerItem}
            >
              Scroll Narrator
            </motion.h1>
            <motion.p
              className="subtitle mb-12 text-gray-300"
              variants={staggerItem}
            >
              Create Apple-style storytelling experiences with smooth scroll animations
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={staggerItem}
            >
              <button className="glass px-8 py-4 rounded-full text-lg font-medium hover:bg-white/20 transition-all duration-300">
                Get Started
              </button>
              <button className="px-8 py-4 rounded-full text-lg font-medium border border-white/30 hover:bg-white/10 transition-all duration-300">
                View Demo
              </button>
            </motion.div>
          </motion.div>
        </NarrationStep>

        {/* Product Showcase */}
        <NarrationStep
          id="product"
          animation="slideUp"
          className="flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 gap-12">
            <motion.div
              className="flex-1 text-center lg:text-left"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: appleEasing }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
                Revolutionary Design
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Experience smooth, cinematic storytelling that adapts to any device.
                From mobile phones to desktop displays, your narrative flows perfectly.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="glass px-6 py-3 rounded-full">
                  <span className="text-sm font-medium">Touch Optimized</span>
                </div>
                <div className="glass px-6 py-3 rounded-full">
                  <span className="text-sm font-medium">Keyboard Navigation</span>
                </div>
                <div className="glass px-6 py-3 rounded-full">
                  <span className="text-sm font-medium">Accessibility Ready</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="flex-shrink-0"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: appleEasing }}
            >
              <div className="phone-mockup">
                <div className="phone-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
                  <div className="flex items-center justify-center h-full text-white">
                    <div className="text-center">
                      <div className="text-2xl font-bold mb-2">📱</div>
                      <div className="text-sm opacity-80">Interactive Demo</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </NarrationStep>

        {/* Features Section */}
        <NarrationStep
          id="features"
          animation="reveal"
          className="flex items-center justify-center bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 py-20"
        >
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Everything you need to create engaging scroll experiences
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {[
                {
                  icon: '🎭',
                  title: 'Multiple Animations',
                  description: 'Fade, slide, scale, reveal, and custom animations'
                },
                {
                  icon: '📱',
                  title: 'Mobile First',
                  description: 'Touch gestures and swipe navigation built-in'
                },
                {
                  icon: '⌨️',
                  title: 'Keyboard Support',
                  description: 'Full keyboard navigation with arrow keys'
                },
                {
                  icon: '🎨',
                  title: 'Fully Customizable',
                  description: 'Styling, animations, and behavior are yours to control'
                },
                {
                  icon: '⚡',
                  title: 'High Performance',
                  description: 'Optimized with IntersectionObserver for smooth scrolling'
                },
                {
                  icon: '♿',
                  title: 'Accessible',
                  description: 'Screen reader support and keyboard navigation'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="feature-card text-center"
                  variants={staggerItem}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </NarrationStep>

        {/* Animation Showcase */}
        <NarrationStep
          id="animations"
          animation="slideLeft"
          className="flex items-center justify-center bg-gradient-to-br from-orange-900 via-red-900 to-pink-900"
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              Smooth Animations
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 mb-12"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Choose from multiple animation styles or create your own
            </motion.p>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {[
                { name: 'Fade', animation: 'fade' },
                { name: 'Slide', animation: 'slide' },
                { name: 'Scale', animation: 'scale' },
                { name: 'Reveal', animation: 'reveal' }
              ].map((anim, index) => (
                <motion.div
                  key={index}
                  className="glass p-6 rounded-2xl text-center"
                  variants={staggerItem}
                >
                  <div className="text-2xl mb-2">✨</div>
                  <div className="font-medium">{anim.name}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </NarrationStep>

        {/* Code Example */}
        <NarrationStep
          id="code"
          animation="slideRight"
          className="flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900"
        >
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              className="text-center mb-12"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Simple to Use
              </h2>
              <p className="text-xl text-gray-300">
                Just wrap your content in ScrollNarrator and NarrationStep components
              </p>
            </motion.div>

            <motion.div
              className="glass rounded-3xl p-8 font-mono text-sm overflow-x-auto"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <pre className="text-left text-gray-300">
{`import { ScrollNarrator, NarrationStep } from "react-scroll-narrator";

export default function MyApp() {
  return (
    <ScrollNarrator height="100vh" animation="fade">
      <NarrationStep>
        <h1>Welcome to Scroll Narrator! 🚀</h1>
      </NarrationStep>

      <NarrationStep animation="slideUp">
        <div className="product-showcase">
          <img src="/product.png" alt="Product" />
          <h2>Incredible Features</h2>
        </div>
      </NarrationStep>

      <NarrationStep animation="scale">
        <div className="cta-section">
          <h2>Get Started Today</h2>
          <button>Learn More</button>
        </div>
      </NarrationStep>
    </ScrollNarrator>
  );
}`}
              </pre>
            </motion.div>
          </div>
        </NarrationStep>

        {/* Call to Action */}
        <NarrationStep
          id="cta"
          animation="scaleFade"
          className="flex items-center justify-center bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900"
        >
          <motion.div
            className="text-center px-6 max-w-4xl mx-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: appleEasing }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Ready to Build?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Start creating stunning scroll experiences today. Join the developers
              who are already using Scroll Narrator in their projects.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button
                className="glass px-12 py-5 rounded-full text-xl font-semibold hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  window.open('https://www.npmjs.com/package/react-scroll-narrator', '_blank')
                }}
              >
                npm install react-scroll-narrator
              </motion.button>

              <motion.a
                href="https://github.com/parsajiravand/react-scroll-narrator"
                className="px-12 py-5 rounded-full text-xl font-semibold border border-white/30 hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View on GitHub
              </motion.a>
            </div>

            <motion.div
              className="mt-16 text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm mb-2">
                Made with ❤️ for modern web experiences
              </p>
              <p className="text-sm">
                <a href="https://www.npmjs.com/package/react-scroll-narrator" target="_blank" rel="noopener noreferrer">
                  npm install react-scroll-narrator
                </a>
              </p>
              {/* author */}
              <p className="text-sm">
                <a href="https://www.linkedin.com/in/parsa-jiravand/" target="_blank" rel="noopener noreferrer">
                  Author: Parsa Jiravand
                </a>
              </p>
            </motion.div>
          </motion.div>
        </NarrationStep>
      </ScrollNarrator>
    </div>
  )
}
