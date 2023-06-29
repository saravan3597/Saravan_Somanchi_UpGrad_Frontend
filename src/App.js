import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Header from './components/header/header';
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import Products from "./components/products/products";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/products" element={<Products />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
