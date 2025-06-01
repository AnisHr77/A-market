import React, { useState, useEffect } from 'react';
import RecommendationCard from './RecommendationCard';
<<<<<<< HEAD
import './Recommendation.css';
import { FaChevronLeft, FaChevronRight, FaRegHeart } from "react-icons/fa6";
=======
import RecommendationData from './RecommendationData';
import './Recommendation.css';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9

const Recommendations = () => {
    const cardWidth = 200;
    const gap = 48;

<<<<<<< HEAD
    const [products, setProducts] = useState([]);
=======
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsToShow, setCardsToShow] = useState(5);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsSmallScreen(width < 768);

            if (width < 500) setCardsToShow(1);
            else if (width < 1124) setCardsToShow(3);
            else if (width < 1300) setCardsToShow(4);
            else setCardsToShow(5);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

<<<<<<< HEAD
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/products');
                const data = await response.json();
                // ترتيب المنتجات حسب عدد الزيارات (من الأكثر إلى الأقل)
                const sortedProducts = data.sort((a, b) => (b.visits || 0) - (a.visits || 0));
                setProducts(sortedProducts);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, []);

    const maxIndex = products.length - cardsToShow;
=======
    const maxIndex = RecommendationData.length - cardsToShow;
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
    const sliderWidth = cardWidth * cardsToShow + gap * (cardsToShow - 1);

    const handleNext = () => {
        if (currentIndex < maxIndex) setCurrentIndex(prev => prev + 1);
    };

    const handlePrev = () => {
        if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
    };

    return (
<<<<<<< HEAD
        <div id="Recomendations" style={{ overflow: 'hidden' }}>
            <div className="recommendations">
                <h2 style={{ fontSize: '25px', margin: '1.5rem 0 1.5rem 1rem' }}>
                    <FaRegHeart style={{ position: 'relative', top: '3px' }} /> Recommendations
                </h2>

                <div
                    style={{
                        position: 'relative',
                        width: isSmallScreen ? '100%' : `${sliderWidth}px`,
                        margin: '0 auto',
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
                            <FaChevronLeft  style={{ color: '#303030', fontSize: '15px', fontWeight: 'bold' }}/>
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
                            {products.map((item) => (
                                <RecommendationCard key={item.product_id} item={item} />
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
=======
        <div className="recommendations">
            <h2 style={{
                fontSize: '25px',
                marginBottom: '1.5rem',
                marginTop: '1.5rem',
                marginLeft: '1rem'
            }}>
                <FaRegHeart style={{
                    fontWeight: 'bold',
                    position: 'relative',
                    top: '3px'
                }} /> Recommendations
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
                        {RecommendationData.map((item) => (
                            <RecommendationCard key={item.id} item={item} />
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
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
            </div>
        </div>
    );
};

export default Recommendations;
