import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth } from "./components/Auth";
import AddPerson from "./components/AddPerson";
import Dashboard from "./components/Dashboard";
import UpdatePerson from "./components/UpdatePerson";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Route */}
        <Route path="/Auth" element={<Auth />} />
        
        {/* Dashboard Route */}
        <Route path="/Dashboard" element={<Dashboard />} />
        
        {/* Add Person Route */}
        <Route path="/AddPerson" element={<AddPerson />} />
        
        {/* Update Person Route */}
        <Route path="/UpdatePerson" element={<UpdatePerson />} />
        
        {/* Default Route */}
        <Route path="*" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;
