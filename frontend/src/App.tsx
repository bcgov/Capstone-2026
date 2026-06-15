import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home.tsx";
import Login from "./components/Login.tsx"
import PrivateRoute from "./components/PrivateRoute.tsx";
import FormBuilderPage from "./dashboard/pages/FormBuilderPage";
import "./App.css";
import { AuthProvider } from "./auth/AuthContext.tsx";

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
                <FormBuilderPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
