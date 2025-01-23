'use client'

import { AppShell,Burger } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Image from 'next/image'
import Link from 'next/link'

import { NavLinks } from '../navLinks'

import logo from '@/assets/headline-250x50.png'
import styles from './shell.module.scss'
import useClientConfig from '@/state/firebase/useClientConfig';

type ShellType = Readonly<{
  children: React.ReactNode;
}>

export function Shell({children}: ShellType) {
  const [opened, { toggle }] = useDisclosure();
  useClientConfig()

  return (
    <AppShell
      className={styles.container}
      header={{ height: 75 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header px="sm" py="sm" className={styles.header}>
        <Link href="/">
          <Image
            className={styles.logo}
            width="250"
            height="50"
            src={logo}
            alt="Beautiful turtle logo"
            priority
          />
        </Link>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
          aria-label="Menu"
        />
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLinks withHome />
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
