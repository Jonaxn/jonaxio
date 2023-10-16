import React, { Suspense } from "react";
import { useQuery } from "@blitzjs/rpc";
import fetchTodos from "@/features/todos/queries/fetchTodos";
import { List, Loader, Text } from "@mantine/core";
import Layout from "@/core/layouts/Layout";

const Todos = () => {
  const [todos, { isLoading }] = useQuery(fetchTodos, { search: "", userId: "1" });
  console.log("todos", todos);
  return (
    <>
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
    </>
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
