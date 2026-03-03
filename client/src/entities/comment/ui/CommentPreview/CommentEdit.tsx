import { Textarea } from "@/components/ui/textarea";
import { ItemContent } from "@/components/ui/item";
import { ErrorFields } from "@/components/ErrorFields";
import { useUpdateComment } from "@/entities/comment/model/useUpdateComment";

type Props = {
  form: ReturnType<typeof useUpdateComment>;
};

export const CommentEdit = ({ form }: Props) => {
  const { Field } = form;

  return (
    <ItemContent>
      <Field
        name="content"
        children={({ state, handleChange }) => (
          <>
            <Textarea
              value={state.value}
              onChange={(e) => handleChange(e.target.value)}
            />
            <ErrorFields meta={state.meta} />
          </>
        )}
      />
    </ItemContent>
  );
};
