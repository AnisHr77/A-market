// إضافة منطق إعادة المحاولة التلقائية
const iframeRetryTimers = {};
const MAX_RETRIES = 5;
const RETRY_INTERVAL = 3000; // 3 ثواني

function autoRetryIframe(section, attempt = 1) {
    if (attempt > MAX_RETRIES) return;
    const iframe = document.getElementById(section + 'Frame');
    if (iframe && iframe.style.display !== 'block') {
        // إعادة تحميل الـ iframe
        iframe.src = iframe.src;
        iframeRetryTimers[section] = setTimeout(() => {
            autoRetryIframe(section, attempt + 1);
        }, RETRY_INTERVAL);
    }
}

// Function to handle iframe loading
function handleIframeLoad(section) {
    const iframe = document.getElementById(section + 'Frame');
    const loading = document.getElementById(section + 'Loading');
    if (iframe && loading) {
    iframe.style.display = 'block';
    loading.style.display = 'none';
        // إيقاف مؤقت إعادة المحاولة إذا نجح التحميل
        if (iframeRetryTimers[section]) {
            clearTimeout(iframeRetryTimers[section]);
            delete iframeRetryTimers[section];
        }
        
        // إضافة معالجة الأخطاء داخل الـ iframe
        try {
            iframe.contentWindow.onerror = function(msg, url, line) {
                console.error(`Error in ${section} iframe:`, msg, url, line);
                handleIframeError(section);
                return false;
            };
        } catch (e) {
            console.warn(`Could not set error handler for ${section} iframe:`, e);
        }
    }
}

// Function to handle iframe errors
function handleIframeError(section) {
    const iframe = document.getElementById(section + 'Frame');
    const loading = document.getElementById(section + 'Loading');
    if (loading) {
    loading.innerHTML = `
        <div class="error-container">
                <i class="fas fa-exclamation-circle" style="font-size: 48px; color: #dc2626; margin-bottom: 16px;"></i>
                <h2 style="color: #dc2626; margin-bottom: 8px;">Connection Error</h2>
                <p style="color: #666; margin-bottom: 16px;">Unable to connect to ${section} service</p>
                <p style="color: #888; margin-bottom: 24px;">Please make sure the server is running on port ${getPortForSection(section)}</p>
                <button onclick="retryConnection('${section}')" 
                    style="padding: 12px 24px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; transition: background-color 0.2s;">
                    <i class="fas fa-sync-alt" style="margin-right: 8px;"></i>
                Retry Connection
            </button>
        </div>
    `;
    }
    if (iframe) {
        iframe.style.display = 'none';
    }
    // بدء إعادة المحاولة التلقائية
    autoRetryIframe(section);
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

// Handle navigation with lazy loading
document.addEventListener('DOMContentLoaded', function() {
    const sections = {};
    
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
            
            // Show selected section and load iframe if needed
            const sectionId = this.getAttribute('data-section');
            if (sectionId) {
                const section = document.getElementById(sectionId);
                if (section) {
                section.classList.add('active');
                    
                    // تحميل الـ iframe فقط عند الحاجة
                    const iframe = document.getElementById(sectionId + 'Frame');
                    if (iframe && !sections[sectionId]) {
                        sections[sectionId] = true;
                        iframe.src = iframe.getAttribute('data-src') || iframe.src;
                    }
                    // إذا كان الـ iframe في حالة loading، ابدأ إعادة المحاولة التلقائية
                    const loading = document.getElementById(sectionId + 'Loading');
                    if (loading && loading.style.display !== 'none') {
                        autoRetryIframe(sectionId);
                    }
                }
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