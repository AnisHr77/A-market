import React from 'react'
import NavbarUp from "../Components/NavbarUp/NavbarUp.jsx";
import NavbarLeft from "../Components/NavbarLeft/NavbarLeft";
import BelowNav from "../Components/BelowNav/BelowNav.jsx";
import Banner from "../Components/Banner/Banner.jsx";
import Offers from "../Components/Offers/Offers.jsx";
import Reminder from "../Components/Reminder/Reminder";
import Footer from "../Components/Footer/Footer";
import Recommendations from "../Components/Products/Recommendations/Recommendations";
import BigSaves from "../Components/Products/BigSaves/BigSaves";
import FlashSales from "../Components/Products/FlashSales/FlashSales";
import ProductsFilter from "../Components/Products/Allproducts/ProductsFilter";



const Shop = () => {
    return (
        <div>
            <NavbarLeft style={{zIndex: '1 !important'}}/>
            <NavbarUp />
            <BelowNav/>
            <Banner/>
            <Offers/>
            <Reminder/>
            <Recommendations/>
            <FlashSales/>
            <BigSaves/>
            <ProductsFilter/>
            <Footer/>





        </div>
    )
}
export default Shop;
