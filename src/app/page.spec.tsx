import { expect, test } from 'vitest'

import Page from './page'

// import { render, screen } from '@/test-utils/';
import { render, screen } from  '../test-utils/';

test('Page', () => {
  render(<Page />)
  expect(screen.getByRole('heading', { level: 1, name: 'Board game stats and turn timer' })).toBeDefined()
  // expect(screen.getByRole('heading', { level: 2, name: 'About' })).toBeDefined()
})