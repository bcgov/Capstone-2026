import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home.tsx";
import Login from "./components/Login.tsx"
import PrivateRoute from "./components/PrivateRoute.tsx";
import FormBuilderPage from "./dashboard/pages/FormBuilderPage";
import FormsPage from "./dashboard/pages/FormsPage";
import "./App.css";
import { AuthProvider } from "./auth/AuthContext.tsx";
import MetabaseDashboard from "./dashboard/pages/MetabaseDashboard.tsx";

function App() {
  return (
    <AuthProvider>
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
                <MetabaseDashboard apiBaseUrl="http://localhost:3000" />
              </PrivateRoute>
            }
          />
          <Route path="/dashboard/formBuilder" element={<FormBuilderPage />} />
          <Route path="/dashboard/forms" element={<FormsPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
