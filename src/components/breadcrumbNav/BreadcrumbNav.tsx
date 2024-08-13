'use client'

import { Anchor, Breadcrumbs, Box } from "@mantine/core"
import { usePathname } from 'next/navigation'

import styles from './breadcrumbNav.module.scss'

const baseStep = {href: '/app/', title: 'Home'}

export function BreadcrumbNav() {
  const section = usePathname()
    .slice(5) // '/app/...'
    .split('/')[0]
  const routeSteps = [
    baseStep, 
    {href: `${baseStep.href}${section}/`, title: section},
  ]

  return (
    <Box component='nav' mb="lg">
      <Breadcrumbs>
        {routeSteps.map(({href, title}) => (
          <Anchor key={href} href={href} className={styles.anchor}>
            {title}
          </Anchor>
        ))}
      </Breadcrumbs>
    </Box>
  )
}