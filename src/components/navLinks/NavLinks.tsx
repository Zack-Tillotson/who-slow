import { NavLink } from '@mantine/core'
import {IconMapCog, IconUsers, IconDice5, IconHome} from '@tabler/icons-react'

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
  desc: 'View and manage campaigns', 
  IconImage: IconMapCog,
}, {
  href: '/player/', 
  title: 'Players', 
  desc: 'Configure the players of your campaign', 
  IconImage: IconUsers,
}, {
  href: '/game/', 
  title: 'Games', 
  desc: 'Configure the games you play', 
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
          />
        ))}
    </>
  )
}