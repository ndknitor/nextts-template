import AuthorizeContextProvider from '@/context/AuthorizeContextProvider'
import './globals.css'
import type { Metadata } from 'next'
import { ToastContainer } from 'react-toastify'
import { GlobalContextProvider } from '@/context/GlobalContextProvider'
import { AxiosInterceptor } from '@/components/AxiosInterceptor'
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'

export const metadata: Metadata = {
  title: "NDKN's Template",
  description: 'Made by kn',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >
        <AuthorizeContextProvider>
          <GlobalContextProvider>
            <AxiosInterceptor>
              <Link href="/">Index</Link>
              <Link href="/public/about">About</Link>
              {children}
            </AxiosInterceptor>
          </GlobalContextProvider>
        </AuthorizeContextProvider>
        <ToastContainer limit={3} />
      </body>
    </html>
  )
}
