import { NavLink } from '@mantine/core'
import {IconMapCog, IconUsers, IconDice5, IconHome, IconChevronRight} from '@tabler/icons-react'

interface NavLinksProps {
  withHome?: boolean,
}

const navLinks = [{
  href: '/', 
  title: 'Home', 
  desc: 'Welcome to Who Slow', 
  IconImage: IconHome,
}, {
  href: '/campaign/', 
  title: 'Campaigns', 
  desc: 'View and manage campaigns, a series of game sessions that share stats.', 
  IconImage: IconMapCog,
}, {
  href: '/player/', 
  title: 'Players', 
  desc: 'Configure players. Enter new players here when they are part of a session.', 
  IconImage: IconUsers,
}, {
  href: '/game/', 
  title: 'Games', 
  desc: 'Configure the games you play. Link with BoardGameGeek to get detailed info.', 
  IconImage: IconDice5,
}
]

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