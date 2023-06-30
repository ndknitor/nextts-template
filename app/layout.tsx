import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from 'next/font/google'
import './globals.css';
import { GlobalContextProvider } from '@/context/GlobalContextProvider';
import AuthorizeContextProvider from '@/context/AuthorizeContextProvider';
import { AxiosInterceptor } from '@/components/AxiosInterceptor';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
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
      <body className={inter.className}>
        <AuthorizeContextProvider>
          <GlobalContextProvider>
            <AxiosInterceptor>
              {children}
            </AxiosInterceptor>
          </GlobalContextProvider>
        </AuthorizeContextProvider>
        <ToastContainer />
      </body>
    </html>
  )
}
