'use client'

import { useClientAuth } from "@/state/auth/useClientAuth";
import { Stack, Text, Title } from "@mantine/core";

export function Profile() {
  const {user} = useClientAuth()
  return (
    <Stack>
      <Title order={2} size="md" mt="lg">Profile</Title>
      <Text>Profile ID: {user?.uid ?? ''}</Text>
      <Text>Anonymous?: {!user ? '' : user.isAnonymous ? 'yes' : 'no'}</Text>
    </Stack>
  )
}