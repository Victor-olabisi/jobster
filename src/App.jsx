import { Landing, Register, Error } from "./pages"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Stat, SharedLayout, AllJobs, AddJobs, Profile } from "./pages/dashboard"
// import ProtectedRouted from "./utils/ProtecteDRoute";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stat />} />
          <Route path="add-jobs" element={<AddJobs />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="landing" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
