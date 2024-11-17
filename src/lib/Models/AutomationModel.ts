import { IAutomation } from "../types/IAutomation";
import { IAutomationLog } from "../types/IAutomationLog";
import { api_auth, api_url } from "../helpers/api/env_vars";
import { IAutomationType } from "../types/IAutomationType";
import { IErrorMessage } from "../types/IErrorMessage";

export class AutomationModel {
  static async getAutomations(
    limit = 10
  ): Promise<IAutomation[] | IErrorMessage> {
    const response = await fetch(
      `${api_url}/automations?` +
        new URLSearchParams({
          limit: limit.toString(),
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

  static async getAutomationById(
    id: string
  ): Promise<IAutomation | IErrorMessage> {
    const response = await fetch(`${api_url}/automations/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${api_auth}`,
      },
    });

    return response.json();
  }

  static async getAutomationLogs(
    id: string
  ): Promise<IAutomationLog[] | IErrorMessage> {
    const response = await fetch(`${api_url}/automations/${id}/logs`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${api_auth}`,
      },
    });
    return response.json();
  }

  static async getAutomationTypes(): Promise<
    IAutomationType[] | IErrorMessage
  > {
    const response = await fetch(`${api_url}/automation-types`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${api_auth}`,
      },
    });

    return response.json();
  }

  static async getAutomationType(
    type: string
  ): Promise<IAutomationType | IErrorMessage> {
    const response = await fetch(`${api_url}/automation-types/${type}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${api_auth}`,
      },
    });

    return response.json();
  }
}
