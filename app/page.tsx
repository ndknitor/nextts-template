import Link from 'next/link';
import { ValidationTesting } from './client';
import { apiGet } from '@/utils/FetchApi';

export default async function Home() {
  const response = await apiGet<{ date: string }>("api/main/date", { next: { revalidate: 0 } });  
  return (
    <main>
      {
        <h1>{response.ok && new Date(response.data.date).toLocaleString()}</h1>
      }
      <h1>{process.env.NEXT_PUBLIC_API_BASE_URL}</h1>
      <Link href={"/seats?page=1&size=2"}>seats</Link>
      <ValidationTesting />
    </main>
  )
}
