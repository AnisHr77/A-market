
import './Return.css';
function Return(){
    return(
        <>
<div className={"Return-all"}>
            <h1 style={{textAlign:"center"}}>Return & Refund Policy</h1>
            <hr/>
            <div className="Return-content">
            <h2>Return Conditions</h2>
            <p>You can return products within 3 days of receiving them.</p>

            <ul>
                <li>The product must be in its original condition, unused, and in its original packaging.</li>
                <li>The purchase receipt or proof of payment must be included.</li>
        <li> Certain products (such as underwear or perishable items) may not be returned unless they are defective</li>
            </ul>

            {/***/}
                <hr className={"hrReturn"}/>
            <h2>Return Process</h2>

            <ol>
                <li>Contact our customer service to request a return.</li>
                <li>You will receive instructions on how to return the product.</li>
                <li> Once we receive and inspect the returned product, we will process your request.</li>
            </ol>

            {/***/}
                <hr className={"hrReturn"}/>
            <h2>Return Conditions</h2>
            <p>Refunds will be issued to the original payment method within [Number] business days after the return is approved.</p>

            <ul>
                <li>Original shipping fees may be deducted from the refund amount unless the product is defective or the error was on our part.</li>
                <li>Packaging or gift wrapping fees are non-refundable.</li>

            </ul>
            {/*****/}
                <hr className={"hrReturn"}/>
            <h2>Exchanges</h2>
            <p>We may offer exchanges for defective or incorrectly delivered products for a similar product. Please contact our customer service to discuss exchange options.</p>

            {/***/}
                <hr className={"hrReturn"}/>
            <h2>Important Notes</h2>
            <li>We reserve the right to refuse returns if the above conditions are not met.</li>
            <li>Please contact our customer service if you have any questions or concerns regarding our Return & Refund Policy.</li>

            <hr className={"hrReturn"}/>
</div>
</div> </>
    );
}export default Return;