'use client';
import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  Anchor, Button, Checkbox, Container, Group, Paper,
  PasswordInput, Text, TextInput, Title,
} from '@mantine/core';
import classes from './AuthenticationTitle.module.css';

export default function AuthenticationTitle() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    const res = await fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password})
    })
    console.log(res)
    if (!res.ok) {
      setError('Invalid email or password');
      return;
    }
    
    const data = await res.json();
    localStorage.setItem('access', data.access);
    router.push('/dashboard');
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>

      <Text className={classes.subtitle}>
        Do not have an account yet? <Anchor component={Link} href='/register'>Create account</Anchor>
      </Text>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email" placeholder="you@mantine.dev" required radius="md"
            value={email} onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <PasswordInput
            label="Password" placeholder="Your password" required mt="md" radius="md"
            value={password} onChange={(e) => setPassword(e.currentTarget.value)}
          />
          {error && <Text c="red" size="sm" mt="sm">{error}</Text>}
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" type="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button type="submit" fullWidth mt="xl" radius="md">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}