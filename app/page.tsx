import Link from 'next/link';
import { ValidationTesting } from './client';
import fetcker from '@/utils/fetcker';

export default async function Home() {
  // const response = await fetcker.get<{ date: string }>("api/main/date", { next: { revalidate: 0 } });  
  return (
    <main>
      {/* {
        <h1>{response.ok && new Date(response.data.date).toLocaleString()}</h1>
      } */}
      <Link href={"/seats?page=1&size=2"}>seats</Link>
      <ValidationTesting />
    </main>
  )
}
