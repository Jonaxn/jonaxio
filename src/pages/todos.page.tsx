import React, { Suspense } from "react";
import { useMutation, useQuery } from "@blitzjs/rpc";
import fetchTodos from "@/features/todos/queries/fetchTodos";
import { Button, List, Loader, Text } from "@mantine/core";
import Layout from "@/core/layouts/Layout";
import addTodo from "@/features/todos/mutations/addTodo";
import { notifications } from "@mantine/notifications";
import { Vertical } from "mantine-layout-components";

const Todos = () => {
  const [todos, { isLoading }] = useQuery(fetchTodos, { search: "", userId: "1" });
  const [$addTodos] = useMutation(addTodo, {
    onSuccess: (result) => {
      notifications.show({
        title: "Muation successfull",
        message: result,
      });
    },
  });
  console.log("todos", todos);

  return (
    <Vertical>
      <Button
        onClick={() => {
          const result = $addTodos({
            todoTitle: "buy a turtle",
          });
        }}
      >
        {" "}
        create a todo
      </Button>
      {isLoading && <Loader />}
      {!isLoading && todos && (
        <List>
          {todos.map((todo) => (
            <List.Item key={todo.id}>
              <Text>{todo.title}</Text>
            </List.Item>
          ))}
        </List>
      )}
    </Vertical>
  );
};

const TodosPage = () => {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Todos />
      </Suspense>
    </Layout>
  );
};

export default TodosPage;
