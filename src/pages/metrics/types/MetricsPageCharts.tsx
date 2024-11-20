import CustomPieChart from "@/components/features/charts/CustomPieChart"
import { IAutomation } from "@/pages/automations/_shared/IAutomation"
import { IJobs } from "@/pages/jobs/types/IJobs"
import { IRunner } from "@/pages/runners/types/IRunner"

const AUTOMATIONS_CHART_CONFIG = {
    count: {
        label: "Count"
    },
    initial: {
        label: "Initial",
        color: "hsl(var(--chart-1))",
      },
      in_progress: {
        label: "In Progress",
        color: "hsl(var(--chart-3))",
      },
      finished: {
        label: "Finished",
        color: "hsl(var(--chart-2))",
      }
}
const JOBS_CHART_CONFIG = {}
const RUNNERS_CHART_CONFIG ={}

interface IProps{
automationsData: IAutomation[],
runnersData: IRunner[],
jobsData: IJobs[]
}

export default function MetricsPageCharts(props: IProps){
    const aChartData = createAutomationsData(props.automationsData);
    return (
    <>    
    <div>
        <h1>Automations States</h1>
        <CustomPieChart chartConfig={AUTOMATIONS_CHART_CONFIG} chartData={aChartData} innerRadius={0} /></div>
        
    </>)
}

function createAutomationsData(data: IAutomation[]){
    let newData:object[] = [];
    const initialA = {
        state: "initial",
        count: 0,
        fill: "hsl(var(--chart-1))"        
    }
    const progressA = {
        state: "in_progress",
        count: 0,      
        fill: "hsl(var(--chart-3))"
    }
    const finishedA = {
        state: "finished",
        count: 0,
        fill:"hsl(var(--chart-2))"
    }

    data.forEach(a => {        
        if(a.state.toLowerCase() === "initial"){
            initialA.count ++;
        }else if (a.state.toLowerCase() === "finished"){
            finishedA.count ++;
        }
        else{
            progressA.count++;
        }        
    });

    newData.push(initialA, progressA, finishedA);
    return newData;
}
function createJobsData(){}
function createRunnersData(){}