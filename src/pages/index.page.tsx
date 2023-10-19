import { Suspense } from "react";
import Layout from "src/core/layouts/Layout";
import { BlitzPage } from "@blitzjs/next";
import { Horizontal, Vertical } from "mantine-layout-components";
import { AuthenticationForm } from "@/core/components/MainAuthenticationForm";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import { Button } from "@mantine/core";
import { useMutation } from "@blitzjs/rpc";
import adminOnlyMutation from "@/features/auth/mutations/adminOnlyMutation";

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const Home: BlitzPage = () => {
  const { user } = useCurrentUser();
  const [$adminOnlyMutation] = useMutation(adminOnlyMutation);

  return (
    <Layout title="Home">
      {!user && (
        <Vertical fullW fullH center>
          <AuthenticationForm />{" "}
        </Vertical>
      )}
      {user && (
        <Vertical>
          <Button onClick={() => $adminOnlyMutation({})}>Admin only button</Button>
        </Vertical>
      )}
    </Layout>
  );
};

export default Home;
