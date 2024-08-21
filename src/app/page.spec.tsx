import { expect, test } from 'vitest'

import Landing from './page'

// import { render, screen } from '@/test-utils/';
import { render, screen } from  '../test-utils/';

test('Landing', () => {
  render(<Landing />)
  expect(screen.getByRole('heading', { level: 1, name: 'Board game stats and turn timer' })).toBeDefined()
  expect(screen.getByRole('link')).toHaveAttribute('href', '/app')
})