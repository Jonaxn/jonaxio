import { AuthenticationError, PromiseReturnType } from "blitz";
import Link from "next/link";
import login, { Login } from "@/features/auth/mutations/login";
import { useMutation } from "@blitzjs/rpc";
import { Routes } from "@blitzjs/next";
import { useForm } from "@mantine/form";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { Vertical } from "mantine-layout-components";

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void;
};

export const LoginForm = (props: LoginFormProps) => {
  const [$login] = useMutation(login);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  const onSubmit = async (values) => {
    console.log(values);

    const user = await $login(values);
    props.onSuccess?.(user);
  };

  return (
    <Vertical>
      <h1>Login</h1>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          withAsterisk
          label="Password"
          placeholder="your password"
          {...form.getInputProps("password")}
        />
        <Button type="submit">Submit</Button>
      </form>
      <div>
        <Link href={Routes.ForgotPasswordPage()}>Forgot your password?</Link>
      </div>

      <div>
        Or <Link href={Routes.SignupPage()}>Sign Up</Link>
      </div>
    </Vertical>
  );
};

export default LoginForm;
