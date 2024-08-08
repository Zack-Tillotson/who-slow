import styles from "./page.module.scss";

import Link from 'next/link';
import { Button, Stack } from '@mantine/core';

export default function Home() {
  return (
    <main className={styles.main}>
      <Stack>
        <h1>Who Slow v2</h1>
        <h2>About</h2>
        <p>Playing board games? Find out who the slow players are with Who Slow - an app for tracking player turn lengths.</p>
        <Button component={Link} href="/app/" variant="filled">App</Button>
      </Stack>
    </main>
  );
}
