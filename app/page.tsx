import NextPageProps from '@/utils/NextPageProps'
import { ValidationTesting } from './client'
export default function Home(props: NextPageProps<{}, {}>) {
  return (
    <main>
      <ValidationTesting />
    </main>
  )
}
