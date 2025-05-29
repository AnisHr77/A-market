import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SlArrowDown } from "react-icons/sl";
import { FaHeadphones, FaLaptop, FaMobileAlt, FaKeyboard, FaMouse } from 'react-icons/fa';
import { MdWatch } from 'react-icons/md';
import './NavbarUp.css';

const iconMap = {
    headphones: <FaHeadphones />,
    laptops: <FaLaptop />,
    phones: <FaMobileAlt />,
    watches: <MdWatch />,
    keyboards: <FaKeyboard />,
    mouses: <FaMouse />,
};

const Categories = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [categories, setCategories] = useState([]);
    const timeoutRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('http://localhost:3006/api/categories');
                const data = await res.json();
                setCategories(data);
            } catch (err) {
                console.error('Failed to load categories:', err);
            }
        };
        fetchCategories();
    }, []);

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

        navigate(`/?${searchParams.toString()}`, {
            replace: true,
            state: 'category-change',
        });

        setTimeout(() => {
            const el = document.getElementById('ProductsFilter');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 0);
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
                    {categories.map((category) => {
                        const nameLower = category.name.toLowerCase();
                        return (
                            <li
                                key={category.category_id}
                                id="categoryItem"
                                style={{ padding: '5px 0', cursor: 'pointer' }}
                                onClick={() => handleCategoryClick(category.name)}
                            >
                                <span className="icon">{iconMap[nameLower] || null}</span> {category.name}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default Categories;
