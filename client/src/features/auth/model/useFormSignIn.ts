import { toast } from "sonner";
import { revalidateLogic, useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { signInUserSchema } from "./shemas";
import { useAuth } from "@/shared/contexts/auth";
import { authControllerSignInMutation } from "@/shared/api/generated/@tanstack/react-query.gen";
import type { AuthUser, LoginUserDto } from "@/shared/api/generated";

const defaultSignInUser: LoginUserDto = { email: "", password: "" };

export function useFormSignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSuccess = (data: AuthUser) => {
    const { accessToken, username } = data;
    login(accessToken);

    navigate({
      to: "/app",
    });

    toast.success(`Добро пожаловать ${username}!`);
  };

  const handleError = (error: Error) => {
    toast.error(error.message);
  };

  const authSignInMutation = useMutation({
    ...authControllerSignInMutation(),
    onError: handleError,
    onSuccess: handleSuccess,
  });

  const { Field, handleSubmit, Subscribe } = useForm({
    defaultValues: defaultSignInUser,
    onSubmit: async ({ value }) => {
      authSignInMutation.mutate({
        body: {
          ...value,
        },
      });
    },
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
    validators: {
      onDynamic: signInUserSchema,
    },
  });

  return {
    Field,
    handleSubmit,
    Subscribe,
  };
}
