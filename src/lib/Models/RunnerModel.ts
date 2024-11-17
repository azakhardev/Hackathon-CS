import { api_auth, api_url } from "../helpers/api/env_vars";
import { IErrorMessage } from "../types/IErrorMessage";
import { IJobs } from "../types/IJobs";
import { IMetrics } from "../types/IMetrics";
import { IRunner } from "../types/IRunner";

export class RunnerModel {
  static async getSAS(search: string): Promise<string[] | IErrorMessage> {
    const response = await fetch(`${api_url}/sas?${new URLSearchParams({search: search == "" ? "" : search})}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${api_auth}`,
      },
    });

    return response.json();
  }

  static async getRunners(search: string): Promise<IRunner[] | IErrorMessage> {
    const response = await fetch(`${api_url}/runners?${new URLSearchParams({search: search == "" ? "" : search})}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${api_auth}`,
      },
    });

    return response.json();
  }

  static async getRunnersLimit(page: string, limit:string): Promise<IRunner[] | IErrorMessage> {
    const response = await fetch(`${api_url}/runners?${new URLSearchParams({page: page ?? "", limit: limit ?? "" })}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${api_auth}`,
      },
    });
    
    return response.json();
  }

  static async getRunnerById(id: string): Promise<IRunner | IErrorMessage> {
    const response = await fetch(`${api_url}/runners/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${api_auth}`,
      },
    });

    return response.json();
  }

  static async getJobs(sas?: string): Promise<IJobs[] | IErrorMessage> {
    const response = await fetch(
      `${api_url}/jobs?` +
        new URLSearchParams({
          search: sas ?? "",
        }),
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${api_auth}`,
        },
      }
    );

    return response.json();
  }

  static async getJobsLimit(page: string, limit:string): Promise<IRunner[] | IErrorMessage> {
    const response = await fetch(`${api_url}/jobs?${new URLSearchParams({page: page ?? "", limit: limit ?? "" })}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${api_auth}`,
      },
    });
    
    return response.json();
  }

  static async getProjectLatestJobs( limit:string, sort: string, order: string, search: string, ): Promise<IJobs | IErrorMessage> {
    const response = await fetch(`${api_url}/jobs/${new URLSearchParams({limit: limit, sort: sort ,order: order, search: search, })}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${api_auth}`,
      },
    });

    return response.json();
  }

  static async getJobsById(id: string): Promise<IJobs | IErrorMessage> {
    const response = await fetch(`${api_url}/jobs/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${api_auth}`,
      },
    });

    return response.json();
  }

  static async getMetrics(): Promise<IMetrics[] | IErrorMessage> {
    const response = await fetch(`${api_url}/metrics`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${api_auth}`,
      },
    });

    return response.json();
  }

  static async getMetricsByRunner(
    id: string
  ): Promise<IMetrics | IErrorMessage> {
    const response = await fetch(`${api_url}/metrics/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${api_auth}`,
      },
    });

    return response.json();
  }
}
