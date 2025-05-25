import React from 'react';
import { IoIosFlash } from "react-icons/io";
import { FaGift } from "react-icons/fa";
import { toast } from 'react-toastify';
import {useCart} from "../../Context/CartContext";

export function OffersCard(props) {
    const { addToCart } = useCart();

    const handleAddToCart = (index) => {
        addToCart({
            id: `${props.id}-${index}`,
            category : props.category[index],
            title: props.title[index],
            image: props.image[index],
            countdown: props.countdown?.[index],
            saves: props.saves?.[index],

            price: props.price?.[index],
        });

        toast.success("Item added to cart!", {
            style: {
                backgroundImage: 'linear-gradient(140deg, #6b6c6c, #2A2D33)',
                color: 'white'
            }
        });
    };



    const {
        category,
        icon,
        image,
        title,
        price,
        oldprice,
        countdown,
        width,
        Pourcentage,
        saves
    } = props;

    return (
        <div className="offersList">
            <div className="offersCard" id={props.id}>
                <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>
                    {icon}{category}
                </h2>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '15px',
                    marginBottom: '15px',
                    marginLeft: '16px',
                    marginRight: '16px',
                }}>
                    {[0, 1].map((i) => (
                        <img
                            className={'image'}
                            key={i}
                            id={i}
                            src={image[i]}
                            alt={`Offers-img-${i}`}
                            style={{
                                borderRadius: '10px',
                                objectFit: 'cover'
                            }}
                        />
                    ))}
                </div>

                <div className="offerContent">
                    {category === "Recommendation" && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '15px',
                            marginLeft: '16px',
                            marginRight: '16px'
                        }}>
                            {[0, 1].map((i) => (
                                <div key={i} style={{
                                    width: '48%',
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <div style={{ fontWeight: "bold", fontSize: '16px' }}>
                                        Now ${String(price[i])}
                                    </div>
                                    <div style={{
                                        textDecoration: 'line-through',
                                        color: 'grey',
                                        fontSize: '13px'
                                    }}>
                                        ${String(oldprice[i])} 
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <br />

                    {category === "FlashSales" && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '15px',
                            marginLeft: '16px',
                        }}>
                            {[0, 1].map((i) => (
                                <div key={i} style={{
                                    marginLeft: '0px',
                                    width: '80%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'start',
                                    gap: '4px',
                                    position: "relative",
                                    top: '-18px',
                                }}>
                                    <div style={{
                                        position: 'relative',
                                        width: width[i],
                                        height: '3px',
                                        backgroundColor: 'white',
                                        alignItems: 'start',
                                    }}>
                                        <IoIosFlash style={{
                                            position: 'absolute',
                                            top: '-10px',
                                            right: '-10px',
                                            height: '20px',
                                            width: '20px',
                                            color: 'white',
                                            alignSelf: 'flex-start'
                                        }} />
                                    </div>
                                    <div style={{
                                        color: 'grey',
                                        fontSize: '13px',
                                        alignSelf: 'flex-end',
                                        marginLeft: '10px',
                                    }}>
                                        {countdown[i]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {category === "BigSave" && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '15px',
                            marginLeft: '16px',
                        }}>
                            {[0, 1].map((i) => (
                                <div key={i} style={{
                                    width: '90%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'start',
                                    position: "relative",
                                    top: '-18px',
                                    gap: '4px'
                                }}>
                                    <div style={{
                                        position: 'relative',
                                        width: Pourcentage[i],
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
                                    <div style={{
                                        color: 'grey',
                                        fontSize: '13px',
                                        position: 'relative',
                                        top: '-0px',
                                        width: '50%',
                                        alignSelf: 'flex-end',
                                        marginLeft: '10px',
                                    }}>
                                        {saves[i]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {[0, 1].map((i) => (
                            <div key={i} style={{
                                width: '48%',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                height: '70px',
                                position: 'relative',
                                top: '-14px',
                                marginLeft: '16px',
                                marginRight: '16px',
                            }}>
                                <h5 style={{ margin: '0 0 0px 0' }}>{title[i]}</h5>
                                <button
                                    onClick={() => handleAddToCart(i)}

                                        style={{
                                    borderRadius: '15px',
                                    height: '30px',
                                    width: '70px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    backgroundColor: '#fff',
                                    color: '#000',
                                    marginTop: '10px'
                                }}>
                                    <svg width="16" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.00002 4H4.00002M4.00002 4H7.00002M4.00002 4V7M4.00002 4V1" stroke="#1B1A1A"
                                              strokeWidth="1.5" strokeLinecap="round" style={{ position: 'relative', left: '200px' }} />
                                    </svg>
                                    Add
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

    export default OffersCard
