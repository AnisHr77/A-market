import React from "react";
import './Contact.css';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, LabelList,
    PieChart, Pie, Cell,
    BarChart, Bar,
    ResponsiveContainer
} from "recharts";

// Sales data with time
const salesData = [
    { date: "Mon", sales: 240, time: "10:30 AM" },
    { date: "Tue", sales: 321, time: "1:15 PM" },
    { date: "Wed", sales: 200, time: "3:45 PM" },
    { date: "Thu", sales: 278, time: "11:10 AM" },
    { date: "Fri", sales: 189, time: "5:00 PM" },
    { date: "Sat", sales: 390, time: "9:00 AM" },
    { date: "Sun", sales: 430, time: "4:30 PM" },
];

const categoryData = [
    { name: "Electronics", value: 400 },
    { name: "Fashion", value: 300 },
    { name: "Books", value: 300 },
    { name: "Toys", value: 200 },
];

const orderData = [
    { day: "Mon", orders: 20 },
    { day: "Tue", orders: 45 },
    { day: "Wed", orders: 28 },
    { day: "Thu", orders: 35 },
    { day: "Fri", orders: 30 },
    { day: "Sat", orders: 60 },
    { day: "Sun", orders: 75 },
];

const COLORS = ["#625ce0", "#1ca149", "#fcb42f", "#e82c2c"];

const StatisticsDashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="dashboard-grid">

                {/* Line Chart with Time Labels */}
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
                                        <div style={{ backgroundColor: "rgba(49,45,45,0)", padding: "10px", border: "1px solid #ccc",color:"white",fontWeight:"bold" ,borderRadius:"1rem"}}>
                                            <p><strong>{date}</strong></p>
                                            <p>Sales: {sales}</p>
                                            <p >Time: {time}</p>
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
