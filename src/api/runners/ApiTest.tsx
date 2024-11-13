//import login from "../../helpers/api/auth";

const login = btoa("dopo:DevOps2024");
export async function getSAS() {
  const response = await fetch("https://hackaton-api.fly.dev/api/v1/sas", {
    method: "GET",
    headers: {
      Authorization: `Basic ${login}`,
      "Content-Type": "application/json",
    },
  });
  return response.json();
}
