import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import PuzzlePage from "./pages/PuzzlePage";
import ScorePage from "./pages/ScorePage";
import HomeNavbar from "./components/HomeNavbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./contexts/authContext";

// USed so that the redirect to the /puzzle route works
function LayoutWrapper() {
  return (
    <div>
      <HomeNavbar />
      <Outlet />
    </div>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<LayoutWrapper />}>
      {" "}
      {/* Layout wraps all routes */}
      <Route index element={<Navigate to="/puzzle" replace />} />{" "}
      {/* Redirect root to /puzzle */}
      <Route path="puzzle" element={<PuzzlePage />} />
      <Route path="scores" element={<ScorePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Route>
  )
);

function App() {
  return (
    <div>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
