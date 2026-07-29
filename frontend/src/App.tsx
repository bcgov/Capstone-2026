import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home.tsx";
import Login from "./components/Login.tsx"
import PrivateRoute from "./components/PrivateRoute.tsx";
import FormBuilderPage from "./dashboard/pages/FormBuilderPage";
import FormsPage, { type FormSummary } from "./dashboard/pages/FormsPage";
import "./App.css";
import { AuthProvider } from "./auth/AuthContext.tsx";
import { MetabaseDashboard } from "./dashboard/pages/MetabaseDashboard.tsx";
import { useState } from "react";

function App() {
  const [forms, setForms] = useState<FormSummary[]>([]); 
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <FormBuilderPage />
              </PrivateRoute>
            }
          />
          <Route path="/dashboard/formBuilder" element={<FormBuilderPage />} />
          <Route path="/dashboard/forms" element={<FormsPage forms={forms} setForms={setForms} />} />
          <Route path="/dashboard/metabase/:dashboardId" element={<MetabaseDashboard forms={forms} setForms={setForms}/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
