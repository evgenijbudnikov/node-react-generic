import React from 'react'
const {AuthContext} = require('../context/AuthContext')

const {useContext} = require("react");
const {NavLink, useHistory} = require("react-router-dom");

export const Header = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()

    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
        history.push("/auth")
    }
    let signButton = {}
    if(auth.isAuthenticated){
        signButton = <li><a href="/" onClick={logoutHandler}>Sign Out</a></li>
    }
    else{
        signButton = <li><NavLink to="/auth">Sign In</NavLink></li>
    }
    return(
        <header>
            <nav>

                    <div className="nav-wrapper">
                        <div className="col s12">
                            <NavLink className="brand-logo"  to="/">
                                <img src="/web2.png" style={{marginTop:6}}  height="55px"></img>
                                </NavLink>
                            <ul className="right hide-on-med-and-down">

                                { auth.isAuthenticated && (<li><NavLink to="/dashboard">My Profile</NavLink></li> ) }
                                {signButton}

                            </ul>
                        </div>
                    </div>


            </nav>
        </header>
    )
}