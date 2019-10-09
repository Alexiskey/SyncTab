import useAxios from "axios-hooks";
import { NextPage } from "next";
import { FC, useContext } from "react";
import { Label, List } from "semantic-ui-react";

import { AuthContext } from "../src/client/components/Auth/Context";
import { User } from "../src/interfaces";

const UsersList: FC = () => {
  const [{ data, loading, error }] = useAxios<User[]>("/api/users");

  if (loading) {
    return <p>Loading Users...</p>;
  }
  if (error) {
    console.error(error);
    return <p>Error! {error.message}</p>;
  }

  return (
    <div>
      <List ordered animated divided>
        {data.map(({ email, password }, key) => (
          <List.Item key={key}>
            <List bulleted>
              <List.Item>Email: {email}</List.Item>
              <List.Item>Password: {password}</List.Item>
            </List>
          </List.Item>
        ))}
      </List>
    </div>
  );
};

const Index: NextPage = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Label>Loading...</Label>;
  }
  if (user) {
    return <UsersList />;
  }
  return <Label>You need to be authenticated!</Label>;
};

export default Index;
