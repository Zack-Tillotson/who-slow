'use client'

import Image from 'next/image';
import { Anchor, AppShell, Box, Breadcrumbs, Burger, Divider, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {IconMapCog, IconUsers, IconDice5, IconHome} from '@tabler/icons-react'

import logo from '@/assets/headline-250x50.png'
import styles from './shell.module.scss'
import { useEffect, useState } from 'react';
import { useDataState } from '@/state';
import { BreadcrumbNav } from '../breadcrumbNav';

type ShellType = Readonly<{
  children: React.ReactNode;
}>

const navLinks = [{
    href: '/app/', 
    title: 'Home', 
    desc: 'Welcome to Who Slow', 
    IconImage: IconHome,
  }, {
    href: '/app/campaign/', 
    title: 'Campaigns', 
    desc: 'View and manage campaigns', 
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

export function Shell({children}: ShellType) {
  const [opened, { toggle }] = useDisclosure();
  const [renderCount, forceRerender] = useState(0)
  useEffect(() => {
    const result = useDataState.persist.rehydrate()
    if(!result) {
      forceRerender(renderCount+1)
    } else {
      result.then(() => forceRerender(renderCount+1))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        <BreadcrumbNav />
        {useDataState.persist.hasHydrated() && children}
        {!useDataState.persist.hasHydrated() && 'Loading...'}
      </AppShell.Main>
    </AppShell>
  );
}
