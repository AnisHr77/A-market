import React, { useState, useRef, useEffect } from 'react';
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
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    const contentRefs = useRef([]);

    useEffect(() => {
        fetch('http://localhost:3006/api/categories')
            .then((res) => res.json())
            .then(setCategories)
            .catch((err) => console.error('Error fetching categories:', err));

        fetch('http://localhost:3006/api/products')
            .then((res) => res.json())
            .then(setProducts)
            .catch((err) => console.error('Error fetching products:', err));
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

    return (
        <div className="menu-animated-container">
            <h1 className="menu-animated-title">A+Market Menu</h1>
            <div className="categories-row">
                {categories.length === 0 ? (
                    <p style={{ color: 'white', textAlign: 'center' }}>Loading categories...</p>
                ) : (
                    categories.map((cat, i) => {
                        const filteredProducts = products.filter(p => p.category_name === cat.name);

                        return (
                            <div
                                key={i}
                                className={`categoory ${openIndex === i ? 'active' : ''}`}
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
                                                <div key={product.product_id} className="product-card">

                                                    <a
                                                        href={`http://localhost:3002/product/${product.product_id}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="product-link"
                                                    >
                                                        <div className="product-details">
                                                            <h4>{product.name}</h4>
                                                        </div>
                                                    </a>

                                                </div>
                                            ))
                                        ) : (
                                            <p className="no-products">No products in this category.</p>
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
