import { Button } from "@/components/ui/Button";

interface ButtonLoadMoreProps {
  onClick: () => void;
}

export default function ButtonLoadMore({ onClick }: ButtonLoadMoreProps) {
  return (
    <Button variant="outline" onClick={onClick}>
      Load more
    </Button>
  );
}
