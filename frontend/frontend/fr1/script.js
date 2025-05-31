// Currency conversion rate (1 USD = 134.5 DZD)
const DZD_TO_USD_RATE = 134.5;

// Initialize currency state
let currentCurrency = 'DZD';

// Format currency value
function formatCurrency(value, currency) {
    if (currency === 'USD') {
        value = value / DZD_TO_USD_RATE;
        return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return value.toLocaleString() + ' DZD';
}

// Update all currency displays
function updateCurrencyDisplays() {
    // Fetch latest dashboard stats from database
    fetchData('dashboard-stats').then(dashboardStats => {
        if (dashboardStats) {
            // Update sales card with latest data from database
            const salesCard = document.querySelector('.card.sales .card-value');
            if (salesCard) {
                salesCard.textContent = formatCurrency(dashboardStats.total_sales || 0, currentCurrency);
                salesCard.setAttribute('data-value', dashboardStats.total_sales || 0);
            }
        }
    });

    // Update charts
    updateChartsCurrency();
}

// Update charts with new currency
function updateChartsCurrency() {
    // Update Sales Trend Chart
    const salesTrendChart = Chart.getChart('salesTrendChart');
    if (salesTrendChart) {
        salesTrendChart.options.scales.y.ticks.callback = function(value) {
            return formatCurrency(value, currentCurrency);
        };
        salesTrendChart.options.plugins.tooltip.callbacks.label = function(context) {
            return 'Sales: ' + formatCurrency(context.raw, currentCurrency);
        };
        salesTrendChart.update();
    }

    // Update Top Products Chart - only convert revenue in tooltip
    const topProductsChart = Chart.getChart('topProductsChart');
    if (topProductsChart) {
        topProductsChart.options.plugins.tooltip.callbacks.label = function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.raw / total) * 100).toFixed(1);
            const revenue = context.raw * 150000;
            return [
                `Units Sold: ${context.raw.toLocaleString()}`,
                `Revenue: ${formatCurrency(revenue, currentCurrency)}`,
                `Market Share: ${percentage}%`
            ];
        };
        topProductsChart.update();
    }

    // Update Revenue by Category Chart
    const revenueCategoryChart = Chart.getChart('revenueCategoryChart');
    if (revenueCategoryChart) {
        revenueCategoryChart.options.plugins.tooltip.callbacks.label = function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.raw / total) * 100).toFixed(1);
            const revenue = context.raw * 100000;
            return [
                `${context.label}`,
                `Revenue: ${formatCurrency(revenue, currentCurrency)}`,
                `(${percentage}% of total)`
            ];
        };
        revenueCategoryChart.update();
    }

    // Update Top States Chart
    const topStatesChart = Chart.getChart('topStatesChart');
    if (topStatesChart) {
        topStatesChart.options.scales.y.ticks.callback = function(value) {
            return formatCurrency(value, currentCurrency);
        };
        topStatesChart.options.plugins.tooltip.callbacks.label = function(context) {
            return 'Revenue: ' + formatCurrency(context.raw, currentCurrency);
        };
        topStatesChart.update();
    }
}

// API base URL
const API_BASE_URL = 'http://localhost:3000/api';

