import React from 'react';

const ReportIssue = () => {
    return (<div>
        <h2 style={{textAlign:"center"}}>🛠️ Report an Issue – Help Us Improve</h2>
            <hr/>
        <div style={styles.container}>

            <p>
                Found a bug? Spotted something wrong?
            </p>
            <hr style={styles.hrReport}/>
            <p >
                We’re always working to improve your experience.
                Use our issue reporting tool to let us know about any problems with the website, products, or orders.
            </p>
            <hr style={styles.hrReport}/>
            <p >
                Every report helps us grow better — thank you for your feedback.
            </p>
            <hr style={styles.hrReport}/>
        </div>
        </div>
    );
};

const styles = {
    container: {
        marginLeft:"115px"
    },

    hrReport: {
        borderColor: "rgba(37, 40, 45, 0.37)",
        width: "100%",
        margin: "2rem 0"
    },
};

export default ReportIssue;
