'use client'

import { useEffect, useState } from "react";
import firebase from "@/state/firebase";
import { signInAnonymously } from "firebase/auth";
import { Button, Stack, Title } from "@mantine/core";

export function AuthCTA() {
  const [renderCount, forceUpdate] = useState(0)
  const [isInteractive, updateIsInteractive] = useState(false)
  useEffect(() => {
    (async () => {
      const auth = firebase().getAuth()
      await auth.authStateReady()
      forceUpdate(renderCount + 1)
      updateIsInteractive(true)
    })()
  }, [])

  const handleClick = (type: string) => () => {
    updateIsInteractive(false)
    switch(type) {
      case 'anonymous': {
        (async () => {
          const auth = firebase().getAuth()
          await auth.authStateReady()
          const result = await signInAnonymously(auth)
          if(result) {
            console.log('Auth successful', result)
          }
          window.location.reload()
        })()
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
        <Button onClick={handleClick('anonymous')} disabled={!isInteractive}>Anonymous</Button>
      </section>
    </Stack>
  )
}