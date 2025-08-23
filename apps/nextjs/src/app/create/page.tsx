import Link from "next/link";

import { Button } from "@acme/ui/button";

import { CreateSetupForm } from "../_components/create-setup/form";

export default function CreatePage() {
  return (
    <main className="container h-screen py-16">
      <div className="flex flex-col items-center gap-4">
        <Button asChild variant="outline" className="self-start">
          <Link href="/">Back</Link>
        </Button>
        <h1 className="text-5xl font-extrabold tracking-tight">
          Create a new setup
        </h1>
        <p className="mb-8 text-muted-foreground">
          Create a new setup to share with the community
        </p>
        <CreateSetupForm />
      </div>
    </main>
  );
}
