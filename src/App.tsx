import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { getAutomatization } from "./lib/apiActions/getAutomation";

function App() {
  const automatization = useQuery({
    queryKey: ["data"],
    queryFn: async () => await getAutomatization() 
    });

  if (automatization.isLoading) return <div>Loading...</div>;
  if (automatization.error) return <div>Error: {automatization.error.message}</div>;

  return (
    <div className="App">
      {automatization.data?.map((automat, index: number) => (
        <div className="p-20" key={index}>
          <div>{automat.id}</div>
          <div>{automat.last_activity}</div>
          <div>{automat.state}</div>
          <div>{automat.type}</div>
        </div>
      ))}
    </div>
  );
}

export default App;