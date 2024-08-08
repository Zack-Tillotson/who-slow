import type { Metadata } from "next"
import { 
  ColorSchemeScript, 
  MantineProvider, 
} from '@mantine/core'
import {theme} from '@/theme/'

import { Inter } from "next/font/google"

import "./_styles/reset.scss"
import "./_styles/mantine.scss"
import "./_styles/globals.scss"
import '@mantine/core/styles.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Who Slow",
  description: "Board game campaign and session statistics - especially finding who the slowest players are!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <head>
          <ColorSchemeScript />
        </head>
        <body className={inter.className}>
          <MantineProvider theme={theme}>
            {children}
          </MantineProvider>    
        </body>
      </html>
  );
}
