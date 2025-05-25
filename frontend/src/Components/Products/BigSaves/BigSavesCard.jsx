import React, { useState } from 'react';
import { FaGift, FaRegHeart, FaHeart } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useCart } from '../../../Context/CartContext';
import { useFavorites } from '../../../Context/FavoritesContext';

const BigSavesCard = ({ item }) => {
    const { addToCart } = useCart();
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
    const [isClicked, setIsClicked] = useState(false);

    const favorited = isFavorite(item.id);

    const toggleFavorite = (e) => {
        e.stopPropagation();
        e.preventDefault(); // prevents triggering the link
        if (favorited) {
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

    const handleAddToCart = (e) => {
        e.stopPropagation();
        e.preventDefault(); // prevents triggering the link
        addToCart(item);
        toast.success("Item added to cart!", {
            style: {
                backgroundImage: 'linear-gradient(140deg, #6b6c6c, #2A2D33)',
                color: 'white'
            }
        });
    };

    const heartStyle = {
        position: 'absolute',
        top: '3px',
        right: '8px',
        width: '20px',
        height: '20px',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, color 0.2s ease',
        transform: isClicked ? 'scale(1.4)' : 'scale(1)',
        color: favorited ? 'red' : 'black',
        zIndex: 2
    };

    return (
        <a
            href={`/product/${item.id}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
        >
            <div className="ContainerCard">
                <div className='RecommendationCard' style={{ position: 'relative', cursor: 'pointer' }}>
                    {favorited ? (
                        <FaHeart onClick={toggleFavorite} style={heartStyle} />
                    ) : (
                        <FaRegHeart onClick={toggleFavorite} style={heartStyle} />
                    )}

                    <img src={item.image} alt={item.title} />
                    <div style={{ position: 'relative', top: '-20px' }}>
                        <div style={{ display: "flex", position: 'relative', top: '25px', marginBottom: '30px' }}>
                            <div style={{
                                position: 'relative',
                                width: `${item.Pourcentage}`,
                                height: '3px',
                                backgroundColor: 'white',
                            }}>
                                <FaGift style={{
                                    position: 'absolute',
                                    top: '-8px',
                                    right: '-10px',
                                    height: '20px',
                                    width: '20px'
                                }} />
                            </div>
                            <span style={{
                                position: "relative",
                                top: '-5px',
                                left: '25px',
                                fontSize: '13px'
                            }}>
                                {item.Pourcentage} Saves
                            </span>
                        </div>

                        <p style={{ fontSize: '13px', fontWeight: 'bold' }}>{item.description}</p>

                        <div className='Prices'>
                            <p style={{ position: 'relative', top: '-15px' }}>Now ${item.price}</p>
                            <p style={{
                                color: 'grey',
                                textDecoration: 'line-through',
                                position: 'relative',
                                top: '-12px'
                            }}>
                                ${item.oldprice}
                            </p>

                            <button
                                style={{
                                    width: '70px',
                                    height: '30px',
                                    position: 'relative',
                                    borderRadius: '20px',
                                    border: 'none'
                                }}
                                onClick={handleAddToCart}
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
        </a>
    );
};

export default BigSavesCard;
