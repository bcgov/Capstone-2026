import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home.tsx";
import Login from "./components/Login.tsx"
import PrivateRoute from "./components/PrivateRoute.tsx";
import FormBuilderPage from "./dashboard/pages/FormBuilderPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <FormBuilderPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
