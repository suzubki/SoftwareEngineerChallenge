# Design Choices & Rationale

This document is the most important part of your submission. It's your opportunity to explain your thought process, the trade-offs you considered, and the reasoning behind your implementation. Clear, concise communication is a critical skill for any engineer, and we're excited to learn how you approached the problem.

---

## 1. Application Architecture Overview

Please provide a high-level overview of your application architecture. Explain how you structured your components, data flow, and the relationship between your client and server code.

**Example:**

My application follows a modern Next.js architecture with the following key components:

- **Gallery Page (`/`)**: Server Component that fetches setup data using tRPC's server-side calling pattern from the `setup.all` query. Renders a responsive grid of setup cards with optimized images and like functionality.

- **Setup Card Component**: Client Component that handles the like button interaction using React state (or `useOptimistic` for advanced implementation). Manages local state for like counts without persistence.

- **Submission Page (`/submit`)**: Contains a form with client-side validation and server-side processing via Next.js Server Actions. Uses Zod for validation on both client and server.

- **Server Action**: Handles form submission, validates data with Zod schema, and logs successful submissions. Returns validation errors to the client for display.

- **tRPC Setup Router**: Provides `setup.all` and `setup.byId` endpoints with mock data, ensuring type safety across the application.

The data flow follows: Client → tRPC Query → Server Component → UI for reads, and Client Form → Server Action → Validation → Response for writes.

---

## 2. Key Technical Decisions & Trade-Offs

This is where you can really shine. Discuss the most significant decisions you made during the project. What alternatives did you consider, and why did you choose your final approach?

### Data Fetching Strategy

- **Why did you choose tRPC over REST APIs or direct file reading?** What are the benefits of type safety and how does it improve developer experience?
  I chose tRPC because it provides type safety and a great developer experience, allows us to prevent errors at compile time, to handle errors in a centralized way, and to have a great developer experience.

- **Server Components vs Client Components**: How did you decide which components should be Server Components? What are the performance implications?
  I chose to use Server Components for the gallery page, at first to prefetch the data. Later on, I used a new server action createSetup to handle the form submission. The performance implications are that Server Components are faster than Client Components, but they are not as flexible. Even if they are faster, the reality is that right now we have to create submissions states to handle errors, loadings, and other states.

### State Management for Likes

- **How did you implement the like functionality?** Did you use simple React state, Context API, or a more advanced solution?
  I used a simple React state to handle the like functionality. There is no need to use a more advanced solution since we are using just 3 components to render a list of setups. SetupCard, SetupList, and SetupQueryContainer(component that fetches the data).

- **Did you implement optimistic updates?** If so, how did you handle the `useOptimistic` hook? If not, what would be your approach?
  Yes, I did. I never used so I had to learn it, by the way, it's a great hook. Probably I need to test it more to have a better understanding of it and answer the question. By the way, even if I didn't have experience using that hook, I know what optimistic updates means and how to use them. Most of the times, I had to use it using the workaround in react-query and mutates.

- **Local vs Persistent State**: The challenge specifies in-memory state is sufficient. How would you extend this to persistent storage?
  I would extend the state and persistant probably using a localStorage or even better, a database. Or just update the file with the new data.

### Form Handling & Validation

- **Client-side vs Server-side validation**: How did you balance user experience with security? Did you implement both?
  Since we are using a monorepo, I used the directory /validators to share the schema between client and server.

- **Zod schema design**: How did you structure your validation schema? Did you reuse it between client and server?
  I used the same schema for both client and server. They are declared in the directory /validators.

- **Error handling**: How do you display validation errors to users? What's your strategy for handling both field-level and form-level errors?
  Since we are using zod and react-hook-form there is a nice workaround to handle the errors. We can use the useForm hook to handle the errors and display them in the form using either a "formState.errors" or use a custom component which reads the error field. So they are always handled.

### Component Architecture & Design Patterns

- **Component composition**: How did you break down your UI into reusable components? What patterns did you use (e.g., compound components, render props)?
  I used that pattern when I had to create the setup-card component, that's because we were using shadcn/ui and I had to create a custom component that was a composition of the shadcn/ui components.

- **Styling approach**: Did you use Tailwind CSS classes directly, create custom components, or use a component library? What influenced your decision?
  I used Tailwind CSS classes directly. I didn't had to use a new component library because I didn't have time to do it. So I used shadcn, and add new components like upload, progress, progress-bar, etc. They are components built by the community and they are very useful.

- **Image optimization**: How did you handle the setup images? Did you use Next.js Image component for optimization?
  Just use the Image component and it will be optimized. Just be aware of the sizes and the aspect ratio.

### Type Safety & Developer Experience

- **TypeScript integration**: How did you ensure type safety across your tRPC calls, form handling, and component props?
  In this case, I used a Model interface which is a generic type that can be used to ensure type safety across my tRPC calls, form handling, and component props. This is a good approach because it allows us to use the same schema of our entities for both client and server. i.e Model<"Setup">, this results in Setup.$inferSelect.

  There are many ways to do that, what I like to do is to create a new model file, where we can create our entities and use them in the client and server. This entities don't depend on the schema generated by drizzle-zod. So we can have them and use in our application, this is a good approach when you are moving from different databases or ORMs.

- **Error boundaries**: Did you implement error handling for failed API calls or component errors?
  We can use error boundaries to handle errors in the client side since we are using suspense, but I didn't have time to do it. Anyways, I use toast to handle errors in the client side.

---

## 3. Future Improvements & Next Steps

No project is ever truly "finished." If you had another week to work on this, what would you do next? What would you prioritize, and why?

