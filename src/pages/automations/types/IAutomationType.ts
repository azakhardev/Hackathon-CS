export interface IAutomationType{
    type: string;
    states: string[];
    initial_state: string;
    end_state: string;
    transitions:{
        from_state: string,
        to_state: string,
        event: string,
        action: string
    }[]
}