import { cn } from "@acme/ui";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Stack: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {children}
    </div>
  );
};
