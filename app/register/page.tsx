'use client';
import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  Anchor, Button, Checkbox, Container, Group, Paper,
  PasswordInput, Text, TextInput, Title, SimpleGrid
} from '@mantine/core';
import classes from './RegisterPage.module.css';
import { Select } from '@mantine/core';

const names = new Intl.DisplayNames(['en'], { type: 'currency' });
const currencyOptions = Intl.supportedValuesOf('currency').map((code) => ({
  value: code,
  label: `${code} — ${names.of(code)}`,
}));

export default function RegisterPage() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [currency, setCurrency] = useState('');
  const [budget, setBudget] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    const res = await fetch('http://localhost:8000/api/user/register/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify({ email, first_name, last_name, password, currency, budget})
    })
    console.log(res)
    if (!res.ok) {
      setError('Invalid registration details');
      return;
    }
    
    const data = await res.json();
    localStorage.setItem('access', data.access);
    router.push('/');
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>

      <Text className={classes.subtitle}>
        Already have an account? <Anchor component={Link} href='/login'>Login</Anchor>
      </Text>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            <TextInput label="First Name" placeholder="John" required radius="md"
              value={first_name} onChange={(e) => setFirstName(e.currentTarget.value)} />
            <TextInput label="Last Name" placeholder="Doe" required radius="md"
              value={last_name} onChange={(e) => setLastName(e.currentTarget.value)} />
          </SimpleGrid>

          <TextInput label="Email" placeholder="you@mantine.dev" required radius="md" mt="md"
            value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
          <PasswordInput label="Password" placeholder="Your password" required radius="md" mt="md"
            value={password} onChange={(e) => setPassword(e.currentTarget.value)} />

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mt="md">
            <Select
              label="Currency" placeholder="Select currency" required radius="md" searchable
              data={currencyOptions} value={currency} onChange={(v) => setCurrency(v ?? '')}
            />
            <TextInput label="Budget" placeholder="100" required radius="md"
              value={budget} onChange={(e) => setBudget(e.currentTarget.value)} />
          </SimpleGrid>
          {error && <Text c="red" size="sm" mt="sm">{error}</Text>}
          <Button type="submit" fullWidth mt="xl" radius="md">
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
}