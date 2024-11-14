import login from "../helpers/api/auth";
import { IErrorMessage } from "../types/IErrorMessage";
import { IJobs } from "../types/IJobs";
import { IMetrics } from "../types/IMetrics";
import { IRunner } from "../types/IRunner";

export class RunnerModel {

    static async getSAS(): Promise<string[] | IErrorMessage> {
        const response = await fetch('https://hackaton-api.fly.dev/api/v1/sas', {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${login}`
            }
        });

        return response.json();
    }

    static async getRunners(): Promise<IRunner[] | IErrorMessage> {
        const response = await fetch('https://hackaton-api.fly.dev/api/v1/runners', {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${login}`
            }
        });

        return response.json();
    }

    static async getRunnerById(id: string): Promise<IRunner | IErrorMessage> {
        const response = await fetch(`https://hackaton-api.fly.dev/api/v1/runners/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${login}`
            }
        });

        return response.json();
    }

    static async getJobs(sas?: string): Promise<IJobs[] | IErrorMessage> {
        const response = await fetch(`https://hackaton-api.fly.dev/api/v1/jobs?` + new URLSearchParams({
            search: sas ?? ""
        }), {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${login}`
            }
        });

        return response.json();
    }

    static async getJobsById(id: string): Promise<IJobs | IErrorMessage> {
        const response = await fetch(`https://hackaton-api.fly.dev/api/v1/jobs/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${login}`
            }
        });

        return response.json();
    }

    static async getMetrics(): Promise<IMetrics[] | IErrorMessage> {
        const response = await fetch(`https://hackaton-api.fly.dev/api/v1/metrics`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${login}`
            }
        });

        return response.json();
    }

    static async getMetricsByRunner(id: string): Promise<IMetrics | IErrorMessage> {
        const response = await fetch(`https://hackaton-api.fly.dev/api/v1/metrics/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${login}`
            }
        });

        return response.json();
    }
}