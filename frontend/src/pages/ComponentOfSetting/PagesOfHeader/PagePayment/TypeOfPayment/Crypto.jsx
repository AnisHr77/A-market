
import React, { useState } from 'react';
import './Crypto.css';
import { RiBnbFill } from "react-icons/ri";
import { RiBtcFill } from "react-icons/ri";
import { SiSolana } from "react-icons/si";
import { FaEthereum } from "react-icons/fa";
import { RiXrpLine } from "react-icons/ri";


const coins = [
    { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
    { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
    { id: 'tether', symbol: 'USDT', name: 'Tether'},
    { id: 'binancecoin', symbol: 'BNB', name: 'BNB' },
    { id: 'ripple', symbol: 'XRP', name: 'Ripple' }
];
const myCoins=[{
    symbol:"Ton",id: 'ton'},{symbol:"USDT",id: 'usdt'},{symbol:"ETH",id: 'ethereum'}];


function Crypto(props) {
    const [fromCoin, setFromCoin] = useState('bitcoin');
    const [toCoin, setToCoin] = useState('ethereum');
    const [amount, setAmount] = useState(1);
    const [rate, setRate] = useState(null);
    const [converted, setConverted] = useState(null);
    const [selectCoin,setSelectCoin]=useState(null);


    return (
        <div className="exchange-container">
            <div className="IconeList">
                <FaEthereum style={{color:"#959fdb",fontSize:"26px",cursor:"pointer"}}/>
                <RiXrpLine style={{color:"#c7cacd",backgroundColor:"#24292f",borderRadius:"30px",fontSize:"25px",cursor:"pointer"}}/>
                <SiSolana style={{background:"linear-gradient(to right,#9146f5,#4f83c3,#4c9bca,#23ad9e",color:"black",borderRadius:"30px",padding:"4px",cursor:"pointer"}}/>
                <RiBtcFill style={{color:"#f6941b",fontSize:"28px",cursor:"pointer"}}/>
                <RiBnbFill style={{color:"#ebb91c",fontSize:"28px",cursor:"pointer"}}/>
            </div>
            <h2>Crypto Exchange</h2>

            <div className="exchange-row">

                <select value={fromCoin} onChange={(element) => setFromCoin(element.target.value)}>
                    {coins.map((coin) => (
                        <option key={coin.id} value={coin.id}>
                            {coin.symbol} - {coin.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="exchange-row">

                <select value={toCoin} onChange={(element) => setToCoin(element.target.value)}>
                    {coins.map((coin) => (
                        <option key={coin.id} value={coin.id}>
                            {coin.symbol} - {coin.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="exchange-row">

                <input placeholder={"Number"}
                       style={{marginLeft:'0',width:'600px'}}
                       type="number"
                       value={amount}
                       onChange={(element) => setAmount(element.target.value)}
                       min="0"
                />
            </div>



            <button id={"BtnExchange"}>EXCHANGE</button>
            <hr style={{position:"absolute",left:"250px", top:"326px",width:"395px",borderColor:"#2C2C2C9B"}}  className={"hr-ctypto"}/>
            <br/><br/>
            <input style={{width:"380px",marginLeft:'5px',marginTop:"20px"}} type={"text"} placeholder={"connect your wallet"}/>
            <div className={"connect-wallet"}>
                <input  type={"number"} placeholder={"Amount"}/>  <select id={"selectTon"}  onChange={(element) => setSelectCoin(element.target.value)}>
                {myCoins.map((mycoins) => (
                    <option key={mycoins} value={mycoins.id}>
                        {mycoins.symbol}

                    </option>

                ))}

            </select>

                <p className={"myP-crypto-fleche"} > ⇅</p>

                <p className={"Myp-wallet"}>Remaining :"{props.TotalCoins}   "   <a href={'#'}>MAX</a></p>
            </div>
            <button onClick={()=>(window.alert("Success 💭"))} id={"BtnContinue"}>Continue</button>
        </div>
    );
}

export default Crypto;