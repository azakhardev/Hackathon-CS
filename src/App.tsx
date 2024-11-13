import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import "./App.css";
import ApiTestFrontend from "./components/ApiTestFrontend";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ApiTestFrontend />
    </QueryClientProvider>
  );
}

export default App;
