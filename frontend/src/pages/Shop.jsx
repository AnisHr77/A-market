import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './Shop.css';
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
import FadeInSection from "../Components/FadeInSection";

const Shop = () => {
    const location = useLocation();
    const productsFilterRef = useRef(null);
    const stickyNavHeight = -150;
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const category = params.get('category');

        if (location.state === 'category-change') return;

        if (category && productsFilterRef.current) {
            if (!isElementVisible(productsFilterRef.current)) {
                const elementTop = window.pageYOffset + productsFilterRef.current.getBoundingClientRect().top - stickyNavHeight;
                window.scrollTo({ top: elementTop, behavior: 'smooth' });
            }
        }
    }, [location]);


    const isElementVisible = (el) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > window.innerHeight / 2;
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const category = params.get('category');

        if (category && productsFilterRef.current) {
            if (!isElementVisible(productsFilterRef.current)) {
                const elementTop = window.pageYOffset + productsFilterRef.current.getBoundingClientRect().top - stickyNavHeight;
                window.scrollTo({ top: elementTop, behavior: 'smooth' });
            }
        }
    }, [location]);

    return (
        <div>
            <NavbarLeft style={{zIndex: '100 !important'}}/>

            <div className="blur-overlay"></div>
            <NavbarUp/>
            <BelowNav/>
            <FadeInSection delay={0.1}>
                <Banner/>

                <Offers/>
            </FadeInSection>

            <Reminder/>

            < FadeInSection delay={0.1}>
                <Recommendations/>
            </FadeInSection>

            < FadeInSection delay={0.1}>
                <FlashSales/>
            </FadeInSection>

            < FadeInSection delay={0.1}>
                <BigSaves/>
            </FadeInSection>

            < FadeInSection delay={0.1}>
                <div ref={productsFilterRef}>
                    <ProductsFilter />
                </div>
                <Footer/>
            </FadeInSection>


        </div>
    );
};

export default Shop;