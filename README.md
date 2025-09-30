# React Scroll Narrator

[![npm version](https://badge.fury.io/js/react-scroll-narrator.svg)](https://badge.fury.io/js/react-scroll-narrator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A powerful React component for creating Apple-style scroll-driven storytelling experiences with smooth animations, parallax effects, and interactive navigation.

![React Scroll Narrator Demo](./demo-preview.png)

## 🚀 What's New

- **Programmatic Navigation**: Direct API access with `scrollToStep()` method
- **Enhanced Progress Indicators**: Click to navigate functionality
- **Improved Performance**: Dual detection system with scroll listeners and IntersectionObserver
- **Better Animation Triggers**: Content appears immediately when sections become active
- **Full Viewport Sections**: Each NarrationStep takes full screen height (100vh)

## ✨ Features

- **🎭 Multiple Animation Types**: Fade, slide, scale, reveal, parallax, and custom animations
- **📱 Touch & Mobile Optimized**: Swipe gestures and touch navigation
- **⌨️ Keyboard Navigation**: Full keyboard support with arrow keys and number shortcuts
- **🎨 Parallax Backgrounds**: Smooth parallax scrolling effects
- **📍 Progress Indicators**: Interactive dots, bars, and minimal progress displays with click navigation
- **♿ Accessibility Ready**: Screen reader support and ARIA attributes
- **⚡ High Performance**: Optimized with IntersectionObserver API and scroll-based detection
- **🔧 Fully Customizable**: Extensive props for styling and behavior
- **🎯 TypeScript Support**: Complete type definitions included
- **🎪 Programmatic Control**: Direct API access for custom navigation and control

## 🚀 Installation

```bash
npm install react-scroll-narrator
```

### Peer Dependencies

```bash
npm install react react-dom framer-motion clsx
```

## 📖 Quick Start

```tsx
import { ScrollNarrator, NarrationStep, ProgressIndicator, ScrollNarratorRef } from "react-scroll-narrator";
import { useState, useRef } from "react";

export default function MyApp() {
  const [currentStep, setCurrentStep] = useState(0);
  const scrollNarratorRef = useRef<ScrollNarratorRef>(null);

  const handleStepClick = (stepIndex) => {
    scrollNarratorRef.current?.scrollToStep(stepIndex);
  };

  return (
    <div className="relative">
      {/* Progress Indicator */}
      <ProgressIndicator
        total={3}
        current={currentStep}
        style="dots"
        position="right"
        onStepClick={handleStepClick}
      />

      <ScrollNarrator
        ref={scrollNarratorRef}
        animation="fade"
        onStepChange={setCurrentStep}
        keyboardNavigation={true}
        touchNavigation={true}
      >
        <NarrationStep>
          <h1>Welcome to Scroll Narrator! 🚀</h1>
          <p>Your scroll-driven storytelling starts here.</p>
        </NarrationStep>

        <NarrationStep animation="slideUp">
          <div className="product-showcase">
            <img src="/product.png" alt="Amazing Product" />
            <h2>Incredible Features</h2>
            <p>Experience the magic of smooth scroll animations.</p>
          </div>
        </NarrationStep>

        <NarrationStep animation="reveal">
          <div className="cta-section">
            <h2>Get Started Today</h2>
            <button>Learn More</button>
          </div>
        </NarrationStep>
      </ScrollNarrator>
    </div>
  );
}
```

## 🎛️ API Reference

### ScrollNarrator

The main container component that manages scroll behavior and step transitions.

```tsx
const scrollNarratorRef = useRef<ScrollNarratorRef>(null);

// Programmatic navigation
scrollNarratorRef.current?.scrollToStep(2);

<ScrollNarrator
  ref={scrollNarratorRef}
  animation="fade"
  onStepChange={(index) => console.log(index)}
  keyboardNavigation={true}
  touchNavigation={true}
  parallax={true}
  parallaxSpeed={0.5}
  className="my-custom-class"
>
  {/* NarrationStep components */}
</ScrollNarrator>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `animation` | `AnimationType` | `"fade"` | Default animation for all steps |
| `onStepChange` | `(index: number, stepId?: string) => void` | - | Callback when step becomes active |
| `sticky` | `boolean` | `true` | Whether steps are sticky scroll |
| `parallax` | `boolean` | `false` | Enable parallax backgrounds |
| `parallaxSpeed` | `number` | `0.5` | Parallax scroll speed multiplier |
| `keyboardNavigation` | `boolean` | `true` | Enable keyboard navigation |
| `touchNavigation` | `boolean` | `true` | Enable touch/swipe navigation |
| `className` | `string` | - | Custom CSS class |
| `style` | `CSSProperties` | - | Custom inline styles |

#### Ref Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `scrollToStep` | `(stepIndex: number) => void` | Programmatically scroll to a specific step |

#### TypeScript Types

```tsx
import type {
  ScrollNarratorProps,
  NarrationStepProps,
  AnimationType,
  ProgressIndicatorProps,
  ScrollNarratorRef
} from "react-scroll-narrator";
```

### NarrationStep

Individual step component that contains your content and handles animations.

```tsx
<NarrationStep
  id="unique-step-id"
  animation="slideUp"
  backgroundImage="/hero-bg.jpg"
  backgroundColor="#000"
  className="custom-step-class"
>
  <h1>Your Content Here</h1>
</NarrationStep>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | `auto` | Unique step identifier |
| `animation` | `AnimationType` | `inherit` | Override animation for this step |
| `backgroundImage` | `string` | - | Background image URL |
| `backgroundColor` | `string` | - | Background color |
| `className` | `string` | - | Custom CSS class |
| `style` | `CSSProperties` | - | Custom inline styles |

### ProgressIndicator

Visual indicator showing current progress through the narrative.

```tsx
<ProgressIndicator
  total={5}
  current={2}
  style="dots"
  position="right"
  onStepClick={(index) => console.log(index)}
  size="lg"
  showNumbers={true}
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `total` | `number` | - | Total number of steps |
| `current` | `number` | - | Current active step index |
| `style` | `"dots" \| "bar" \| "minimal"` | `"dots"` | Indicator style |
| `position` | `"top" \| "bottom" \| "left" \| "right"` | `"right"` | Position on screen |
| `onStepClick` | `(index: number) => void` | - | Click handler for navigation |
| `showNumbers` | `boolean` | `false` | Show step numbers |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Indicator size |
| `className` | `string` | - | Custom CSS class |

## 🎨 Animation Types

Choose from these built-in animation types:

- `"fade"` - Simple opacity transition
- `"slide"` - Slide in from right
- `"slideUp"` - Slide up from bottom
- `"slideDown"` - Slide down from top
- `"slideLeft"` - Slide in from right
- `"slideRight"` - Slide in from left
- `"scale"` - Scale in with opacity
- `"scaleFade"` - Gentle scale and fade
- `"reveal"` - Clip-path reveal effect
- `"parallax"` - Subtle parallax movement
- `"none"` - No animation

## 🎯 Advanced Examples

### With Progress Indicator

```tsx
import { ScrollNarrator, NarrationStep, ProgressIndicator, ScrollNarratorRef } from "react-scroll-narrator";
import { useState, useRef } from "react";

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const scrollNarratorRef = useRef<ScrollNarratorRef>(null);

  const handleStepClick = (stepIndex: number) => {
    scrollNarratorRef.current?.scrollToStep(stepIndex);
  };

  return (
    <div className="relative">
      <ProgressIndicator
        total={3}
        current={currentStep}
        style="dots"
        position="right"
        onStepClick={handleStepClick}
        size="lg"
      />

      <ScrollNarrator
        ref={scrollNarratorRef}
        onStepChange={setCurrentStep}
        keyboardNavigation={true}
        touchNavigation={true}
      >
        <NarrationStep>
          <h1>Step 1</h1>
          <p>Scroll or click the dots to navigate</p>
        </NarrationStep>

        <NarrationStep animation="slideUp">
          <h1>Step 2</h1>
          <p>Smooth animations and interactions</p>
        </NarrationStep>

        <NarrationStep animation="reveal">
          <h1>Step 3</h1>
          <p>Beautiful storytelling experiences</p>
        </NarrationStep>
      </ScrollNarrator>
    </div>
  );
}
```

### With Parallax Backgrounds

```tsx
<ScrollNarrator
  height="100vh"
  parallax={true}
  parallaxSpeed={0.3}
>
  <NarrationStep backgroundImage="/mountain-bg.jpg">
    <h1>Mountain View</h1>
  </NarrationStep>

  <NarrationStep backgroundImage="/ocean-bg.jpg">
    <h1>Ocean Scene</h1>
  </NarrationStep>
</ScrollNarrator>
```

### Custom Animations with Framer Motion

```tsx
import { motion } from "framer-motion";

<NarrationStep animation="none">
  <motion.div
    initial={{ x: -100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    <h1>Custom Animation</h1>
  </motion.div>
</NarrationStep>
```

## 🎮 Controls

### Keyboard Navigation
- `↑/↓` or `Page Up/Down` - Navigate between steps
- `Home/End` - Jump to first/last step
- `1-9` - Jump to specific step number

### Touch Navigation
- **Swipe Up/Down** - Navigate between steps on mobile devices
- **Touch optimized** for smooth scrolling experience

## 🎨 Styling

The component comes with minimal default styles. You can customize everything with CSS:

```css
/* Custom step styles */
.narration-step {
  /* Your custom styles */
}

/* Container styles */
.scroll-narrator-container {
  /* Container modifications */
}

/* Progress indicator customization */
.progress-indicator {
  /* Custom progress styles */
}
```

## 🔧 TypeScript Support

Full TypeScript support with complete type definitions:

```tsx
import type {
  ScrollNarratorProps,
  NarrationStepProps,
  AnimationType,
  ProgressIndicatorProps
} from "react-scroll-narrator";
```

## 🌟 Use Cases

- **Product Showcases** - Apple-style product reveals
- **Storytelling Websites** - Long-form narratives with smooth transitions
- **Portfolio Sites** - Creative showcases with scroll interactions
- **Marketing Landing Pages** - Engaging user experiences
- **Interactive Presentations** - Scroll-based slide decks
- **Brand Stories** - Cinematic storytelling experiences

## 📱 Browser Support

- Chrome 58+
- Firefox 55+
- Safari 11+
- Edge 79+
- iOS Safari 11+
- Android Chrome 58+

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Apple's product pages and modern web storytelling
- Built with [Framer Motion](https://www.framer.com/motion/) for animations
- Uses [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) for performance

---

Made with ❤️ for creating beautiful scroll experiences
