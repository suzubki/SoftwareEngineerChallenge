import { authRouter } from "./router/auth";
// import { postRouter } from "./router/post";
import { setupRouter } from "./router/setup";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  // post: postRouter,
  setup: setupRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
