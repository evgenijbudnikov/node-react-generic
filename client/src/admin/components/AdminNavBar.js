import React from "react";
import M from "materialize-css";

const {useState} = require("react");

const {useEffect} = require("react");

export const AdminNavBar = () => {
    const {NavLink, useHistory} = require("react-router-dom")
    const history = useHistory()

    const [isActive, setActive] = useState(false)
    const toggleClass = () => {
        setActive(!isActive);
    };

    useEffect(() => {
        let el = document.querySelector('.tabs')
        M.Tabs.init(el);
    }, [])

    return(
        <div className="row">
            <div className="col s12">
                <ul className="tabs">
                    <li className="tab col s3"><NavLink onClick={toggleClass}  target="_self" className={isActive ? 'active': null} to="/admin/roles">Roles</NavLink></li>
                    <li className="tab col s3"><NavLink onClick={toggleClass}  target="_self" className={isActive ? 'active': null} to="/admin/users">Users</NavLink></li>
                    <li className="tab col s3"><NavLink onClick={toggleClass}  target="_self" className={isActive ? 'active': null} to="/admin/articles">Articles</NavLink></li>
                </ul>
            </div>
        </div>
    )
}
