import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import { useMutation, useQuery } from "@blitzjs/rpc";
import logout from "@/features/auth/mutations/logout";
import Link from "next/link";
import { Routes } from "@blitzjs/next";
import { Anchor, Button, List, Loader, Text } from "@mantine/core";
import { Vertical } from "mantine-layout-components";

import { json } from "express";
import { log } from "blitz";
import fetchTodos from "@/features/todos/queries/fetchTodos";
import fetchTodo from "@/features/todos/queries/fetchTodo";
import { Suspense } from "react";

export const UserInfo = () => {
  const currentUser = useCurrentUser();
  const [logoutMutation] = useMutation(logout);

  const [todo] = useQuery(fetchTodo, {});
  if (!currentUser) {
    return null;
  }
  return (
    <>
      <Vertical>
        {/*<Button onClick={fetchTodos}>Fetch todos</Button>*/}
        <Text>{todo.title}</Text>

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
