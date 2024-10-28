import type { Metadata } from 'next'
import './globals.css'
import ClientToastContainer from '@/components/client/ClientToastContainer'
import { DialogContainer } from '@/components/client/DialogContainer'

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
      <body>
        {children}
        <ClientToastContainer />
        <DialogContainer />
      </body>
    </html>
  )
}
