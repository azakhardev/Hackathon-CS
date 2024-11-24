import { BadgeProps, badgeVariants } from "@/lib/types/IBadgeProps";
import { cn } from "@/lib/utils";

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
