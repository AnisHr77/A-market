import { NavLink, Outlet, useLocation } from 'react-router-dom';
import React from "react";
import './PageGeneral.css';

function PageGeneral() {
    const location = useLocation();
    const isNotificationActive = location.pathname.endsWith('Notification') ||
        location.pathname.endsWith('General') ||
        location.pathname.endsWith('General/');

    return (
        <div className="head2hR">
            <div className="head2">
                <NavLink
                    to="Notification"
                    className={({ isActive }) =>
                        isActive || isNotificationActive ? 'Selector active' : 'Selector'
                    }
                >
                    Notification
                </NavLink>
                <NavLink
                    to="Contact"
                    className={({ isActive }) =>
                        isActive ? 'Selector active' : 'Selector'
                    }
                >
                  A+ Market Statistics
                </NavLink>
                <NavLink
                    to="Account"
                    className={({ isActive }) =>
                        isActive ? 'Selector active' : 'Selector'
                    }
                >
                    Account
                </NavLink>
            </div>
            <Outlet />
        </div>
    );
}

export default PageGeneral;