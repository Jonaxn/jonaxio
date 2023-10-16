import React, { Suspense, useState } from "react";
import { useMutation, useQuery } from "@blitzjs/rpc";
import fetchTodos from "@/features/todos/queries/fetchTodos";
import { Button, Input, List, Loader, Text } from "@mantine/core";
import Layout from "@/core/layouts/Layout";
import addTodo from "@/features/todos/mutations/addTodo";
import { notifications } from "@mantine/notifications";
import { Vertical } from "mantine-layout-components";

const Todos = () => {
  const [todos, { isLoading }] = useQuery(fetchTodos, { search: "", userId: "1" });

  const [todoTitle, setTodoTitle] = useState("");

  const [$addTodos] = useMutation(addTodo, {
    onSuccess: (result) => {
      notifications.show({
        title: "Muation successfull",
        message: `Created a todo with title ${result.title}`,
      });
    },
  });
  console.log("todos", todos);

  return (
    <Vertical>
      <Input
        value={todoTitle}
        onChange={(e) => {
          setTodoTitle(e.currentTarget.value);
        }}
        placeholder="Enter a todo"
      />
      <Button
        onClick={() => {
          const result = $addTodos({
            todoTitle: todoTitle,
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
