import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import PermanentDrawerLeft from "./pages/Home/Home";
import TicketSummary from "./pages/TicketSummary/TicketSummary";
import AlertDashboard from "./pages/AlertDashboard/AlertDashboard";
import TicketDashboard from "./pages/TicketDashboard/TicketDashboard";
import TicketStats from "./pages/TicketStats/TicketStats";

function App() {
  // Layout component with Outlet to render child routes
  const Layout = () => {
    return (
      <div className="app">
        <PermanentDrawerLeft />
      </div>
    );
  };

  // Define routes with Layout as parent and the children as route components
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "ticket_summary",
          element: <TicketSummary />,
        },
        {
          path: "alert_dashboard", // Remove leading slash for child paths
          element: <AlertDashboard />,
        },
        {
          path: "ticket_dashboard",
          element: <TicketDashboard />,
        },
        {
          path: "ticket_stats",
          element: <TicketStats />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
