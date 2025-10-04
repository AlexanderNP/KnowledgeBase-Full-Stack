import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { revalidateLogic, useForm } from "@tanstack/react-form";
import { signUpUserSchema } from ".";
import { useMutation } from "@tanstack/react-query";
import { authControllerSignUpMutation } from "@/shared/api/generated/@tanstack/react-query.gen";
import type { CreateUserDto } from "@/shared/api/generated";

const defaultSignUpUser: CreateUserDto = { email: "", username: "", password: "" };

export function useFormSignUp() {
  const navigate = useNavigate();

  const createUserMutation = useMutation({
    ...authControllerSignUpMutation(),
    onError: (error) => {
      console.log(error);
      toast("Произошла ошибка");
    },
    onSuccess: (data) => {
      console.log(data);
      toast("Вы успешно зарегистрировались!");
      navigate({
        to: "/auth/sign-in",
      });
    },
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
      mode: "blur",
      modeAfterSubmission: "change",
    }),
    validators: {
      onBlur: signUpUserSchema,
    },
  });

  return {
    Field,
    Subscribe,
    handleSubmit,
  };
}
