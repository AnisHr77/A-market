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

    const recommendationsRef = useRef(null);
    const flashSalesRef = useRef(null);
    const bigSavesRef = useRef(null);
    const productsFilterRef = useRef(null);

    const stickyNavHeight = -150;

    const isElementVisible = (el) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > window.innerHeight / 2;
    };

    const scrollToRef = (ref) => {
        if (ref?.current && !isElementVisible(ref.current)) {
            const top = window.pageYOffset + ref.current.getBoundingClientRect().top - stickyNavHeight;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const category = params.get('category');

        if (location.state === 'category-change') return;
        if (!category) return;

        // Delay scroll to allow components to mount
        const timeout = setTimeout(() => {
            switch (category.toLowerCase()) {
                case 'recommendations':
                    scrollToRef(recommendationsRef);
                    break;
                case 'flashsales':
                    scrollToRef(flashSalesRef);
                    break;
                case 'bigsaves':
                    scrollToRef(bigSavesRef);
                    break;
                case 'all':
                    scrollToRef(productsFilterRef);
                    break;
                default:
                    break;
            }
        }, 100); // Adjust this if needed (400–800ms is typical)

        return () => clearTimeout(timeout);
    }, [location]);

    return (
        <div>
            <NavbarLeft style={{ zIndex: '100 !important' }} />
            <div className="blur-overlay"></div>
            <NavbarUp />
            <BelowNav />

            <FadeInSection delay={0.1}>
                <Banner />
                <Offers />
            </FadeInSection>

            <Reminder />

            <FadeInSection delay={0.1}>
                <div ref={recommendationsRef}>
                    <Recommendations />
                </div>
            </FadeInSection>

            <FadeInSection delay={0.1}>
                <div ref={flashSalesRef}>
                    <FlashSales />
                </div>
            </FadeInSection>

            <FadeInSection delay={0.1}>
                <div ref={bigSavesRef}>
                    <BigSaves />
                </div>
            </FadeInSection>

            <FadeInSection delay={0.1}>
                <div ref={productsFilterRef}>
                    <ProductsFilter />
                </div>
                <Footer />
            </FadeInSection>
        </div>
    );
};

export default Shop;
