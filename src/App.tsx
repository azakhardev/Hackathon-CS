import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import "./App.css";
import ApiAutomationTest from "./components/features/ApiAutomationTest";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ApiAutomationTest />
    </QueryClientProvider>
  );
}

export default App;