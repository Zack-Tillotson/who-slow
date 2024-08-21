import { expect, test } from 'vitest'
import { render, screen } from '@/test-utils/';

import Landing from './page'

test('Landing', () => {
  render(<Landing />)
  expect(screen.getByRole('heading', { level: 1, name: 'Board game stats and turn timer' })).toBeDefined()
  expect(screen.getByRole('link')).toHaveAttribute('href', '/app')
})