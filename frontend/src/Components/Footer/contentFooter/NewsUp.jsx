import React, { useState } from 'react';

const NewsUpdates = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        console.log(`Subscribed email: ${email}`);
        // You can send `email` to a backend or service like Mailchimp here
        setEmail('');
    };

    return (
        <div style={styles.container}>
            <div style={styles.textBlock}>
                <h2 style={styles.heading}>📰 News & Updates</h2>
                <p style={styles.text}>
                    Stay informed about our latest products and exclusive offers.
                </p>
            </div>
            <form onSubmit={handleSubscribe} style={styles.form}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Subscribe</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: '"Microsoft PhagsPa"',
        backgroundColor: '#2c2f36',
        color: '#ffffff',
        border: '0.5px solid #212020',
        borderRadius: '9px',
        padding: '16px',
        maxWidth: '500px',
        margin: '20px auto',
        textAlign: 'center',
    },
    textBlock: {
        marginBottom: '12px',
    },
    heading: {
        fontSize: '20px',
        marginBottom: '6px',
    },
    text: {
        fontSize: '14px',
        color: '#cccccc',
    },
    form: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '8px',
    },
    input: {
        padding: '8px',
        borderRadius: '6px',
        border: '1px solid #444',
        fontFamily: '"Microsoft PhagsPa"',
        width: '60%',
        backgroundColor: '#2c2f36',
        color: '#ffffff',
    },
    button: {
        backgroundColor: '#5980ff',
        border: 'none',
        color: '#fff',
        padding: '8px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontFamily: '"Microsoft PhagsPa"',
    },
};

export default NewsUpdates;
