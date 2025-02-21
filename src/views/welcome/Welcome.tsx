import { Flex, Stack, Text, Title } from "@mantine/core";

export function Welcome() {
  return (
    <Flex
      direction={{ base: 'column', sm: 'row' }}
      gap="lg"
    >
      <Stack align="center">
        <Title order={1}>Seriously for fun</Title>
        <Text>Play board games, keep track of sessions, and find out &quot;Who Slow?!&quot;</Text>
      </Stack>
    </Flex>
  )
}