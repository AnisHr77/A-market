import { NavLink, Outlet, useLocation } from "react-router-dom";
import React from "react";
import './PageHelpSupports.css';

function PageHelpSupports() {
    const location = useLocation();
    const isHelpSupportsPath = location.pathname.includes('/Settings/HelpSupports');

    return (
        <>
            <div className="head2hR">
                <div className="head2">
                    <NavLink
                        to="Help"
                        className={({ isActive }) =>
                            isActive || (isHelpSupportsPath && location.pathname.endsWith('HelpSupports'))
                                ? "Selector active"
                                : "Selector"
                        }
                        end={false}
                    >
                        Help
                    </NavLink>
                    <NavLink
                        to="PhoneHelp"
                        className={({ isActive }) =>
                            isActive ? "Selector active" : "Selector"
                        }
                    >
                        PhoneHelp
                    </NavLink>
                    <NavLink
                        to="CustomerService"
                        className={({ isActive }) =>
                            isActive ? "Selector active" : "Selector"
                        }
                    >
                        CustomerService
                    </NavLink>
                    <NavLink
                        to="ContactA"
                        className={({ isActive }) =>
                            isActive ? "Selector active" : "Selector"
                        }
                    >
                        ContactA+
                    </NavLink>
                </div>
            </div>
            <hr />
            <Outlet />
        </>
    );
}

export default PageHelpSupports;