import React from 'react';

const Security = () => {
    return (<div>
            <h2 style={{textAlign:"center"}}>Chat Center</h2>
            <hr/>
            <div style={styles.container}>


                <p >
                    Connect with support or continue previous conversations.

                </p>
                <hr style={styles.Chatfooter}/>
                <h2>Active Conversations</h2>
                <p >
                    You don’t have any active chats at the moment.
                </p>
                <hr style={styles.Chatfooter}/>
                <h2 >Start a New Chat</h2>
                <p >
                    Click below to start a conversation with our support team.
                </p>
                <button style={styles.btnChatfooter} > <a style={{textDecoration:"none",color:"white"}} href={"/Chat"}>Start Chat</a></button>
                <hr style={styles.Chatfooter}/>



            </div></div>
    );
};

const styles = {
    container: {
        marginLeft:"115px"
    },

    Chatfooter: {
        borderColor: "rgba(37, 40, 45, 0.37)",
        width: "100%",
        margin: "2rem 0"
    },
    btnChatfooter:{
        backgroundColor: "rgba(26,83,182,0.91)",
        borderRadius: "5px",
        border:"none",
        fontFamily:'helvetica, sans-serif',
        fontSize:"1.5rem",

    }
};

export default Security;
