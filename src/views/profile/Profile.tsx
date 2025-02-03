import { Stack, Text, Title } from "@mantine/core";
import { Auth } from "firebase/auth";

type PageProps = {
  auth?: Auth,
}

export function Profile({auth}: PageProps) {
  const user = auth?.currentUser
  return (
    <Stack>
      <Title order={2} size="md" mt="lg">Profile</Title>
      <Text>Profile ID: {user?.uid ?? ''}</Text>
      <Text>Anonymous?: {!user ? '' : user.isAnonymous ? 'yes' : 'no'}</Text>
    </Stack>
  )
}