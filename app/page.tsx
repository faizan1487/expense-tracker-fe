'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Button
} from '@mantine/core';

export default function HomePage() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  // Hide logout button when logged in
  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('access'));
  }, []);

  // Remove token from localstorage and hit logout api
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
      {loggedIn && <Button onClick={handleLogout} type="submit" fullWidth mt="xl" radius="md">
        logout
      </Button>}
    </>
  );
}
