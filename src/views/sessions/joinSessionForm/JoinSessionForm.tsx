'use client'

import React from 'react'
import { Button, Divider, Group, Text, TextInput, Title } from '@mantine/core'

import { useJoinSession } from './useJoinSession'

import './joinSessionForm.module.scss'

type ComponentPropTypes = {
  isInvalidCode?: boolean,
  paramCode?: string,
}

export function JoinSessionForm({isInvalidCode = false, paramCode}: ComponentPropTypes) {
  const {
    shareCode,
    handleCodeChange,
    handleJoin,
  } = useJoinSession(paramCode)

  return (
    <form className="share-form">
      <Title order={1}>Join session</Title>
      <Divider mt="sm" mb="sm" />
      <Text>
        Join a session by entering the share code the session owner received here.
      </Text>
      <Divider mt="sm" mb="sm" />
      <Title order={2} size="sm">Share code</Title>
      <TextInput
        flex="1"
        placeholder={`Six (6) character share code`}
        value={shareCode}
        error={(isInvalidCode && paramCode === shareCode) ? 'Code not found' : ''}
        onChange={handleCodeChange}
      />
      <Group mt="sm">
        <Button
          formAction={handleJoin}
          variant={shareCode.length === 6 ? 'filled' : 'outline'}
          type="submit"
        >
          Join session
        </Button>
      </Group>
    </form>
  );
}