import { Flex, Stack, Text, Title } from "@mantine/core";
import Image from "next/image";

import image from '@/assets/turtle-400x400.png'

export function Welcome() {
  return (
    <Flex
      direction={{ base: 'column', sm: 'row' }}
      gap="lg"
    >
      <Image
        src={image}
        width="250"
        height="250"
        alt="Beautiful turtle"
        style={{margin: '0 auto'}}
        priority
      />
      <Stack align="center">
        <Title order={1}>Welcome to Who Slow</Title>
        <Text>Play board games, keep track of sessions, and find out &quot;Who Slow?!&quot;</Text>
      </Stack>
    </Flex>
  )
}