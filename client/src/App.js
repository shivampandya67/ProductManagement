import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import Products from './components/Products';
import Error from './components/Error';
import ProductData from './components/ProductData';
import EditProduct from './components/EditProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

    return (
        <div>
            <ToastContainer />
            <Router>
                <React.StrictMode>
                    <Routes>
                        <Route exact path='/register' element={<Register />} />
                        <Route exact path='/login' element={<Login />} />
                        <Route exact path='/products' element={<Products />} />
                        <Route exact path='/showProducts' element={<ProductData />} />
                        <Route exact path='/editProduct' element={<EditProduct />} />
                        <Route exact path='*' element={<Error />} />
                    </Routes>

                </React.StrictMode>
            </Router>
        </div>
    );
}

export default App;
