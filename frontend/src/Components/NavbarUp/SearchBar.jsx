import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaHistory, FaTimes } from "react-icons/fa";
import { IoTrendingUpOutline } from "react-icons/io5";
import { useLoading } from '../../Context/LoadingContext';
import "./NavbarUp.css";

const SearchBar = () => {
    const [input, setInput] = useState("");
    const [products, setProducts] = useState([]);
    const [suggestionsVisible, setSuggestionsVisible] = useState(false);
    const [previousSearches, setPreviousSearches] = useState([]);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const wrapperRef = useRef(null);
    const navigate = useNavigate();
    const { setLoading } = useLoading();

    useEffect(() => {
        fetch("http://localhost:3006/api/products")
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Failed to fetch products", err));
    }, []);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("previousSearches")) || [];
        setPreviousSearches(stored);
    }, []);

    useEffect(() => {
        localStorage.setItem("previousSearches", JSON.stringify(previousSearches));
    }, [previousSearches]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setSuggestionsVisible(false);
                setHighlightedIndex(-1);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        setInput(e.target.value);
        setSuggestionsVisible(true);
        setHighlightedIndex(-1);
    };

    const filteredProducts = input.trim()
        ? products.filter(p => p.name?.toLowerCase().includes(input.toLowerCase()))
        : [];

    const trendingSearches = [...new Set(products.map(p => p.name))].slice(0, 4);
    const allSuggestions = [...previousSearches, ...trendingSearches];
    const filteredSuggestions = input.trim()
        ? allSuggestions.filter(s => s.toLowerCase().includes(input.toLowerCase()))
        : allSuggestions;

    const combinedSuggestions = filteredProducts.length > 0 ? filteredProducts : filteredSuggestions.map(name => products.find(p => p.name === name));

    const goToProductPage = (productName) => {
        const match = products.find(p => p.name?.toLowerCase() === productName.toLowerCase());
        if (match) {
            setLoading(true);
            setTimeout(() => navigate(`/product/${match.product_id}`), 50);
        } else {
            alert(`No product found for "${productName}"`);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion.name);
        setSuggestionsVisible(false);
        setHighlightedIndex(-1);
    };

    const handleRemoveSearch = (index) => {
        setPreviousSearches(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            setPreviousSearches(prev => [input, ...prev.filter(p => p.toLowerCase() !== input.toLowerCase())]);
            setSuggestionsVisible(false);
            setHighlightedIndex(-1);
            goToProductPage(input.trim());
        }
    };

    const handleKeyDown = (e) => {
        if (!suggestionsVisible) return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex(prev => (prev + 1) % combinedSuggestions.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex(prev => (prev - 1 + combinedSuggestions.length) % combinedSuggestions.length);
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (highlightedIndex >= 0) {
                setInput(combinedSuggestions[highlightedIndex]?.name);
                setSuggestionsVisible(false);
                setHighlightedIndex(-1);
            } else {
                handleSubmit(e);
            }
        } else if (e.key === "Escape") {
            setSuggestionsVisible(false);
            setHighlightedIndex(-1);
        }
    };

    return (
        <div className={`input-wrapper ${suggestionsVisible ? "with-suggestions" : ""}`} ref={wrapperRef}>
            <form onSubmit={handleSubmit} style={{ display: "flex", width: "100%" }}>
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Search for a product..."
                    onFocus={() => setSuggestionsVisible(true)}
                    onKeyDown={handleKeyDown}
                    className="search-input"
                    autoComplete="off"
                />
                <button type="submit" id="search-icon" aria-label="Search">
                    <FaSearch />
                </button>
            </form>

            {suggestionsVisible && combinedSuggestions.length > 0 && (
                <div className="suggestions-box">
                    {combinedSuggestions.map((product, index) => {
                        const isHistory = typeof product === "string";
                        const name = isHistory ? product : product?.name;
                        const image = isHistory ? null : product?.image_url;
                        const isHighlighted = index === highlightedIndex;

                        return (
                            <div
                                key={index}
                                className={`suggestion-item ${isHighlighted ? "highlighted" : ""}`}
                                onClick={() => handleSuggestionClick(product)}
                                onMouseEnter={() => setHighlightedIndex(index)}
                                onMouseLeave={() => setHighlightedIndex(-1)}
                            >
                                {isHistory ? (
                                    <FaHistory className="icon" />
                                ) : image ? (
                                    <img src={image} alt={name} className="suggestion-image" />
                                ) : (
                                    <IoTrendingUpOutline className="icon" />
                                )}
                                <span>{name}</span>
                                {isHistory && (
                                    <FaTimes
                                        className="delete-icon"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveSearch(previousSearches.indexOf(product));
                                        }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
