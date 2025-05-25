// Update order statistics
async function updateOrderStats() {
    try {
        const response = await fetch('/api/orders');
        const orders = await response.json();
        
        document.getElementById('totalOrders').textContent = orders.length;
        document.getElementById('pendingOrders').textContent = 
            orders.filter(order => order.status === 'pending').length;
        document.getElementById('shippedOrders').textContent = 
            orders.filter(order => order.status === 'shipped').length;
        document.getElementById('deliveredOrders').textContent = 
            orders.filter(order => order.status === 'delivered').length;
    } catch (error) {
        console.error('Error fetching order stats:', error);
    }
}

// Filter and search orders
function filterOrders(orders) {
    const statusFilter = document.getElementById('status-filter').value;
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    
    return orders.filter(order => {
        const matchesStatus = !statusFilter || order.status === statusFilter;
        const matchesSearch = !searchInput || 
            order.order_id.toString().includes(searchInput) ||
            (order.customer_name || '').toLowerCase().includes(searchInput) ||
            (order.product_name || '').toLowerCase().includes(searchInput) ||
            (order.tracking_number || '').toLowerCase().includes(searchInput) ||
            (order.wilaya || '').toLowerCase().includes(searchInput) ||
            (order.commune || '').toLowerCase().includes(searchInput);
        
        return matchesStatus && matchesSearch;
    });
}

// Update orders table
async function updateOrdersTable() {
    try {
        const response = await fetch('/api/orders');
        const orders = await response.json();
        
        const filteredOrders = filterOrders(orders);
        const tbody = document.getElementById('orders-table-body');
        tbody.innerHTML = '';
        
        filteredOrders.forEach(order => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${order.order_id}</td>
                <td>${order.customer_name || 'N/A'}</td>
                <td>${order.product_name || 'N/A'}</td>
                <td>${order.quantity}</td>
                <td>$${order.total_price}</td>
                <td>
                    <span class="badge bg-${getStatusColor(order.status)}">
                        ${getStatusText(order.status)}
                    </span>
                </td>
                <td>${order.wilaya}, ${order.commune}</td>
                <td>${order.tracking_number || '-'}</td>
                <td>${new Date(order.order_date).toLocaleDateString()}</td>
                <td>${order.estimated_delivery_date ? new Date(order.estimated_delivery_date).toLocaleDateString() : '-'}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="showUpdateStatusModal(${order.order_id}, '${order.status}', '${order.tracking_number || ''}', '${order.estimated_delivery_date || ''}')">
                        Update Status
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        // Update statistics with filtered results
        document.getElementById('totalOrders').textContent = filteredOrders.length;
        document.getElementById('pendingOrders').textContent = 
            filteredOrders.filter(order => order.status === 'pending').length;
        document.getElementById('shippedOrders').textContent = 
            filteredOrders.filter(order => order.status === 'shipped').length;
        document.getElementById('deliveredOrders').textContent = 
            filteredOrders.filter(order => order.status === 'delivered').length;
    } catch (error) {
        console.error('Error fetching orders:', error);
    }
}

// Get status color
function getStatusColor(status) {
    const colors = {
        'pending': 'warning',
        'processing': 'info',
        'shipped': 'primary',
        'delivered': 'success',
        'cancelled': 'danger'
    };
    return colors[status] || 'secondary';
}

// Get status text
function getStatusText(status) {
    const texts = {
        'pending': 'Pending',
        'processing': 'Processing',
        'shipped': 'Shipped',
        'delivered': 'Delivered',
        'cancelled': 'Cancelled'
    };
    return texts[status] || status;
}

// Show update status modal
function showUpdateStatusModal(orderId, currentStatus, currentTrackingNumber, currentEstimatedDate) {
    document.getElementById('orderId').value = orderId;
    document.getElementById('status').value = currentStatus;
    document.getElementById('trackingNumber').value = currentTrackingNumber;
    document.getElementById('estimatedDeliveryDate').value = currentEstimatedDate;
    
    const modal = new bootstrap.Modal(document.getElementById('updateStatusModal'));
    modal.show();
}

// Submit status update
async function submitStatusUpdate() {
    const orderId = document.getElementById('orderId').value;
    const status = document.getElementById('status').value;
    const trackingNumber = document.getElementById('trackingNumber').value;
    const estimatedDeliveryDate = document.getElementById('estimatedDeliveryDate').value;
    
    if (!status || !trackingNumber || !estimatedDeliveryDate) {
        alert('Please fill in all fields');
        return;
    }
    
    try {
        const response = await fetch(`/api/orders/${orderId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status,
                tracking_number: trackingNumber,
                estimated_delivery_date: estimatedDeliveryDate
            })
        });
        
        if (response.ok) {
            const modal = bootstrap.Modal.getInstance(document.getElementById('updateStatusModal'));
            modal.hide();
            updateOrdersTable();
            updateOrderStats();
            alert('Order status updated successfully');
        } else {
            const error = await response.json();
            alert(error.error || 'Error updating order status');
        }
    } catch (error) {
        console.error('Error updating order status:', error);
        alert('Error updating order status');
    }
}

// Add event listeners for filter and search
document.addEventListener('DOMContentLoaded', () => {
    const statusFilter = document.getElementById('status-filter');
    const searchInput = document.getElementById('search-input');
    
    statusFilter.addEventListener('change', updateOrdersTable);
    searchInput.addEventListener('input', updateOrdersTable);
    
    updateOrderStats();
    updateOrdersTable();
}); 