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
                const res = await fetch('http://localhost:4000/api/categories');
                const data = await res.json();
                const filteredCategories = data.filter(category => 
                    !category.name.toLowerCase().includes('waliiiiiiiiid')
                );
                setCategories(filteredCategories);
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
                <ul id="categoryList" style={{
                    listStyle: 'none',
                    padding: '8px 0',
                    margin: '12px 0 0',
                    position: 'absolute',
                    background: 'linear-gradient(145deg, #2a2f35, #1e2228)',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                    minWidth: '220px',
                    zIndex: 1000,
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                }}>
                    {categories.map((category) => {
                        const nameLower = category.name.toLowerCase();
                        const icon = iconMap[nameLower] || <span style={{ width: '1em', display: 'inline-block' }} />;
                        return (
                            <li
                                key={category.category_id}
                                id="categoryItem"
                                onClick={() => handleCategoryClick(category.category_id)}
                                style={{
                                    padding: '12px 16px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#e4e6eb',
                                    fontWeight: 500,
                                    userSelect: 'none',
                                    transition: 'all 0.3s ease',
                                    margin: '0 8px',
                                    borderRadius: '8px',
                                    fontSize: '0.95rem',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                                    e.currentTarget.style.transform = 'translateX(4px)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.transform = 'translateX(0)';
                                }}
                            >
                                <span className="icon" style={{
                                    marginRight: 12,
                                    fontSize: 20,
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    color: '#6366f1',
                                    background: 'rgba(99, 102, 241, 0.1)',
                                    padding: '8px',
                                    borderRadius: '8px',
                                    transition: 'all 0.3s ease',
                                }}>
                                    {icon}
                                </span>
                                <span style={{
                                    flex: 1,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}>
                                    {category.name}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default Categories;
