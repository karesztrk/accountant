import {
  Button,
  Container,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "lib/database.types";

interface FormValues {
  email: string;
  password: string;
}

const validate = {
  email: (value: string) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
  password: (value: string) =>
    value.length < 5 ? "Password must have at least 5 characters" : null,
};

const SignIn = () => {
  const router = useRouter();
  const form = useForm<FormValues>({
    initialValues: { email: "", password: "" },
    validate,
  });
  const supabaseClient = useSupabaseClient<Database>();

  const [loading, setLoading] = useState(false);

  const onSubmit = ({ email, password }: FormValues) => {
    setLoading(true);
    supabaseClient.auth
      .signInWithPassword({
        email,
        password,
      })
      .then(async ({ error }) => {
        if (error) {
          form.setErrors({ password: error.message });
        } else {
          await router.push("/");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <Container size={420} my={40}>
      <Title align="center">Welcome back</Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            required
            label="Email"
            placeholder="user@yourdomain.com"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            required
            label="Password"
            placeholder="Super secret password"
            mt="md"
            {...form.getInputProps("password")}
          />
          <Button fullWidth mt="xl" type="submit" loading={loading}>
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default SignIn;
