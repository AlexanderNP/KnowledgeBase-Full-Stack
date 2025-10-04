import { Button, Label, Input } from "@/components/ui";
import { Loader } from "lucide-react";
import { useFormSignUp } from "@/features/auth/model";
import { FormErrorField } from "./FormErrorField";

export function FormSignUp() {
  const { Field, Subscribe, handleSubmit } = useFormSignUp();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col items-center gap-5"
      >
        <h1>Регистрация</h1>
        <Field
          name="username"
          children={({ state, handleBlur, handleChange }) => (
            <div className="flex w-full flex-col gap-2.5">
              <Label htmlFor="username">Ваше имя</Label>
              <Input
                id="username"
                placeholder="Александр"
                value={state.value}
                onBlur={handleBlur}
                onChange={(e) => handleChange(e.target.value)}
              />
              <FormErrorField meta={state.meta} />
            </div>
          )}
        />
        <Field
          name="email"
          children={({ state, handleBlur, handleChange }) => (
            <div className="flex w-full flex-col gap-2.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                value={state.value}
                onBlur={handleBlur}
                onChange={(e) => handleChange(e.target.value)}
              />
              <FormErrorField meta={state.meta} />
            </div>
          )}
        />
        <Field
          name="password"
          children={({ state, handleBlur, handleChange }) => (
            <div className="flex w-full flex-col gap-2.5">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={state.value}
                onBlur={handleBlur}
                onChange={(e) => handleChange(e.target.value)}
              />
              <FormErrorField meta={state.meta} />
            </div>
          )}
        />
        <Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              variant="outline"
              className="w-full"
              disabled={!canSubmit || isSubmitting}
            >
              {isSubmitting && <Loader className="animate-spin" />}
              Зарегистрироваться
            </Button>
          )}
        />
      </form>
    </>
  );
}
