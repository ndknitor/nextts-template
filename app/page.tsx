import Link from 'next/link';
import { ValidationTesting } from './client';

export default function Home() {
  return (
    <main>
      <Link href={"/seats?page=1&size=2"}>seats</Link>
      <ValidationTesting />
    </main>
  )
}
