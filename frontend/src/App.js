import { useEffect } from "react";
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

import { CartProvider } from './Context/CartContext';
import { FavoritesProvider } from './Context/FavoritesContext';
import { LoadingProvider, useLoading } from './Context/LoadingContext';

const AppContent = () => {
    const location = useLocation();
    const { loading, setLoading } = useLoading();

    useEffect(() => {
        setLoading(true);
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1200);
        return () => clearTimeout(timeout);
    }, [location.key]);

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
                        <Route path="/phones" element={<ShopCategory Category="phones" />} />
                        <Route path="/laptops" element={<ShopCategory Category="laptops" />} />
                        <Route path="/mens" element={<ShopCategory Category="mens" />} />
                        <Route path="/womens" element={<ShopCategory Category="womens" />} />
                        <Route path="/products" element={<Product />} />
                        <Route path="/product/:productID" element={<Product />} />
                        <Route path="/Card" element={<CardPage />} />
                        <Route path="/Login" element={<Login />} />
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
