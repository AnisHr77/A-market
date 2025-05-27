import { NavLink, Outlet, useLocation } from "react-router-dom";
import React from "react";
import './PageProfile.css';

function PageProfile() {
    const location = useLocation();
    const isProfilePath = location.pathname.includes('/Settings/Profile');

    return (
        <>
            <div className="head2hR">
                <div className="head2">
                    <NavLink
                        to="User"
                        className={({ isActive }) =>
                            isActive || (isProfilePath && location.pathname.endsWith('Profile'))
                                ? "Selector active"
                                : "Selector"
                        }
                        end={false}
                    >
                        User
                    </NavLink>
                    <NavLink
                        to="Zone"
                        className={({ isActive }) =>
                            isActive ? "Selector active" : "Selector"
                        }
                    >
                        Zone
                    </NavLink>
                </div>
            </div>
            <hr />
            <Outlet />
        </>
    );
}

export default PageProfile;