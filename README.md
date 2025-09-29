# React Scroll Narrator

[![npm version](https://badge.fury.io/js/react-scroll-narrator.svg)](https://badge.fury.io/js/react-scroll-narrator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A powerful React component for creating Apple-style scroll-driven storytelling experiences with smooth animations, parallax effects, and interactive navigation.

![React Scroll Narrator Demo](./demo-preview.png)

## ✨ Features

- **🎭 Multiple Animation Types**: Fade, slide, scale, reveal, parallax, and custom animations
- **📱 Touch & Mobile Optimized**: Swipe gestures and touch navigation
- **⌨️ Keyboard Navigation**: Full keyboard support with arrow keys and number shortcuts
- **🎨 Parallax Backgrounds**: Smooth parallax scrolling effects
- **📍 Progress Indicators**: Dots, bars, and minimal progress displays
- **♿ Accessibility Ready**: Screen reader support and ARIA attributes
- **⚡ High Performance**: Optimized with IntersectionObserver API
- **🔧 Fully Customizable**: Extensive props for styling and behavior
- **🎯 TypeScript Support**: Complete type definitions included

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
import { ScrollNarrator, NarrationStep } from "react-scroll-narrator";

export default function MyApp() {
  return (
    <ScrollNarrator
      height="100vh"
      animation="fade"
      onStepChange={(index) => console.log("Current step:", index)}
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

      <NarrationStep animation="scale">
        <div className="cta-section">
          <h2>Get Started Today</h2>
          <button>Learn More</button>
        </div>
      </NarrationStep>
    </ScrollNarrator>
  );
}
```

## 🎛️ API Reference

### ScrollNarrator

The main container component that manages scroll behavior and step transitions.

```tsx
<ScrollNarrator
  height="100vh"
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
| `height` | `string \| number` | `"100vh"` | Height of each step section |
| `animation` | `AnimationType` | `"fade"` | Default animation for all steps |
| `onStepChange` | `(index: number, stepId?: string) => void` | - | Callback when step becomes active |
| `sticky` | `boolean` | `true` | Whether steps are sticky scroll |
| `parallax` | `boolean` | `false` | Enable parallax backgrounds |
| `parallaxSpeed` | `number` | `0.5` | Parallax scroll speed multiplier |
| `keyboardNavigation` | `boolean` | `true` | Enable keyboard navigation |
| `touchNavigation` | `boolean` | `true` | Enable touch/swipe navigation |
| `className` | `string` | - | Custom CSS class |
| `style` | `CSSProperties` | - | Custom inline styles |

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
import { ScrollNarrator, NarrationStep, ProgressIndicator } from "react-scroll-narrator";
import { useState } from "react";

function App() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <>
      <ProgressIndicator
        total={3}
        current={currentStep}
        style="dots"
        position="right"
        onStepClick={setCurrentStep}
      />

      <ScrollNarrator
        height="100vh"
        onStepChange={setCurrentStep}
      >
        <NarrationStep>
          <h1>Step 1</h1>
        </NarrationStep>

        <NarrationStep>
          <h1>Step 2</h1>
        </NarrationStep>

        <NarrationStep>
          <h1>Step 3</h1>
        </NarrationStep>
      </ScrollNarrator>
    </>
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
