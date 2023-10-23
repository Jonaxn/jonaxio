import React from "react";
import { Routes } from "@blitzjs/next";
import { showNotification } from "@mantine/notifications";
import { Vertical } from "mantine-layout-components";
import { Button, TextInput } from "@mantine/core";
import { Form, UseFormReturnType } from "@mantine/form";
import { router } from "next/client";
import { ReactFC } from "~/types";
import { UpdateProfileInputType } from "@/features/users/schemas";

const EditProfileForm: ReactFC<{
  form: UseFormReturnType<UpdateProfileInputType>;
  onSubmit: (values: UpdateProfileInputType) => Promise<void>;
  isSubmitting: boolean;
}> = ({ onSubmit, form, isSubmitting }) => {
  // @ts-ignore
  return (
    <Form form={form} onSubmit={onSubmit}>
      <Vertical fullW>
        <TextInput
          w="100%"
          required
          label="Name"
          placeholder="name"
          {...form.getInputProps("name")}
          radius="md"
        />
        <TextInput
          w="100%"
          required
          label="Username"
          placeholder="Username"
          {...form.getInputProps("username")}
          radius="md"
        />
        <TextInput
          w="100%"
          required
          label="Bio"
          placeholder="Bio"
          {...form.getInputProps("bio")}
          radius="md"
        />
        <Button disabled={!form.isValid()} loading={isSubmitting} type="submit">
          Submit
        </Button>
      </Vertical>
    </Form>
  );
};

export default EditProfileForm;
