import { ViewState } from "../types";
import { Group, Text, Title } from "@mantine/core"

import styles from './footer.module.scss'
import {IS_STATIC} from '@/navLinks'

export function Footer({meta}: ViewState) {
  
  return (
    <Group className={styles.container} mt="xl">
      <Title order={2} size="xs">Stats for nerds:</Title>
      <Text size="xs" className={meta.isSSR ? styles.emphasized : ''}>SSR: {String(meta.isSSR)}</Text>
      <Text size="xs" className={meta.isCSR ? styles.emphasized : ''}>CSR: {String(meta.isCSR)}</Text>
      <Text size="xs" className={meta.isLoading ? styles.emphasized : ''}>Loading: {String(meta.isLoading)}</Text>
      <Text size="xs" className={meta.isDataReady ? styles.emphasized : ''}>Data ready: {String(meta.isDataReady)}</Text>
      <Text size="xs" className={meta.isError ? styles.emphasized : ''}>isError: {String(meta.isError)}</Text>
      <Text size="xs" className={IS_STATIC ? styles.emphasized : ''}>isStatic: {String(IS_STATIC)}</Text>
    </Group>
  );
}
