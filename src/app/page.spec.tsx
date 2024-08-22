import { expect, test } from 'vitest'

import Landing from './page'

import { render, screen } from '@/test-utils/';

interface HasAttribute {
  toHaveAttribute(attr: string, value: string): void
}

test('App landing', () => {
  render(<Landing />)
  expect(screen.getByRole('heading', { level: 1, name: 'Seriously for fun' })).toBeDefined()
  const test1 = expect(screen.getByTestId('navlink-campaigns')) as any as HasAttribute
  test1.toHaveAttribute('href', '/campaign/')
  const test2 = expect(screen.getByTestId('navlink-players')) as any as HasAttribute
  test2.toHaveAttribute('href', '/player/')
  const test3 = expect(screen.getByTestId('navlink-games')) as any as HasAttribute
  test3.toHaveAttribute('href', '/game/')
})