export interface IAutomationLog{
    automation_id: string;
    timestamp: string;
    level: string;
    type: string;
    from_state: string;
    to_state: string;
    description: string;
}