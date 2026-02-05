import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { revalidateLogic, useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { authControllerSignUpMutation } from "@/shared/api/generated/@tanstack/react-query.gen";
import { signUpUserSchema } from "@/pages/sign-up/model/shemas";
import type { AuthUser, CreateUserDto } from "@/shared/api/generated";

const defaultSignUpUser: CreateUserDto = { email: "", username: "", password: "" };

export function useSignUp() {
  const navigate = useNavigate();

  const handleSuccess = (data: Partial<AuthUser>) => {
    toast.success(`Ваш аккаунт ${data.email} успешно создан!`);

    navigate({
      to: "/auth/sign-in",
    });
  };

  const handleError = (error: Error) => {
    toast.error(error.message);
  };

  const createUserMutation = useMutation({
    ...authControllerSignUpMutation(),
    onError: handleError,
    onSuccess: handleSuccess,
  });

  const { Field, handleSubmit, Subscribe } = useForm({
    defaultValues: defaultSignUpUser,
    onSubmit: async ({ value }) => {
      createUserMutation.mutate({
        body: {
          email: value.email,
          username: value.username,
          password: value.password,
        },
      });
    },
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
    validators: {
      onDynamic: signUpUserSchema,
    },
  });

  return {
    Field,
    Subscribe,
    handleSubmit,
  };
}
