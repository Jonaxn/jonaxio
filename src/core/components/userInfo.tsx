import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import { useMutation } from "@blitzjs/rpc";
import logout from "@/features/auth/mutations/logout";
import Link from "next/link";
import { Routes } from "@blitzjs/next";
import { Anchor, Button, Text } from "@mantine/core";
import { Vertical } from "mantine-layout-components";

import { json } from "express";
import { log } from "blitz";

export const UserInfo = () => {
  const currentUser = useCurrentUser();
  const [logoutMutation] = useMutation(logout);
  if (!currentUser) {
    return null;
  }
  const fetchTodos = () => {
    fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };

  return (
    <>
      <Vertical>
        <Button onClick={fetchTodos}>Fetch todos</Button>
        <Text>
          User id: <code>{currentUser.id}</code>
        </Text>
        <Text>
          User role: <code>{currentUser.role}</code>
        </Text>
      </Vertical>
    </>
  );
};
