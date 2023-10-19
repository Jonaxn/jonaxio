import React, { Suspense, useState } from "react";
import { useMutation, useQuery } from "@blitzjs/rpc";
import fetchTodos from "@/features/todos/queries/fetchTodos";
import { Button, Checkbox, Input, List, Loader, Text } from "@mantine/core";
import Layout from "@/core/layouts/Layout";
import addTodo from "@/features/todos/mutations/addTodo";
import { notifications } from "@mantine/notifications";
import { Horizontal, Vertical } from "mantine-layout-components";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import toggleTodos from "@/features/todos/mutations/toggleTodos";
import cleanCompleted from "@/features/todos/mutations/cleanCompleted";
import { PromiseReturnType } from "blitz";
import { ReactFC } from "~/types";

type Todos = PromiseReturnType<typeof fetchTodos>;

type TodoType = Todos[0];

const Todo: ReactFC<{ todo: TodoType }> = ({ todo }) => {
  const [$toggleTodos, { isLoading }] = useMutation(toggleTodos);
  return (
    <Horizontal>
      <Checkbox
        disabled={isLoading}
        checked={todo.done}
        onClick={async () => {
          await $toggleTodos({ id: todo.id });
        }}
      />
      <Text>{todo.title}</Text>
    </Horizontal>
  );
};

const Todos = () => {
  const user = useCurrentUser();
  const [todos] = useQuery(fetchTodos, { search: "", userId: "" });

  const [todoTitle, setTodoTitle] = useState("");

  const [$addTodos, { isLoading }] = useMutation(addTodo, {});
  const [$cleanCompleted] = useMutation(cleanCompleted, {});
  console.log("todos", todos);

  return (
    <Vertical>
      {user && <Text>hello {user.name}, here are your todos</Text>}
      <Input
        value={todoTitle}
        onChange={(e) => {
          setTodoTitle(e.currentTarget.value);
        }}
        placeholder="Enter a todo"
      />
      <Button
        loading={isLoading}
        onClick={() => {
          const result = $addTodos({
            todoTitle: todoTitle,
          });
        }}
      >
        {" "}
        create a todo
      </Button>
      <Button onClick={async () => $cleanCompleted({})}> clean Completed</Button>

      {/*{isLoading && <Loader />}*/}
      {/*{!isLoading && todos && (*/}
      <List>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </List>
      {/*)}*/}
    </Vertical>
  );
};

const TodosPage = () => {
  return (
    <Layout>
      {/*<Suspense fallback={<Loader />}>*/}
      <Todos />
      {/*</Suspense>*/}
    </Layout>
  );
};

export default TodosPage;
