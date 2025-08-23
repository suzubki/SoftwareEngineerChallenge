"use server";

import type { SetupCreateSchema } from "@acme/validators";
import { setupCreateSchema } from "@acme/validators";

export const createSetup = async (form: SetupCreateSchema) => {
  const validated = setupCreateSchema.safeParse(form);
  // const db = makeDB()

  if (!validated.success) {
    return { error: validated.error.message };
  }

  return validated.data;
};
