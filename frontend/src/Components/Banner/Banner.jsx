import React, { useState, useEffect, useRef } from 'react';
import './Banner.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/1200x300?text=No+Image';

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imgSlides, setImgSlides] = useState([]);
    const intervalRef = useRef(null);

    useEffect(() => {
        fetch('http://localhost:4000/api/site-images')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    const firstItem = data[0];
                    // Extract banners, ensure exactly 3 URLs, replace missing with placeholder
                    const banners = [firstItem.banner1, firstItem.banner2, firstItem.banner3].map(url =>
                        typeof url === 'string' && url.length > 0 ? url : PLACEHOLDER_IMAGE
                    );
                    setImgSlides(banners.map(url => ({ url })));
                }
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (imgSlides.length !== 3) return; // wait until exactly 3 slides

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % imgSlides.length);
        }, 4000);

        return () => clearInterval(intervalRef.current);
    }, [imgSlides]);

    const prevSlide = () => {
        setCurrentIndex(prev => (prev === 0 ? imgSlides.length - 1 : prev - 1));
        resetInterval();
    };

    const nextSlide = () => {
        setCurrentIndex(prev => (prev === imgSlides.length - 1 ? 0 : prev + 1));
        resetInterval();
    };

    const resetInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % imgSlides.length);
        }, 4000);
    };

    if (imgSlides.length !== 3) return ;

    const sliderStyle = {
        width: '100%',
        height: '340px',
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

export default Banner;
