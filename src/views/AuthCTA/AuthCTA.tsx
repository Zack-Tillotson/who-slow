'use client'

import { useEffect, useState } from "react";
import firebase from "@/state/firebase";
import { signInAnonymously } from "firebase/auth";
import { Button, Stack, Title } from "@mantine/core";

export function AuthCTA() {
  const [_, forceUpdate] = useState(null)
  useEffect(() => {
    (async () => {
      const auth = firebase().getAuth()
      await auth.authStateReady()
      forceUpdate(null)
    })()
  }, [])

  const handleClick = (type: string) => () => {
    switch(type) {
      case 'anonymous': {
        (async () => {
          const auth = firebase().getAuth()
          await auth.authStateReady()
          const result = await signInAnonymously(auth)
          forceUpdate(null)
        })
      }
      return
      default: {
        console.log('ERR', 'Unable to login, type not found', type)
      }
    }
  }
  return (
    <Stack>
      <Title order={2} size="md" mt="lg">Account selection</Title>
      <section>
        <Title order={3}>Select an account to continue</Title>
        <Button onClick={handleClick('anonymous')}>Anonymous</Button>
      </section>
    </Stack>
  )
}