import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useCart } from '../../../Context/CartContext';
import { useFavorites } from '../../../Context/FavoritesContext';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoIosFlash } from "react-icons/io";

const FlashSalesCard = ({ item }) => {
    const { addToCart } = useCart();
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
    const [isClicked, setIsClicked] = useState(false);

    const favorited = isFavorite(item.product_id);

    const toggleFavorite = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (favorited) {
            removeFavorite(item.product_id);
        } else {
            addFavorite({
                id: item.product_id,
                image: item.image_url,
                title: item.name,
                description: item.description,
                price: item.price
            });
        }

        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 150);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        e.preventDefault();
        addToCart(item);
        toast.success("Item added to cart!", {
            style: {
                backgroundImage: 'linear-gradient(140deg, #6b6c6c, #2A2D33)',
                color: 'white'
            }
        });
    };

    const heartStyle = {
        position: 'relative',
        width: '20px',
        height: '20px',
        left: '172px',
        top: '-178px',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, color 0.2s ease',
        transform: isClicked ? 'scale(1.4)' : 'scale(1)',
        color: favorited ? 'red' : 'black'
    };

    return (
        <a
            href={`/product/${item.product_id}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
        >
            <div className="ContainerCard">
                <div className='RecommendationCard' style={{ cursor: 'pointer', position: 'relative' }}>
                    <div>
                        <img src={item.image_url} alt={item.name} />
                        {favorited ? (
                            <FaHeart onClick={toggleFavorite} style={heartStyle} />
                        ) : (
                            <FaRegHeart onClick={toggleFavorite} style={heartStyle} />
                        )}
                    </div>

                    <div style={{ position: 'relative', top: '-50px' }}>
                        {/* Flash bar and icon */}
                        <div style={{
                            display: "flex",
                            position: 'relative',
                            top: '35px',
                            marginBottom: '3rem'
                        }}>
                            <div style={{
                                position: 'relative',
                                width: '50%',
                                height: '3px',
                                backgroundColor: 'white',
                                marginBottom: '0.5rem'
                            }}>
                                <IoIosFlash style={{
                                    position: 'absolute',
                                    top: '-8px',
                                    right: '-10px',
                                    height: '20px',
                                    width: '20px'
                                }} />
                            </div>
                        </div>

                        <p style={{ fontSize: '13px', fontWeight: 'bold' }}>{item.description}</p>

                        <div className='Prices'>
                            <p style={{ fontSize: '13.5px', position: 'relative', top: '-12px' }}>
                                Now ${item.price}
                            </p>
                            {item.old_price && (
                                <p style={{
                                    fontSize: '13.5px',
                                    color: 'grey',
                                    textDecoration: 'line-through',
                                    position: 'relative',
                                    top: '-12px'
                                }}>
                                    ${item.old_price}
                                </p>
                            )}
                            <button
                                onClick={handleAddToCart}
                                style={{ width: '70px', height: '30px', borderRadius: '20px', border: 'none' }}
                            >
                                Add
                            </button>
                        </div>

                        <div className="Sold">
                            <div>{item.visits} views</div>
                            <div>{item.discount_percent}% off</div>
                        </div>

                        <div style={{ display: 'flex' }} className="Statistiques">
                            <div>★</div>
                            <div style={{ position: 'relative', top: '2px' }}>{item.quantity} in stock</div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default FlashSalesCard;
