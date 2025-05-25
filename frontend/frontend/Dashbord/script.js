// Function to handle iframe loading
function handleIframeLoad(section) {
    const iframe = document.getElementById(section + 'Frame');
    const loading = document.getElementById(section + 'Loading');
    iframe.style.display = 'block';
    loading.style.display = 'none';
}

// Function to handle iframe errors
function handleIframeError(section) {
    const iframe = document.getElementById(section + 'Frame');
    const loading = document.getElementById(section + 'Loading');
    loading.innerHTML = `
        <div class="error-container">
            <h2 style="color: #666;">Unable to connect to ${section}</h2>
            <p style="color: #888;">Please make sure the server is running on port ${getPortForSection(section)}</p>
            <button onclick="retryConnection('${section}')" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">
                Retry Connection
            </button>
        </div>
    `;
}

// Helper function to get port for each section
function getPortForSection(section) {
    const portMap = {
        'analytics': '3000',
        'login': '3006',
        'products': '3003',
        'orders': '3005',
        'customize': '3001',
        'chat': '3004',
        'staff': '3002'
    };
    return portMap[section] || 'unknown';
}

// Function to retry connection
function retryConnection(section) {
    const iframe = document.getElementById(section + 'Frame');
    const loading = document.getElementById(section + 'Loading');
    loading.innerHTML = `
        <div class="loading-spinner"></div>
        <p>Loading ${section}...</p>
    `;
    iframe.src = iframe.src;
}

// Handle navigation
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            document.querySelectorAll('.nav-item').forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Hide all sections
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show selected section
            const sectionId = this.getAttribute('data-section');
            if (sectionId) {
                const section = document.getElementById(sectionId);
                section.classList.add('active');
            }
        });
    });

    // Search bar effects
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            this.parentElement.querySelector('i').style.color = '#3b82f6';
        });
        
        searchInput.addEventListener('blur', function() {
            this.parentElement.querySelector('i').style.color = '#94a3b8';
        });
    }
});