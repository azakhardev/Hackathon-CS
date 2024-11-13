import { IAutomation } from "../types/IAutomation";
import { IAutomationLogs } from "../types/IAutomationLogs";
import login from "../helpers/api/auth";
import { IAutomationType } from "../types/IAutomationType";

export class AutomationModel{
    static async getAutomation(): Promise<IAutomation[]> {
        const response = await fetch('https://hackaton-api.fly.dev/api/v1/automations', {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${login}`
            }
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    }
    
    static async getAutomationById(id: string): Promise<IAutomation> {
        const response = await fetch(`https://hackaton-api.fly.dev/api/v1/automations/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${login}`
            }
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    }

    static async getAutomationLogs(id: string): Promise<IAutomationLogs> {
        const response = await fetch(`https://hackaton-api.fly.dev/api/v1/automations/${id}/logs`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${login}`
            }
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    }

    static async getAutomationTypes(): Promise<IAutomationType[]>{
        const response = await fetch('https://hackaton-api.fly.dev/api/v1/automation-types', {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${login}`
            }
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    }

    static async getAutomationType(type: string): Promise<IAutomationType>{
        const response = await fetch(`https://hackaton-api.fly.dev/api/v1/automation-types/${type}`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${login}`
            }
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    }
}