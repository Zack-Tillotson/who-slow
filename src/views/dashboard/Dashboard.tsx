'use client'

import Image from 'next/image';
import { AppShell, Burger, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {IconMapCog, IconHome, IconUsers, IconDice5} from '@tabler/icons-react'

import logo from '@/assets/headline-250x50.png'
import styles from './dashboard.module.scss'

type DashboardType = Readonly<{
  children: React.ReactNode;
}>

const navLinks = [{
    href: '/app/', 
    title: 'Dashboard', 
    desc: 'View everything', 
    IconImage: IconHome,
  }, {
    href: '/app/campaign/', 
    title: 'Campaigns', 
    desc: 'Your campaigns or simple game sessions', 
    IconImage: IconMapCog,
  }, {
    href: '/app/player/', 
    title: 'Players', 
    desc: 'Configure the players of your campaign', 
    IconImage: IconUsers,
  }, {
    href: '/app/game/', 
    title: 'Games', 
    desc: 'Configure the games you play', 
    IconImage: IconDice5,
  }
]

export function Dashboard({children}: DashboardType) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 75 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header px="sm" py="sm" className={styles.header}>
        <Image
          className={styles.logo}
          width="250"
          height="50"
          src={logo}
          alt="Beautiful turtle logo"
        />
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
      </AppShell.Header>

      <AppShell.Navbar p="md">
        {navLinks.map(({href, title, desc, IconImage}) => (
          <NavLink
            key={href}
            href={href}
            label={title}
            description={desc}
            leftSection={<IconImage size="1rem" stroke={1.5} />}
          />
        ))}
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
