import { createRouter } from "@tanstack/react-router";
import { routeTree } from "@/app/routeTree.gen";

export const router = createRouter({
  routeTree,
  context: {
    user: null,
    hasPermission: () => false,
  },
});
