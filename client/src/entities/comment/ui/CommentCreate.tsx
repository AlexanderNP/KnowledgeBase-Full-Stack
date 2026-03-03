import { Button } from "@/components/ui/button";
import { useCreateComment } from "../model/useCreateComment";
import { Field as UiField } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { CirclePlus, Loader } from "lucide-react";
import { ErrorFields } from "@/components/ErrorFields";
import type { CreateCommentDto } from "@/shared/api/generated";

export const CommentCreate = (props: Omit<CreateCommentDto, "content">) => {
  const { Field, Subscribe, handleSubmit } = useCreateComment(props);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex flex-col gap-2"
    >
      <Field
        name="content"
        children={({ state, handleChange }) => (
          <UiField data-invalid={!state.meta.isValid}>
            <Textarea
              placeholder="Напишите что думаете о статье"
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
            className="self-end"
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
