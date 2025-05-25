import React from "react";
import './BaridiMob.css';
import {useState} from "react";

function BaridiMob(){
    const [username,setUsername]=useState("");
    const[password,setPassword]=useState("");

    const handleSubmit=(element)=>{
        element.preventDefault();
        alert("hhhh")
    }


    return(<>
        <div className="exchangeContainer4">
            <div className="BaridiMob-container">
                <div className="BaridiMobTitle">
                    <h2 className={"h2BaridiMob"}>BaridiMob</h2>
                    <img width={"50px"} height={"45px"} src={"https://www.baridimob.com/wp-content/uploads/Baridiweb-logo.png"} />
                </div>
                <form className={"BaridiMob-form"} onSubmit={handleSubmit}>
                    <label>Enter the username :</label>
                    <input type="text" name="username" placeholder="Username"
                           required={true}
                    />

                    <label>Enter your password:</label>
                    <input type="password" name="password" placeholder="Password"

                           required={true}
                    />
                    <label>Numéro de compte:</label>
                    <input type="Numero" name="Ncompte" placeholder="N°compte"

                           required={true}
                    />

                    <button type="continue">Continue</button>

                    <div className={"BardiMob-paragraph"} ><p >En entrant dans l'application vous confirmez votre accord aux </p><br/><a href={"#"} className={"a1Baridimob"} >consitions d'accés.</a><br/> <a href={'#'} className={"a2Baridimob"} style={{fontSize: "21px"}}>Réinitialiser le mot de passe</a></div>
                </form>
            </div>
        </div></>)
}export default BaridiMob;