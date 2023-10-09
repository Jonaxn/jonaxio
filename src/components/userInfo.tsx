import { useCurrentUser } from "../users/hooks/useCurrentUser"
import { useMutation } from "@blitzjs/rpc"
import logout from "../auth/mutations/logout"
import Link from "next/link"
import { Routes } from "@blitzjs/next"

export const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          // className={styles.button}
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
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
    )
  }
}
