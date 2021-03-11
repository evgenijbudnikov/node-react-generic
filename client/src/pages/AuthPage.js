import React, {useEffect, useState, useContext} from 'react'
import { useHttp } from '../hooks/http.hook'
import {useMessage} from "../hooks/message.hook"
import { useHistory } from 'react-router-dom'
import {onSignIn, onSignOut} from "../actions";
import {useDispatch, useSelector} from "react-redux"
import {useAuth} from "../hooks/auth.hook"




export const AuthPage = () => {


    const message = useMessage()
    const history = useHistory()
    const dispatch = useDispatch()

    const auth = useAuth()
    const [loading, request, error, clearError] = useHttp()
    const [form, setForm] = useState({
        email:'', password:''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])



    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }


    const registerHandler = async () => {
        try{
            const data = await request('/api/auth/register', 'POST', {...form})
            //console.log('data', data)
        }
        catch (e) {
            //console.log(e.message)
            throw e
        }
    }

    const loginHandler = async () => {
        try{
            const data = await request('/api/auth/login', 'POST', {...form})

            if(data.token && data.userId){
                auth.login(data.token.token, data.userId)
                dispatch(onSignIn(data))
                history.push("/dashboard");
            }
        }
        catch (e) {
            throw e
        }
    }

    return(
        <div className="row">
            <div className="col s6 offset-s3">
                <h3>
                    <span className="card-title black-text">Authenticate</span>
                </h3>
                <br />
                <div className="input-field">
                    <input id="email" type="text" name="email" className="yellow-input" placeholder="Please enter email"
                           onChange={changeHandler}
                    ></input>
                    <label className="active" htmlFor="email">Email</label>
                </div>
                <div className="input-field">
                    <input id="password" type="password" className="yellow-input" name="password" placeholder="Please enter password"
                           onChange={changeHandler}
                    ></input>
                    <label className="active" htmlFor="password">Password</label>

                    <div className="card-action" style={{marginTop: 25}}>
                        <button
                            className="waves-effect waves-light btn"
                            style={{marginRight: 15, backgroundColor:"#ffab40"}}
                            onClick={loginHandler}
                            disabled={loading}>
                            Sign In
                        </button>
                        <button
                            className="waves-effect waves-light btn grey darken-2"
                            onClick={registerHandler}
                            disabled={loading}>
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}