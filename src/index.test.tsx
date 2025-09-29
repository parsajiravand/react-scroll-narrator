import React from 'react'
import { render } from '@testing-library/react'
import { ScrollNarrator, NarrationStep, ProgressIndicator } from './index'

// Basic smoke test
describe('React Scroll Narrator', () => {
  it('should render without crashing', () => {
    const { container } = render(
      <ScrollNarrator height="100vh">
        <NarrationStep>
          <h1>Test Step</h1>
        </NarrationStep>
      </ScrollNarrator>
    )

    expect(container).toBeInTheDocument()
  })

  it('should render progress indicator', () => {
    const { container } = render(
      <ProgressIndicator total={3} current={1} />
    )

    expect(container).toBeInTheDocument()
  })

  it('should export all components', () => {
    expect(ScrollNarrator).toBeDefined()
    expect(NarrationStep).toBeDefined()
    expect(ProgressIndicator).toBeDefined()
  })
})
