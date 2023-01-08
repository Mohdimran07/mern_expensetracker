import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import PrivateRoute from "./components/utils/PrivateRoute";
import AddItems from "./components/form/AddItems";


function App() {
  return (
    <>
      <Router>
        <div className="container-fluid m-0 p-0">
          <Routes>
            
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path='/addExpense' element={<AddItems />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
