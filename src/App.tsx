import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RunnersPage from "./pages/RunnersPage";
import AutomationsPage from "./pages/AutomationsPage";
import MainLayout from "./components/layout/MainLayout";
import ChartTest from "./components/features/grapghs/ChartTest";
import JobsPage from "./pages/JobsPage";
import RunnerDetailsPage from "./pages/RunnerDetailsPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/sas", element: <div /> },
      { path: "/runners", element: <RunnersPage /> },
      { path: "/runnerInfo/:id", element: <RunnerDetailsPage /> },
      { path: "/jobs", element: <JobsPage /> },
      { path: "/metrics", element: <div /> },
      // { path: "/metrics/:runnerId", element: <div /> },
      { path: "/automations", element: <AutomationsPage /> },
      { path: "/automations/:id", element: <AutomationsPage /> },
      // { path: "/logs/:automationId", element: <div /> },
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
