import React, {useState,useEffect} from 'react'
import "./Banner.css"
import { FaChevronLeft,FaChevronRight }from "react-icons/fa";

const Banner = () => {
    const ImgSlides=[
    "https://images.contentstack.io/v3/assets/blt1d2d260317d3b8f0/blt916bc6a3dedca7ff/60f73a2b60e48e11c968fc90/Web-Banner-LIGHT-TEXT-PS5-Launch-v1.1.jpg",
        "https://evolvegamingpc.com.au/cdn/shop/files/product-banner-nemesis.jpg?v=1708890208&width=1920",
        "https://img.freepik.com/free-psd/black-friday-super-sale-facebook-cover-banner-template_120329-5180.jpg?semt=ais_hybrid&w=740"
]
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(nextSlide, 4000);
        return () => clearInterval(interval); // Cleanup on unmount
    }, [currentIndex]);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? ImgSlides.length - 1 : prev - 1));
    };


    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === ImgSlides.length - 1 ? 0 : prev + 1));
    };



    return (
        <div style={{display: 'flex', flexDirection: 'column',marginBottom:'3%px'}}>



                            <div id='ImgSlider' style={{ backgroundImage:`url(${ImgSlides[currentIndex]})` ,backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center' }} >

                                <div id='switcher'>

                                    <FaChevronLeft id='ScrollLeft' onClick={prevSlide} />
                                    <FaChevronRight  id="ScrollRight" onClick={nextSlide}  />
                                </div>
                            </div>

<h1 id={'BestOffers'}>Best Offers </h1>

</div>

    )
}
export default Banner
