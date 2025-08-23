"use client";

import type { SubmitHandler } from "react-hook-form";
import { tryit } from "radash";

import type { SetupCreateSchema } from "@acme/validators";
import { Button } from "@acme/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  useForm,
} from "@acme/ui/form";
import { Input } from "@acme/ui/input";
import { toast } from "@acme/ui/toast";
import { ImageUpload } from "@acme/ui/upload";
import { setupCreateSchema } from "@acme/validators";

import { createSetup } from "./action";

export function CreateSetupForm() {
  const form = useForm<SetupCreateSchema, SetupCreateSchema>({
    schema: setupCreateSchema,
    defaultValues: {
      title: "",
      author: "",
      imageUrl: "",
    },
  });

  // const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<SetupCreateSchema> = async (data) => {
    const [err, res] = await tryit(createSetup)(data);
    if (err) {
      toast.error("Failed to create setup", {
        description: err.message,
      });
    } else {
      toast.success("Setup created successfully", {
        description: JSON.stringify(res),
      });
    }
  };

  return (
    <Form {...form}>
      <form className="w-full max-w-2xl" onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset
          className="flex flex-col gap-4"
          disabled={form.formState.isSubmitting}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Author" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ImageUpload
            onUploadComplete={(url) => {
              form.setValue("imageUrl", url);
              form.clearErrors("imageUrl");
            }}
          />
          {form.formState.errors.imageUrl && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {form.formState.errors.imageUrl.message}
            </p>
          )}

          <Button type="submit">Create</Button>
        </fieldset>
      </form>
    </Form>
  );
}
