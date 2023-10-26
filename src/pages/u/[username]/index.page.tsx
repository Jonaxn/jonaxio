import React from "react";
import { Vertical } from "mantine-layout-components";
import { useStringParam } from "@/utils/utils";
import { BlitzPage, Routes } from "@blitzjs/next";
import Layout from "@/core/layouts/Layout";
import { Alert, Box, Button, Group, Modal, Text, TextInput } from "@mantine/core";
import { useMutation, useQuery } from "@blitzjs/rpc";
import getUserForProfile from "@/features/users/queries/getUserForProfile";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import { useDisclosure } from "@mantine/hooks";
import { Form, useForm, zodResolver } from "@mantine/form";
import updateProfile from "@/features/users/mutations/updateProfile";
import { UpdateProfileInput, UpdateProfileInputType } from "@/features/users/schemas";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import EditProfileForm from "@/features/users/forms/EditProfileForm";
import { IconAlertCircle } from "@tabler/icons-react";

const ProfilePage: BlitzPage = () => {
  const username = useStringParam("username");
  const [opened, { open, close }] = useDisclosure(false);
  const [user] = useQuery(getUserForProfile, { username: username || "" }, { enabled: !!username });

  const form = useForm<UpdateProfileInputType>({
    initialValues: {
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
    },
    validate: zodResolver(UpdateProfileInput),
    validateInputOnBlur: true,
  });
  const router = useRouter();
  const [$updateProfile, { isLoading }] = useMutation(updateProfile);

  const currentUser = useCurrentUser();
  const isOwner = currentUser?.id === user?.id;
  if (!user) {
    return <Text>User not found</Text>;
  }
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          close();
          form.reset();
        }}
        title="Edit Profile"
      >
        <EditProfileForm
          form={form}
          onSubmit={async (values) => {
            console.log("the values of form", values);
            await $updateProfile(values);
            const { username } = values;
            if (username !== user?.username) {
              if (username) {
                router.push(Routes.ProfilePage({ username }));
              }
            }
            showNotification({
              message: "Profile updated",
              title: "Success",
              color: "green",
            });
          }}
          isSubmitting={isLoading}
        />
      </Modal>

      <Layout>
        <Vertical>
          {isOwner && !currentUser?.emailVerifiedAt && (
            <Alert
              variant="outline"
              icon={<IconAlertCircle size="1rem" />}
              color="red"
              title="Email not verified"
            >
              <Vertical>
                <Text size="sm">
                  you need to verify your email before you can edit your profile
                </Text>
                <Button size="xs" color="red" variant="light">
                  Resend verification email
                </Button>
              </Vertical>
            </Alert>
          )}
          {isOwner && <Button onClick={open}>Edit Profile</Button>}
          <Text>hello {user.name}</Text>
          <Text>{user.bio}</Text>
        </Vertical>
      </Layout>
    </>
  );
};

export default ProfilePage;
