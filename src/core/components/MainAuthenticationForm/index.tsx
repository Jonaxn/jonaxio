import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm, zodResolver } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from "@mantine/core";
import {
  GoogleButton,
  TwitterButton,
} from "@/core/components/MainAuthenticationForm/SocialButtons";
import { useMutation } from "@blitzjs/rpc";
import login from "@/features/auth/mutations/login";
import signup from "@/features/auth/mutations/signup";
import { Vertical } from "mantine-layout-components";
import { SignupInput } from "@/features/auth/schemas";

import { z } from "zod";

export const bindCheckBoxToForm = (form: any, key: string) => {
  const inputProps = form.getInputProps(key);
  return {
    ...inputProps,
    checked: inputProps.value,
  };
};

type SignupFormType = z.infer<typeof SignupInput>;

export function AuthenticationForm(props: PaperProps) {
  const [type, toggle] = useToggle(["login", "register"]);
  const [$login, { isLoading: isLoggingIn }] = useMutation(login);
  const [$signup, { isLoading: isSigningUp }] = useMutation(signup);

  const form = useForm<SignupFormType>({
    validate: zodResolver(SignupInput),
    validateInputOnBlur: true,
    validateInputOnChange: ["terms"],
  });

  const onSubmit = (values: SignupFormType) => {};

  const Loading = isLoggingIn || isSigningUp;

  return (
    <Vertical mih="100vh" center fullH fullW>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500}>
          Welcome to Jonaxio, {type} with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <TwitterButton radius="xl">Twitter</TwitterButton>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form
          onSubmit={form.onSubmit((values) => {
            if (type === "login") $login(values);
            if (type === "register") $signup(values);
            console.log(values);
          })}
        >
          <Stack>
            {type === "register" && (
              <TextInput
                required
                label="Name"
                placeholder="Your name"
                {...form.getInputProps("name")}
                radius="md"
                onChange={(event) => form.setFieldValue("name", event.currentTarget.value)}
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              {...form.getInputProps("email")}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              {...form.getInputProps("password")}
              radius="md"
            />

            {type === "register" && (
              <Checkbox
                {...bindCheckBoxToForm(form, "terms")}
                label="I accept terms and conditions"
                // checked={form.values.terms}
                // onChange={(event) => form.setFieldValue("terms", event.currentTarget.checked)}
              />
            )}
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button disabled={!form.isValid()} loading={Loading} type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Vertical>
  );
}
