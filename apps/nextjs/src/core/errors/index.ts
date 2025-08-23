import type { TRPCClientErrorLike } from "@trpc/client";
import { TRPCError } from "@trpc/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseError = (error: TRPCError | TRPCClientErrorLike<any>) => {
  if (error instanceof TRPCError) {
    if (error.code === "UNAUTHORIZED") {
      return "You must be logged in to post";
    }
  }

  return "Failed when trying to perform this action";
};
