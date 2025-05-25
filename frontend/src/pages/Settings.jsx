
import NavBarLeftOfSetting from "../pages/ComponentOfSetting/NavBarLeftOfSetting/NavBarLeftOfSetting.jsx";
import HeaderContent from "../pages/ComponentOfSetting/HeaderContent/HeaderContent.jsx";
import './Settings.css';
import imggg from "../Components/Assets/Logo.jpg"
import React from "react";



function Setting(){





    return(<>
            <div className="Setting">
                <div className="dashboard">
                    <NavBarLeftOfSetting username={"Abdallah"} profile={"Kenzoo_007"} ImageTest={imggg} />
                    <div className="dashboard--content">
                        <div className="hh"></div>
                        <HeaderContent />
                    </div>
                </div>
            </div>




        </>
    );


}export default Setting;

