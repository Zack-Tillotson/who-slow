import { NavLink } from '@mantine/core'
import {IconChevronRight} from '@tabler/icons-react'
import {navLinks} from '@/navLinks'

interface NavLinksProps {
  withHome?: boolean,
}

export function NavLinks({withHome = false}: NavLinksProps) {
  const linksToRender = withHome ? navLinks : navLinks.slice(1)
  return (
    <>
      {linksToRender.map(({href, title, desc, IconImage}) => (
          <NavLink
            key={href}
            data-testid={`navlink-${title.toLowerCase()}`}
            href={href}
            label={title}
            description={desc}
            leftSection={<IconImage size="1rem" stroke={1.5} />}
            rightSection={<IconChevronRight />}
          />
        ))}
    </>
  )
}