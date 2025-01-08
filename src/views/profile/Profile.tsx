'use client'

import { Stack, Text, Title } from "@mantine/core";
import { Auth } from "firebase/auth";

type PageProps = {
  auth: Auth,
}

export function Profile({auth}: PageProps) {
  return (
    <Stack>
      <Title order={2} size="md" mt="lg">Profile</Title>
      <Text>Profile ID: {auth.currentUser?.uid ?? 'No user found'}</Text>
      <Text>Anonymous?: {auth.currentUser?.isAnonymous ?? ''}</Text>
    </Stack>
  )
}