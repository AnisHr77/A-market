import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaHistory, FaTimes } from "react-icons/fa";
import { IoTrendingUpOutline } from "react-icons/io5";

import bigSaves from '../Products/BigSaves/BigSavesData';
import recommendations from '../Products/Recommendations/RecommendationData';
import flashSales from '../Products/FlashSales/FlashSalesData';
import allProducts from '../Products/Allproducts/ProductsData';

import { useLoading } from '../../Context/LoadingContext';

import "./NavbarUp.css";

const SearchBar = () => {
    const [input, setInput] = useState("");
    const [suggestionsVisible, setSuggestionsVisible] = useState(false);
    const [previousSearches, setPreviousSearches] = useState([]);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const wrapperRef = useRef(null);
    const navigate = useNavigate();
    const { setLoading } = useLoading();

    // Combine all product arrays into one big list
    const allItems = [...allProducts, ...bigSaves, ...recommendations, ...flashSales];

    // Helper: get unique product names from allItems
    const getUniqueProductNames = () => {
        const names = allItems.map(p => p.name || p.title).filter(Boolean);
        return [...new Set(names)];
    };

    const trendingSearches = getUniqueProductNames().slice(0, 4);

    useEffect(() => {
        const storedSearches = JSON.parse(localStorage.getItem("previousSearches")) || [];
        setPreviousSearches(storedSearches);
    }, []);

    useEffect(() => {
        localStorage.setItem("previousSearches", JSON.stringify(previousSearches));
    }, [previousSearches]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setSuggestionsVisible(false);
                setHighlightedIndex(-1);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleInputChange = (e) => {
        setInput(e.target.value);
        setSuggestionsVisible(true);
        setHighlightedIndex(-1);
    };

    const filteredProducts = input.trim() === "" ? [] : allItems.filter(
        (product) => {
            const searchTerm = input.toLowerCase();
            return (product.name && product.name.toLowerCase().includes(searchTerm)) ||
                (product.title && product.title.toLowerCase().includes(searchTerm));
        }
    );

    const allSuggestions = [...previousSearches, ...trendingSearches];

    const filteredSuggestions = input.trim() === ""
        ? allSuggestions
        : allSuggestions.filter(
            (item) => item.toLowerCase().includes(input.toLowerCase())
        );

    const combinedSuggestions = filteredProducts.length > 0
        ? filteredProducts.map(p => p.name || p.title)
        : filteredSuggestions;

    // Navigate to product page by product name
    const goToProductPage = (productName) => {
        const lowerName = productName.toLowerCase();
        const foundProduct = allItems.find(
            (p) => (p.name && p.name.toLowerCase() === lowerName) ||
                (p.title && p.title.toLowerCase() === lowerName)
        );

        if (foundProduct) {
            setLoading(true);
            setTimeout(() => {
                navigate(`/product/${foundProduct.id}`);
            }, 50);
        } else {
            alert(`No product found for "${productName}"`);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion);
        setSuggestionsVisible(false);
        setHighlightedIndex(-1);
        // Do NOT navigate immediately on click — let user press Enter or search icon
    };

    const handleRemoveSearch = (indexToRemove) => {
        setPreviousSearches((prev) =>
            prev.filter((_, index) => index !== indexToRemove)
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() !== "") {
            setPreviousSearches((prev) => [
                input,
                ...prev.filter((item) => item.toLowerCase() !== input.toLowerCase()),
            ]);
            setSuggestionsVisible(false);
            setHighlightedIndex(-1);
            goToProductPage(input.trim());
        }
    };

    const handleKeyDown = (e) => {
        if (!suggestionsVisible) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((prev) => (prev < combinedSuggestions.length - 1 ? prev + 1 : 0));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : combinedSuggestions.length - 1));
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (highlightedIndex >= 0 && combinedSuggestions[highlightedIndex]) {
                // Set input to highlighted suggestion without navigation
                setInput(combinedSuggestions[highlightedIndex]);
                setSuggestionsVisible(false);
                setHighlightedIndex(-1);
            } else {
                // No highlighted suggestion, submit form
                handleSubmit(e);
            }
        } else if (e.key === "Escape") {
            setSuggestionsVisible(false);
            setHighlightedIndex(-1);
        }
    };

    return (
        <div
            className={`input-wrapper ${suggestionsVisible ? "with-suggestions" : ""}`}
            ref={wrapperRef}
            style={{ position: "relative" }}
        >
            <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex" }}>
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Search for a product..."
                    onFocus={() => setSuggestionsVisible(true)}
                    onKeyDown={handleKeyDown}
                    className="search-input"
                    autoComplete="off"
                    aria-autocomplete="list"
                    aria-activedescendant={highlightedIndex >= 0 ? `suggestion-${highlightedIndex}` : undefined}
                    role="combobox"
                    aria-expanded={suggestionsVisible}
                />
                <button type="submit" id="search-icon" aria-label="Search">
                    <FaSearch />
                </button>
            </form>

            {suggestionsVisible && combinedSuggestions.length > 0 && (
                <div className="suggestions-box" role="listbox">
                    {combinedSuggestions.map((suggestion, index) => {
                        const isHistory = previousSearches.includes(suggestion);
                        const isHighlighted = index === highlightedIndex;
                        return (
                            <div
                                key={`suggestion-${index}`}
                                id={`suggestion-${index}`}
                                role="option"
                                aria-selected={isHighlighted}
                                className={`suggestion-item ${isHighlighted ? "highlighted" : ""}`}
                                onClick={() => handleSuggestionClick(suggestion)}
                                onMouseEnter={() => setHighlightedIndex(index)}
                                onMouseLeave={() => setHighlightedIndex(-1)}
                                style={{ cursor: "pointer", fontWeight: isHighlighted ? "bold" : "normal" }}
                            >
                                {isHistory ? (
                                    <FaHistory className="icon" />
                                ) : (
                                    <IoTrendingUpOutline className="icon" />
                                )}
                                <span>{suggestion}</span>
                                {isHistory && (
                                    <FaTimes
                                        className="delete-icon"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveSearch(previousSearches.indexOf(suggestion));
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
