import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import RunnersPage from "./pages/runners/RunnersPage";
import AutomationsPage from "./pages/automations/automations/AutomationsPage";
import Layout from "./pages/_layout/_Layout";
import JobsPage from "./pages/jobs/JobsPage";
import RunnerDetailPage from "./pages/runners/RunnerDetailPage";
import AutomationDetailPage from "./pages/automations/detail/AutomationDetailPage";
import { ThemeProvider } from "./components/theme-provider";
import MetricsPage from "./pages/metrics/MetricsPage";
import ProjectsPage from "./pages/projects/ProjectsPage";
import AutomationTypesPage from "./pages/automations/automationTypes/AutomationTypesPage";
import ProjectDetailPage from "./pages/projects/ProjectDetailPage";
import { LoginPage } from "./pages/login/LoginPage";
import { createContext } from "react";
import { ILogin } from "./lib/types/ILogin";

const queryClient = new QueryClient();
const LoginContext = createContext<ILogin | null>(null);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/projects", element: <ProjectsPage /> },
      { path: "/projects/:id", element: <ProjectDetailPage /> },
      { path: "/projects/:project/automations", element: <AutomationsPage /> }, // prettier-ignore
      { path: "/projects/:project/automations/:id", element: <AutomationDetailPage /> }, // prettier-ignore
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
    path: "/login",
    children: [{ index: true, element: <LoginPage /> }],
  },
]);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <LoginContext.Provider value={{ username: "xxx", password: "yyy" }}>
          <RouterProvider router={router} />
        </LoginContext.Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
