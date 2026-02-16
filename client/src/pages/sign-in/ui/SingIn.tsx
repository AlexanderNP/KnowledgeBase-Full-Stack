import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ErrorFields } from "@/components/ErrorFields";
import { useSignIn } from "@/pages/sign-in/models/useSignIn";

export function SignIn() {
  const { Field, Subscribe, handleSubmit } = useSignIn();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col items-center gap-5"
      >
        <h1>Вход</h1>
        <div className="flex items-center gap-1 text-sm">
          <span>Нет аккаунта?</span>
          <Link
            to="/auth/sign-up"
            className="underline underline-offset-4"
          >
            Зарегистрируйтесь
          </Link>
        </div>

        <Field
          name="email"
          children={({ state, handleChange, handleBlur }) => (
            <div className="flex w-full flex-col gap-2.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                value={state.value}
                onBlur={handleBlur}
                onChange={(e) => handleChange(e.target.value)}
              />
              <ErrorFields meta={state.meta} />
            </div>
          )}
        />
        <Field
          name="password"
          children={({ state, handleChange, handleBlur }) => (
            <div className="flex w-full flex-col gap-2.5">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="qwerty12345"
                value={state.value}
                onBlur={handleBlur}
                onChange={(e) => handleChange(e.target.value)}
              />
              <ErrorFields meta={state.meta} />
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
              Вход
            </Button>
          )}
        />
      </form>
    </>
  );
}
