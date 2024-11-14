import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import PuzzlePage from "./pages/PuzzlePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to="/puzzle" replace />} />{" "}
      {/* Redirects root to /puzzle */}
      <Route path="/puzzle" element={<PuzzlePage />} />
    </>
  )
);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
