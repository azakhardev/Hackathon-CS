import { useQuery } from "@tanstack/react-query";
import { AutomationModel } from "../../libs/Models/AutomationModel";

export default function ApiAutomationTest() {

  const automation = useQuery({
    queryKey: ["data"],
    queryFn: async () => await AutomationModel.getAutomationType('GITHUB_COPILOT_REMOVE_INACTIVE_USERS') 
    });
  if (automation.isLoading) return <div>Loading...</div>;
  if (automation.error) return <div>Error: {automation.error?.message}</div>;

  console.log(automation.data)
  return (
    <div className="App">
        <div className="p-20">
          <div>{automation.data?.type}</div>
          <div>{automation.data?.initial_state}</div>
          <div>{automation.data?.end_state}</div>
          {automation.data?.states.map((state, index) => (
            <div key={index}>{state}</div>
          ))}
          {automation.data?.transitions.map((transition, index) => (
            <div key={index}>
              <div>{transition.from_state}</div>
              <div>{transition.to_state}</div>
              <div>{transition.event}</div>
              <div>{transition.action}</div>
            </div>
          ))}
        </div>
    </div>
  );
}