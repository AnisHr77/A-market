import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MdDevices, MdCheckroom, MdHome, MdHealthAndSafety, MdSportsSoccer,
    MdToys, MdDirectionsCar, MdMenuBook, MdLocalGroceryStore, MdChildCare,
    MdOutlineCreate, MdScience
} from 'react-icons/md';
import './Menu.css';

const iconMap = {
    Electronics: <MdDevices />,
    'Fashion & Apparel': <MdCheckroom />,
    'Home & Garden': <MdHome />,
    'Health & Beauty': <MdHealthAndSafety />,
    'Sports & Outdoors': <MdSportsSoccer />,
    'Toys & Games': <MdToys />,
    Automotive: <MdDirectionsCar />,
    'Books, Movies & Music': <MdMenuBook />,
    'Groceries & Gourmet Food': <MdLocalGroceryStore />,
    'Baby & Kids': <MdChildCare />,
    'Office Supplies & Stationery': <MdOutlineCreate />,
    'Industrial & Scientific': <MdScience />,
};

export default function Menu() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const contentRefs = useRef([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                const [categoriesRes, productsRes] = await Promise.all([
                    fetch('http://localhost:4000/api/categories'),
        fetch('http://localhost:4000/api/products')
                ]);

                if (!categoriesRes.ok || !productsRes.ok) {
                    throw new Error('Failed to fetch data');
                }

                const [categoriesData, productsData] = await Promise.all([
                    categoriesRes.json(),
                    productsRes.json()
                ]);

                setCategories(categoriesData);
                setProducts(productsData);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('حدث خطأ في تحميل البيانات. يرجى المحاولة مرة أخرى.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        categories.forEach((_, i) => {
            const el = contentRefs.current[i];
            if (!el) return;
            if (openIndex === i) {
                el.style.height = el.scrollHeight + 'px';
            } else {
                el.style.height = '0px';
            }
        });
    }, [openIndex, categories]);

    const toggle = (index) => {
        setOpenIndex(prev => (prev === index ? null : index));
    };

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    if (error) {
        return (
            <div className="menu-animated-container">
                <div className="error-message">
                    {error}
                    <button onClick={() => window.location.reload()} className="retry-button">
                        إعادة المحاولة
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="menu-animated-container">
            <h1 className="menu-animated-title">A+Market Menu</h1>
            <div className="categories-row">
                {isLoading ? (
                    <p className="loading-message">جاري تحميل التصنيفات...</p>
                ) : categories.length === 0 ? (
                    <p className="no-categories">لا توجد تصنيفات متاحة.</p>
                ) : (
                    categories.map((cat, i) => {
                        const filteredProducts = products.filter(p => p.category_name === cat.name);

                        return (
                            <div
                                key={i}
                                className={`category ${openIndex === i ? 'active' : ''}`}
                            >
                                <div
                                    className="category-header"
                                    onClick={() => toggle(i)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') toggle(i);
                                    }}
                                >
                                    <span className="category-icon">
                                        {iconMap[cat.name] || <MdDevices />}
                                    </span>
                                    <span className="category-name">{cat.name}</span>
                                    <span className="toggle-icon">{openIndex === i ? '−' : '+'}</span>
                                </div>
                                <div
                                    className="subcategory-wrapper"
                                    ref={(el) => (contentRefs.current[i] = el)}
                                >
                                    <ul className="subcategory-list">
                                        {cat.items?.map((item, idx) => (
                                            <li key={idx} className="subcategory-item">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="product-list">
                                        {filteredProducts.length > 0 ? (
                                            filteredProducts.map((product) => (
                                                <div 
                                                    key={product.product_id} 
                                                    className="product-card"
                                                    onClick={() => handleProductClick(product.product_id)}
                                                    role="button"
                                                    tabIndex={0}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' || e.key === ' ') {
                                                            handleProductClick(product.product_id);
                                                        }
                                                    }}
                                                >
                                                    {product.image_url && (
                                                        <img 
                                                            src={product.image_url} 
                                                            alt={product.name}
                                                            className="product-image"
                                                            onError={(e) => {
                                                                e.target.src = 'https://via.placeholder.com/160x120?text=No+Image';
                                                            }}
                                                        />
                                                    )}
                                                        <div className="product-details">
                                                            <h4>{product.name}</h4>
                                                        {product.price && (
                                                            <p className="product-price">
                                                                {product.price.toLocaleString('ar-DZ')} دج
                                                            </p>
                                                        )}
                                                        </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="no-products">لا توجد منتجات في هذا التصنيف.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
