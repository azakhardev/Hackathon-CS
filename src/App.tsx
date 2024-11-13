import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { AutomationModel } from "./lib/Models/AutomationModel";

function App() {
  const automations = useQuery({
    queryKey: ["data"],
    queryFn: async () => await AutomationModel.getAutomation() 
  });

  // const automation = useQuery({
  //   queryKey: ["data"],
  //   queryFn: async () => await AutomationModel.getAutomationById("GITHUB_REMOVE_COLLABORATORS-12345") 
  // });

  if (automations.isLoading) return <div>Loading...</div>;
  if (automations.error) return <div>Error: {automations.error.message}</div>;

  return (
    <div className="App">
      {automations.data?.map((automation, index: number) => (
        <div className="p-20" key={index}>
          <div>{automation.id}</div>
          <div>{automation.last_activity}</div>
          <div>{automation.state}</div>
          <div>{automation.type}</div>  
        </div>
      ))}
    </div>
  );
}

export default App;