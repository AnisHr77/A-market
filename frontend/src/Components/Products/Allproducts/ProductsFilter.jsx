import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../Recommendations/RecommendationCard';
import './ProductsFilter.css';

const ProductsFilter = forwardRef((props, ref) => {
    const location = useLocation();
    const navigate = useNavigate();

    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get('category') || 'all';

    const [productsData, setProductsData] = useState([]);
    const [categories, setCategories] = useState([{ category_id: 'all', name: 'All' }]);
    const [visibleMultiplier, setVisibleMultiplier] = useState(3);
    const [cardsToShow, setCardsToShow] = useState(5);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);

    const productListRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const isInitialMount = useRef(true);

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    // Custom smooth scroll function
    function smoothScrollTo(element, offset = 0, duration = 600) {
        const startY = window.scrollY || window.pageYOffset;
        const elementY = element.getBoundingClientRect().top + startY + offset;
        const distance = elementY - startY;
        let startTime = null;

        function step(currentTime) {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            // easeInOutQuad easing function
            const ease =
                progress < 0.5
                    ? 2 * progress * progress
                    : -1 + (4 - 2 * progress) * progress;

            window.scrollTo(0, startY + distance * ease);

            if (timeElapsed < duration) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/products');
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
        // Prevent WebKit from restoring scroll and reset manually
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        // Scroll to top on load (once)
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);


    // Fetch categories


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/categories');
                const data = await response.json();
                setCategories([{ category_id: 'all', name: 'All' }, ...data]);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
            setLoadingCategories(false);
        };
        fetchCategories();
    }, []);

    // Update cardsToShow on window resize
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

    // Smooth scroll on category change (except on initial load)
    useEffect(() => {
        setVisibleMultiplier(3);
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return; // skip scroll on first mount
        }
        if (productListRef.current) {
            const offset = -100; // adjust as needed for sticky headers or padding
            setTimeout(() => {
                smoothScrollTo(productListRef.current, offset, 700);
            }, 100); // small delay to allow layout
        }
    }, [location.search]);

    const visibleCount = cardsToShow * visibleMultiplier;

    // Scroll container buttons
    const scrollLeft = () => {
        scrollContainerRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollContainerRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
    };

    // Update scroll buttons state
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

    const handleCategoryClick = (categoryId) => {
        const newParams = new URLSearchParams(location.search);
        newParams.set('category', categoryId);
        navigate(`/?${newParams.toString()}`, { replace: false });
    };

    const filteredProducts =
        categoryFromUrl.toLowerCase() === 'all'
            ? productsData
            : productsData.filter(
                (p) => String(p.category_id) === String(categoryFromUrl)
            );

    const openProductInNewTab = (productId) => {
        const newTab = window.open('', '_blank');
        newTab.document.write('');
        newTab.location.href = `/product/${productId}`;
    };

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
                        style={{
                            ...scrollBtnStyle,
                            opacity: canScrollLeft ? 1 : 0.1,
                            visibility: canScrollLeft ? '' : 'hidden',
                            cursor: canScrollLeft ? 'pointer' : 'default',
                            marginRight: 8,
                            position: 'relative',
                            top: '15px',
                            right: '-15px',
                        }}
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
                                            String(categoryFromUrl) === String(category.category_id)
                                                ? '#ffffff'
                                                : '#272b30',
                                        color:
                                            String(categoryFromUrl) === String(category.category_id)
                                                ? '#0b0b0b'
                                                : '#d8cfe2',
                                        border: '1px solid #d8cfe2',
                                        borderRadius: '30px',
                                        cursor: 'pointer',
                                        fontWeight: '500',
                                        fontSize: '13px',
                                        whiteSpace: 'nowrap',
                                        transition: 'background-color 0.2s, color 0.2s',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (String(categoryFromUrl) !== String(category.category_id)) {
                                            e.currentTarget.style.backgroundColor = '#3a3f47';
                                            e.currentTarget.style.color = '#fff';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (String(categoryFromUrl) !== String(category.category_id)) {
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
                        style={{
                            ...scrollBtnStyle,
                            opacity: canScrollRight ? 1 : 0.3,
                            cursor: canScrollRight ? 'pointer' : 'default',
                            marginLeft: 8,
                            position: 'relative',
                            top: '15px',
                            right: '10px',
                        }}
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
                            marginTop: '2rem',
                            position: 'absolute',
                            left: '53%',
                            transform: 'translateX(-50%)',
                            padding: '10px 25px',
                            border: '1px solid #bcb6b6',
                            borderRadius: '5px',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            color: '#bcb6b6',
                            transition: 'all 0.3s',

                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#6c63ff';
                            e.currentTarget.style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#bcb6b6';
                        }}
                    >
                        See More
                    </button>
                )}
            </div>
        </div>
    );
});

export default ProductsFilter;
