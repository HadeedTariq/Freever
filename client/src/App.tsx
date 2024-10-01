import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./routes/auth/Register";
import Login from "./routes/auth/Login";
import ResetPassword from "./routes/auth/ResetPassword";

function App() {
  return (
    <Routes>
      <Route path="/auth">
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="resetPassword" element={<ResetPassword />} />
      </Route>
    </Routes>
  );
}

export default App;
