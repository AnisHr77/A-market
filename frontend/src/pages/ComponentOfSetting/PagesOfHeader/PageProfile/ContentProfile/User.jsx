import { useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import './User.css';
import { FaRegCircleQuestion } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlineHelp } from "react-icons/md";

function User(props) {
    const [imageSrc, setImageSrc] = useState(props.ImageAccount);
    const [bio,setbio]=useState("");

    function handleChange(e){
        setbio(e.target.value);
    }

    const notify = () =>
        toast(
            <div className={"pp"}>
                <h3>Go pro ⭐</h3>
                This is a special feature that gives many extras.
            </div>
        );

        const handleImageChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    setImageSrc(event.target.result);
                };
                reader.readAsDataURL(file);
            }
        };

    return (
        <>
            <div className={"Line1"}>
                <div className={"myTextLine1"}>
                    <h2 className={"h2User1"}>Profile</h2>
                    <h4 style={{ color: "darkgray" }}>Please update your profile settings here</h4>
                </div>
                <div className={"btnLine1"}>
                    <button id={"btn1"} onClick={notify}><BsInfoCircle /></button>
                    <ToastContainer className="toastContainer" />
                    <button id={"btn2"}>
                        Go Pro <FaStar style={{ color: "yellow", width: "28", height: "17" }} />
                    </button>
                </div>
            </div>

            <hr className={"hr1l"} />

            <div className={"Line2"}>
                <h3 className={"myTextLine2"}>Username</h3>
                <div className={"input2"}>
                    <a href={"#"} style={{marginTop:"-1px"}}> A+.com</a>
                    <label>
                        <input type={"text"} placeholder={"Abdou007"} />
                        <FaRegCircleQuestion
                            style={{
                                color: "white",
                                width: "35",
                                height: "18",
                                position: "absolute",
                                top: "10px",
                                right: "0px",
                                cursor: "pointer"
                            }}
                        />
                    </label>
                </div>
            </div>

            <hr className={"hr2l"} />
            <br />

            <div className={"Line3"}>
                <h2 className={"myTextLine3"}>
                    <label htmlFor="phone"  style={{marginTop:"0"}}>Phone Number</label>
                </h2>
                <div>
                    <input type={"number"} id={"phoneNumber"} placeholder={"Phone Number"} />
                </div>
                <div className={"line3-Gmail"}>
                    <h2 className={"myTextLine3"}>
                        <label htmlFor="Gmail" >Gmail</label>
                    </h2>
                    <input type={"email"} id={"gmail"} placeholder={"Gmail"} required={true} />
                </div>
            </div>

            <hr className={"hr3l"} />

            <div className={"Line4"}>
                <h2 className={"myTextLine4"}>Profile Picture</h2>
                <div  className={"profile-edit-delete"}>
                    <a href={"#"}>
                        <img
                            className="ImgAccount"
                            src={imageSrc}
                            style={{
                                width: '65px',
                                height: '65px',
                                marginLeft: "35px",
                                borderRadius: "100px",
                                fontWeight: "bold",
                                border: "solid #FFFFFF2F 2px",
                                cursor: "pointer"
                            }}
                            alt={''}
                        />
                    </a>
                    <label htmlFor="inputFile" id={"label-Edit-Line4"} >Edit</label>
                    <input
                        type={"file"}
                        id={"inputFile"}
                        onChange={handleImageChange}
                        accept="image/*"
                        style={{ display: "none" }}
                    />
                    <button  id={"Btn-Delete-Line4"} onClick={() => setImageSrc("")}>
                        Delete
                    </button>
                </div>
                <hr className={"hr4l"} />
 <div className={"Line5"}>
                <div className={"text-line5"}>
                    <h2 className="myTextLine4">Biography</h2>
                    <MdOutlineHelp  style={{color:'#B0B3BC',width: "30px", height: "25px",marginLeft:"-10px"}}/>
                </div>
     <div>
                <textarea onChange={handleChange} placeholder={"Hi anis!"} className={"line5-textarea"}></textarea>  <p className={"textArea-conter"} >{bio.length}</p></div>

 </div>
                <hr className={"hr5l"} />
            </div>
        </>
    );
}

export default User;
