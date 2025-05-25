import React, { useEffect, useRef } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    useLocation,
    Navigate,
} from "react-router-dom";

import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";
import Product from "./pages/Product";
import CardPage from "./pages/CardPage";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import DelivryPage from "./pages/DelivryPage";
import Bookmark from "./pages/Bookmark";
import Saved from "./pages/Saved";
import Settings from "./pages/Settings";
import Helpp from "./pages/Help";

// Settings pages (General, Profile, Payment, etc.)
import PageGeneral from "./pages/ComponentOfSetting/PagesOfHeader/PageGeneral/PageGeneral";
import Notification from "./pages/ComponentOfSetting/PagesOfHeader/PageGeneral/Notification";
import Contact from "./pages/ComponentOfSetting/PagesOfHeader/PageGeneral/Contact";
import Account from "./pages/ComponentOfSetting/PagesOfHeader/PageGeneral/Account";
import PageProfile from "./pages/ComponentOfSetting/PagesOfHeader/PageProfile/PageProfile";
import User from "./pages/ComponentOfSetting/PagesOfHeader/PageProfile/ContentProfile/User";
import Zone from "./pages/ComponentOfSetting/PagesOfHeader/PageProfile/ContentProfile/Zone";
import PagePayment from "./pages/ComponentOfSetting/PagesOfHeader/PagePayment/PagePayment";
import Crypto from "./pages/ComponentOfSetting/PagesOfHeader/PagePayment/TypeOfPayment/Crypto";
import CardVisa from "./pages/ComponentOfSetting/PagesOfHeader/PagePayment/TypeOfPayment/CardVisa/CardVisa";
import PayPal from "./pages/ComponentOfSetting/PagesOfHeader/PagePayment/TypeOfPayment/PayPal";
import BaridiMob from "./pages/ComponentOfSetting/PagesOfHeader/PagePayment/TypeOfPayment/BaridiMob";
import Skrill from "./pages/ComponentOfSetting/PagesOfHeader/PagePayment/TypeOfPayment/Skrill";
import PageSubscription from "./pages/ComponentOfSetting/PagesOfHeader/PageSubscription/PageSubscription";
import Offers from "./pages/ComponentOfSetting/PagesOfHeader/PageSubscription/ContentSubscription/Offers";
import News from "./pages/ComponentOfSetting/PagesOfHeader/PageSubscription/ContentSubscription/News";
import Coupon from "./pages/ComponentOfSetting/PagesOfHeader/PageSubscription/ContentSubscription/Coupon";
import Subscribe from "./pages/ComponentOfSetting/PagesOfHeader/PageSubscription/ContentSubscription/Subscribe";
import PageHelpSupports from "./pages/ComponentOfSetting/PagesOfHeader/PageHelpSupports/PageHelpSupports";
import Help from "./pages/ComponentOfSetting/PagesOfHeader/PageHelpSupports/ContentHelpSupports/Help";
import PhoneHelp from "./pages/ComponentOfSetting/PagesOfHeader/PageHelpSupports/ContentHelpSupports/PhoneHelp";
import CustomerService from "./pages/ComponentOfSetting/PagesOfHeader/PageHelpSupports/ContentHelpSupports/CustomerService";
import ContactA from "./pages/ComponentOfSetting/PagesOfHeader/PageHelpSupports/ContentHelpSupports/ContactA";

// Footer pages
import Vision from "./Components/Footer/contentFooter/Vision";
import FAQ from "./Components/Footer/contentFooter/FAQ";
import ContactUs from "./Components/Footer/contentFooter/ContactUs";
import Return from "./Components/Footer/contentFooter/Return";
import NewsUp from "./Components/Footer/contentFooter/NewsUp";
import OurStory from "./Components/Footer/contentFooter/OurStory";
import Community from "./Components/Footer/contentFooter/Community";
import Sustainability from "./Components/Footer/contentFooter/Sustainability";
import Awards from "./Components/Footer/contentFooter/Awards";
import Track from "./Components/Footer/contentFooter/Track";
import LiveS from "./Components/Footer/contentFooter/LiveS";
import Report from "./Components/Footer/contentFooter/Report";
import Privacy from "./Components/Footer/contentFooter/Privacy";
import TermsS from "./Components/Footer/contentFooter/TermsS";
import IntellectualP from "./Components/Footer/contentFooter/IntellectualP";
import SecurityC from "./Components/Footer/contentFooter/SecurityC";
import CardFooter from "./Components/Footer/contentFooter/CardFooter";
import SavesFooter from "./Components/Footer/contentFooter/SavesFooter";
import ChatFooter from "./Components/Footer/contentFooter/ChatFooter";
import DarkModeFooter from "./Components/Footer/contentFooter/DarkModeFooter";
import CategoriesFooter from "./Components/Footer/contentFooter/CategoriesFooter";
import TrackingFooter from "./Components/Footer/contentFooter/TrackingFooter";
import AiChatFooter from "./Components/Footer/contentFooter/AiChatFooter";

