"use client";

import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HeartIcon, TagIcon, Trash2Icon, UserIcon } from "lucide-react";

import type { RouterOutputs } from "@acme/api";
import { Badge } from "@acme/ui/badge";
import { Button } from "@acme/ui/button";
import { Card, CardContent, CardHeader } from "@acme/ui/card";
import { Split } from "@acme/ui/split";
import { toast } from "@acme/ui/toast";

import { useTRPC } from "~/trpc/react";

export function SetupCard(props: {
  setup: RouterOutputs["setup"]["all"][number];
}) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const deletePost = useMutation(
    trpc.post.delete.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.post.pathFilter());
      },
      onError: (err) => {
        toast.error(
          err.data?.code === "UNAUTHORIZED"
            ? "You must be logged in to delete a post"
            : "Failed to delete post",
        );
      },
    }),
  );

  // const likePost = useMutation(
  //   trpc.post.like.mutationOptions({
  //     onSuccess: async () => {
  //       await queryClient.invalidateQueries(trpc.post.pathFilter());
  //     },
  //     onError: (err) => {
  //       toast.error(
  //         err.data?.code === "UNAUTHORIZED"
  //           ? "You must be logged in to like a post"
  //           : "Failed to like post",
  //       );
  //     },
  //   }),
  // );

  return (
    <Card className="group relative overflow-hidden shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          width={800}
          height={600}
          src={props.setup.imageUrl}
          alt={props.setup.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      <CardContent className="p-6">
        <CardHeader className="mb-4 p-0">
          <h3 className="mb-2 line-clamp-2 text-xl font-bold text-foreground">
            {props.setup.title}
          </h3>
          <Split className="gap-2 text-sm text-muted-foreground">
            <UserIcon className="h-4 w-4" />
            <span>{props.setup.author}</span>
          </Split>
        </CardHeader>

        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
          {props.setup.description}
        </p>

        <Split className="mb-4 flex-wrap gap-2">
          {props.setup.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="inline-flex items-center gap-1 border-primary/20 bg-primary/10 text-primary"
            >
              <TagIcon className="h-3 w-3" />
              {tag}
            </Badge>
          ))}
          {props.setup.tags.length > 3 && (
            <Badge variant="secondary" className="text-muted-foreground">
              +{props.setup.tags.length - 3} más
            </Badge>
          )}
        </Split>

        <div className="flex items-center justify-between">
          <Button
            size="sm"
            variant="secondary"
            className="flex items-center gap-2"
            // onClick={() => likePost.mutate(props.setup.id)}
          >
            <HeartIcon className="h-4 w-4" />
            <span className="text-sm font-medium">{props.setup.likes}</span>
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => deletePost.mutate(props.setup.id)}
          >
            <Trash2Icon className="mr-2 h-4 w-4" />
            Eliminar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
