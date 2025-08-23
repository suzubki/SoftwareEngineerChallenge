import { z } from "zod/v4";

// export const unused = z.string().describe(
//   `This lib is currently not used as we use drizzle-zod for simple schemas
//    But as your application grows and you need other validators to share
//    with back and frontend, you can put them in here
//   `,
// );

export const setupSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  imageUrl: z.string().min(1, "Image is required"),
  description: z.string().optional(),
  likes: z.number().default(0),
  tags: z.array(z.string()).default([]),
});
export type SetupSchema = z.infer<typeof setupSchema>;

export const setupCreateSchema = setupSchema
  .omit({ id: true })
  .partial()
  .extend({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    imageUrl: z.string().min(1, "Image is required"),
  });
export type SetupCreateSchema = z.infer<typeof setupCreateSchema>;
