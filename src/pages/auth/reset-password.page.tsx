import Layout from "src/core/layouts/Layout";
import resetPassword, { ResetPassword } from "@/features/auth/mutations/resetPassword";
import { BlitzPage, Routes } from "@blitzjs/next";
import { useRouter } from "next/router";
import { useMutation } from "@blitzjs/rpc";
import Link from "next/link";
import { assert } from "blitz";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

const ResetPasswordPage: BlitzPage = () => {
  const router = useRouter();
  const token = router.query.token?.toString();
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword);
  const form = useForm({
    initialValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  let onSubmit = async (values) => {
    assert(token, "token is required.");
    await resetPasswordMutation({ ...values, token });
  };
  return (
    <Layout title="Reset Your Password">
      <div>
        <h1>Set a New Password</h1>

        {isSuccess ? (
          <div>
            <h2>Password Reset Successfully</h2>
            <p>
              Go to the <Link href={Routes.Home()}>homepage</Link>
            </p>
          </div>
        ) : (
          <form onSubmit={form.onSubmit(onSubmit)}>
            <PasswordInput withAsterisk label="Password" {...form.getInputProps("password")} />
            <PasswordInput
              withAsterisk
              label="passwordConfirmation"
              {...form.getInputProps("passwordConfirmation")}
            />
            <Button type="submit">Submit</Button>
          </form>
          // <Form
          //   submitText="Reset Password"
          //   schema={ResetPassword}
          //   initialValues={{
          //     password: "",
          //     passwordConfirmation: "",
          //     token,
          //   }}
          //   onSubmit={onSubmit}
          // >
          //   <LabeledTextField name="password" label="New Password" type="password" />
          //   <LabeledTextField
          //     name="passwordConfirmation"
          //     label="Confirm New Password"
          //     type="password"
          //   />
          // </Form>
        )}
      </div>
    </Layout>
  );
};

ResetPasswordPage.redirectAuthenticatedTo = "/";

export default ResetPasswordPage;
