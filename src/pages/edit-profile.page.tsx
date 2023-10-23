import React from "react";
import { Vertical } from "mantine-layout-components";
import { useStringParam } from "@/utils/utils";
import { BlitzPage, Routes } from "@blitzjs/next";
import Layout from "@/core/layouts/Layout";
import { Button, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import EditProfileForm from "@/features/users/forms/EditProfileForm";
import { useForm, zodResolver } from "@mantine/form";
import { UpdateProfileInput, UpdateProfileInputType } from "@/features/users/schemas";
import { useMutation, useQuery } from "@blitzjs/rpc";
import updateProfile from "@/features/users/mutations/updateProfile";
import getUserForEditingProfile from "@/features/users/queries/getUserForEditingProfile";
import { useRouter } from "next/router";

const EditProfilePage: BlitzPage = () => {
  const [$updateProfile, { isLoading }] = useMutation(updateProfile);
  const [data] = useQuery(getUserForEditingProfile, {
    enabled: false,
  });
  const router = useRouter();
  const form = useForm<UpdateProfileInputType>({
    initialValues: {
      name: data?.name || "",
      username: data?.username || "",
      bio: data?.bio || "",
    },
    validate: zodResolver(UpdateProfileInput),
    validateInputOnBlur: true,
  });
  return (
    <Layout>
      <Vertical>
        <EditProfileForm
          form={form}
          onSubmit={async (values) => {
            console.log("the values of form", values);
            await $updateProfile(values);
            const { username } = values;
            if (username) {
              router.push(Routes.ProfilePage({ username }));
              showNotification({
                message: "Profile updated",
                title: "Success",
                color: "green",
              });
            }
          }}
          isSubmitting={isLoading}
        />
      </Vertical>
    </Layout>
  );
};

export default EditProfilePage;
