import React from "react";
import M from "materialize-css";

const {useState} = require("react");

const {useEffect} = require("react");

export const AdminNavBar = () => {
    const {NavLink, useHistory} = require("react-router-dom")
    const history = useHistory()

    const toggleClass = (event) => {

    };

    useEffect(() => {
        let el = document.querySelector('.tabs')
        M.Tabs.init(el);
    }, [])

    return(

            <div className="admin-nav">
                <div className="admin-nav-container">
                    <div className="admin-nav-item">

                        <NavLink onClick={toggleClass}  to="/admin/roles">
                            <i className="material-icons-edit" style={{marginRight:5+'px'}}>
                                accessibility
                            </i>
                            Roles
                        </NavLink>
                    </div>
                    <div className="admin-nav-item">
                        <NavLink onClick={toggleClass}   to="/admin/users">
                            <i className="material-icons-edit" style={{marginRight:5+'px'}}>
                                person
                            </i>
                            Users
                        </NavLink>
                    </div>
                    <div className="admin-nav-item">
                        <NavLink onClick={toggleClass}    to="/admin/articles">
                            <i className="material-icons-edit" style={{marginRight:5+'px'}}>
                                content_paste
                            </i>
                            Articles
                        </NavLink>
                    </div>
                </div>
            </div>

    )
}
