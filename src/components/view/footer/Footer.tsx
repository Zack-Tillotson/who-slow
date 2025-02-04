import { ViewState } from "../types";
import { Group, Text } from "@mantine/core"

import styles from './footer.module.scss'

export function Footer({meta}: ViewState) {
  
  return (
    <Group className={styles.container} mt="xl">
      <Text size="xs">SSR: {String(meta.isSSR)}</Text>
      <Text size="xs">CSR: {String(meta.isCSR)}</Text>
      <Text size="xs">Loading: {String(meta.isLoading)}</Text>
      <Text size="xs">Data ready: {String(meta.isDataReady)}</Text>
      <Text size="xs">isError: {String(meta.isError)}</Text>
    </Group>
  );
}
