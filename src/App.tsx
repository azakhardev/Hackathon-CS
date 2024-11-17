import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RunnersPage from "./pages/RunnersPage";
import AutomationsPage from "./pages/AutomationsPage";
import Layout from "./components/layout/_Layout";
import ChartTest from "./components/features/grapghs/ChartTest";
import JobsPage from "./pages/JobsPage";
import RunnerDetailPage from "./pages/RunnerDetailPage";
import AutomationDetailPage from "./pages/AutomationDetailPage";
import { ThemeProvider } from "./components/theme-provider";
import MetricsPage from "./pages/MetricsPage";
import ProjectsPage from "./pages/ProjectsPage";
import AutomationTypesPage from "./pages/AutomationTypesPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/projects", element: <ProjectsPage /> },
      { path: "/runners", element: <RunnersPage /> },
      { path: "/runners/:id", element: <RunnerDetailPage /> },
      { path: "/jobs", element: <JobsPage /> },
      { path: "/metrics", element: <MetricsPage /> },
      { path: "/automations", element: <AutomationsPage /> },
      { path: "/automations/:id", element: <AutomationDetailPage /> },
      { path: "/automationTypes", element: <AutomationTypesPage /> },
    ],
  },
  {
    path: "/test",
    element: <Layout />,
    children: [{ path: "chart", element: <ChartTest /> }],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
