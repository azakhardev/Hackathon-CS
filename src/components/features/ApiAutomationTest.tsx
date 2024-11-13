import { useQuery } from "@tanstack/react-query";
import { RunnerModel } from "../../libs/Models/RunnerModel";
import { getSAS } from "../../libs/api/runners/ApiFetches";
import { useState } from "react";

export default function ApiAutomationTest() {

  const [jobSas, setJobSas] = useState<string | undefined>(undefined);
  const [runnerId, setRunnerId] = useState<string | undefined>(undefined);

  const sas = useQuery({
    queryKey: ["data"],
    queryFn: async () => await getSAS()
  });

  const jobs = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => await RunnerModel.getJobs()
    
  });

  const runners = useQuery({
    queryKey: ["runners"],
    queryFn: async () => await RunnerModel.getRunners()
  });

  console.log(runners.data)

  const handleClickSas = (s: string) => {
      setJobSas(s)
  };

  const handleClickJobs = (runner: string) => {
    setRunnerId(runner)
  };

  if (sas.isLoading || jobs.isLoading || runners.isLoading) return <div>Loading...</div>;
  if (sas.error) return <div>Error: {sas.error?.message}</div>;
  if (jobs.error) return <div>Error: {jobs.error?.message}</div>;
  if (runners.error) return <div>Error: {runners.error?.message}</div>;

  return (
    <div className="App">
      <div className="p-20 flex flex-col gap-5">
=        {sas.data?.map((s, index) => (
          <button onClick={() => handleClickSas(s)} key={index}>{s}</button>
        ))}

        <div className="p-20 flex flex-col">
          {jobs.data?.map((job, index) => (
            job.SAS === jobSas && (
              <button onClick={() => handleClickJobs(job.runner)} key={index}>
                {job.id} - SAS: {job.SAS} {job.runner}
              </button>
            )
          ))}
        </div>


         <div className="p-20">
          <h2>Runners Data:</h2>
          {runners.data?.map((runner, index) => (
            runner.id === runnerId && (
              <div key={index}>
                {runner.id} {runner.runner_group} {runner.organization} {runner.state}
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
