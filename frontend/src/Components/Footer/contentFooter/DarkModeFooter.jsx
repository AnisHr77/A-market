import React from 'react';
import { MdDarkMode } from "react-icons/md";

const Security = () => {
    return (<div>
            <h2 style={{textAlign:"center"}}>Dark Mode</h2>
            <hr/>
            <div style={styles.container}>


                <p >
                    Personalize your viewing experience.

                </p>
                <hr style={styles.hrDarkModefooter}/>
                <h2>Current Theme</h2>
                <p >
                    You are currently using the Light theme.
                </p>
                <hr style={styles.hrDarkModefooter}/>
                <h2 >Switch Mode</h2>
                <button style={styles.btnDarkModefooter}  ><MdDarkMode style={{color:"#E6D4BA",height:"25px"}}/></button>
                <hr style={styles.hrDarkModefooter}/>



            </div></div>
    );
};

const styles = {
    container: {
        marginLeft:"115px"
    },

    hrDarkModefooter: {
        borderColor: "rgba(37, 40, 45, 0.37)",
        width: "100%",
        margin: "2rem 0"
    },
    btnDarkModefooter:{
        backgroundColor: "rgba(0,22,89,0.62)",
        borderRadius: "20px",
        border:"none",
        paddingTop:"4px",
        paddingRight:"30px",
        color:"white",
        fontFamily:'helvetica, sans-serif',
        fontSize:"1.5rem",

    }
};

export default Security;
