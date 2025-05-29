import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../Recommendations/RecommendationCard';
import './ProductsFilter.css';

const ProductsFilter = forwardRef((props, ref) => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get('category') || 'All';

    const [productsData, setProductsData] = useState([]);
    const [categories, setCategories] = useState([{ category_id: 'all', name: 'All' }]);
    const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
    const [visibleMultiplier, setVisibleMultiplier] = useState(3);
    const [cardsToShow, setCardsToShow] = useState(5);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const productListRef = useRef(null);
    const scrollContainerRef = useRef(null);

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3006/api/products');
                const data = await response.json();
                setProductsData(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
            setLoadingProducts(false);
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3006/api/categories');
                const data = await response.json();
                setCategories([{ category_id: 'all', name: 'All' }, ...data]);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
            setLoadingCategories(false);
        };
        fetchCategories();
    }, []);

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

    const handleCategoryClick = (categoryId) => {
        if (categoryId === selectedCategory) return;
        setSelectedCategory(categoryId);
        setVisibleMultiplier(3);
    };

    const filteredProducts =
        selectedCategory === 'All' || selectedCategory === 'all'
            ? productsData
            : productsData.filter((p) => String(p.category_id) === String(selectedCategory));

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    const updateScrollButtonsState = () => {
        const el = scrollContainerRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
    };

    useEffect(() => {
        const el = scrollContainerRef.current;
        if (!el) return;
        updateScrollButtonsState();
        el.addEventListener('scroll', updateScrollButtonsState);
        return () => el.removeEventListener('scroll', updateScrollButtonsState);
    }, [categories]);

    const openProductInNewTab = (productId) => {
        const newTab = window.open('', '_blank');
        newTab.document.write(`
            
        `);
        newTab.location.href = `/product/${productId}`;
    };

    return (
        <div className="categories-container" ref={ref}>
            <div className="ProductstextC">
                <h2 className="Productstext">
                    Special Offers
                    <br /> Explore Your Interests
                </h2>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3rem' }}>
                    <button
                        onClick={scrollLeft}
                        disabled={!canScrollLeft}
                        style={{ ...scrollBtnStyle, opacity: canScrollLeft ? 1 : 0.1,visibility:canScrollLeft ? '':'hidden' ,cursor: canScrollLeft ? 'pointer' : 'default', marginRight: 8, position: 'relative', top: '15px', right: '-15px' }}
                        aria-label="Scroll categories left"
                    >
                        ‹
                    </button>

                    <div
                        ref={scrollContainerRef}
                        style={{
                            overflowX: 'auto',
                            display: 'flex',
                            gap: '3%',
                            scrollBehavior: 'smooth',
                            alignItems: 'center',
                            position: 'relative',
                            left: '1%',
                            padding: '4px 0',
                            maxWidth: '83vw',
                            flexWrap: 'nowrap',
                            whiteSpace: 'nowrap',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                        className="hide-scrollbar"
                    >
                        {loadingCategories ? (
                            <p style={{ color: '#ccc', margin: 0 }}>Loading categories...</p>
                        ) : (
                            categories.map((category) => (

                                <button
                                    key={category.category_id}
                                    onClick={() => handleCategoryClick(category.category_id)}
                                    className="ButtonesCategory"
                                    style={{
                                        flexShrink: 0,
                                        alignItems: 'center',
                                        padding: '15px 30px',
                                        backgroundColor:
                                            String(selectedCategory) === String(category.category_id) ? '#ffffff' : '#272b30',
                                        color:
                                            String(selectedCategory) === String(category.category_id) ? '#0b0b0b' : '#d8cfe2',
                                        border: '1px solid #d8cfe2',
                                        borderRadius: '30px',
                                        cursor: 'pointer',
                                        fontWeight: '500',
                                        fontSize: '13px',
                                        whiteSpace: 'nowrap',
                                        transition: 'background-color 0.2s, color 0.2s',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (String(selectedCategory) !== String(category.category_id)) {
                                            e.currentTarget.style.backgroundColor = '#3a3f47';
                                            e.currentTarget.style.color = '#fff';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (String(selectedCategory) !== String(category.category_id)) {
                                            e.currentTarget.style.backgroundColor = '#272b30';
                                            e.currentTarget.style.color = '#d8cfe2';
                                        }
                                    }}
                                >
                                    {category.name}
                                </button>
                            ))
                        )}
                    </div>

                    <button
                        onClick={scrollRight}
                        disabled={!canScrollRight}
                        style={{ ...scrollBtnStyle, opacity: canScrollRight ? 1 : 0.3, cursor: canScrollRight ? 'pointer' : 'default', marginLeft: 8, position: 'relative', top: '15px', right: '10px' }}
                        aria-label="Scroll categories right"
                    >
                        ›
                    </button>
                </div>

                <div className="flexingg" ref={productListRef}>
                    {loadingProducts ? (
                        <p style={{ color: '#ccc', textAlign: 'center' }}>Loading products...</p>
                    ) : (
                        filteredProducts.slice(0, visibleCount).map((product) => (
                            <a
                                key={product.product_id}
                                href={`/product/${product.product_id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => {
                                    e.preventDefault();
                                    openProductInNewTab(product.product_id);
                                }}
                                onContextMenu={(e) => {
                                    e.preventDefault();
                                    openProductInNewTab(product.product_id);
                                }}
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <ProductCard item={product} />
                            </a>
                        ))
                    )}
                </div>

                {!loadingProducts && visibleCount < filteredProducts.length && (
                    <button
                        className="seemore"
                        onClick={() => setVisibleMultiplier((prev) => prev + 1)}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '1.5rem',
                            position: 'absolute',
                            left: '50%',
                            marginBottom: '4rem',
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
                        <span style={{ position: 'relative', top: '-0.5px', right: '-2px', fontSize: '10px' }}>
                            ˅
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
});

const scrollBtnStyle = {
    backgroundColor: '#272b30',
    color: '#d8cfe2',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    fontSize: '18px',
    cursor: 'pointer',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

export default ProductsFilter;
