import {
  Button,
  Container,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { ChangeEvent, MouseEvent, useState } from "react";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onLogin = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabaseClient.auth.signIn({
        email,
        password,
      });
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title align="center">Welcome back!</Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          required
          value={email}
          onChange={onEmailChange}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          value={password}
          onChange={onPasswordChange}
        />
        <Button fullWidth mt="xl" onClick={onLogin}>
          Sign in
        </Button>
      </Paper>
    </Container>
  );
};

export default SignIn;
