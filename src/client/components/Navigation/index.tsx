import Link from "next/link";
import { FC, useContext } from "react";
import { Button, Label } from "semantic-ui-react";

import { AuthContext } from "../Auth/Context";

const Navigation: FC = () => {
  const { user, logout, loading } = useContext(AuthContext);

  if (loading) {
    return null;
  }
  return (
    <nav>
      {user ? (
        <>
          <Label>Welcome {user.email}</Label>
          <Button color="red" onClick={() => logout()}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Link href="/login" passHref>
            <Button primary>Login</Button>
          </Link>
          <Link href="/signUp" passHref>
            <Button color="green">Sign Up</Button>
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navigation;
