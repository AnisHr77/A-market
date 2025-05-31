import React from 'react';
import { useFavorites } from '../Context/FavoritesContext';
import './Bookmark.css';
import { Link } from 'react-router-dom'; // If using React Router

const Bookmark = () => {
    const { favorites, removeFavorite } = useFavorites();

    if (favorites.length === 0) {
        return (
            <div className="bookmark-empty">
                <svg
                    className="empty-icon fade-up delay-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#ccc"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M17 6v13l-5-3.5L7 19V6a2 2 0 012-2h6a2 2 0 012 2z"
                    />
                </svg>
                <h2 className="empty-title fade-up delay-2">No Saved Items</h2>
                <p className="empty-subtext fade-up delay-3">
                    You haven’t saved anything yet.<br />
                    Start browsing and tap the bookmark icon to save items.
                </p>
                <Link to="/" className="go-home-link fade-up delay-4">← Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="bookmark">
            <h1>Bookmarked Products</h1>
            <div className="favorites-list">
                {favorites.map(({ id, image, title, description, price }) => (
                    <div key={id} className="favorite-card">
                        <Link to={`/product/${id}`}>
                            <img src={image} alt={title || "Product Image"} />
                            <h3>{title}</h3>
                            <p>{description}</p>
                            <p>Price: ${price}</p>
                        </Link>
                        <button
                            className="remove-btn"
                            onClick={() => removeFavorite(id)}
                        >
                            Unsave
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Bookmark;
