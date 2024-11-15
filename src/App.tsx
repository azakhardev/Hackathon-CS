import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import RunnersPage from "./pages/Runners";
import AutomationsPage from "./pages/Automations";
import MainLayout from "./components/layout/MainLayout";
import ChartTest from "./components/features/grapghs/ChartTest";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/runners", element: <RunnersPage /> },
      { path: "/automations", element: <AutomationsPage /> },
    ],
  },
  {
    path: "/test",
    element: <MainLayout />,
    children: [{ path: "chart", element: <ChartTest /> }],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