**⏰ If You Ran Out of Time:** If you didn't complete all the implementation within 3-4 hours, please document what you would have done here. We completely understand and want to respect your time! Describe your planned approach for any unfinished components.

Consider these areas:

### User Experience Enhancements

- **Search and filtering**: How would you implement search by title/author or filtering by tags?
  I would use a debounce technique and a query search pattern, probably create a top-level component that would handle whatever kind of search.
  trpc.setup.all.queryOptions({ search: "query" }), useDebounce(search, { delay: 500 }), etc...

- **Infinite scroll or pagination**: How would you handle larger datasets?
  I would use a pagination pattern, probably create a top-level component that would handle whatever kind of pagination. And for the cache would be really good if we continue to use react-query and his useInfiniteQuery hook.
- **Responsive design improvements**: What mobile-specific optimizations would you add?
  As always, just beware of the breakpoints and the responsive design.

### Performance Optimizations

- **Image loading strategies**: How would you implement lazy loading, blur placeholders, or WebP conversion?
  Well, I would use the Image component and the blur-up technique

- **Caching strategies**: Where would you add caching (browser, CDN, server-side)?
  Caching in the client-side react-query, and in the server-side server actions. There is a way to use react-query and server actions tho.

- **Bundle optimization**: How would you reduce JavaScript bundle size?
  I would use the next.js bundler and the next.js server actions to handle the bundle size. And be aware of all the packages we are using, even if they are small, they can add up.

### Feature Expansions

- **User authentication**: How would you integrate with the existing better-auth system?
  Since we have better-auth, we can use it with different providers, and use the protectedProcedures to ensure some actions are only available for authenticated users.
- **Real-time updates**: How would you implement live like counts across users?
  That's a rought question I guess, we can use real updates if we are using a database that supports it. If not we can use websockets to handle the updates - but this may incurs in cost and complexity.
- **Setup detail pages**: How would you create individual setup pages with more information?
  We can use the`[id]` route to create a detail page for each setup. Fetch the data from the server and render it in the client side.
- **Comment system**: How would you add commenting functionality to setups?

### Production Readiness

- **Database integration**: How would you migrate from mock data to a real database?
  Just connect the database and push them to the database.

- **File uploads**: How would you implement image uploading for new submissions?
  There are multiple services we can use to handle the file uploads, like uploadthing, cloudinary, s3, supabase, etc.
- **Rate limiting**: How would you prevent spam submissions?
  If we are using Vercel, then add some rules for some api routes. There is a rate-limiter trpc package tho
- **Monitoring and analytics**: What metrics would you track?
  Every event of course, we need to know what is the user doing, and if our UI is working as expected, I mean the CTA's and the UI interactions.

---

## 4. Challenges Faced & Lessons Learned

What was the hardest part of this challenge for you? How did you overcome it? What did you learn along the way?

This is a great place to talk about:

- **tRPC integration challenges**: Any issues with server-side calling patterns or type generation?
  No, the idea behind the integration with trpc is the same either if you are using trpc client or trpc server. The only issue was that I had to read the documentation since I had experience with an older trpc version so there were some changes.
- **Next.js Server Actions**: Challenges with form handling, validation, or error states?
  None of them
- **State management complexity**: Issues with managing like states across components?
  The useOptimistic hook was a bit tricky, I had to read the documentation and understand how it works.
- **Styling and responsive design**: Challenges with creating an attractive, mobile-friendly layout?
  No, I just create a prompt and verify if everything was working well with my rules. And about the mobile layout, I think we are using a max breakpoints classes so there will be no issues, I guess
- **TypeScript complexities**: Any type inference issues or complex generic types?
  Yeah, for some reason seems like react-hook-form and zod has an error I was trying to use zodResolver and the useForm hook from react-hook-form but it keeps me throwing a compile error. This never happened to me before when using these libraries.

We value transparency and a growth mindset! Don't be afraid to discuss what didn't work initially and how you iterated to find a better solution.

The useOptimistic hook was painful, some articles said something, and other said something else. I had to read the documentation and understand how it works

---

## 5. Implementation Results & Quality Assessment

### Feature Completeness

- **Gallery Page**: Does it successfully fetch and display all setups in an attractive grid/list format?
- **Like Functionality**: Do the like buttons work correctly with proper state management?
- **Submission Form**: Does it handle validation, display errors, and successfully submit data?
- **Server-side Processing**: Are Server Actions properly implemented with Zod validation?

### Code Quality Metrics

- **Type Safety**: Is the application fully type-safe from API to UI components?
- **Component Reusability**: How well are components structured for reuse and maintainability?
- **Error Handling**: How gracefully does the application handle edge cases and errors?
- **Performance**: Are there any obvious performance bottlenecks or optimization opportunities?

### Advanced Challenge Implementation

If you attempted any of the advanced challenges:

- **Optimistic UI**: How smooth is the user experience with optimistic updates?
  The best IMO.
- **Shared Validation**: How effectively did you reuse Zod schemas between client and server?
  Just like a normal person when working with monorepos
- **Component Architecture**: What advanced patterns did you implement and why?
  Compound patterns since we are using shadcn and props composition.

### Self-Assessment

- What aspects of your implementation are you most proud of?
  The optimistic updates useOptimistic. I never used it before, so I had to learn it.
  Yeah, I probably think that I can use it in my next projects

- What would you refactor if you were to start over?
  That would be the whole project, I was a bit lost when I didn't get the instructions.
  The rest are good.

- How does your solution balance feature completeness with code quality?
  I would like to create a wrapper for our database and work with models and entities. Since we are using typescript and like always there is a case when we need to build a mobile-app, we need to have a good approach to handle the types.

- What would you prioritize improving with more time?
  The states, even if I used simple useState, I would like to use a more advanced solution like zustand.
