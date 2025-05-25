import { NavLink, Outlet, useLocation } from "react-router-dom";
import React from "react";
import './PageSubscription.css';

function PageSubscription() {
    const location = useLocation();
    const isSubscriptionPath = location.pathname.includes('/Settings/Subscription');

    return (
        <>
            <div className="head2hR">
                <div className="head2">
                    <NavLink
                        to="Offers"
                        className={({ isActive }) =>
                            isActive || (isSubscriptionPath && location.pathname.endsWith('Subscription'))
                                ? "Selector active"
                                : "Selector"
                        }
                        end={false}
                    >
                        Offers
                    </NavLink>
                    <NavLink
                        to="News"
                        className={({ isActive }) =>
                            isActive ? "Selector active" : "Selector"
                        }
                    >
                        News
                    </NavLink>
                    <NavLink
                        to="Coupon"
                        className={({ isActive }) =>
                            isActive ? "Selector active" : "Selector"
                        }
                    >
                        Coupon
                    </NavLink>
                    <NavLink
                        to="Subscribe"
                        className={({ isActive }) =>
                            isActive ? "Selector active" : "Selector"
                        }
                    >
                        Subscribe+
                    </NavLink>
                </div>
            </div>
            <hr />
            <Outlet />
        </>
    );
}

export default PageSubscription;