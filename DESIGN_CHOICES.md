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
- **Server Components vs Client Components**: How did you decide which components should be Server Components? What are the performance implications?

### State Management for Likes

- **How did you implement the like functionality?** Did you use simple React state, Context API, or a more advanced solution?
- **Did you implement optimistic updates?** If so, how did you handle the `useOptimistic` hook? If not, what would be your approach?
- **Local vs Persistent State**: The challenge specifies in-memory state is sufficient. How would you extend this to persistent storage?

### Form Handling & Validation

- **Client-side vs Server-side validation**: How did you balance user experience with security? Did you implement both?
- **Zod schema design**: How did you structure your validation schema? Did you reuse it between client and server?
- **Error handling**: How do you display validation errors to users? What's your strategy for handling both field-level and form-level errors?

### Component Architecture & Design Patterns

- **Component composition**: How did you break down your UI into reusable components? What patterns did you use (e.g., compound components, render props)?
- **Styling approach**: Did you use Tailwind CSS classes directly, create custom components, or use a component library? What influenced your decision?
- **Image optimization**: How did you handle the setup images? Did you use Next.js Image component for optimization?

### Type Safety & Developer Experience

- **TypeScript integration**: How did you ensure type safety across your tRPC calls, form handling, and component props?
- **Error boundaries**: Did you implement error handling for failed API calls or component errors?

---

## 3. Future Improvements & Next Steps

No project is ever truly "finished." If you had another week to work on this, what would you do next? What would you prioritize, and why?

**⏰ If You Ran Out of Time:** If you didn't complete all the implementation within 3-4 hours, please document what you would have done here. We completely understand and want to respect your time! Describe your planned approach for any unfinished components.

Consider these areas:

### User Experience Enhancements

- **Search and filtering**: How would you implement search by title/author or filtering by tags?
- **Infinite scroll or pagination**: How would you handle larger datasets?
- **Responsive design improvements**: What mobile-specific optimizations would you add?

### Performance Optimizations

- **Image loading strategies**: How would you implement lazy loading, blur placeholders, or WebP conversion?
- **Caching strategies**: Where would you add caching (browser, CDN, server-side)?
- **Bundle optimization**: How would you reduce JavaScript bundle size?

### Feature Expansions

- **User authentication**: How would you integrate with the existing better-auth system?
- **Real-time updates**: How would you implement live like counts across users?
- **Setup detail pages**: How would you create individual setup pages with more information?
- **Comment system**: How would you add commenting functionality to setups?

### Production Readiness

- **Database integration**: How would you migrate from mock data to a real database?
- **File uploads**: How would you implement image uploading for new submissions?
- **Rate limiting**: How would you prevent spam submissions?
- **Monitoring and analytics**: What metrics would you track?

---

## 4. Challenges Faced & Lessons Learned

What was the hardest part of this challenge for you? How did you overcome it? What did you learn along the way?

This is a great place to talk about:

- **tRPC integration challenges**: Any issues with server-side calling patterns or type generation?
- **Next.js Server Actions**: Challenges with form handling, validation, or error states?
- **State management complexity**: Issues with managing like states across components?
- **Styling and responsive design**: Challenges with creating an attractive, mobile-friendly layout?
- **TypeScript complexities**: Any type inference issues or complex generic types?

We value transparency and a growth mindset! Don't be afraid to discuss what didn't work initially and how you iterated to find a better solution.

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
- **Shared Validation**: How effectively did you reuse Zod schemas between client and server?
- **Component Architecture**: What advanced patterns did you implement and why?

### Self-Assessment

- What aspects of your implementation are you most proud of?
- What would you refactor if you were to start over?
- How does your solution balance feature completeness with code quality?
- What would you prioritize improving with more time?