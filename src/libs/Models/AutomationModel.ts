import { IAutomation } from "../types/IAutomation";
import { IAutomationLogs } from "../types/IAutomationLogs";
import login from "../helpers/api/auth";
import { IAutomationType } from "../types/IAutomationType";
import { IErrorMessage } from "../types/IErrorMessage";

export class AutomationModel{
    static async getAutomations(): Promise<IAutomation[] | IErrorMessage> {
        const response = await fetch('https://hackaton-api.fly.dev/api/v1/automations', {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${login}`
            }
        });

        return response.json();
    }
    
    static async getAutomationById(id: string): Promise<IAutomation | IErrorMessage> {
        const response = await fetch(`https://hackaton-api.fly.dev/api/v1/automations/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${login}`
            }
        });

        return response.json();
    }

    static async getAutomationLogs(id: string): Promise<IAutomationLogs | IErrorMessage> {
        const response = await fetch(`https://hackaton-api.fly.dev/api/v1/automations/${id}/logs`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${login}`
            }
        });

        return response.json();
    }

    static async getAutomationTypes(): Promise<IAutomationType[] | IErrorMessage>{
        const response = await fetch('https://hackaton-api.fly.dev/api/v1/automation-types', {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${login}`
            }
        });

        return response.json();
    }

    static async getAutomationType(type: string): Promise<IAutomationType | IErrorMessage>{
        const response = await fetch(`https://hackaton-api.fly.dev/api/v1/automation-types/${type}`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${login}`
            }
        });

        return response.json();
    }
}