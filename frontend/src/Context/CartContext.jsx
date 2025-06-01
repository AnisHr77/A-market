import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
<<<<<<< HEAD
    // Initialize cart from localStorage safely (checks for SSR)
    const [cartItems, setCartItems] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];
    });

    // Sync cart to localStorage whenever it changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        }
    }, [cartItems]);

    // Normalize product id and add to cart or increase quantity
    const addToCart = (product) => {
        const id = product.id ?? product.product_id; // normalize id key
        setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i.id === id);
            if (existingItem) {
                return prevItems.map(i =>
                    i.id === id ? { ...i, quantity: i.quantity + 1 } : i
                );
            } else {
                return [...prevItems, { ...product, id, quantity: 1 }];
=======
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);


    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i.id === product.id);
            if (existingItem) {
                return prevItems.map(i =>
                    i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
            }
        });
    };

<<<<<<< HEAD
    // Remove item by id
=======

>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
    const removeFromCart = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

<<<<<<< HEAD
    // Increase quantity by 1
=======

>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
    const increaseQuantity = (id) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

<<<<<<< HEAD
    // Decrease quantity by 1 or remove item if quantity would be 0
    const decreaseQuantity = (id) => {
        setCartItems(prevItems =>
            prevItems.flatMap(item =>
                item.id === id
                    ? item.quantity > 1
                        ? [{ ...item, quantity: item.quantity - 1 }]
                        : [] // remove item if quantity is 1 and decreasing
                    : [item]
=======

    const decreaseQuantity = (id) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
            )
        );
    };

<<<<<<< HEAD
    // Number of distinct items
    const cartCount = cartItems.length;

    // Total quantity of all items
    const cartCounter = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                cartCount,
                cartCounter,
                clearCart
            }}
        >
=======

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            increaseQuantity,
            decreaseQuantity,
            cartCount
        }}>
>>>>>>> 39a31864d31c1a0b421962039b1217ea1a8332a9
            {children}
        </CartContext.Provider>
    );
};
