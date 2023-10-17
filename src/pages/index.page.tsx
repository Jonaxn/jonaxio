import { Suspense } from "react";
import Layout from "src/core/layouts/Layout";
import { BlitzPage } from "@blitzjs/next";
import { UserInfo } from "@/core/components/userInfo";
import { Horizontal, Vertical } from "mantine-layout-components";
import { AuthenticationForm } from "@/core/components/MainAuthenticationForm";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const Home: BlitzPage = () => {
  const currentUser = useCurrentUser();

  return (
    <Layout title="Home">
      {!currentUser && (
        <Vertical fullW fullH center>
          <AuthenticationForm />{" "}
        </Vertical>
      )}
    </Layout>
  );
};

export default Home;
