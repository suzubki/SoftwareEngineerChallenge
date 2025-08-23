import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod/v4";

import { Setup } from "@acme/db/schema";
import { setupCreateSchema } from "@acme/validators";

import { mockSetups } from "../data/setups";
import { publicProcedure } from "../trpc";

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

  // Delete setup, DB required since our data is always STATIC
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      // const setup = mockSetups.find((setup) => setup.id === input.id);
      // if (!setup) {
      //   throw new TRPCError({ code: "NOT_FOUND" });
      // }
      // mockSetups.splice(mockSetups.indexOf(setup), 1);
      // return setup;
    }),

  create: publicProcedure
    .input(setupCreateSchema)
    .mutation(({ input, ctx }) => {
      return ctx.db
        .insert(Setup)
        .values({
          title: input.title,
          description: input.description,
          imageUrl: input.imageUrl,
          author: input.author,
          likes: input.likes ?? 0,
          tags: input.tags,
        })
        .returning();
    }),

  /**
   * Interactions
   */
  like: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      const setup = mockSetups.find((setup) => setup.id === input.id);
      if (!setup) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      setup.likes = (setup.likes ?? 0) + 1;

      return setup;
    }),
} satisfies TRPCRouterRecord;
