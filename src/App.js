import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import Login from "./login/Login.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
