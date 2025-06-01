<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Product.css';
import { useCart } from '../Context/CartContext';

const Product = () => {
    const { productID } = useParams();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [mainImage, setMainImage] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedFit, setSelectedFit] = useState('');
    const [tab, setTab] = useState('Overview');

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:4000/api/product/${productID}`);


                if (!response.ok) throw new Error('Failed to fetch product data');
                const data = await response.json();
                setProduct(data);
                setMainImage(data.image_url || '');
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (productID) fetchProduct();
    }, [productID]);

    if (loading) return <div>Loading product...</div>;
    if (error) return <div>Error: {error}</div>;
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
                    <img src={mainImage} alt={product.name} className="main-image" />
                </div>

                <div className="info-section">
                    <h2>{product.name}</h2>

                    <p className="price">
                        <strong>{parseFloat(product.price).toFixed(2)} USD</strong>{' '}
                        {product.old_price && (
                            <span className="old-price">{parseFloat(product.old_price).toFixed(2)} USD</span>
                        )}
                    </p>

                    {product.discount_percent && (
                        <p className="discount">-{parseFloat(product.discount_percent).toFixed(2)}% OFF</p>
                    )}

                    <div className="category" style={{background:'transparent',marginBottom:'1rem'}}>Category: {product.category_name}</div>

                    <div className="selectors">
                        <label>
                            Type:
                            <select
                                value={selectedSize}
                                onChange={e => setSelectedSize(e.target.value)}
                            >
                                <option value="">Choose</option>
                                {['Europian Quality', 'Local Quality','American Quality'].map(size => (
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
                        {tab === 'Details' && <p>Advanced Apple device with cutting-edge features.</p>}
                        {tab === 'Fit' && <p>Compact and sleek — designed for daily performance.</p>}
                        {tab === 'Care' && <p>Use a microfiber cloth to clean. Keep away from liquids.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
=======
import React from 'react'


const Product = () => {
    return (
        <div>

        </div>
    )
}
export default Product
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
