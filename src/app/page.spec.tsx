import { expect, test } from 'vitest'

import Landing from './page'

import { render, screen } from '@/test-utils/';

test('App landing', () => {
  render(<Landing />)
  expect(screen.getByRole('heading', { level: 1, name: 'Welcome to Who Slow' })).toBeDefined()
  expect(screen.getByTestId('navlink-campaigns')).toHaveAttribute('href', '/campaign/')
  expect(screen.getByTestId('navlink-players')).toHaveAttribute('href', '/player/')
  expect(screen.getByTestId('navlink-games')).toHaveAttribute('href', '/game/')
})