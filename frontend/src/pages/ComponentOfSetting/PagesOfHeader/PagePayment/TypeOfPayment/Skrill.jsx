import React from "react";
import './Skrill.css';
import Skrillimage from "../../../../../Components/Assets/Skrill (2).png"
function Skrill(){
    return(<>
        <div className="exchangeContainer5">
            <div className="skrillContainer">
                <div className={"Skrill-text"}>
                    <h1 className={"Skrill-h1"}>Skrill</h1>
                    <h2 className={"Skrill-h2"}>Skrill Payment</h2>
                </div>

                <form className={"Skrill-form"}>

                    <label htmlFor="email" style={{marginLeft:"-306px"}}>Skrill Email :</label>
                    <input
                        type="email"
                        id="emailSkrill"
                        placeholder={"Gmail@Skrill.com"}
                        required={true}
                    />




                    <label htmlFor="Password">Password :</label>
                    <input
                        type="password"
                        id="AmountSkrill"
                        placeholder={"password"}
                        required={true}

                    />


                    <button type="submit">Pay With Skrill <img src={Skrillimage} width={"35px"} height={"35px"}/> </button>

                </form>



            </div> </div></>);
}export default Skrill;