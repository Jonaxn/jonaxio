import React from "react";
import { Vertical } from "mantine-layout-components";
import { useStringParam } from "@/utils/utils";
import { BlitzPage } from "@blitzjs/next";
import Layout from "@/core/layouts/Layout";
import { Text } from "@mantine/core";

const ProfilePage: BlitzPage = () => {
  const username = useStringParam("username");
  return (
    <Layout>
      <Vertical>
        <Text>hello {username}</Text>
      </Vertical>
    </Layout>
  );
};

export default ProfilePage;
