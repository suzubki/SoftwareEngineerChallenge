# Take-Home Assessment: The "Rate My Setup" App

Welcome! We're excited to see what you can build. This challenge is designed to be a fun, practical, and representative sample of the kind of work we do.

Think of this as a feature destined for production. We're more interested in your thought process, design choices, and the quality of your work than in a specific "correct" answer. Be biased toward clean, maintainable, and secure code over a large quantity of features.

**Time Expectation:** Please aim to spend approximately 3-4 hours of focused work on this challenge.

## 1. The Mission: Build the "Rate My Setup" Gallery App

Your mission is to build the first prototype of a community gallery app where users can share and rate desk setups.

This app will need to:
- Display a gallery of setups from a local data file.
- Allow users to "like" a setup (client-side interaction).
- Provide a form for users to submit their own setup.

## 2. Getting Started: Your Development Environment

### Step 1: Fork and Clone the Repository
Fork this repository, then clone it to your local machine.

```bash
git clone git@github.com:<YOUR_GITHUB_USERNAME>/SoftwareEngineerChallenge.git
cd SoftwareEngineerChallenge
```

### Step 2: Install Dependencies
We recommend using pnpm, but npm or yarn will also work.

```bash
pnpm install
```

### Step 3: Run the Development Server

```bash
pnpm dev
```

Open http://localhost:3000 to see the starter page. You are now ready to start building!

## 3. The Core Challenge: Building the Application

Your primary task is to build out the application's features. We've already created a tRPC route with mock setup data for you to use.

### Using the UI Components

This template includes a `@acme/ui` package with shadcn/ui components. You can import and use components like:

```tsx
import { Button, Input, Label, Form, FormField, FormItem, FormLabel, FormMessage } from "@acme/ui";
```

**Available components:** Button, Input, Label, Form (with form fields), DropdownMenu, Toast

**Need more components?** You can add additional shadcn/ui components by running:
```bash
cd packages/ui && pnpm ui-add [component-name]
```

For example, to add a Card component perfect for displaying setups:
```bash
cd packages/ui && pnpm ui-add card
```

You will need to implement the following:

### Feature 1: The Gallery Page (/)
This page should fetch the setup data using the tRPC `setup.all` query and display the setups in a grid or list format.

**Requirement:** This data fetching must be done in a Server Component using tRPC's server-side calling pattern.

### Feature 2: The "Like" Button
Each setup in the gallery should have a "Like" button with a counter.

Clicking the button should increment the count for that specific setup.

**Requirement:** This interaction must be handled on the client side. You do not need to persist the likes; in-memory state is sufficient.

### Feature 3: The Submission Page (/submit)
Create a new page with a form that allows users to submit their own setup. The form should include fields for title, author, and imageUrl.

**Requirement 1:** The form submission must be handled by a Next.js Server Action.

**Requirement 2:** The Server Action must use Zod to validate the incoming FormData.
- `title`: Must be a non-empty string.
- `author`: Must be a non-empty string.
- `imageUrl`: Must be a valid URL string.

If validation passes, the action can simply console.log the validated data. You do not need to write to the JSON file.

If validation fails, the form should display the specific validation errors to the user.

## 4. Advanced Challenges (Optional, but Encouraged)

If you have extra time, consider tackling one of these to showcase your skills further.

**Challenge A: Optimistic UI:** Refactor the "Like" button to use React's `useOptimistic` hook for an instant UI update.

**Challenge B: Shared Validation Schema:** Use the same Zod schema for both server-side validation in your Server Action and client-side validation in your submission form (e.g., using react-hook-form).

**Challenge C: Component Architecture:** Showcase your component design skills by building a flexible, reusable component, perhaps using an advanced pattern like Compound Components.

## 5. Submission Guidelines

1. Push all your code to your forked repository on GitHub and ensure it is public.
2. Send the link to your repository back to us.
3. **The Most Important Part:** Fill out the `DESIGN_CHOICES.md` file in detail. We want to understand your thought process, the trade-offs you considered, and what you would do next if you had more time.

Good luck!

---

## About This Template

This project is built on the create-t3-turbo stack, which uses [Turborepo](https://turborepo.org) and contains:

```text
.github
  └─ workflows
        └─ CI with pnpm cache setup
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  └─ next.js
      ├─ Next.js 15
      ├─ React 19
      ├─ Tailwind CSS
      └─ E2E Typesafe API Server & Client
packages
  ├─ api
  |   └─ tRPC v11 router definition
  ├─ auth
  |   └─ Authentication using better-auth.
  ├─ db
  |   └─ Typesafe db calls using Drizzle & Supabase
  └─ ui
      └─ Start of a UI package for the webapp using shadcn-ui
tooling
  ├─ eslint
  |   └─ shared, fine-grained, eslint presets
  ├─ prettier
  |   └─ shared prettier configuration
  ├─ tailwind
  |   └─ shared tailwind configuration
  └─ typescript
      └─ shared tsconfig you can extend from
```

> In this template, we use `@acme` as a placeholder for package names. As a user, you might want to replace it with your own organization or project name. You can use find-and-replace to change all the instances of `@acme` to something like `@my-company` or `@project-name`.

## Template Setup (For Reference)

> **Note**
> For this challenge, you primarily need the Next.js app. The template includes additional features like database setup, but these are not required for the core challenge.

If you want to explore the full template capabilities:

### Setup Dependencies

```bash
# Install dependencies
pnpm i

# Configure environment variables (optional for challenge)
# There is an `.env.example` in the root directory you can use for reference
cp .env.example .env

# Push the Drizzle schema to the database (optional for challenge)
pnpm db:push
```

---

## Appendix: Template Documentation

<details>
<summary>Click to expand full template setup and deployment guide</summary>

### Configuring Better-Auth

Better-auth comes with an [auth proxy plugin](https://www.better-auth.com/docs/plugins/oauth-proxy) for OAuth integration in development and deployment environments.

### Adding New UI Components

Run the `ui-add` script to add a new UI component using the interactive `shadcn/ui` CLI:

```bash
pnpm ui-add
```

### Adding New Packages

To add a new package, simply run `pnpm turbo gen init` in the monorepo root.

## FAQ

### Does this pattern leak backend code to my client applications?

No, it does not. The `api` package should only be a production dependency in the Next.js application where it's served. Any additional apps you may add in the future should only add the `api` package as a dev dependency for type safety.

## Deployment

### Next.js

#### Deploy to Vercel

1. Create a new project on Vercel, select the `apps/nextjs` folder as the root directory.
2. Add your `POSTGRES_URL` environment variable.
3. Done! Your app should successfully deploy.



</details>

## References

The stack originates from [create-t3-app](https://github.com/t3-oss/create-t3-app).

A [blog post](https://jumr.dev/blog/t3-turbo) where I wrote how to migrate a T3 app into this.
