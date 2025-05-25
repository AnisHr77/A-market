import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../Recommendations/RecommendationCard';
import productsData from './ProductsData';
import './ProductsFilter.css';

const ProductsFilter = forwardRef((props, ref) => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get('category') || 'All';

    const categories = ['All', ...new Set(productsData.map(p => p.category))];

    const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
    const [visibleMultiplier, setVisibleMultiplier] = useState(3);
    const [cardsToShow, setCardsToShow] = useState(5);
    const productListRef = useRef(null);

    useEffect(() => {
        if (categoryFromUrl !== selectedCategory) {
            setSelectedCategory(categoryFromUrl);
            setVisibleMultiplier(3);

            if (productListRef.current) {
                productListRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [categoryFromUrl]);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 500) setCardsToShow(3);
            else if (width < 1124) setCardsToShow(3);
            else if (width < 1400) setCardsToShow(4);
            else setCardsToShow(5);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const visibleCount = cardsToShow * visibleMultiplier;

    const handleCategoryClick = (category) => {
        if (category === selectedCategory) return;
        setSelectedCategory(category);
        setVisibleMultiplier(3);
    };

    const handleShowMore = () => {
        setVisibleMultiplier((prev) => prev + 1);
    };

    const filteredProducts =
        selectedCategory === 'All'
            ? productsData
            : productsData.filter((p) => p.category === selectedCategory);

    return (
        <div className="categories-container" ref={ref}>
            <div className="ProductstextC">
                <h2 className="Productstext">
                    Special Offers
                    <br /> Explore Your Interests
                </h2>

                <div className="ButtonesCategory">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategoryClick(category)}
                            style={{
                                padding: '10px 35px',
                                backgroundColor: selectedCategory === category ? '#ffffff' : '#272b30',
                                color: selectedCategory === category ? '#0b0b0b' : '#d8cfe2',
                                border: '2px solid #d8cfe2',
                                borderRadius: '50px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '15px',
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flexingg" ref={productListRef}>
                {filteredProducts.slice(0, visibleCount).map((product) => (
                    <ProductCard key={product.id} item={product} />
                ))}
            </div>

            {visibleCount < filteredProducts.length && (
                <button
                    className="seemore"
                    onClick={handleShowMore}
                    style={{
                        marginTop: '1.5rem',
                        marginBottom: '0.1rem',
                        padding: '12px 30px',
                        backgroundColor: '#ffffff',
                        color: '#1e2126',
                        fontWeight: 'bold',
                        borderRadius: '30px',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    See more{' '}
                    <span
                        style={{ position: 'relative', top: '-0.5px', right: '-2px', fontSize: '10px' }}
                    >
                        ˅
                    </span>
                </button>
            )}
        </div>
    );
});

export default ProductsFilter;
