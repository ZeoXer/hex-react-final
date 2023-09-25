import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/AdminProducts";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin" element={<Dashboard />}>
          <Route path="products" element={<AdminProducts />}></Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
