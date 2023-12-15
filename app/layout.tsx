import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GlobalContextProvider } from '@/context/GlobalContextProvider';
import ClientToastContainer from '@/components/client/ClientToastContainer';

const inter = Inter({ subsets: ['latin'] })

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
        <body className={inter.className}>{children}</body>
        <ClientToastContainer/>
      </GlobalContextProvider>
    </html>
  )
}
