// API base URL
const API_BASE_URL = 'http://localhost:3001/api';

document.addEventListener('DOMContentLoaded', () => {
    // const imageInputs = document.querySelectorAll('.image-inputs input[type="text"]'); // Removed
    // const saveImagesButton = document.getElementById('save-images'); // Removed
    const categoriesListDiv = document.getElementById('categories-list');
    const newCategoryNameInput = document.getElementById('new-category-name');
    const addCategoryButton = document.querySelector('.add-category-icon');

    const productPlaceholders = document.querySelectorAll('.product-image-placeholder');
    const urlModal = document.getElementById('url-modal');
    const modalUrlInput = document.getElementById('modal-url-input');
    const saveUrlButton = document.getElementById('save-url');
    const cancelModalButton = document.getElementById ('cancel-modal');

    // New banner modal elements
    const bannerPlaceholder = document.querySelector('.banner-image-placeholder');
    const bannerModal = document.getElementById('banner-modal');
    const modalBanner1Input = document.getElementById('modal-banner1-input');
    const modalBanner2Input = document.getElementById('modal-banner2-input');
    const modalBanner3Input = document.getElementById('modal-banner3-input');
    const saveBannerUrlsButton = document.getElementById('save-banner-urls');
    const cancelBannerModalButton = document.getElementById('cancel-banner-modal');

    let currentProductId = null; // To keep track of which product's URL is being edited

    // Function to load existing data
    async function loadData() {
        try {
            // Show loading state
            const placeholders = document.querySelectorAll('.product-image-placeholder, .banner-image-placeholder');
            placeholders.forEach(placeholder => {
                placeholder.style.opacity = '0.5';
            });

            // Load site images (banners and products)
            const imagesResponse = await fetch(`${API_BASE_URL}/images`);
            if (!imagesResponse.ok) {
                throw new Error('Failed to fetch images');
            }
            const images = await imagesResponse.json();
            
            if (images) {
                // Update banner inputs and placeholder
                modalBanner1Input.value = images.banner1 || '';
                modalBanner2Input.value = images.banner2 || '';
                modalBanner3Input.value = images.banner3 || '';

                if (images.banner1) {
                    bannerPlaceholder.style.backgroundImage = `url('${images.banner1}')`;
                    bannerPlaceholder.style.backgroundSize = 'cover';
                    bannerPlaceholder.style.backgroundPosition = 'center';
                    bannerPlaceholder.textContent = '';
                } else {
                    bannerPlaceholder.style.backgroundImage = 'none';
                    bannerPlaceholder.textContent = 'Banner Images\n1024/1980';
                }

                // Update product placeholders
                const productMappings = {
                    'prd1': images.prd1,
                    'prd2': images.prd2,
                    'prd3': images.prd3,
                    'prd4': images.prd4,
                    'prd5': images.prd5,
                    'prd6': images.prd6
                };

                Object.entries(productMappings).forEach(([productId, imageUrl]) => {
                    const placeholder = document.querySelector(`[data-product-id="${productId}"]`);
                    if (placeholder) {
                        if (imageUrl) {
                            const img = new Image();
                            img.onload = () => {
                                placeholder.style.backgroundImage = `url('${imageUrl}')`;
                                placeholder.style.backgroundSize = 'cover';
                                placeholder.style.backgroundPosition = 'center';
                                placeholder.style.backgroundRepeat = 'no-repeat';
                                placeholder.textContent = '';
                                placeholder.style.opacity = '1';
                            };
                            img.onerror = () => {
                                placeholder.style.backgroundImage = 'none';
                                placeholder.textContent = `Product ${Array.from(productPlaceholders).indexOf(placeholder) + 1} (Invalid image)`;
                                placeholder.style.opacity = '1';
                            };
                            img.src = imageUrl;
                        } else {
                            placeholder.style.backgroundImage = 'none';
                            placeholder.textContent = `Product ${Array.from(productPlaceholders).indexOf(placeholder) + 1} (No image)`;
                            placeholder.style.opacity = '1';
                        }
                    }
                });
            }

            // Load categories
            const categoriesResponse = await fetch(`${API_BASE_URL}/categories`);
            if (!categoriesResponse.ok) {
                throw new Error('Failed to fetch categories');
            }
            const categories = await categoriesResponse.json();
            displayCategories(categories);

        } catch (error) {
            console.error('Error loading data:', error);
            alert('Error loading data. Please refresh the page.');
        } finally {
            // Reset loading state
            const placeholders = document.querySelectorAll('.product-image-placeholder, .banner-image-placeholder');
            placeholders.forEach(placeholder => {
                placeholder.style.opacity = '1';
            });
        }
    }

    // Function to display categories
    function displayCategories(categories) {
        categoriesListDiv.innerHTML = ''; // Clear current list
        
        if (!categories || categories.length === 0) {
            const noCategoriesMessage = document.createElement('div');
            noCategoriesMessage.className = 'no-categories';
            noCategoriesMessage.textContent = 'No categories found';
            categoriesListDiv.appendChild(noCategoriesMessage);
            return;
        }

        categories.forEach(category => {
            const categoryElement = document.createElement('div');
            categoryElement.className = 'category-item';
            categoryElement.innerHTML = `
                <span class="category-name">${category.name}</span>
                <span class="category-id">(ID: ${category.category_id})</span>
            `;
            categoriesListDiv.appendChild(categoryElement);
        });
    }

    // Function to add new category
    async function addCategory(name) {
        if (!name || name.trim() === '') {
            alert('Please enter a category name');
            return false;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name.trim() })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to add category');
            }

            const result = await response.json();
            console.log('Category added:', result);
            
            // Reload categories
            const categoriesResponse = await fetch(`${API_BASE_URL}/categories`);
            if (!categoriesResponse.ok) {
                throw new Error('Failed to fetch updated categories');
            }
            const categories = await categoriesResponse.json();
            displayCategories(categories);
            
            // Clear input
            newCategoryNameInput.value = '';
            
            return true;
        } catch (error) {
            console.error('Error adding category:', error);
            alert(error.message || 'Error adding category. Please try again.');
            return false;
        }
    }

    // Event listeners for product image placeholders
    productPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', () => {
            currentProductId = placeholder.dataset.productId;
            if (!currentProductId) {
                alert('This slot is not linked to a product yet.');
                return;
            }
            const currentImageUrl = placeholder.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
            modalUrlInput.value = currentImageUrl !== 'none' ? currentImageUrl : '';
            urlModal.style.display = 'flex';
        });
    });

    // Event listener for saving URL from product modal
    saveUrlButton.addEventListener('click', async () => {
        if (!currentProductId) {
            alert('No product selected');
            return;
        }

        const newImageUrl = modalUrlInput.value.trim();
        
        // Validate URL
        if (newImageUrl && !newImageUrl.startsWith('http://') && !newImageUrl.startsWith('https://')) {
            alert('Please enter a valid image URL starting with http:// or https://');
            return;
        }

        try {
            // Show loading state
            saveUrlButton.disabled = true;
            saveUrlButton.textContent = 'Saving...';

            const response = await fetch(`${API_BASE_URL}/products/${currentProductId}/image`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image_url: newImageUrl })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to update product image');
            }

            // Update the placeholder
            const updatedPlaceholder = document.querySelector(`[data-product-id='${currentProductId}']`);
            if (updatedPlaceholder) {
                if (newImageUrl) {
                    // Create a new image object to verify the URL
                    const img = new Image();
                    img.onload = () => {
                        updatedPlaceholder.style.backgroundImage = `url('${newImageUrl}')`;
                        updatedPlaceholder.style.backgroundSize = 'cover';
                        updatedPlaceholder.style.backgroundPosition = 'center';
                        updatedPlaceholder.style.backgroundRepeat = 'no-repeat';
                        updatedPlaceholder.textContent = '';
                    };
                    img.onerror = () => {
                        alert('Warning: The image URL could not be loaded. Please check the URL and try again.');
                        updatedPlaceholder.style.backgroundImage = 'none';
                        updatedPlaceholder.textContent = `Product ${Array.from(productPlaceholders).indexOf(updatedPlaceholder) + 1} (Invalid image)`;
                    };
                    img.src = newImageUrl;
                } else {
                    updatedPlaceholder.style.backgroundImage = 'none';
                    updatedPlaceholder.textContent = `Product ${Array.from(productPlaceholders).indexOf(updatedPlaceholder) + 1} (No image)`;
                }
            }

            urlModal.style.display = 'none';
            alert('Product image updated successfully!');
        } catch (error) {
            console.error('Error updating product image:', error);
            alert(error.message || 'Error updating product image. Please try again.');
        } finally {
            // Reset button state
            saveUrlButton.disabled = false;
            saveUrlButton.textContent = 'Save URL';
        }
    });

    // Add click event listener for banner placeholder
    bannerPlaceholder.addEventListener('click', () => {
        // Show banner modal
        bannerModal.style.display = 'flex';
        
        // Load current banner URLs if they exist
        const currentBanner1 = bannerPlaceholder.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
        if (currentBanner1 !== 'none') {
            modalBanner1Input.value = currentBanner1;
        }
        
        // Load other banner URLs from hidden inputs if they exist
        const banner2Input = document.getElementById('banner2');
        const banner3Input = document.getElementById('banner3');
        
        if (banner2Input && banner2Input.value) {
            modalBanner2Input.value = banner2Input.value;
        }
        if (banner3Input && banner3Input.value) {
            modalBanner3Input.value = banner3Input.value;
        }
    });

    // Event listener for saving banner URLs
    saveBannerUrlsButton.addEventListener('click', async () => {
        try {
            const banner1Url = modalBanner1Input.value.trim();
            const banner2Url = modalBanner2Input.value.trim();
            const banner3Url = modalBanner3Input.value.trim();

            // Update banner placeholder with first banner
            if (banner1Url) {
                bannerPlaceholder.style.backgroundImage = `url('${banner1Url}')`;
                bannerPlaceholder.style.backgroundSize = 'cover';
                bannerPlaceholder.style.backgroundPosition = 'center';
                bannerPlaceholder.textContent = '';
            }

            // Store other banner URLs in hidden inputs
            document.getElementById('banner2').value = banner2Url;
            document.getElementById('banner3').value = banner3Url;

            const response = await fetch(`${API_BASE_URL}/images`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    banner1: banner1Url,
                    banner2: banner2Url,
                    banner3: banner3Url,
                    recommendations_prd1: document.querySelector('[data-product-id="prd1"]').style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1') || '',
                    recommendations_prd2: document.querySelector('[data-product-id="prd2"]').style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1') || '',
                    flash_sales_prd1: document.querySelector('[data-product-id="prd3"]').style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1') || '',
                    flash_sales_prd2: document.querySelector('[data-product-id="prd4"]').style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1') || '',
                    big_saves_prd1: document.querySelector('[data-product-id="prd5"]').style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1') || '',
                    big_saves_prd2: document.querySelector('[data-product-id="prd6"]').style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1') || ''
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update banner images');
            }

            bannerModal.style.display = 'none';
            alert('Banner images updated successfully!');
        } catch (error) {
            console.error('Error updating banner images:', error);
            alert(error.message || 'Error updating banner images. Please try again.');
        }
    });

    // Event listeners for modal cancel buttons
    cancelModalButton.addEventListener('click', () => {
        urlModal.style.display = 'none';
    });

    cancelBannerModalButton.addEventListener('click', () => {
        bannerModal.style.display = 'none';
    });

    // Event listener for adding new category
    if (addCategoryButton) {
        addCategoryButton.addEventListener('click', async () => {
            const categoryName = newCategoryNameInput.value.trim();
            if (categoryName) {
                await addCategory(categoryName);
            } else {
                alert('Please enter a category name');
            }
        });
    }

    // Event listener for Enter key in category input
    newCategoryNameInput.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const categoryName = newCategoryNameInput.value.trim();
            if (categoryName) {
                await addCategory(categoryName);
            } else {
                alert('Please enter a category name');
            }
        }
    });

    // Add event listener for page load
    window.addEventListener('load', loadData);

    // Add auto-refresh every 30 seconds
    setInterval(loadData, 30000);
}); 