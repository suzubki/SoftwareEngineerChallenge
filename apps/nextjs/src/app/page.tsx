import { Suspense } from "react";
import Link from "next/link";

import { Button } from "@acme/ui/button";

import { HydrateClient, prefetch, trpc } from "~/trpc/server";
import { SetupCardSkeleton } from "./_components/setup-card-skeleton";
import { SetupQueryContainer } from "./_components/setup-qc";

export default function HomePage() {
  prefetch(trpc.setup.all.queryOptions());

  return (
    <HydrateClient>
      <main className="container h-screen py-16">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Create <span className="text-primary">T3</span> Turbo
          </h1>
          {/* <AuthShowcase /> */}

          <Button asChild>
            <Link href="/create">Create a new setup</Link>
          </Button>

          <div className="w-full max-w-2xl overflow-y-scroll">
            <Suspense
              fallback={
                <div className="flex w-full flex-col gap-4">
                  <SetupCardSkeleton />
                  <SetupCardSkeleton />
                  <SetupCardSkeleton />
                </div>
              }
            >
              <SetupQueryContainer />
            </Suspense>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
