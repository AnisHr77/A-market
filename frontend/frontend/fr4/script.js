document.addEventListener('DOMContentLoaded', () => {
    const previewName = document.getElementById('preview-name');
    const previewDesc = document.getElementById('preview-description');
    const previewPrice = document.getElementById('preview-price');
    const previewQty = document.getElementById('preview-quantity');
    const previewImage = document.getElementById('preview-image');
    const editPreviewName = document.getElementById('edit-preview-name');
    const editPreviewDesc = document.getElementById('edit-preview-description');
    const editPreviewPrice = document.getElementById('edit-preview-price');
    const editPreviewQty = document.getElementById('edit-preview-quantity');
    const editPreviewImage = document.getElementById('edit-preview-image');
  
    // Function to handle image loading errors
    function handleImageError(img) {
        img.src = 'https://via.placeholder.com/200x200?text=Error+Loading+Image';
        console.log('Error loading image');
    }

    // Add error handler to preview image
    previewImage.onerror = function() {
        handleImageError(this);
    };

    // Add error handler to edit preview image
    editPreviewImage.onerror = function() {
        handleImageError(this);
    };
  
    document.getElementById('name').addEventListener('input', (e) => {
      previewName.textContent = e.target.value || 'Product Name';
    });
  
    document.getElementById('description').addEventListener('input', (e) => {
      previewDesc.textContent = e.target.value || 'Product description will appear here';
    });
  
    document.getElementById('price').addEventListener('input', (e) => {
      previewPrice.textContent = e.target.value || '0.00';
    });
  
    document.getElementById('quantity').addEventListener('input', (e) => {
      previewQty.textContent = e.target.value || '0';
    });

    // Only update image when image_url changes
    document.getElementById('image_url').addEventListener('input', (e) => {
        const imageUrl = e.target.value.trim();
        if (imageUrl) {
            // Create a new image to test if it loads
            const testImage = new Image();
            testImage.onload = function() {
                previewImage.src = imageUrl;
            };
            testImage.onerror = function() {
                handleImageError(previewImage);
            };
            testImage.src = imageUrl;
        } else {
            previewImage.src = 'https://via.placeholder.com/200x200?text=No+Image';
        }
    });

    // Add event listeners for edit form inputs
    document.getElementById('edit-name').addEventListener('input', (e) => {
        editPreviewName.textContent = e.target.value || 'Product Name';
    });

    document.getElementById('edit-description').addEventListener('input', (e) => {
        editPreviewDesc.textContent = e.target.value || 'Product description will appear here';
    });

    document.getElementById('edit-price').addEventListener('input', (e) => {
        editPreviewPrice.textContent = e.target.value || '0.00';
    });

    document.getElementById('edit-quantity').addEventListener('input', (e) => {
        editPreviewQty.textContent = e.target.value || '0';
    });

    document.getElementById('edit-image_url').addEventListener('input', (e) => {
        const imageUrl = e.target.value.trim();
        if (imageUrl) {
            const testImage = new Image();
            testImage.onload = function() {
                editPreviewImage.src = imageUrl;
            };
            testImage.onerror = function() {
                handleImageError(editPreviewImage);
            };
            testImage.src = imageUrl;
        } else {
            editPreviewImage.src = 'https://via.placeholder.com/200x200?text=No+Image';
        }
    });

    // Handle form submission
    document.getElementById('product-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            price: document.getElementById('price').value,
            quantity: document.getElementById('quantity').value,
            image_url: document.getElementById('image_url').value,
            category_id: document.getElementById('category_id').value,
            old_price: document.getElementById('old_price').value,
            discount_percent: document.getElementById('discount_percent').value
        };

        try {
            const response = await fetch('/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            
            if (response.ok) {
                alert(data.message || 'Product added successfully!');
                // Reset form
                document.getElementById('product-form').reset();
                // Reset preview
                previewName.textContent = 'Product Name';
                previewDesc.textContent = 'Product description will appear here';
                previewPrice.textContent = '0.00';
                previewQty.textContent = '0';
                previewImage.src = 'https://via.placeholder.com/200x200?text=No+Image';
                // Reload products list
                loadProducts();
            } else {
                alert(data.message || 'Error adding product');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding product');
        }
    });

    // Modal close button
    document.querySelector('.close-modal').addEventListener('click', () => {
        document.getElementById('edit-modal').style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('edit-modal');
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle edit form submission
    document.getElementById('edit-product-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const productId = document.getElementById('edit-product-id').value;
        
        const formData = {
            name: document.getElementById('edit-name').value,
            description: document.getElementById('edit-description').value,
            price: document.getElementById('edit-price').value,
            quantity: document.getElementById('edit-quantity').value,
            image_url: document.getElementById('edit-image_url').value,
            category_id: document.getElementById('edit-category_id').value,
            old_price: document.getElementById('edit-old_price').value,
            discount_percent: document.getElementById('edit-discount_percent').value
        };

        try {
            const response = await fetch(`/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            
            if (response.ok) {
                alert(data.message || 'Product updated successfully!');
                document.getElementById('edit-modal').style.display = 'none';
                loadProducts(); // Reload the products list
            } else {
                alert(data.message || 'Error updating product');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error updating product');
        }
    });
});

// Navigation functions
function showAddProducts() {
    document.getElementById('add-products-section').style.display = 'flex';
    document.getElementById('view-products-section').style.display = 'none';
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.nav-btn:first-child').classList.add('active');
}

function showViewProducts() {
    document.getElementById('add-products-section').style.display = 'none';
    document.getElementById('view-products-section').style.display = 'block';
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.nav-btn:last-child').classList.add('active');
    loadProducts();
}

// Function to load products from the database
async function loadProducts() {
    try {
        const response = await fetch('/products');
        const products = await response.json();
        const container = document.getElementById('products-container');
        container.innerHTML = '';

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'card';
            
            productCard.innerHTML = `
                <img src="${product.image_url || 'https://via.placeholder.com/200x200?text=No+Image'}" 
                     alt="${product.name}" 
                     onerror="this.src='https://via.placeholder.com/200x200?text=Error+Loading+Image'">
                <h3>${product.name}</h3>
                <p>${product.description || 'No description'}</p>
                <p><strong>Price:</strong> ${product.price} DZD</p>
                <p><strong>Quantity:</strong> ${product.quantity}</p>
                <div class="actions">
                    <button class="details" onclick="showProductDetails(${product.product_id})">Details</button>
                    <button class="edit" onclick="editProduct(${product.product_id})">Edit</button>
                    <button class="delete" onclick="deleteProduct(${product.product_id})">Delete</button>
                </div>
            `;
            container.appendChild(productCard);
        });
    } catch (error) {
        console.error('Error loading products:', error);
        alert('Error loading products');
    }
}

// Function to show product details
async function showProductDetails(productId) {
    try {
        const response = await fetch(`/products/${productId}/details`);
        if (!response.ok) throw new Error('Error fetching product details');
        const data = await response.json();
        
        // Update modal content
        document.getElementById('details-name').textContent = data.name;
        document.getElementById('details-description').textContent = data.description || 'No description';
        document.getElementById('details-price').textContent = `${data.price} DZD`;
        document.getElementById('details-quantity').textContent = data.quantity;
        document.getElementById('details-visits').textContent = data.visits || '0';
        document.getElementById('details-category').textContent = data.category_id || '-';
        document.getElementById('details-old-price').textContent = data.old_price ? `${data.old_price} DZD` : '-';
        document.getElementById('details-discount').textContent = data.discount_percent ? `${data.discount_percent}%` : '-';
        
        // Update image
        const detailsImage = document.getElementById('details-preview-image');
        if (data.image_url) {
            detailsImage.src = data.image_url;
            detailsImage.onerror = function() {
                this.src = 'https://via.placeholder.com/300x300?text=Error+Loading+Image';
            };
        } else {
            detailsImage.src = 'https://via.placeholder.com/300x300?text=No+Image';
        }

        // Show modal
        document.getElementById('details-modal').style.display = 'block';
    } catch (error) {
        console.error('Error:', error);
        alert('Error loading product details');
    }
}

// Add event listener for details modal close button
document.querySelector('#details-modal .close-modal').addEventListener('click', () => {
    document.getElementById('details-modal').style.display = 'none';
});

// Close details modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('details-modal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Function to edit a product
async function editProduct(productId) {
    try {
        const response = await fetch(`/products/${productId}`);
        if (!response.ok) throw new Error('Error fetching product');
        const product = await response.json();

        // Fill the edit form with product data
        document.getElementById('edit-product-id').value = product.product_id;
        document.getElementById('edit-name').value = product.name;
        document.getElementById('edit-description').value = product.description || '';
        document.getElementById('edit-price').value = product.price;
        document.getElementById('edit-quantity').value = product.quantity;
        document.getElementById('edit-image_url').value = product.image_url || '';
        document.getElementById('edit-category_id').value = product.category_id || '';
        document.getElementById('edit-old_price').value = product.old_price || '';
        document.getElementById('edit-discount_percent').value = product.discount_percent || '';

        // Update preview
        document.getElementById('edit-preview-name').textContent = product.name;
        document.getElementById('edit-preview-description').textContent = product.description || 'No description';
        document.getElementById('edit-preview-price').textContent = product.price;
        document.getElementById('edit-preview-quantity').textContent = product.quantity;
        document.getElementById('edit-preview-image').src = product.image_url || 'https://via.placeholder.com/200x200?text=No+Image';

        // Show the modal
        document.getElementById('edit-modal').style.display = 'block';
    } catch (error) {
        console.error('Error:', error);
        alert('Error loading product data');
    }
}

// Make editProduct available globally
window.editProduct = editProduct;

// Live preview for edit modal
['edit-name','edit-description','edit-price','edit-quantity','edit-image_url'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', function(e) {
        if (id === 'edit-name') document.getElementById('edit-preview-name').textContent = e.target.value || 'Product Name';
        if (id === 'edit-description') document.getElementById('edit-preview-description').textContent = e.target.value || 'Product description will appear here';
        if (id === 'edit-price') document.getElementById('edit-preview-price').textContent = e.target.value || '0.00';
        if (id === 'edit-quantity') document.getElementById('edit-preview-quantity').textContent = e.target.value || '0';
        if (id === 'edit-image_url') {
            const imageUrl = e.target.value.trim();
            const img = document.getElementById('edit-preview-image');
            if (imageUrl) {
                const testImage = new window.Image();
                testImage.onload = function() { img.src = imageUrl; };
                testImage.onerror = function() { img.src = 'https://via.placeholder.com/200x200?text=Error+Loading+Image'; };
                testImage.src = imageUrl;
            } else {
                img.src = 'https://via.placeholder.com/200x200?text=No+Image';
            }
        }
    });
});

// Function to delete a product
async function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        try {
            const response = await fetch(`/products/${productId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                alert('Product deleted successfully!');
                loadProducts(); // Reload the products list
            } else {
                alert('Error deleting product');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error deleting product');
        }
    }
}

// Make showProductDetails available globally
window.showProductDetails = showProductDetails;
  