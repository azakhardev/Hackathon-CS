import { api_auth, api_url } from "../../helpers/api/env_vars";
import { IErrorMessage } from "../../types/IErrorMessage";

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
