import Head from "next/head";
import React, { FC, Suspense } from "react";
import { BlitzLayout, Routes } from "@blitzjs/next";
import { Anchor, AppShell, Footer, Header, Navbar, Text } from "@mantine/core";
import { Horizontal, Vertical } from "mantine-layout-components";
import { styles } from "ansi-colors";
import Link from "next/link";

type Prop = { title?: string; children?: React.ReactNode; maxWidth?: number };
const Layout: BlitzLayout<Prop> = ({ title, maxWidth = 800, children }) => {
  const thisYear = new Date().getFullYear();
  return (
    <>
      <Head>
        <title>{title || "jonaxio"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppShell
        padding="md"
        // navbar={
        //   <Navbar width={{ base: 300 }} height={500} p="xs">
        //     {/* Navbar content */}
        //   </Navbar>
        // }
        header={
          <Header height={45} p="xs">
            <Horizontal fullH>
              <Anchor
                underline={false}
                color="gray.3"
                component={Link}
                href={Routes.Home()}
                fw="bold"
              >
                Jonaxio
              </Anchor>
            </Horizontal>
          </Header>
        }
        footer={
          <Footer height={35}>
            <Horizontal fullH fullW center>
              <Text fz="xs" color="dimmed">
                copyright {thisYear}
              </Text>
            </Horizontal>
          </Footer>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        })}
      >
        <Vertical fullW fullH>
          <Suspense fallback="loading..."> {children}</Suspense>
        </Vertical>
      </AppShell>
    </>
  );
};

export default Layout;
