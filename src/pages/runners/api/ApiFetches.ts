import { api_auth, api_url } from "@/lib/utils/env_vars";
import { IErrorMessage } from "@/lib/types/IErrorMessage";

export async function getSAS(): Promise<string[] | IErrorMessage> {
  const response = await fetch(`${api_url}/api/v1/sas`, {
    method: "GET",
    headers: {
      Authorization: `Basic ${api_auth}`,
      "Content-Type": "application/json",
    },
  });

  return response.json();
}
