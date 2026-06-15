import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home.tsx";
import FormBuilderPage from "./dashboard/pages/FormBuilderPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<FormBuilderPage />} />
      </Routes>
    </Router>
  );
}

export default App;
