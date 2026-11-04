'use client';
import { useRouter } from 'next/navigation';
import {
  Button
} from '@mantine/core';

export default function HomePage() {
  const router = useRouter();

  async function handleLogout() {
    const refresh = localStorage.getItem('refresh');

    await fetch('http://localhost:8000/api/logout/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    });

    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    router.push('/login');
  }

  return (
    <>
      <Button onClick={handleLogout} type="submit" fullWidth mt="xl" radius="md">
        logout
      </Button>
    </>
  );
}
