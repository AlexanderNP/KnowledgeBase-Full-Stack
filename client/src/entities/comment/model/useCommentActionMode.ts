import { useMutationState } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { COMMENT_MUTATION_KEYS } from "./queries";
import type { CommentsControllerUpdateData } from "@/shared/api/generated";

type CommentMode = "view" | "edit" | "optimistic";

export const useCommentActionMode = (id: string) => {
  const [mode, setMode] = useState<CommentMode>("view");

  const [pendingMutation] = useMutationState({
    filters: {
      mutationKey: COMMENT_MUTATION_KEYS.update(),
      status: "pending",
      predicate: (mutation) => {
        const variables = mutation.state.variables as CommentsControllerUpdateData;
        return variables.path.id === id;
      },
    },
    select: (mutation) => mutation.state.variables as CommentsControllerUpdateData,
  });

  useEffect(() => {
    if (pendingMutation) {
      setMode("optimistic");
    } else {
      setMode("view");
    }
  }, [pendingMutation]);

  return { mode, setMode, pendingMutation };
};
