import { useQuery } from "@tanstack/react-query";
import { getSAS } from "../api/runners/ApiTest";

export default function ApiTestFrontend() {
  const { isPending, isError, data, error } = useQuery<string[]>({
    queryKey: ["getSAS"],
    queryFn: getSAS,
  });

  if (isPending) return <span>...</span>;

  if (isError) return <span>{error.message}</span>;

  return (
    <div>
      {data.map((item, i) => (
        <p key={i}>
          {i + 1}. {item}
        </p>
      ))}
    </div>
  );
}
