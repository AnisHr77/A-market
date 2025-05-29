import React, { useEffect, useState } from "react";
import './Contact.css';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, LabelList,
    PieChart, Pie, Cell,
    BarChart, Bar,
    ResponsiveContainer
} from "recharts";

const COLORS = ["#625ce0", "#1ca149", "#fcb42f", "#e82c2c", "#FF8042", "#00C49F"];

const StatisticsDashboard = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [salesData, setSalesData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    fetch("http://localhost:3006/api/products"),
                    fetch("http://localhost:3006/api/categories")
                ]);

                const productsData = await productsRes.json();
                const categoriesData = await categoriesRes.json();

                setProducts(productsData);
                setCategories(categoriesData);

                // Parse daily sales and orders based on `created_at`
                const dailySales = {};
                const dailyOrders = {};

                productsData.forEach(product => {
                    if (!product.created_at) return;

                    const date = new Date(product.created_at);
                    const day = date.toLocaleDateString('en-US', { weekday: 'short' }); // Mon, Tue, etc.
                    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                    dailySales[day] = (dailySales[day] || 0) + parseFloat(product.price || 0);
                    dailyOrders[day] = (dailyOrders[day] || 0) + 1;
                });

                const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
                const sales = daysOfWeek.map(day => ({
                    date: day,
                    sales: dailySales[day] || 0,
                    time: "10:00 AM" // placeholder, can enhance later
                }));

                const orders = daysOfWeek.map(day => ({
                    day: day,
                    orders: dailyOrders[day] || 0
                }));

                setSalesData(sales);
                setOrderData(orders);

                // Count products per category_id
                const categoryCountMap = {};
                productsData.forEach(product => {
                    const catId = product.category_id;
                    categoryCountMap[catId] = (categoryCountMap[catId] || 0) + 1;
                });

                const categoryChartData = categoriesData.map(cat => ({
                    name: cat.name,
                    value: categoryCountMap[cat.category_id] || 0
                })).filter(cat => cat.value > 0);

                setCategoryData(categoryChartData);

            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="dashboard-container">
            <div className="dashboard-grid">

                {/* Line Chart */}
                <div className="dashboard-card">
                    <h2 className="card-title">Your Purchases This Week</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={salesData}>
                            <XAxis dataKey="date" stroke="#aaa" />
                            <YAxis stroke="#aaa" />
                            <Tooltip content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const { date, sales, time } = payload[0].payload;
                                    return (
                                        <div style={{
                                            backgroundColor: "rgba(49,45,45,0.85)",
                                            padding: "10px",
                                            border: "1px solid #ccc",
                                            color: "white",
                                            fontWeight: "bold",
                                            borderRadius: "1rem"
                                        }}>
                                            <p><strong>{date}</strong></p>
                                            <p>Sales: ${sales.toFixed(2)}</p>
                                            <p>Time: {time}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }} />
                            <CartesianGrid stroke="#444" strokeDasharray="5 5" />
                            <Line type="monotone" dataKey="sales" stroke="#8884d8">
                                <LabelList dataKey="time" position="top" fill="#333" fontSize={12} />
                            </Line>
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="dashboard-card">
                    <h2 className="card-title">Top Categories</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Bar Chart */}
                <div className="dashboard-card wide">
                    <h2 className="card-title">Your Requests Per Day</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={orderData}>
                            <XAxis dataKey="day" stroke="#aaa" />
                            <YAxis stroke="#aaa" />
                            <Tooltip />
                            <CartesianGrid stroke="#444" strokeDasharray="5 5" />
                            <Bar dataKey="orders" fill="#36d06d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    );
};

export default StatisticsDashboard;
