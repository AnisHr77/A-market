import React, { useState, useEffect } from 'react';
import ProductCard from '../Recommendations/RecommendationCard';
import productsData from './ProductsData';
import './ProductsFilter.css';

const ProductsFilter = () => {
    const cardWidth = 200;
    const gap = 48;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsToShow, setCardsToShow] = useState(5);
    const [visibleMultiplier, setVisibleMultiplier] = useState(3);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', ...new Set(productsData.map(product => product.category))];

    const filteredProducts = selectedCategory === 'All'
        ? productsData
        : productsData.filter(product => product.category === selectedCategory);

    const visibleCount = cardsToShow * visibleMultiplier;

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 500) setCardsToShow(1);
            else if (width < 800) setCardsToShow(2);
            else if (width < 1124) setCardsToShow(3);
            else if (width < 1300) setCardsToShow(4);
            else setCardsToShow(5);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleShowMore = () => {
        setVisibleMultiplier(prev => prev + 1);
    };

    return (
        <div className="categories-container">
            <div>
                <h2 style={{ fontSize: '30px', marginBottom: '3rem',marginTop:'3rem', color: 'white', fontWeight: 'bold', justifyContent: 'center', textAlign: 'center' }}>
                    Special Offers
                    <br /> Explore Your Interests
                </h2>

                <div style={{ marginBottom: '3rem', display: 'flex', gap: '2rem', flexWrap: 'wrap',margin: '1rem auto 2rem auto', }}>
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => {
                                setSelectedCategory(category);
                                setVisibleMultiplier(3); // Reset view when changing category
                            }}
                            style={{
                                padding: '15px 30px',
                                backgroundColor: selectedCategory === category ? '#ffffff' : '#272b30',
                                color: selectedCategory === category ? '#0b0b0b' : '#d8cfe2',
                                border: '2px solid #d8cfe2',
                                borderRadius: '50px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '15px'
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div
                className="flexing"
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: `${gap}px`,
                    justifyContent: 'flex-start',
                    maxWidth: '100%',
                    marginTop: '2rem',
                    boxSizing: 'border-box',
                }}
            >
                {filteredProducts.slice(0, visibleCount).map(product => (
                    <ProductCard  key={product.id} item={product} />
                ))}
            </div>

            {visibleCount < filteredProducts.length && (
                <button
                    onClick={handleShowMore}
                    style={{
                        marginTop: '3.5rem',
                        marginBottom:'-1rem',
                        padding: '12px 30px',
                        backgroundColor: '#ffffff',
                        color: '#1e2126',
                        fontWeight: 'bold',
                        borderRadius: '30px',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                   See more <span style={{position:'relative',top:'-0.5px',right:'-2px',fontSize:'10px'}}>˅</span>
                </button>
            )}
        </div>
    );
};

export default ProductsFilter;
