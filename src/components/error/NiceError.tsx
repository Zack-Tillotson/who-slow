import {Stack, Title} from '@mantine/core'

import styles from './niceError.module.scss'

export function NiceError() {
  
  return (
    <Stack>
      <Title order={1}>Oops, something went wrong</Title>
      <img
        src={'/falling.jpg'}
        alt="Man slipping on a banana"
        width={612}
        height={406}
        className={styles.image}
      />
    </Stack>
  );
}
