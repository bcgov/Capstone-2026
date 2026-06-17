import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home.tsx";
import FormBuilderPage from "./dashboard/pages/FormBuilderPage";
import FormsPage from "./dashboard/pages/FormsPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/formBuilder" element={<FormBuilderPage />} />
        <Route path="/dashboard/forms" element={<FormsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
