'use client'

import auth from "@/state/auth";
import firebase from "@/state/firebase";
import { Button, Stack, Title } from "@mantine/core";
import { useEffect } from "react";

export function AuthCTA() {
  useEffect(() => {
    (async () => {
      const auth = firebase().getAuth()
      console.log('auth', auth.currentUser)
      await auth.authStateReady
      console.log('auth', auth.currentUser)  
    })()
  }, [])

  const handleClick = (type: string) => () => {
    switch(type) {
      case 'anonymous': {
        auth.loginAnonymous()
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