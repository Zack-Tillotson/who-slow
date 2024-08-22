'use client'

import Image from 'next/image';
import { AppShell,Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import logo from '@/assets/headline-250x50.png'
import styles from './shell.module.scss'
import { useEffect, useState } from 'react';
import { useDataState } from '@/state';
import { BreadcrumbNav } from '../breadcrumbNav';
import { NavLinks } from '../navLinks';
import Link from 'next/link';

type ShellType = Readonly<{
  children: React.ReactNode;
}>

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

  const isHydrated = !!(useDataState?.persist?.hasHydrated())

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
        />
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLinks withHome />
      </AppShell.Navbar>

      <AppShell.Main>
        {isHydrated && children}
        {!isHydrated && 'Loading...'}
      </AppShell.Main>
    </AppShell>
  );
}
