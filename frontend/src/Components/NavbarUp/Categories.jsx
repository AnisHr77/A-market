import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SlArrowDown } from "react-icons/sl";
import { FaHeadphones, FaLaptop, FaMobileAlt, FaKeyboard, FaMouse } from 'react-icons/fa';
import { MdWatch } from 'react-icons/md';
import './NavbarUp.css';

const Categories = () => {
    const [isHovered, setIsHovered] = useState(false);
    const timeoutRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const categories = [
        { name: 'Headphones', icon: <FaHeadphones /> },
        { name: 'Laptops', icon: <FaLaptop /> },
        { name: 'Phones', icon: <FaMobileAlt /> },
        { name: 'Watches', icon: <MdWatch /> },
        { name: 'Keyboards', icon: <FaKeyboard /> },
        { name: 'Mouses', icon: <FaMouse /> },
    ];

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setIsHovered(false), 200);
    };

    const handleCategoryClick = (categoryName) => {
        setIsHovered(false);

        const searchParams = new URLSearchParams(location.search);
        searchParams.set('category', categoryName);

        if (location.pathname === '/') {
            // ✅ Avoid triggering React Router loaders by using state
            navigate(`${location.pathname}?${searchParams.toString()}`, {
                replace: true,
                state: 'category-change',
            });

            // ✅ Manually scroll to the ProductsFilter element
            setTimeout(() => {
                const el = document.getElementById('ProductsFilter');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 0);
        } else {
            // Navigate to homepage normally (it may load)
            navigate(`/?category=${encodeURIComponent(categoryName)}`);
        }
    };


    return (
        <div
            className="category-wrapper"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ position: 'relative', display: 'inline-block' }}
        >
            <div className="category-container">
                <a href="#" id="categoryText" className="nav-hover-effect">
                    Categories <SlArrowDown style={{ marginLeft: '5px', width: '10px', height: '10px' }} />
                </a>
            </div>
            {isHovered && (
                <ul id="categoryList">
                    {categories.map((category, index) => (
                        <li
                            key={index}
                            id="categoryItem"
                            style={{ padding: '5px 0', cursor: 'pointer' }}
                            onClick={() => handleCategoryClick(category.name)}
                        >
                            <span className="icon">{category.icon}</span> {category.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Categories;
