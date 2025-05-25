import React from 'react';
import { useFavorites } from '../Context/FavoritesContext';
import './Bookmark.css';

const Bookmark = () => {
    const { favorites, removeFavorite } = useFavorites();

    if (favorites.length === 0) {
        return <div className="bookmark-empty">You haven't saved any favorites yet.</div>;
    }

    return (
        <div className="bookmark">
            <h1>Bookmarked Products</h1>
            <div className="favorites-list">

                {favorites.map(({ id, image, title, description, price }) => (
                    <div key={id} className="favorite-card">
                        <img src={image} alt={title} />
                        <h3>{title}</h3>
                        <p>{description}</p>
                        <p>Price: ${price}</p>
                        <button className="remove-btn" onClick={() => removeFavorite(id)}>
                            UnSave
                        </button>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default Bookmark;
