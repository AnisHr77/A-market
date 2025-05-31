// OffersData.js
import { IoIosFlash } from "react-icons/io";
import { FaGift, FaRegHeart } from "react-icons/fa";

export const fetchOffersData = async () => {
    const response = await fetch("http://localhost:4000/api/site-images");
    const data = await response.json();

    if (data.length === 0) return [];

    const image_url = data[0];

    return [
        {
            id: "1",
            category: "Recommendation",
            icon: <FaRegHeart style={{ position: "relative", right: "2px", top: "2px", height: "22px" }} />,
            name: ["MacBook pro", "Keyboard Rgb"],
            price: [462.2, 50],
            oldprice: [520, 70],
            description: "4pcs Universal Algerian Vintage",
            image_url: [image_url.prd1, image_url.prd2],
        },
        {
            id: "2",
            category: "FlashSales",
            icon: <IoIosFlash style={{ position: "relative", left: "2px", top: "2px" }} />,
            name: ["Headphones", "Airpods"],
            price: [462.2, 50],
            description: "4pcs Universal Algerian Vintage",
            countdown: ["20min left", "1min 30s left"],
            width: ["40%", "40%"],
            image_url: [image_url.prd3, image_url.prd4],
        },
        {
            id: "3",
            category: "BigSave",
            icon: <FaGift style={{ position: "relative", right: "5px", top: "2px" }} />,
            name: ["Screen MSI", "iphone 12"],
            price: [462.2, 50],
            description: "4pcs Universal Algerian Vintage",
            Pourcentage: ["10%", "30%"],
            saves: ["5% saved", "60% saved"],
            image_url: [image_url.prd5, image_url.prd6],
        },
    ];
};
