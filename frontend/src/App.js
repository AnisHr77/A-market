import { useEffect, useRef } from "react";
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';

import Shop from './pages/Shop';
import ShopCategory from './pages/ShopCategory';
import Product from './pages/Product';
import CardPage from './pages/CardPage';
import Login from './pages/Login';
import Chat from './pages/Chat';
import DelivryPage from './pages/DelivryPage';
import Bookmark from './pages/Bookmark';
import Settings from './pages/Settings';
import NavbarLeft from './Components/NavbarLeft/NavbarLeft';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader.jsx';
import  Help from './pages/Help'

import { CartProvider } from './Context/CartContext';
import { FavoritesProvider } from './Context/FavoritesContext';
import { LoadingProvider, useLoading } from './Context/LoadingContext';

const AppContent = () => {
    const location = useLocation();
    const { loading, setLoading } = useLoading();
    const prevLocationKey = useRef(location.key);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const hasCategoryParam = params.has('category');

        setLoading(true);

        if (hasCategoryParam) {
            // Immediately hide loader if category param exists
            setLoading(false);
            return;
        }

        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1200);

        return () => clearTimeout(timeout);
    }, [location, setLoading]);


    return (
        <>
            <ToastContainer position="top-right" autoClose={1500} pauseOnHover theme="colored" />
            {loading ? (
                <div className="loading-screen">
                    <Loader />
                </div>
            ) : (
                <div className="app-content">
                    <NavbarLeft />
                    <Routes>
                        <Route path="/" element={<Shop />} />
                        <Route path="/products" element={<Product />} />
                        <Route path="/product/:productID" element={<Product />} />
                        <Route path="/Card" element={<CardPage />} />
                        <Route path="/Login" element={<Login />} />
                        <Route path="/help" element={<Help />} />
                        <Route path="/Chat" element={<Chat />} />
                        <Route path="/Delivry" element={<DelivryPage />} />
                        <Route path="/Bookmark" element={<Bookmark />} />
                        <Route path="/Settings" element={<Settings />} />
                    </Routes>
                </div>
            )}
        </>
    );
};

function App() {
    return (
        <FavoritesProvider>
            <CartProvider>
                <LoadingProvider>
                    <AppContent />
                </LoadingProvider>
            </CartProvider>
        </FavoritesProvider>
    );
}

export default App;
