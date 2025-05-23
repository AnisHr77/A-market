import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (product) => {
        setFavorites(prev => {
            if (prev.find(item => item.id === product.id)) return prev; // already in favorites
            return [...prev, product];
        });
    };

    const removeFavorite = (id) => {
        setFavorites(prev => prev.filter(item => item.id !== id));
    };

    const isFavorite = (id) => {
        return favorites.some(item => item.id === id);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
