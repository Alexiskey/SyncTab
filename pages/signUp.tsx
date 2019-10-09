import { NextPage } from "next";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import { Button, Form, Input, Label, Message } from "semantic-ui-react";
import { isEmail, isLength } from "validator";

import { AuthContext } from "../src/client/components/Auth/Context";

const SignUpPage: NextPage = () => {
  const { signUp, error, user, loading } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      Router.push("/");
    }
  }, [user]);
  const valid = isEmail(email) && isLength(password, { min: 3, max: 100 });

  if (loading || user) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {error && (
        <div>
          <Message error>{error}</Message>
        </div>
      )}
      <Form
        onSubmit={async e => {
          e.preventDefault();
          signUp({ email, password });
        }}
      >
        <Label>Email</Label>
        <Input
          name="email"
          type="email"
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
        />
        <Label>Password</Label>
        <Input
          name="password"
          type="password"
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
        />
        <Button primary disabled={!valid} type="submit">
          Sign Up
        </Button>
      </Form>
    </>
  );
};

export default SignUpPage;
