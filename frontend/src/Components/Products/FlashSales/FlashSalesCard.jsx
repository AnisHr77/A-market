<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React, {useState} from 'react'
import { IoIosFlash } from "react-icons/io";
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
import { toast } from 'react-toastify';
import { useCart } from '../../../Context/CartContext';
import { useFavorites } from '../../../Context/FavoritesContext';
import { FaRegHeart, FaHeart } from "react-icons/fa";
<<<<<<< HEAD
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
=======


const FlashSalesCard = ({ item}) => {
    const {addToCart} = useCart();
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
    const [isClicked, setIsClicked] = useState(false);

    const favorited = isFavorite(item.id);
    const toggleFavorite = () => {
        if (isFavorite(item.id)) {
            removeFavorite(item.id);
        } else {
            addFavorite({
                id: item.id,
                image: item.image,
                title: item.title,
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
                description: item.description,
                price: item.price
            });
        }
<<<<<<< HEAD

=======
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 150);
    };

<<<<<<< HEAD
    const handleAddToCart = (e) => {
        e.stopPropagation();
        e.preventDefault();
=======
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

<<<<<<< HEAD
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
=======

    return (
            <div className="ContainerCard">
                <div className='RecommendationCard'>

                    <div>
                        <img src={item.image} alt={item.title}/>
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
                        {favorited ? (
                            <FaHeart onClick={toggleFavorite} style={heartStyle} />
                        ) : (
                            <FaRegHeart onClick={toggleFavorite} style={heartStyle} />
                        )}
<<<<<<< HEAD
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
=======

                    </div>

                    <div style={{display: "flex", position:'relative',top:'15px',marginBottom:'30px'}}>
                        <div style={{
                            position: 'relative',
                            width: `${item.Pourcentage}`,
                            height: '3px',
                            backgroundColor: 'white',
                        }}>
                            <IoIosFlash style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-10px',
                                height: '20px',
                                width: '20px'
                            }} />

                        </div>
                        <span style={{position:"relative",top:'-5px',left:'25px',fontSize:'13px'}}>{item.Timer}  </span>
                    </div>
                    <p style={{fontSize:'13px',fontWeight:'bold'}}>{item.description}</p>

                    <div className='Prices'>
                        <p style={{position:'relative',top:'-10px'}}>Now ${item.price}</p>
                        <p style={{color:'grey',textDecoration:'line-through',position:'relative',top:'-10px'}}> ${item.oldprice}</p>
                        <button style={{width:'70px',height:'30px',position:'relative',borderRadius:'20px',border:'none'}} onClick={handleAddToCart}> Add </button>
                    </div>
                    <div className="Sold">
                        <div>
                            {item.Sold}K  +sold
                        </div>
                        <div>
                            {item.Comment}
                        </div>

                    </div>
                    <div style={{ display:'flex'}} className="Statistiques">
                        <div> {item.Stars}</div>
                        <div style={{position:'relative',top:'2px'}}>{item.Statistiques}</div>

                    </div>
                </div>
            </div>
        )
    }



    export default FlashSalesCard;
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
