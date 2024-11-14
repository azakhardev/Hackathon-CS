export interface IMetrics{
    metrics: {
        cpu: number;
        memory: number;
        network_receive: number;
        network_transmit: number;
        fs_reads: number;
        fs_writes: number;
    }[]
    runner: string
}