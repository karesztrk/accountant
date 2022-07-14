import React, { ChangeEvent, MouseEvent, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";

const Auth = () => {
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
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
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
    // <div className="row flex flex-center">
    //   <div className="col-6 form-widget">
    //     <h1 className="header">Supabase + Next.js</h1>
    //     <p className="description">
    //       Sign in via magic link with your email below
    //     </p>
    //     <div>
    //       <input
    //         className="inputField"
    //         type="email"
    //         placeholder="Your email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //     </div>
    //     <div>
    //       <button
    //         onClick={(e) => {
    //           e.preventDefault();
    //           handleLogin(email);
    //         }}
    //         className="button block"
    //         disabled={loading}
    //       >
    //         <span>{loading ? "Loading" : "Send magic link"}</span>
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Auth;
