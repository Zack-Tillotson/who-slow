'use client'

import Image from 'next/image';
import {Title} from '@mantine/core'
import logo from '@/assets/logo-800x800.png'

export function NiceError() {
  
  return (
    <Title order={1}>Oops, something went wrong</Title>
  );
}
