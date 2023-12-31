import Head from "next/head";
import React, { FC, Suspense } from "react";
import { BlitzLayout, ErrorBoundary, Routes } from "@blitzjs/next";
import {
  Anchor,
  AppShell,
  Button,
  Footer,
  Header,
  Loader,
  Navbar,
  Text,
  Tooltip,
} from "@mantine/core";
import { Horizontal, Vertical } from "mantine-layout-components";
import { styles } from "ansi-colors";
import Link from "next/link";
import { useMutation } from "@blitzjs/rpc";
import logout from "@/features/auth/mutations/logout";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import { IconUserShield } from "@tabler/icons-react";
import { RootErrorFallback } from "@/core/components/RootErrorFallback";
import { useRouter } from "next/router";

type Prop = { title?: string; children?: React.ReactNode; maxWidth?: number };
const Layout: BlitzLayout<Prop> = ({ title, maxWidth = 800, children }) => {
  const thisYear = new Date().getFullYear();
  const [logoutMutation] = useMutation(logout);
  const user = useCurrentUser();
  const router = useRouter();

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
          <Header height={55} p="xs">
            <Horizontal fullH spaceBetween fullW>
              <Anchor
                underline={false}
                color="gray.3"
                component={Link}
                href={Routes.Home()}
                fw="bold"
              >
                Jonaxio
              </Anchor>
              {user && (
                <Horizontal center>
                  <Horizontal center spacing="xs">
                    <Link href={Routes.EditProfilePage()}>
                      <Text>{user.name}</Text>
                    </Link>
                    {user.isAdmin && (
                      <Tooltip label="Admin">
                        <IconUserShield size={15} />
                      </Tooltip>
                    )}
                  </Horizontal>
                  <Button
                    size="xs"
                    variant="light"
                    onClick={async () => {
                      await logoutMutation();
                      router.push("/");
                    }}
                  >
                    Logout
                  </Button>
                </Horizontal>
              )}
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
          <ErrorBoundary resetKeys={[user]} FallbackComponent={RootErrorFallback}>
            <Suspense
              fallback={
                <Vertical center fullH fullW>
                  <Loader />
                </Vertical>
              }
            >
              {" "}
              {children}
            </Suspense>
          </ErrorBoundary>
        </Vertical>
      </AppShell>
    </>
  );
};

export default Layout;
