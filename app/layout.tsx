import type { Metadata } from 'next'
import './globals.css'
import { GlobalContextProvider } from '@/context/GlobalContextProvider'
import ClientToastContainer from '@/components/client/ClientToastContainer'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <GlobalContextProvider>
        <body>{children}</body>
      </GlobalContextProvider>
      <ClientToastContainer />
    </html>
  )
}
