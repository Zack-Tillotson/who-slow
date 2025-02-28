'use client'

import React from 'react'
import { Button, Divider, Group, Notification, Text, TextInput, Title } from '@mantine/core'

import { useShareSession } from './useShareSession'

import './shareForm.module.scss'
import { Session } from '@/state/types'
import { IconCheck } from '@tabler/icons-react'

interface ShareFormProps {
  sessionId: Session["id"],
  onClose: () => void,
}

export function ShareForm({sessionId, onClose}: ShareFormProps) {
  const {
    shareCode,
    isNotificationVisible,
    handleCodeClick,
    handleShareClick,
    handleNotificationClose,
  } = useShareSession(sessionId)

  return (
    <form className="share-form">
      <Title order={1}>Share session</Title>
      <Divider mt="sm" mb="sm" />
      <Text>Use this form to share the game session. Anyone with the code 
        will be able to see, add, or remove events just like you (so be
        careful who you share with!).
      </Text>
      <Text mt="xs">
        Click the {`"Share"`} button below to create a share code for this session,
        send it to others or have them navigate to the URL.
      </Text>
      <Divider mt="sm" mb="sm" />
      <Title order={2} size="sm">Share link</Title>
      <TextInput
        value={shareCode}
        readOnly
        flex="1"
        onClick={handleCodeClick}
        placeholder={`Create a share code with the "Share" button`}
      />
      <Group mt="sm">
        <Button formAction={handleShareClick} type="submit">Share</Button>
        <Button variant='outline' onClick={onClose}>Close</Button>
      </Group>
      {isNotificationVisible && (
        <Notification
          title="Link copied to clipboard"
          onClose={handleNotificationClose}
          color="green"
          icon={<IconCheck />}
          mt="lg"
        >
          Share the link to allow others to view the session.
        </Notification>
      )}
    </form>
  );
}