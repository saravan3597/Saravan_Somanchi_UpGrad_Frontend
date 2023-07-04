import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Header from './components/header/header';
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import Products from "./components/products/products";
import ProductDetail from "./components/productDetail/productDetail";
import Order from "./components/order/order";
import { Provider } from "react-redux";
import store from "./store/store.js";

function App() {
  return (
    <>
      <Provider store={store}>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/productDetail" element={<ProductDetail />}></Route>
            <Route path="/order" element={<Order />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
