import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import {onSignIn, onSignOut} from "../actions"
import {useAuth} from "../hooks/auth.hook"


const {NavLink, useHistory} = require("react-router-dom")

export const Header = () => {

    const history = useHistory()
    const isAuthenticated = useSelector(({isAuthenticated}) => isAuthenticated)
    const dispatch = useDispatch()
    const auth = useAuth()

    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
        dispatch(onSignOut())
        history.push("/auth")
    }
    let signButton = {}

    if(isAuthenticated){
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
                                { isAuthenticated && (<li><NavLink to="/admin/roles">Admin</NavLink></li> ) }
                                { isAuthenticated && (<li><NavLink to="/dashboard">My Profile</NavLink></li> ) }
                                {signButton}

                            </ul>
                        </div>
                    </div>


            </nav>
        </header>
    )
}