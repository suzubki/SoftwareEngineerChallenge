"use client";

import { startTransition, useOptimistic, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tryit } from "radash";

import type { Model } from "@acme/db/schema";

import { useTRPC } from "~/trpc/react";
import { SetupCard } from "./setup-card";

export function SetupList(props: { setups: Model<"Setup">[] }) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [setups, setSetups] = useState(props.setups);
  const [optimisticSetups, updateOptimisticSetups] = useOptimistic(
    setups,
    (
      currentSetups,
      action: { type: "delete"; id: string } | { type: "like"; id: string },
    ) => {
      if (action.type === "delete") {
        return currentSetups.filter((setup) => setup.id !== action.id);
      } else {
        return currentSetups.map((setup) => {
          if (setup.id === action.id) {
            return { ...setup, likes: setup.likes + 1 };
          }
          return setup;
        });
      }
    },
  );

  const deleteSetupMutation = useMutation(
    trpc.setup.delete.mutationOptions({
      onSuccess: () => {
        void queryClient.invalidateQueries({
          queryKey: trpc.setup.all.queryOptions().queryKey,
        });
      },
    }),
  );

  // Using optmistic updates from react-query/trpc
  const likeSetupMutation = useMutation(
    trpc.setup.like.mutationOptions({
      onMutate: async (input) => {
        await queryClient.cancelQueries({
          queryKey: trpc.setup.all.queryOptions().queryKey,
        });
        const previousSetups = queryClient.getQueryData(
          trpc.setup.all.queryOptions().queryKey,
        );
        queryClient.setQueryData(
          trpc.setup.all.queryOptions().queryKey,
          (old: Model<"Setup">[] | undefined) => {
            if (!old) return [];
            return old.map((setup) =>
              setup.id === input.id
                ? { ...setup, likes: setup.likes + 1 }
                : setup,
            );
          },
        );

        return { previousSetups };
      },
    }),
  );

  const likeSetup = async (setup: Model<"Setup">) => {
    likeSetupMutation.mutate({ id: setup.id });
    const newSetups = optimisticSetups.map((s) => {
      if (s.id === setup.id) {
        return { ...s, likes: s.likes + 1 };
      }
      return s;
    });
    setSetups(newSetups);
  };

  // Using optimistic updates with useOptimistic hook
  const deleteSetup = (setup: Model<"Setup">) => {
    startTransition(async () => {
      const snapshot = [...optimisticSetups];
      updateOptimisticSetups({ type: "delete", id: setup.id });

      const [_, err] = await tryit(deleteSetupMutation.mutateAsync)({
        id: setup.id,
      });
      if (err) {
        setSetups(snapshot);
      } else {
        const newSetups = snapshot.filter((s) => s.id !== setup.id);
        setSetups(newSetups);
      }
    });
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {optimisticSetups.map((setup) => {
        return (
          <SetupCard
            key={setup.id}
            setup={setup}
            deleteSetup={() => deleteSetup(setup)}
            likeSetup={() => likeSetup(setup)}
          />
        );
      })}
    </div>
  );
}
