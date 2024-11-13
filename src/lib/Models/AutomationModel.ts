import { IAutomation } from "../types/iAutomation";

export class AutomationModel{
    static async getAutomation(): Promise<IAutomation[]> {
        const username = import.meta.env.VITE_USERNAME
        const password = import.meta.env.VITE_PASSWORD

        const credentials = btoa(`${username}:${password}`);

        const response = await fetch('https://hackaton-api.fly.dev/api/v1/automations', {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    }
    
    static async getAutomationById(id: string): Promise<IAutomation> {
        const username = import.meta.env.VITE_USERNAME
        const password = import.meta.env.VITE_PASSWORD

        const credentials = btoa(`${username}:${password}`);

        const response = await fetch(`https://hackaton-api.fly.dev/api/v1/automations/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        console.log(response)
        return response.json();
    }
}