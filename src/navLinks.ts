import { IconDice5, IconHome, IconMan, IconMapCog, IconUsers } from "@tabler/icons-react"

export const IS_STATIC = process.env.NEXT_PUBLIC_STATIC_ONLY === 'true'
export const PLACEHOLDER_ID = '_'

export const navLinks = [{
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
}, {
  href: '/profile/', 
  title: 'Profile', 
  desc: 'Manage your profile and user information.', 
  IconImage: IconMan,
}
]