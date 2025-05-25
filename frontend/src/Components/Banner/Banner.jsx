

import React, { useState, useEffect } from 'react';
import './Banner.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { imgSlides } from './bannerData';

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(nextSlide, 4000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? imgSlides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === imgSlides.length - 1 ? 0 : prev + 1));
    };

    const sliderStyle = {
        backgroundImage: `url(${imgSlides[currentIndex].url})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '3%' }}>
            <div id="ImgSlider" style={sliderStyle}>
                <div id="switcher">
                    <FaChevronLeft id="ScrollLeft" onClick={prevSlide} />
                    <FaChevronRight id="ScrollRight" onClick={nextSlide} />
                </div>
            </div>
            <h1 id="BestOffers">Best Offers</h1>
        </div>
    );
};

export default Banner
