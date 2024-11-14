import { useQuery } from "@tanstack/react-query";
import { getSAS } from "../../lib/api/runners/ApiFetches";
import { IErrorMessage } from "../../lib/types/IErrorMessage";

export default function ApiTestFrontend() {
  const { isPending, isError, data, error } = useQuery<
    string[] | IErrorMessage
  >({
    queryKey: ["getSAS"],
    queryFn: getSAS,
  });

  if (isPending) return <span>...</span>;

  if (isError) return <span>{error.message}</span>;

  if ("error" in data) {
    return (
      <div>
        <p>
          Error {data.code}: {data.error}
        </p>
        <p>{data.message}</p>
      </div>
    );
  }

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
