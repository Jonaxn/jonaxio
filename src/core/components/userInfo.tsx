import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import { useMutation } from "@blitzjs/rpc";
import logout from "@/features/auth/mutations/logout";
import Link from "next/link";
import { Routes } from "@blitzjs/next";
import { Button } from "@mantine/core";

export const UserInfo = () => {
  const currentUser = useCurrentUser();
  const [logoutMutation] = useMutation(logout);

  if (currentUser) {
    return (
      <>
        <Button
          // className={styles.button}
          onClick={async () => {
            await logoutMutation();
          }}
        >
          Logout
        </Button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          {/*<Link href={Routes.SignupPage()} className={styles.button}>*/}
          <strong>Sign Up</strong>
        </Link>
        {/*<Link href={Routes.LoginPage()} className={styles.loginButton}>*/}
        <Link href={Routes.LoginPage()}>
          <strong>Login</strong>
        </Link>
      </>
    );
  }
};
