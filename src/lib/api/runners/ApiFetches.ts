import login from "../../helpers/api/auth";
import { IErrorMessage } from "../../types/IErrorMessage";

export async function getSAS(): Promise<string[] | IErrorMessage> {
  const response = await fetch("https://hackaton-api.fly.dev/api/v1/sas", {
    method: "GET",
    headers: {
      Authorization: `Basic ${login}`,
      "Content-Type": "application/json",
    },
  });

  return response.json();
}
