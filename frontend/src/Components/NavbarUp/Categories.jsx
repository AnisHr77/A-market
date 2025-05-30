import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SlArrowDown } from "react-icons/sl";
import { FaHeadphones, FaLaptop, FaMobileAlt, FaKeyboard, FaMouse, FaRegHeart } from 'react-icons/fa';
import { MdWatch, MdStars } from 'react-icons/md';
import { IoIosFlash } from 'react-icons/io';
import { CiTimer } from 'react-icons/ci';
import './NavbarUp.css';

const iconMap = {
    headphones: <FaHeadphones />,
    laptops: <FaLaptop />,
    phones: <FaMobileAlt />,
    watches: <MdWatch />,
    keyboards: <FaKeyboard />,
    mouses: <FaMouse />,
    toprated: <MdStars />,
    flashsales: <IoIosFlash />,
    recommendations: <FaRegHeart />,
    limiteditems: <CiTimer />,
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

    const handleCategoryClick = (categoryId) => {
        setIsHovered(false);
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('category', categoryId);
        navigate(`/?${searchParams.toString()}`, { replace: true, state: 'category-change' });

        setTimeout(() => {
            const el = document.getElementById('ProductsFilter');
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
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
                <a href="#" id="categoryText" className="nav-hover-effect" onClick={e => e.preventDefault()}>
                    Categories <SlArrowDown style={{ marginLeft: 5, width: 12, height: 12 }} />
                </a>
            </div>

            {isHovered && (
                <ul id="categoryList" style={{ listStyle: 'none', padding: 0, margin: '8px 0 0', position: 'absolute', background: '#272b30', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.3)', minWidth: 160, zIndex: 1000 }}>
                    {categories.map((category) => {
                        const nameLower = category.name.toLowerCase();
                        const icon = iconMap[nameLower] || <span style={{ width: '1em', display: 'inline-block' }} />;
                        return (
                            <li
                                key={category.category_id}
                                id="categoryItem"
                                onClick={() => handleCategoryClick(category.category_id)}
                                style={{
                                    padding: '8px 12px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#d8cfe2',
                                    fontWeight: 500,
                                    userSelect: 'none',
                                    transition: 'background-color 0.2s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#3a3f47'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                <span className="icon" style={{ marginRight: 10, fontSize: 18, display: 'inline-flex', alignItems: 'center' }}>
                  {icon}
                </span>
                                {category.name}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default Categories;