// Fetch data from API
async function fetchData(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Function to create empty chart
function createEmptyChart(canvasId, chartType) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const existingChart = Chart.getChart(canvasId);
    if (existingChart) {
        existingChart.destroy();
    }

    new Chart(ctx, {
        type: chartType,
        data: {
            labels: [],
            datasets: [{
                data: [],
                borderColor: '#f72585',
                backgroundColor: 'rgba(247, 37, 133, 0.1)',
                borderWidth: 2.5,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Function to update sales trend data
async function updateSalesTrendData(period = '6months') {
    try {
        const response = await fetch(`${API_BASE_URL}/sales?period=${period}`);
        if (!response.ok) {
            throw new Error('Failed to fetch sales data');
        }
        const data = await response.json();
        console.log('Fetched sales data:', data);
        initSalesTrendChart(data, period);
    } catch (error) {
        console.error('Error updating sales trend data:', error);
    }
}

// Function to initialize sales trend chart
function initSalesTrendChart(salesData, period = '6months') {
    console.log('Initializing sales trend chart with data:', salesData);

    // Get the canvas element
    const canvas = document.getElementById('salesTrendChart');
    if (!canvas) {
        console.error('Sales trend chart canvas not found');
        return;
    }

    // Destroy existing chart if it exists
    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
        existingChart.destroy();
    }

    // Format date based on period
    const formatDate = (dateStr) => {
        switch(period) {
            case '24hours':
                return new Date(dateStr).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            case '7days':
                return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
            case 'lastmonth':
                return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            case 'quarter':
            case '6months':
            default:
                return new Date(dateStr + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        }
    };

    // Create the chart
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: salesData.map(item => formatDate(item.time_period)),
            datasets: [{
                label: 'Total Sales',
                data: salesData.map(item => parseFloat(item.total_sales || 0)),
                borderColor: '#3a86ff',
                backgroundColor: 'rgba(58, 134, 255, 0.1)',
                borderWidth: 2.5,
                tension: 0.4,
                fill: true,
                yAxisID: 'y'
            }, {
                label: 'Total Orders',
                data: salesData.map(item => parseInt(item.total_orders || 0)),
                borderColor: '#f72585',
                backgroundColor: 'rgba(247, 37, 133, 0.1)',
                borderWidth: 2.5,
                tension: 0.4,
                fill: true,
                yAxisID: 'y1'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            size: 12,
                            weight: '500'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#2a2a2a',
                    bodyColor: '#2a2a2a',
                    borderColor: '#e0e0e0',
                    borderWidth: 1,
                    padding: 15,
                    boxPadding: 8,
                    usePointStyle: true,
                    callbacks: {
                        label: function(context) {
                            const datasetLabel = context.dataset.label;
                            const value = context.raw;
                            if (datasetLabel === 'Total Sales') {
                                return `${datasetLabel}: ${formatCurrency(value, currentCurrency)}`;
                            } else {
                                return `${datasetLabel}: ${value} orders`;
                            }
                        }
                    }
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Sales'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        callback: function(value) {
                            return formatCurrency(value, currentCurrency);
                        },
                        font: {
                            size: 11
                        },
                        padding: 10
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Orders'
                    },
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        callback: function(value) {
                            return value + ' orders';
                        },
                        font: {
                            size: 11
                        },
                        padding: 10
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 11
                        },
                        padding: 10
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Update the initCharts function
async function initCharts() {
    try {
        // Fetch all data
        const [salesData, orderStatusData, topProductsData, userAcquisitionData, revenueCategoryData, topStatesData, dashboardStats] = await Promise.all([
            fetchData('sales'),
            fetchData('order-status'),
            fetchData('top-products'),
            fetchData('user-acquisition?period=lastmonth'),
            fetchData('revenue-by-category?period=6months'),
            fetchData('top-states?period=6months'),
            fetchData('dashboard-stats')
        ]);

        // Initialize sales trend chart
        if (salesData) {
            initSalesTrendChart(salesData);
        } else {
            console.error('No sales data available');
            createEmptyChart('salesTrendChart', 'line');
        }

        // Update dashboard stats
        if (dashboardStats) {
            const salesCard = document.querySelector('.card.sales .card-value');
            if (salesCard) {
                salesCard.textContent = formatCurrency(dashboardStats.total_sales || 0, currentCurrency);
                salesCard.setAttribute('data-value', dashboardStats.total_sales || 0);
            }
            
            document.querySelector('.card.orders .card-value').textContent = (dashboardStats.total_orders || 0).toLocaleString();
            document.querySelector('.card.users .card-value').textContent = (dashboardStats.active_users || 0).toLocaleString();
            document.querySelector('.card.products .card-value').textContent = (dashboardStats.total_products || 0).toLocaleString();
        }

        // Initialize user acquisition chart
        if (userAcquisitionData) {
            initUserAcquisitionChart(userAcquisitionData, 'lastmonth');
        } else {
            console.error('No user acquisition data available');
            createEmptyChart('userAcquisitionChart', 'line');
        }

        // Initialize revenue by category chart
        if (revenueCategoryData) {
            initRevenueCategoryChart(revenueCategoryData, '6months');
        } else {
            console.error('No revenue category data available');
            createEmptyChart('revenueCategoryChart', 'pie');
        }

        // Initialize top states chart
        if (topStatesData) {
            initTopStatesChart(topStatesData, '6months');
        } else {
            console.error('No top states data available');
            createEmptyChart('topStatesChart', 'bar');
        }

        // 2. Order Status Doughnut Chart
        if (orderStatusData && orderStatusData.length > 0) {
            const orderStatusCtx = document.getElementById('orderStatusChart').getContext('2d');
            new Chart(orderStatusCtx, {
                type: 'doughnut',
                data: {
                    labels: orderStatusData.map(item => item.status),
                    datasets: [{
                        data: orderStatusData.map(item => item.count),
                        backgroundColor: [
                            'rgba(76, 201, 240, 0.9)',  // Delivered - Light Blue
                            'rgba(72, 149, 239, 0.9)',  // Shipped - Blue
                            'rgba(67, 97, 238, 0.9)',   // Processing - Dark Blue
                            'rgba(58, 134, 255, 0.9)',  // Pending - Primary Blue
                            'rgba(247, 37, 133, 0.9)'   // Cancelled - Pink
                        ],
                        borderWidth: 0,
                        borderRadius: 6,
                        hoverOffset: 15,
                        weight: 1
                    }]
                },
                options: {
                    cutout: '60%',
                    radius: '90%',
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { 
                            position: 'right',
                            align: 'center',
                            labels: {
                                usePointStyle: true,
                                pointStyle: 'circle',
                                padding: 20,
                                font: {
                                    size: 12,
                                    weight: '500'
                                },
                                color: '#2a2a2a'
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            titleColor: '#2a2a2a',
                            bodyColor: '#2a2a2a',
                            borderColor: '#e0e0e0',
                            borderWidth: 1,
                            padding: 15,
                            boxPadding: 8,
                            usePointStyle: true,
                            callbacks: {
                                label: function(context) {
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = ((context.raw / total) * 100).toFixed(1);
                                    return [
                                        `${context.label}: ${context.raw} orders`,
                                        `(${percentage}% of total)`
                                    ];
                                }
                            }
                        }
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true,
                        duration: 2000,
                        easing: 'easeInOutQuart'
                    }
                }
            });
        } else {
            createEmptyChart('orderStatusChart', 'doughnut');
        }

        // 3. Top Products Chart
        if (topProductsData && topProductsData.length > 0) {
            const topProductsCtx = document.getElementById('topProductsChart').getContext('2d');
            new Chart(topProductsCtx, {
                type: 'bar',
                data: {
                    labels: topProductsData.map(item => item.name),
                    datasets: [{
                        label: 'Units Sold',
                        data: topProductsData.map(item => item.total_quantity),
                        backgroundColor: [
                            'rgba(114, 9, 183, 0.85)',    // Purple
                            'rgba(76, 201, 240, 0.85)',   // Light Blue
                            'rgba(72, 149, 239, 0.85)',   // Blue
                            'rgba(67, 97, 238, 0.85)',    // Dark Blue
                            'rgba(58, 134, 255, 0.85)',   // Primary Blue
                            'rgba(247, 37, 133, 0.85)',   // Pink
                            'rgba(114, 9, 183, 0.75)'     // Light Purple
                        ],
                        borderRadius: 10,
                        borderSkipped: false,
                        barPercentage: 0.75,
                        categoryPercentage: 0.9,
                        maxBarThickness: 45,
                        minBarLength: 4
                    }]
                },
                options: {
                    indexAxis: 'y',
                    maintainAspectRatio: false,
                    plugins: { 
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            titleColor: '#2a2a2a',
                            bodyColor: '#2a2a2a',
                            borderColor: '#e0e0e0',
                            borderWidth: 1,
                            padding: 15,
                            boxPadding: 8,
                            usePointStyle: true,
                            callbacks: {
                                label: function(context) {
                                    const product = topProductsData[context.dataIndex];
                                    const total = topProductsData.reduce((sum, item) => sum + item.total_quantity, 0);
                                    const percentage = ((product.total_quantity / total) * 100).toFixed(1);
                                    return [
                                        `Units Sold: ${product.total_quantity.toLocaleString()}`,
                                        `Revenue: ${formatCurrency(product.total_revenue, currentCurrency)}`,
                                        `Market Share: ${percentage}%`
                                    ];
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: { 
                                display: true,
                                color: 'rgba(0, 0, 0, 0.05)',
                                drawBorder: false,
                                lineWidth: 1.5
                            },
                            ticks: {
                                font: {
                                    size: 13,
                                    weight: '500'
                                },
                                padding: 12,
                                callback: function(value) {
                                    return value.toLocaleString() + ' units';
                                }
                            }
                        },
                        y: {
                            grid: { 
                                display: false,
                                drawBorder: false
                            },
                            ticks: {
                                font: {
                                    size: 13,
                                    weight: '500'
                                },
                                padding: 12,
                                color: '#2a2a2a'
                            }
                        }
                    }
                }
            });
        } else {
            createEmptyChart('topProductsChart', 'bar');
        }

        // 4. User Acquisition Line Chart
        if (userAcquisitionData && userAcquisitionData.length > 0) {
            const userAcqCtx = document.getElementById('userAcquisitionChart').getContext('2d');
            new Chart(userAcqCtx, {
                type: 'line',
                data: {
                    labels: userAcquisitionData.map(item => item.month),
                    datasets: [{
                        label: 'Total Users',
                        data: userAcquisitionData.map(item => item.total_users),
                        borderColor: '#f72585',
                        backgroundColor: 'rgba(247, 37, 133, 0.1)',
                        borderWidth: 2.5,
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: '#ffffff',
                        pointBorderColor: '#f72585',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        pointHoverBackgroundColor: '#ffffff',
                        pointHoverBorderColor: '#f72585',
                        pointHoverBorderWidth: 3
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    plugins: { 
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            titleColor: '#2a2a2a',
                            bodyColor: '#2a2a2a',
                            borderColor: '#e0e0e0',
                            borderWidth: 1,
                            padding: 12,
                            boxPadding: 6,
                            callbacks: {
                                label: function(context) {
                                    return context.raw + ' users';
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            grid: { 
                                color: 'rgba(0,0,0,0.05)',
                                drawBorder: false
                            },
                            ticks: {
                                font: {
                                    size: 11
                                },
                                padding: 10
                            }
                        },
                        x: {
                            grid: { display: false },
                            ticks: {
                                font: {
                                    size: 11
                                },
                                padding: 10
                            }
                        }
                    }
                }
            });
        } else {
            createEmptyChart('userAcquisitionChart', 'line');
        }

        // 5. Revenue by Category Pie Chart
        if (revenueCategoryData && revenueCategoryData.length > 0) {
            const revenueCatCtx = document.getElementById('revenueCategoryChart').getContext('2d');
            new Chart(revenueCatCtx, {
                type: 'pie',
                data: {
                    labels: revenueCategoryData.map(item => item.category),
                    datasets: [{
                        data: revenueCategoryData.map(item => item.revenue),
                        backgroundColor: [
                            'rgba(76, 201, 240, 0.9)',   // Light Blue
                            'rgba(247, 37, 133, 0.9)',   // Pink
                            'rgba(114, 9, 183, 0.9)',    // Purple
                            'rgba(72, 149, 239, 0.9)',   // Blue
                            'rgba(67, 97, 238, 0.9)',    // Dark Blue
                            'rgba(58, 134, 255, 0.9)'    // Primary Blue
                        ],
                        borderWidth: 0,
                        borderRadius: 6,
                        hoverOffset: 15,
                        weight: 1
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { 
                            position: 'right',
                            align: 'center',
                            labels: {
                                usePointStyle: true,
                                pointStyle: 'circle',
                                padding: 20,
                                font: {
                                    size: 12,
                                    weight: '500'
                                },
                                color: '#2a2a2a'
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            titleColor: '#2a2a2a',
                            bodyColor: '#2a2a2a',
                            borderColor: '#e0e0e0',
                            borderWidth: 1,
                            padding: 15,
                            boxPadding: 8,
                            usePointStyle: true,
                            callbacks: {
                                label: function(context) {
                                    const total = revenueCategoryData.reduce((sum, item) => sum + item.revenue, 0);
                                    const percentage = ((context.raw / total) * 100).toFixed(1);
                                    return [
                                        `${context.label}`,
                                        `Revenue: ${formatCurrency(context.raw, currentCurrency)}`,
                                        `(${percentage}% of total)`
                                    ];
                                }
                            }
                        }
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true,
                        duration: 2000,
                        easing: 'easeInOutQuart'
                    }
                }
            });
        } else {
            createEmptyChart('revenueCategoryChart', 'pie');
        }

        // 6. Top States Bar Chart
        if (topStatesData && topStatesData.length > 0) {
            const topStatesCtx = document.getElementById('topStatesChart').getContext('2d');
            new Chart(topStatesCtx, {
                type: 'bar',
                data: {
                    labels: topStatesData.map(item => item.wilaya),
                    datasets: [{
                        label: 'Revenue',
                        data: topStatesData.map(item => item.revenue),
                        backgroundColor: [
                            'rgba(58, 134, 255, 0.8)',
                            'rgba(76, 201, 240, 0.8)',
                            'rgba(72, 149, 239, 0.8)',
                            'rgba(67, 97, 238, 0.8)',
                            'rgba(114, 9, 183, 0.8)',
                            'rgba(247, 37, 133, 0.8)',
                            'rgba(58, 134, 255, 0.7)',
                            'rgba(76, 201, 240, 0.7)',
                            'rgba(72, 149, 239, 0.7)',
                            'rgba(67, 97, 238, 0.7)'
                        ],
                        borderRadius: 8,
                        borderSkipped: false,
                        barPercentage: 0.7,
                        categoryPercentage: 0.8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        tooltip: {
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            titleColor: '#2a2a2a',
                            bodyColor: '#2a2a2a',
                            borderColor: '#e0e0e0',
                            borderWidth: 1,
                            padding: 12,
                            boxPadding: 6,
                            callbacks: {
                                label: function(context) {
                                    return 'Revenue: ' + formatCurrency(context.raw, currentCurrency);
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { 
                                color: 'rgba(0,0,0,0.05)',
                                drawBorder: false
                            },
                            ticks: {
                                callback: function(value) {
                                    return formatCurrency(value, currentCurrency);
                                },
                                font: {
                                    size: 11
                                },
                                padding: 10
                            }
                        },
                        x: {
                            grid: { display: false },
                            ticks: {
                                font: {
                                    size: 11,
                                    weight: '500'
                                },
                                padding: 10
                            }
                        }
                    },
                    animation: {
                        duration: 2000,
                        easing: 'easeInOutQuart'
                    }
                }
            });
        } else {
            createEmptyChart('topStatesChart', 'bar');
        }
    } catch (error) {
        console.error('Error initializing charts:', error);
    }
}

// Add event listeners for time period buttons
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all charts with their default periods
    initCharts();

    // Add click event listeners to time period buttons for each chart
    const chartContainers = document.querySelectorAll('.chart-container');
    chartContainers.forEach(container => {
        const buttons = container.querySelectorAll('.time-period-btn');
        const chartId = container.querySelector('canvas').id;
        
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons in this container only
                buttons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                // Get the period from the button's data attribute
                const period = this.getAttribute('data-period');
                
                // Update the specific chart based on its ID
                switch(chartId) {
                    case 'salesTrendChart':
                        updateSalesTrendData(period);
                        break;
                    case 'orderStatusChart':
                        updateOrderStatusData(period);
                        break;
                    case 'topProductsChart':
                        updateTopProductsData(period);
                        break;
                    case 'userAcquisitionChart':
                        updateUserAcquisitionData(period);
                        break;
                    case 'revenueCategoryChart':
                        updateRevenueCategoryData(period);
                        break;
                    case 'topStatesChart':
                        updateTopStatesData(period);
                        break;
                }
            });
        });

        // Set first button as active by default for each chart
        if (buttons.length > 0) {
            buttons[0].classList.add('active');
        }
    });
});

// Function to update order status data
async function updateOrderStatusData(period) {
    try {
        const response = await fetch(`/api/order-status?period=${period}`);
        if (!response.ok) {
            throw new Error('Failed to fetch order status data');
        }
        const data = await response.json();
        console.log('Fetched order status data:', data);
        initOrderStatusChart(data);
    } catch (error) {
        console.error('Error updating order status data:', error);
    }
}

// Function to update top products data
async function updateTopProductsData(period) {
    try {
        const response = await fetch(`/api/top-products?period=${period}`);
        if (!response.ok) {
            throw new Error('Failed to fetch top products data');
        }
        const data = await response.json();
        console.log('Fetched top products data:', data);
        initTopProductsChart(data);
    } catch (error) {
        console.error('Error updating top products data:', error);
    }
}

// Function to update user acquisition data
async function updateUserAcquisitionData(period) {
    try {
        console.log('Fetching user acquisition data for period:', period);
        const response = await fetch(`/api/user-acquisition?period=${period}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user acquisition data');
        }
        const data = await response.json();
        console.log('Fetched user acquisition data:', data);
        
        if (!data || data.length === 0) {
            console.error('No user acquisition data available');
            createEmptyChart('userAcquisitionChart', 'line');
            return;
        }
        
        initUserAcquisitionChart(data, period);
    } catch (error) {
        console.error('Error updating user acquisition data:', error);
        createEmptyChart('userAcquisitionChart', 'line');
    }
}

// Function to update revenue category data
async function updateRevenueCategoryData(period) {
    try {
        const response = await fetch(`/api/revenue-by-category?period=${period}`);
        if (!response.ok) {
            throw new Error('Failed to fetch revenue category data');
        }
        const data = await response.json();
        console.log('Fetched revenue category data:', data);
        initRevenueCategoryChart(data);
    } catch (error) {
        console.error('Error updating revenue category data:', error);
    }
}

// Function to update top states data
async function updateTopStatesData(period) {
    try {
        console.log('Fetching top states data for period:', period);
        const response = await fetch(`/api/top-states?period=${period}`);
        if (!response.ok) {
            throw new Error('Failed to fetch top states data');
        }
        const data = await response.json();
        console.log('Fetched top states data:', data);
        
        if (!data || data.length === 0) {
            console.error('No top states data available');
            createEmptyChart('topStatesChart', 'bar');
            return;
        }
        
        initTopStatesChart(data, period);
    } catch (error) {
        console.error('Error updating top states data:', error);
        createEmptyChart('topStatesChart', 'bar');
    }
}

// Function to initialize order status chart
function initOrderStatusChart(data) {
    const ctx = document.getElementById('orderStatusChart').getContext('2d');
    if (Chart.getChart('orderStatusChart')) {
        Chart.getChart('orderStatusChart').destroy();
    }
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: data.map(item => item.status),
            datasets: [{
                data: data.map(item => item.count),
                backgroundColor: [
                    'rgba(76, 201, 240, 0.9)',  // Delivered
                    'rgba(72, 149, 239, 0.9)',  // Shipped
                    'rgba(67, 97, 238, 0.9)',   // Processing
                    'rgba(58, 134, 255, 0.9)',  // Pending
                    'rgba(247, 37, 133, 0.9)'   // Cancelled
                ],
                borderWidth: 0,
                borderRadius: 6,
                hoverOffset: 15
            }]
        },
        options: {
            cutout: '60%',
            radius: '90%',
            maintainAspectRatio: false,
            plugins: {
                legend: { 
                    position: 'right',
                    align: 'center',
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 20,
                        font: {
                            size: 12,
                            weight: '500'
                        },
                        color: '#2a2a2a'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#2a2a2a',
                    bodyColor: '#2a2a2a',
                    borderColor: '#e0e0e0',
                    borderWidth: 1,
                    padding: 15,
                    boxPadding: 8,
                    usePointStyle: true,
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.raw / total) * 100).toFixed(1);
                            return [
                                `${context.label}: ${context.raw} orders`,
                                `(${percentage}% of total)`
                            ];
                        }
                    }
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true,
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Function to initialize top products chart
function initTopProductsChart(data) {
    const ctx = document.getElementById('topProductsChart').getContext('2d');
    if (Chart.getChart('topProductsChart')) {
        Chart.getChart('topProductsChart').destroy();
    }
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(item => item.name),
            datasets: [{
                label: 'Units Sold',
                data: data.map(item => item.total_quantity),
                backgroundColor: [
                    'rgba(114, 9, 183, 0.85)',
                    'rgba(76, 201, 240, 0.85)',
                    'rgba(72, 149, 239, 0.85)',
                    'rgba(67, 97, 238, 0.85)',
                    'rgba(58, 134, 255, 0.85)'
                ],
                borderRadius: 10
            }]
        },
        options: {
            indexAxis: 'y',
            maintainAspectRatio: false,
            plugins: { 
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#2a2a2a',
                    bodyColor: '#2a2a2a',
                    borderColor: '#e0e0e0',
                    borderWidth: 1,
                    padding: 15,
                    boxPadding: 8,
                    usePointStyle: true,
                    callbacks: {
                        label: function(context) {
                            const product = data[context.dataIndex];
                            const total = data.reduce((sum, item) => sum + item.total_quantity, 0);
                            const percentage = ((product.total_quantity / total) * 100).toFixed(1);
                            return [
                                `Units Sold: ${product.total_quantity.toLocaleString()}`,
                                `Revenue: ${formatCurrency(product.total_revenue, currentCurrency)}`,
                                `Market Share: ${percentage}%`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { 
                        display: true,
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false,
                        lineWidth: 1.5
                    },
                    ticks: {
                        font: {
                            size: 13,
                            weight: '500'
                        },
                        padding: 12,
                        callback: function(value) {
                            return value.toLocaleString() + ' units';
                        }
                    }
                },
                y: {
                    grid: { 
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 13,
                            weight: '500'
                        },
                        padding: 12,
                        color: '#2a2a2a'
                    }
                }
            }
        }
    });
}

// Function to initialize user acquisition chart
function initUserAcquisitionChart(data, period = '6months') {
    console.log('Initializing user acquisition chart with data:', data);
    
    const ctx = document.getElementById('userAcquisitionChart');
    if (!ctx) {
        console.error('User acquisition chart canvas not found');
        return;
    }

    // Destroy existing chart if it exists
    const existingChart = Chart.getChart('userAcquisitionChart');
    if (existingChart) {
        existingChart.destroy();
    }

    // Format date based on period
    const formatDate = (dateStr) => {
        switch(period) {
            case '24hours':
                return new Date(dateStr).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            case '7days':
                return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
            case 'lastmonth':
                return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            case 'quarter':
            case '6months':
            default:
                return new Date(dateStr + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        }
    };

    // Sort data by date
    data.sort((a, b) => new Date(a.month) - new Date(b.month));

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(item => formatDate(item.month)),
            datasets: [{
                label: 'Total Users',
                data: data.map(item => item.total_users),
                borderColor: '#f72585',
                backgroundColor: 'rgba(247, 37, 133, 0.1)',
                borderWidth: 2.5,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#ffffff',
                pointBorderColor: '#f72585',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#ffffff',
                pointHoverBorderColor: '#f72585',
                pointHoverBorderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            size: 12,
                            weight: '500'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#2a2a2a',
                    bodyColor: '#2a2a2a',
                    borderColor: '#e0e0e0',
                    borderWidth: 1,
                    padding: 15,
                    boxPadding: 8,
                    usePointStyle: true,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw} users`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Total Users'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 11
                        },
                        padding: 10
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 11
                        },
                        padding: 10
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Function to initialize revenue category chart
function initRevenueCategoryChart(data) {
    const ctx = document.getElementById('revenueCategoryChart').getContext('2d');
    if (Chart.getChart('revenueCategoryChart')) {
        Chart.getChart('revenueCategoryChart').destroy();
    }
    
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: data.map(item => item.category),
            datasets: [{
                data: data.map(item => item.revenue),
                backgroundColor: [
                    'rgba(76, 201, 240, 0.9)',
                    'rgba(247, 37, 133, 0.9)',
                    'rgba(114, 9, 183, 0.9)',
                    'rgba(72, 149, 239, 0.9)',
                    'rgba(67, 97, 238, 0.9)'
                ],
                borderWidth: 0,
                borderRadius: 6,
                hoverOffset: 15,
                weight: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: { 
                    position: 'right',
                    align: 'center',
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 20,
                        font: {
                            size: 12,
                            weight: '500'
                        },
                        color: '#2a2a2a'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#2a2a2a',
                    bodyColor: '#2a2a2a',
                    borderColor: '#e0e0e0',
                    borderWidth: 1,
                    padding: 15,
                    boxPadding: 8,
                    usePointStyle: true,
                    callbacks: {
                        label: function(context) {
                            const total = data.reduce((sum, item) => sum + item.revenue, 0);
                            const percentage = ((context.raw / total) * 100).toFixed(1);
                            return [
                                `${context.label}`,
                                `Revenue: ${formatCurrency(context.raw, currentCurrency)}`,
                                `(${percentage}% of total)`
                            ];
                        }
                    }
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true,
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Function to initialize top states chart
function initTopStatesChart(data, period = '6months') {
    const ctx = document.getElementById('topStatesChart');
    if (!ctx) {
        console.error('Top states chart canvas not found');
        return;
    }

    // Destroy existing chart if it exists
    const existingChart = Chart.getChart('topStatesChart');
    if (existingChart) {
        existingChart.destroy();
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(item => item.wilaya),
            datasets: [{
                label: 'Revenue',
                data: data.map(item => item.revenue),
                backgroundColor: [
                    'rgba(58, 134, 255, 0.8)',
                    'rgba(76, 201, 240, 0.8)',
                    'rgba(72, 149, 239, 0.8)',
                    'rgba(67, 97, 238, 0.8)',
                    'rgba(114, 9, 183, 0.8)',
                    'rgba(247, 37, 133, 0.8)',
                    'rgba(58, 134, 255, 0.7)',
                    'rgba(76, 201, 240, 0.7)',
                    'rgba(72, 149, 239, 0.7)',
                    'rgba(67, 97, 238, 0.7)'
                ],
                borderRadius: 8,
                borderSkipped: false,
                barPercentage: 0.7,
                categoryPercentage: 0.8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Top Profitable States',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#2a2a2a',
                    bodyColor: '#2a2a2a',
                    borderColor: '#e0e0e0',
                    borderWidth: 1,
                    padding: 12,
                    boxPadding: 6,
                    callbacks: {
                        label: function(context) {
                            return 'Revenue: ' + formatCurrency(context.raw, currentCurrency);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { 
                        color: 'rgba(0,0,0,0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        callback: function(value) {
                            return formatCurrency(value, currentCurrency);
                        },
                        font: {
                            size: 11
                        },
                        padding: 10
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: {
                        font: {
                            size: 11,
                            weight: '500'
                        },
                        padding: 10
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all charts with their default periods
    initCharts();
    
    // Store original values in data attributes - only for sales card
    document.querySelectorAll('.card.sales .card-value').forEach(card => {
        const value = parseFloat(card.textContent.replace(/[^0-9.-]+/g, ''));
        card.setAttribute('data-value', value);
    });
    
    // Currency toggle functionality
    const currencyToggle = document.getElementById('currencyToggle');
    currencyToggle.addEventListener('click', () => {
        currentCurrency = currentCurrency === 'DZD' ? 'USD' : 'DZD';
        currencyToggle.querySelector('span').textContent = currentCurrency;
        updateCurrencyDisplays();
    });
    
    // Update time display
    function updateTime() {
        const now = new Date();
        document.getElementById('timeDisplay').textContent = 
            now.toLocaleTimeString('en-US', {hour12: false});
    }
    updateTime();
    setInterval(updateTime, 1000);

    // Initialize charts with default periods
    updateUserAcquisitionData('lastmonth');
    updateRevenueCategoryData('6months');
    updateTopStatesData('6months');
}); 