import NavbarLeft from "./Components/NavbarLeft/NavbarLeft";
import Loader from "./Loader";

import { CartProvider } from "./Context/CartContext";
import { FavoritesProvider } from "./Context/FavoritesContext";
import { LoadingProvider, useLoading } from "./Context/LoadingContext";

function AppContent() {
    const location = useLocation();
    const { loading, setLoading } = useLoading();
    const params = new URLSearchParams(location.search);
    const hasCategoryParam = params.has("category");
    const hideNavbar = location.pathname.startsWith("/Settings");

    useEffect(() => {
        setLoading(true);
        if (hasCategoryParam) {
            setLoading(false);
            return;
        }
        const timeout = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timeout);
    }, [location.key]);

    if (loading) return <Loader />;

    return (
        <div className="app-content">
            <ToastContainer position="top-right" autoClose={1500} pauseOnHover theme="colored" />
            {!hideNavbar && <NavbarLeft />}
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
                <Route path="/Saved" element={<Saved />} />
                <Route path="/help" element={<Helpp />} />
                {/* Footer Pages */}
                <Route path="/visiMission" element={<Vision />} />
                <Route path="/FAQs" element={<FAQ />} />
                <Route path="/Return" element={<Return />} />
                <Route path="/ContactUs" element={<ContactUs />} />
                <Route path="/NewsUp" element={<NewsUp />} />
                <Route path="/Story" element={<OurStory />} />
                <Route path="/Community" element={<Community />} />
                <Route path="/Sustainability" element={<Sustainability />} />
                <Route path="/Awards" element={<Awards />} />
                <Route path="/Track" element={<Track />} />
                <Route path="/LiveS" element={<LiveS />} />
                <Route path="/Report" element={<Report />} />
                <Route path="/Privacy" element={<Privacy />} />
                <Route path="/TermsS" element={<TermsS />} />
                <Route path="/IntellectualP" element={<IntellectualP />} />
                <Route path="/SecurityC" element={<SecurityC />} />
                <Route path="/CardFooter" element={<CardFooter />} />
                <Route path="/SavesFooter" element={<SavesFooter />} />
                <Route path="/ChatFooter" element={<ChatFooter />} />
                <Route path="/DarkModeFooter" element={<DarkModeFooter />} />
                <Route path="/CategoriesFooter" element={<CategoriesFooter />} />
                <Route path="/TrackingFooter" element={<TrackingFooter />} />


                {/* Settings Routes */}
                <Route path="/Settings" element={<Settings />}>
                    <Route index element={<Navigate to="General" replace />} />
                    <Route path="General" element={<PageGeneral />}>
                        <Route index element={<Notification />} />
                        <Route path="Notification" element={<Notification />} />
                        <Route path="Contact" element={<Contact />} />
                        <Route path="Account" element={<Account />} />
                    </Route>
                    <Route path="Profile" element={<PageProfile />}>
                        <Route index element={<User />} />
                        <Route path="User" element={<User />} />
                        <Route path="Zone" element={<Zone />} />
                    </Route>
                    <Route path="Payment" element={<PagePayment />}>
                        <Route index element={<Crypto />} />
                        <Route path="Crypto" element={<Crypto />} />
                        <Route path="CardVisa" element={<CardVisa />} />
                        <Route path="PayPal" element={<PayPal />} />
                        <Route path="BaridiMob" element={<BaridiMob />} />
                        <Route path="Skrill" element={<Skrill />} />
                    </Route>
                    <Route path="Subscription" element={<PageSubscription />}>
                        <Route index element={<Offers />} />
                        <Route path="Offers" element={<Offers />} />
                        <Route path="News" element={<News />} />
                        <Route path="Coupon" element={<Coupon />} />
                        <Route path="Subscribe" element={<Subscribe />} />
                    </Route>
                    <Route path="HelpSupports" element={<PageHelpSupports />}>
                        <Route index element={<Help />} />
                        <Route path="Help" element={<Help />} />
                        <Route path="PhoneHelp" element={<PhoneHelp />} />
                        <Route path="CustomerService" element={<CustomerService />} />
                        <Route path="ContactA" element={<ContactA />} />
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

function App() {
    return (
        <FavoritesProvider>
            <CartProvider>
                <LoadingProvider>
                    <BrowserRouter>
                        <AppContent />
                    </BrowserRouter>
                </LoadingProvider>
            </CartProvider>
        </FavoritesProvider>
    );
}

export default App;
