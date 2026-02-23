import { Button } from "@/components/ui/button";
import { useCreateComment } from "../model/hooks/useCreateComment";
import { Field as UiField, FieldLabel as UiFieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { CirclePlus, Loader } from "lucide-react";
import { ErrorFields } from "@/components/ErrorFields";

interface CommentCreateProps {
  articleId: string;
  userId: string;
}

export const CommentCreate = (props: CommentCreateProps) => {
  const { Field, Subscribe, handleSubmit } = useCreateComment(props);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex flex-col gap-4"
    >
      <Field
        name="content"
        children={({ state, handleChange }) => (
          <UiField
            className="mb-6 grow"
            data-invalid={!state.meta.isValid}
          >
            <UiFieldLabel className="text-xl">Комментарий</UiFieldLabel>
            <Textarea
              value={state.value}
              onChange={(e) => handleChange(e.target.value)}
            />
            <ErrorFields meta={state.meta} />
          </UiField>
        )}
      />
      <Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            variant="outline"
            size="lg"
            disabled={!canSubmit || isSubmitting}
          >
            {isSubmitting ? <Loader className="animate-spin" /> : <CirclePlus />}
            Добавить комментарий
          </Button>
        )}
      />
    </form>
  );
};
