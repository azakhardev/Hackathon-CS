import { api_auth, api_url } from "../../../lib/utils/env_vars";
import { IErrorMessage } from "../../../lib/types/IErrorMessage";
import { IJobs } from "../../jobs/types/IJobs";
import { IMetrics } from "../../metrics/types/IMetrics";
import { IRunner } from "../types/IRunner";

export class RunnerModel {
  static async getSAS(search: string): Promise<string[] | IErrorMessage> {
    const params = new URLSearchParams({
      search: search ?? "",
    });

    const response = await fetch(`${api_url}/sas?${params}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${api_auth}`,
      },
    });

    return response.json();
  }

  static async getRunners(
    search?: string,
    limit?: number,
    page?: number,
    sort?: string,
    order?: "asc" | "desc",
    filters?: Record<string, string>
  ): Promise<IRunner[] | IErrorMessage> {
    const params = new URLSearchParams({
      search: search ?? "",
      limit: limit?.toString() ? limit!.toString() : "-1",
      page: page?.toString() ?? "1",
      sort: sort ?? "",
      order: order ?? "asc",
    });

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        params.append(key, value);
      });
    }
    
    const response = await fetch(`${api_url}/runners?${params}`, {
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

  static async getJobs(
    search?: string,
    limit?: number,
    page?: number,
    sort?: string,
    order?: "asc" | "desc",
    filters?: Record<string, string>
  ): Promise<IJobs[] | IErrorMessage> {
    const params = new URLSearchParams({
      search: search ?? "",
      limit: limit?.toString() ? limit!.toString() : "-1",
      page: page?.toString() ?? "1",
      sort: sort ?? "",
      order: order ?? "asc",
    });

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        params.append(key, value);
      });
    }

    console.log(`${api_url}/jobs?${params}`);

    const response = await fetch(`${api_url}/jobs?${params}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${api_auth}`,
      },
    });

    return response.json();
  }

  static async getProjectLatestJobs(
    limit: string,
    sort: string,
    order: string,
    search: string
  ): Promise<IJobs | IErrorMessage> {
    const response = await fetch(
      `${api_url}/jobs/${new URLSearchParams({
        limit: limit,
        sort: sort,
        order: order,
        search: search,
      })}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${api_auth}`,
        },
      }
    );

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

  static async getMetrics(
    search?: string,
    limit?: number,
    page?: number,
    sort?: string,
    order?: "asc" | "desc",
    filters?: Record<string, string>
  ): Promise<IMetrics[] | IErrorMessage> {
    const params = new URLSearchParams({
      search: search ?? "",
      limit: limit?.toString() && search ? limit!.toString() : "-1",
      page: page?.toString() ?? "1",
      sort: sort ?? "",
      order: order ?? "asc",
    });

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        params.append(key, value);
      });
    }

    const response = await fetch(`${api_url}/metrics?${params}`, {
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
