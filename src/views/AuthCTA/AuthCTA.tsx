'use client'

import firebase from "@/state/firebase";
import { signInAnonymously } from "firebase/auth";
import { Button, Stack, Title } from "@mantine/core";
import { useEffect } from "react";

export function AuthCTA() {
  useEffect(() => {
    (async () => {
      const auth = firebase().getAuth()
      console.log('auth', auth.currentUser)
      await auth.authStateReady()
      console.log('auth', auth.currentUser)  
    })()
  }, [])

  const handleClick = (type: string) => () => {
    switch(type) {
      case 'anonymous': {
        (async () => {
          const auth = firebase().getAuth()
          await auth.authStateReady()
          signInAnonymously(auth)
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