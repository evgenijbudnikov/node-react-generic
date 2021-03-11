import React, {useEffect, useContext, useState, useCallback} from 'react'
import {useHttp} from "../../../hooks/http.hook"
import { useHistory, useParams } from 'react-router-dom'
import {useSelector} from "react-redux";
import {useMessage} from "../../../hooks/message.hook";



export const UserDetailPage = ({user}) => {

    const userId = useParams().id

    const message = useMessage()
    const [form, setForm] = useState({email: ''})
    const [loading, request, error, clearError] = useHttp()
    const [method, setMethod] = useState()

    const history = useHistory()
    const token = useSelector(({token}) => token)

    const cancelHandler = () => {
        redirectToUsers()
    }

    const redirectToUsers = () => {
        history.push('/admin/users')
    }

    const saveHandler = async () => {
        try{

            const uri = userId ? '/api/users?_id='+userId : '/api/users'

            const result = await request(uri, method, {...form}, {
                Authorization : `Bearer ${token.token}`
            })

            if(result){
                redirectToUsers()
            }
        }
        catch (e) {
            throw e
        }
    }


    const changeUserHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const fetchUser = useCallback(async () => {
        try{
            //const roleId = role._id
            const fetchedUser = await request('/api/users/' + userId, 'GET', null, {
                Authorization : `Bearer ${token}`
            })

            if(fetchedUser){
                setForm({...form, email: fetchedUser.email})
            }
        }
        catch (e) {
            throw e
        }
    }, [token, request])

    useEffect(async () => {
        const requestMethod = (userId) ? ('PUT') : ('POST')

        setMethod(requestMethod)

        if(userId){
            fetchUser()
        }
        message(error)
        clearError()

    },[fetchUser, error, message, clearError])


    return(
        <>
            <h2>User</h2>

            <div className="input-field">
                <input id="email" type="text" name="email" className="yellow-input" value={form.email}
                       onChange={changeUserHandler}
                ></input>
                <label className="active" htmlFor="email">Email:</label>
            </div>
            <div className="card-action" style={{marginTop: 25}}>
                <button
                    className="waves-effect waves-light btn"
                    style={{marginRight: 15, backgroundColor:"#ffab40"}}
                    onClick={saveHandler}
                    disabled={loading}>
                    Save
                </button>
                <button
                    className="waves-effect waves-light btn grey darken-2"
                    style={{marginRight: 15, backgroundColor:"#ffab40"}}
                    onClick={cancelHandler}
                    disabled={loading}>
                    Cancel
                </button>
            </div>
        </>
    )
}