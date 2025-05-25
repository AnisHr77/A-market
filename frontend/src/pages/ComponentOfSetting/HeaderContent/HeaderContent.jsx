
    import './HeaderContent.css';
    import { IoSearch } from "react-icons/io5";
    import { MdOutlinePhotoFilter} from "react-icons/md";
    /*********/
    import PageGeneral from "../PagesOfHeader/PageGeneral/PageGeneral.jsx";

    import PageSubscription from "../PagesOfHeader/PageSubscription/PageSubscription.jsx";
    import PagePayment from "../PagesOfHeader/PagePayment/PagePayment.jsx";
    import PageProfile from "../PagesOfHeader/PageProfile/PageProfile.jsx";
    import PageHelpSupports from "../PagesOfHeader/PageHelpSupports/PageHelpSupports.jsx";
    import {Outlet} from "react-router-dom";
    import React from "react";
    function HeaderContent({ activeItem }) {



        return (<>


                <div className="sea">
                    <div className="head1">
                        <h1 className="myTextH1Head1">Settings</h1>
                        <p className="label-title">
                            <input type="search" placeholder="Search settings..." />
                            <IoSearch style={{ width: 30, height: 22, color: "white", zIndex: 2 }} />
                        </p>
                        <MdOutlinePhotoFilter className="MdOutlinePhoto" />
                    </div>
                    <hr className={"header-hr"} />
                </div>


                <Outlet />

            </>


        );
    }

    export default HeaderContent;