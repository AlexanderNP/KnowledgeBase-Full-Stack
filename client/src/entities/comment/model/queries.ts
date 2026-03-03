export const COMMENT_MUTATION_KEYS = {
  root: ["comment"] as const,
  create: () => [...COMMENT_MUTATION_KEYS.root, "create"] as const,
  delete: () => [...COMMENT_MUTATION_KEYS.root, "delete"] as const,
  update: () => [...COMMENT_MUTATION_KEYS.root, "update"] as const,
};
