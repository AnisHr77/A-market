<<<<<<< HEAD
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
=======
import React from 'react'
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
import { IoMdArrowDropdown } from "react-icons/io";
import "./BelowNav.css";

const BelowNav = () => {
<<<<<<< HEAD
    const navigate = useNavigate();
    const location = useLocation();


    const scrollToId = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleClick = (e, id) => {
        e.preventDefault();


        if (location.pathname === '/') {
            scrollToId(id);
        } else {

            navigate('/', { replace: false });

            setTimeout(() => scrollToId(id), 100);
        }
    };

    return (
        <div className="below-nav">
            <div className="container-BelowNav">
                <a href="/#NewItems" onClick={(e) => handleClick(e, 'NewItems')}>New Items</a>
                <a href="/#Recomendations" onClick={(e) => handleClick(e, 'Recomendations')}>Recomendations</a>
                <a href="/#SupperOffers" onClick={(e) => handleClick(e, 'SupperOffers')}>Supper Offers</a>
                <a href="/#ResetPro" onClick={(e) => handleClick(e, 'ResetPro')}>Top Rated</a>
                <a href="/#BigSaves" onClick={(e) => handleClick(e, 'BigSaves')}>Most Saved</a>
                <a href="/#ResetPro" onClick={(e) => handleClick(e, 'ResetPro')}>Limited Items</a>
                <a href="/#NewItems" onClick={(e) => handleClick(e, 'NewItems')}>Flash Sales</a>
                <a href="/#BigSaves" onClick={(e) => handleClick(e, 'BigSaves')}>Big Saves</a>
                <a href="#" onClick={(e) => e.preventDefault()}>
                    Action<IoMdArrowDropdown />
                </a>
            </div>
        </div>
    );
};

export default BelowNav;
=======
    return (
        <div className="below-nav">
            <div className="container-BelowNav">
                <a href="#"> New Items</a>
                <a href="">Recomendations</a>
                <a href="">Supper Offers</a>
                <a href="">Top Rated</a>
                <a href="">Most Saved</a>
                <a href="">Limited Items</a>
                <a href="">Flash Sales</a>
                <a href="">Big Saves</a>
                <a href="">Action<IoMdArrowDropdown /></a>




        </div>

        </div>
    )
}
export default BelowNav
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
