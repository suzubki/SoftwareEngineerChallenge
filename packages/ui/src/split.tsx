import { cn } from "@acme/ui";

export const Split = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("flex items-center", className)} {...props}>
      {children}
    </div>
  );
};
