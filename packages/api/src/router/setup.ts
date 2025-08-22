import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod/v4";

import { mockSetups } from "../data/setups";
import { protectedProcedure, publicProcedure } from "../trpc";

const LIMIT = 5;

export const setupRouter = {
  // Get all setups
  all: publicProcedure.query(() => {
    return mockSetups.slice(0, LIMIT);
  }),

  // Get setup by ID
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return mockSetups.find((setup) => setup.id === input.id) || null;
    }),

  // Delete setup
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      const setup = mockSetups.find((setup) => setup.id === input.id);

      if (!setup) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      mockSetups.splice(mockSetups.indexOf(setup), 1);

      return setup;
    }),

  /**
   * Interactions
   */
  like: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      const setup = mockSetups.find((setup) => setup.id === input.id);
      if (!setup) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      setup.likes++;

      return setup;
    }),
} satisfies TRPCRouterRecord;
