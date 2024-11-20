import { Button } from "@/components/ui/Button";

interface ButtonLoadMoreProps {
  onClick: () => void;
}

export default function ButtonLoadMore({
  onClick,
  children,
  disabled,
}: ButtonLoadMoreProps & { children?: React.ReactNode; disabled?: boolean }) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="w-full"
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
