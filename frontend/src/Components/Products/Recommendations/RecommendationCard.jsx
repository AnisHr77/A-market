import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useCart } from '../../../Context/CartContext';
import { useFavorites } from '../../../Context/FavoritesContext';
import { FaRegHeart, FaHeart } from "react-icons/fa";

const RecommendationCard = ({ item }) => {
    const { addToCart } = useCart();
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
<<<<<<< HEAD
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
=======

    const [isClicked, setIsClicked] = useState(false);


    const favorited = isFavorite(item.id);

    const handleAddToCart = () => {
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
        addToCart(item);
        toast.success("Item added to cart!", {
            style: {
                backgroundImage: 'linear-gradient(140deg, #6b6c6c, #2A2D33)',
                color: 'white'
            }
        });
    };

<<<<<<< HEAD
=======
    const toggleFavorite = () => {
        if (isFavorite(item.id)) {
            removeFavorite(item.id);
        } else {
            addFavorite({
                id: item.id,
                image: item.image,
                title: item.title,
                description: item.description,
                price: item.price
            });
        }
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 150);
    };

>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
    const heartStyle = {
        position: 'relative',
        width: '20px',
        height: '20px',
        left: '172px',
<<<<<<< HEAD
        top: '-178px',
=======
        top: '-180px',
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
        cursor: 'pointer',
        transition: 'transform 0.2s ease, color 0.2s ease',
        transform: isClicked ? 'scale(1.4)' : 'scale(1)',
        color: favorited ? 'red' : 'black'
    };

    return (
<<<<<<< HEAD
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

                    <div style={{ position: "relative", top: "-20px" }}>
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

                        {/* Optional data: can be removed or replaced with real metrics later */}
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
=======
        <div className="ContainerCard">
            <div className='RecommendationCard'>
                <div>
                    <img src={item.image} alt={item.title} />
                    {favorited ? (
                        <FaHeart onClick={toggleFavorite} style={heartStyle} />
                    ) : (
                        <FaRegHeart onClick={toggleFavorite} style={heartStyle} />
                    )}
                </div>

                <div style={{ position: "relative", top: "-20px" }}>
                    <p style={{ fontSize: '13px', fontWeight: 'bold' }}>{item.description}</p>

                    <div className='Prices'>
                        <p style={{ fontSize: '13.5px', position: 'relative', top: '-12px' }}>
                            Now ${item.price}
                        </p>
                        <p style={{
                            fontSize: '13.5px',
                            color: 'grey',
                            textDecoration: 'line-through',
                            position: 'relative',
                            top: '-12px'
                        }}>
                            ${item.oldprice}
                        </p>
                        <button
                            onClick={handleAddToCart}
                            style={{ width: '70px', height: '30px', borderRadius: '20px', border: 'none' }}
                        >
                            Add
                        </button>
                    </div>

                    <div className="Sold">
                        <div>{item.Sold}K +sold</div>
                        <div>{item.Comment}</div>
                    </div>

                    <div style={{ display: 'flex' }} className="Statistiques">
                        <div>{item.Stars}</div>
                        <div style={{ position: 'relative', top: '2px' }}>{item.Statistiques}</div>
                    </div>
                </div>
            </div>
        </div>
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
    );
};

export default RecommendationCard;
