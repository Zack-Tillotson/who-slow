import Link from 'next/link';
import { 
  Text,
  Button,
  Stack,
  Container,
  Flex,
} from '@mantine/core';
import Image from 'next/image'

import styles from "./page.module.scss";
import hero from '@/assets/logo-400x400.png'

export default function LandingPage() {
  return (
    <Flex
      className={styles.container}
      gap="sm"
      direction="column"
      wrap="nowrap"
      px="md"
      py="xl"
    >
      <div className={styles.hero}>
        <Image
          src={hero}
          className={styles.heroImage}
          width="400"
          height="400"
          alt="Beautiful turtle with 'Who Slow' logo"
        />
      </div>
      <div className={styles.explanation}>
        <h1 className="subtitle">Board game stats and turn timer</h1>
        <p>Playing a board game campaign? Have a group with slow players? Use this fun app to keep track of stats and definitively answer - Who Slow?</p>
      </div>
      <div className={styles.controls}>
        <Button
          component={Link}
          href="/app/"
        >
          Get started
        </Button>
      </div>
    </Flex>
  );
}
