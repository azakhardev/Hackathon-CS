import login from "../helpers/api/auth";
import { IJobs } from "../types/IJobs";
import { IMetrics } from "../types/IMetrics";
import { IRunner } from "../types/IRunner";

export class RunnerModel {
    static async getRunners(): Promise<IRunner[]> {
        const response = await fetch('https://hackaton-api.fly.dev/api/v1/runners', {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${login}`
            }
        });

        return response.json();
    }

    static async getRunnerById(id: string): Promise<IRunner> {
        const response = await fetch(`https://hackaton-api.fly.dev/api/v1/runners/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${login}`
            }
        });

        return response.json();
    }

    static async getJobs(): Promise<IJobs[]> {
        const response = await fetch(`https://hackaton-api.fly.dev/api/v1/jobs`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${login}`
            }
        });

        return response.json();
    }

    static async getJobsById(id: string): Promise<IJobs> {
        const response = await fetch(`https://hackaton-api.fly.dev/api/v1/jobs/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${login}`
            }
        });

        return response.json();
    }

    static async getMetrics(): Promise<IMetrics[]> {
        const response = await fetch(`https://hackaton-api.fly.dev/api/v1/metrics`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${login}`
            }
        });

        return response.json();
    }

    static async getMetricsByRunner(id: string): Promise<IMetrics> {
        const response = await fetch(`https://hackaton-api.fly.dev/api/v1/metrics/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${login}`
            }
        });

        return response.json();
    }
}