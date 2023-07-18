import AuthorizeContextProvider from '@/context/AuthorizeContextProvider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import { GlobalContextProvider } from '@/context/GlobalContextProvider'
import { AxiosInterceptor } from '@/components/AxiosInterceptor'
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
        <AuthorizeContextProvider>
          <GlobalContextProvider>
            <AxiosInterceptor>
              {children}
            </AxiosInterceptor>
          </GlobalContextProvider>
        </AuthorizeContextProvider>
        <ToastContainer limit={3} />
      </body>
    </html>
  )
}
