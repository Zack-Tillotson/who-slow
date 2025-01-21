import type { Metadata } from "next"
import { 
  ColorSchemeScript, 
  MantineProvider, 
} from '@mantine/core'
import { Inter } from "next/font/google"
import { ErrorBoundary } from "react-error-boundary"
import {theme} from '@/theme/'
import { Shell } from "@/components/shell"
import {NiceError} from '@/components/error'

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
        <body className={inter.className}>
          <MantineProvider theme={theme}>
            <Shell>
              <ErrorBoundary fallback={<NiceError />}>
                {children}
              </ErrorBoundary>
            </Shell>
          </MantineProvider>    
        </body>
      </html>
  );
}
