import React, { useEffect, useState } from 'react';
import BigSavesCard from './BigSavesCard';
<<<<<<< HEAD
import './BigSaves.css';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { FaGift } from "react-icons/fa";

const BigSaves = () => {
    const cardWidth = 200;
    const gap = 48;

    const [products, setProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsToShow, setCardsToShow] = useState(5);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/products');
                const data = await response.json();
                // ترتيب المنتجات حسب نسبة الخصم (من الأعلى إلى الأقل)
                const sortedProducts = data.sort((a, b) => (b.discount_percent || 0) - (a.discount_percent || 0));
                setProducts(sortedProducts);
            } catch (error) {
                console.error("Failed to fetch Big Saves products:", error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsSmallScreen(width < 768);

            if (width < 500) setCardsToShow(3);
            else if (width < 1124) setCardsToShow(3);
            else if (width < 1300) setCardsToShow(4);
            else setCardsToShow(5);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxIndex = products.length - cardsToShow;
    const sliderWidth = cardWidth * cardsToShow + gap * (cardsToShow - 1);

    const handleNext = () => {
        if (currentIndex < maxIndex) setCurrentIndex(prev => prev + 1);
    };

    const handlePrev = () => {
        if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
    };

    return (
        <div id="BigSaves" style={{ overflow: 'hidden' }}>
            <div id="rec" className="recommendations">
=======
import BigSavesData from './BigSavesData';
import './BigSaves.css';
import { FaChevronLeft,FaChevronRight } from "react-icons/fa6";
import {FaGift, FaRegHeart} from "react-icons/fa";




const BigSaves = () => {

        const cardWidth = 200;
        const gap = 48;

        const [currentIndex, setCurrentIndex] = useState(0);
        const [cardsToShow, setCardsToShow] = useState(5);
        const [isSmallScreen, setIsSmallScreen] = useState(false);

        useEffect(() => {
            const handleResize = () => {
                const width = window.innerWidth;
                setIsSmallScreen(width < 768);

                if (width < 500) setCardsToShow(3);
                else if (width < 1124) setCardsToShow(3);
                else if (width < 1300) setCardsToShow(4);
                else setCardsToShow(5);
            };

            handleResize();
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);

        const maxIndex = BigSavesData.length - cardsToShow;
        const sliderWidth = cardWidth * cardsToShow + gap * (cardsToShow - 1);

        const handleNext = () => {
            if (currentIndex < maxIndex) setCurrentIndex(prev => prev + 1);
        };

        const handlePrev = () => {
            if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
        };

        return (
            <div className="recommendations">
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
                <h2 style={{
                    fontSize: '25px',
                    marginBottom: '1.5rem',
                    marginTop: '1.5rem',
                    marginLeft: '1rem'
                }}>
<<<<<<< HEAD
                    <FaGift style={{
=======
                    < FaGift style={{
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
                        fontWeight: 'bold',
                        position: 'relative',
                        top: '3px'
                    }} /> BigSaves
                </h2>

                <div
                    style={{
                        position: 'relative',
                        width: isSmallScreen ? '100%' : `${sliderWidth}px`,
                        margin: '0 auto'
                    }}
                >
                    {!isSmallScreen && (
                        <button
                            className="slider-btn"
                            onClick={handlePrev}
                            disabled={currentIndex === 0}
                            style={{
                                position: 'absolute',
                                top: '25%',
                                left: '-22px',
                                transform: 'translateY(-50%)',
                                zIndex: 2,
                            }}
                        >
                            <FaChevronLeft style={{ color: '#303030', fontSize: '15px', fontWeight: 'bold' }} />
                        </button>
                    )}

                    <div
                        className="flexing"
                        style={{
                            overflowX: isSmallScreen ? 'auto' : 'hidden',
                            overflowY: 'hidden',
                            width: '100%',
                            justifyContent: 'flex-start',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                gap: `${gap}px`,
                                transform: isSmallScreen ? 'none' : `translateX(-${currentIndex * (cardWidth + gap)}px)`,
                                transition: isSmallScreen ? 'none' : 'transform 0.5s ease',
                                minWidth: isSmallScreen ? 'max-content' : 'auto',
                            }}
                        >
<<<<<<< HEAD
                            {products.map((item) => (
                                <BigSavesCard key={item.product_id} item={item}

                                />
=======
                            {BigSavesData.map((item) => (
                                <BigSavesCard key={item.id} item={item} />
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
                            ))}
                        </div>
                    </div>

                    {!isSmallScreen && (
                        <button
                            className="slider-btn"
                            onClick={handleNext}
                            disabled={currentIndex >= maxIndex}
                            style={{
                                position: 'absolute',
                                right: '-20px',
                                top: '25%',
                                transform: 'translateY(-50%)',
                                zIndex: 2,
                            }}
                        >
                            <FaChevronRight style={{ color: '#303030', fontSize: '15px', fontWeight: 'bold' }} />
                        </button>
                    )}
                </div>
            </div>
<<<<<<< HEAD
        </div>
    );
};

export default BigSaves;
=======
        );
};

export default BigSaves;
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
