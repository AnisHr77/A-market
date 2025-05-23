import React, { useState } from 'react';
import { SlArrowDown } from "react-icons/sl";

const Categories = () => {
    const [isHovered, setIsHovered] = useState(false);
    const categories = ['Fashion', 'Laptops', 'Phones', 'Toys', 'Sports', 'Books'];

    return (
        <div
            className="category-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ position: 'relative', display: 'inline-block' }} // Ensure it positions properly
        >
            <a href="#" id="categoryText">
                Categories <SlArrowDown style={{ width: '10px', height: '10px', position: 'relative' }} />
            </a>

            {isHovered && (
                <ul>
                    {categories.map((category, index) => (
                        <li key={index} id="categoryItem" style={{ padding: '5px 0' }}>
                            {category}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Categories;
