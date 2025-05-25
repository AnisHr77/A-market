import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Product.css';

import { useCart } from '../Context/CartContext';

import bigSaves from '../Components/Products/BigSaves/BigSavesData';
import recommendations from '../Components/Products/Recommendations/RecommendationData';
import flashSales from '../Components/Products/FlashSales/FlashSalesData';
import allProducts from '../Components/Products/Allproducts/ProductsData';

const Product = () => {
    const { productID } = useParams();
    const { addToCart } = useCart();

    const product =
        bigSaves.find(item => String(item.id) === productID) ||
        recommendations.find(item => String(item.id) === productID) ||
        flashSales.find(item => String(item.id) === productID) ||
        allProducts.find(item => String(item.id) === productID);

    const [mainImage, setMainImage] = useState(product?.image || '');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedFit, setSelectedFit] = useState('');
    const [tab, setTab] = useState('Overview');

    if (!product) return <div>Product not found.</div>;

    const handleAddToCart = () => {
        if (!selectedSize || !selectedFit) {
            alert('Please select a type and a fit.');
            return;
        }

        const cartItem = {
            ...product,
            selectedSize,
            selectedFit,
            mainImage,
        };

        addToCart(cartItem);
        alert('Your product is in the cart!');
    };


    return (
        <div className="asket-product-page">
            <div className="asket-product">
                <div className="image-section">
                    <img src={mainImage} alt={product.title} className="main-image" />

                </div>

                <div className="info-section">
                    <h2>{product.title}</h2>
                    <p className="price">{product.price} USD</p>

                    <div className="color-selector"></div>

                    <div className="selectors">
                        <label>
                            Type:
                            <select
                                value={selectedSize}
                                onChange={e => setSelectedSize(e.target.value)}
                            >
                                <option value="">Choose</option>
                                {['Gaming', 'Normal'].map(size => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label>
                            Fit:
                            <select
                                value={selectedFit}
                                onChange={e => setSelectedFit(e.target.value)}
                            >
                                <option value="">Choose</option>
                                <option value="Regular">Regular</option>
                                <option value="Long">Long</option>
                            </select>
                        </label>
                    </div>

                    <button className="add-to-cart" onClick={handleAddToCart}>
                        ADD TO CART
                    </button>

                    <p className="delivery">Delivery in 4–6 days | Free returns</p>

                    <div className="tabs">
                        {['Overview', 'Details', 'Fit', 'Care'].map(t => (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                className={tab === t ? 'active-tab' : ''}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    <div className="tab-content">
                        {tab === 'Overview' && <p>{product.description}</p>}
                        {tab === 'Details' && <p>Additional product details...</p>}
                        {tab === 'Fit' && <p>Size and fit guide...</p>}
                        {tab === 'Care' && <p>Care instructions...</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
