import { revalidateLogic, useForm } from "@tanstack/react-form";
import { signInUserSchema } from "./shemas";
import { useMutation } from "@tanstack/react-query";
import type { LoginUserDto } from "@/shared/api/generated";

const defaultSignInUser: LoginUserDto = { email: "", password: "" };

export function useFormSignIn() {
  // const mutation = useMutation({
  //   mutationFn: (newTodo) => {
  //     return axios.post('/todos', newTodo)
  //   },
  // })

  const { Field, handleSubmit, Subscribe } = useForm({
    defaultValues: defaultSignInUser,
    onSubmit: async ({ value }) => {
      // Handle form submission
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(null);
        }, 1000);
      });

      console.log(value);
    },
    validationLogic: revalidateLogic({
      mode: "blur",
      modeAfterSubmission: "change",
    }),
    validators: {
      onBlur: signInUserSchema,
    },
  });

  return {
    Field,
    handleSubmit,
    Subscribe,
  };
}
