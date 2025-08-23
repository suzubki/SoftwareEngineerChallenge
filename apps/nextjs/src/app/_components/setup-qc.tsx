"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "~/trpc/react";
import { SetupCardSkeleton } from "./setup-card-skeleton";
import { SetupList } from "./setup-list";

export const SetupQueryContainer = () => {
  const trpc = useTRPC();
  const { data: setups } = useSuspenseQuery(trpc.setup.all.queryOptions());

  if (setups.length === 0) {
    return (
      <div className="relative flex w-full flex-col gap-4">
        <SetupCardSkeleton pulse={false} />
        <SetupCardSkeleton pulse={false} />
        <SetupCardSkeleton pulse={false} />

        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10">
          <p className="text-2xl font-bold text-white">No setups yet</p>
        </div>
      </div>
    );
  }

  return <SetupList setups={setups} />;
};
