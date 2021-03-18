import React, {useContext} from 'react'
import "materialize-css/dist/css/materialize.min.css";
import {AdminNavBar} from "../../components/AdminNavBar"
import {useState} from "react"
import {useHttp} from "../../../hooks/http.hook";
import { useHistory } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {UserList} from "../../components/users/UserList";
import M from "materialize-css";
import {onSignOut} from "../../../actions";
import {useAuth} from "../../../hooks/auth.hook";

const {useCallback} = require("react")
const {useEffect} = require("react")



export const UsersPage = () => {

    const [loading, request] = useHttp()
    const [users, setUsers] = useState()
    const token = useSelector(({token}) => token)
    const auth = useAuth()
    const dispatch = useDispatch()

    const history = useHistory()

    const fetchUsers = useCallback(async () => {
        try{
            const usersData = await request('/api/users', 'GET', null,
                {
                    Authorization: `Bearer ${token}`
                })

            if(usersData && !usersData.status){
                setUsers(usersData)
            }
        }
        catch (e) {
            throw e
        }
    },[token, request])

    const assignRoleHandler = useCallback(async (event) => {
        const selectedRoleIds = Array.from(event.target.selectedOptions, option => option.value)

        console.log(event.target.selectedOptions)
        console.log(event.target.id)

        try{

            const uri = '/api/users?_id='+event.target.id

            let body = {
                "roles" : selectedRoleIds
            }

            body = JSON.stringify(body)

            let headers = {}
            headers['Authorization'] = `Bearer ${token}`
            headers['Content-Type'] = 'application/json'

            const result = await fetch(uri, {method:'PUT', body: body, headers: headers})
            if(!result.ok){
                if(result.status === 401) {
                    auth.logout()
                    dispatch(onSignOut())
                    history.push("/auth")
                }
            }

        }
        catch (e) {
            throw e
        }

    },[token, request])


    useEffect(async ()=>{
        await fetchUsers()
        console.log('useEffect from page')
    },[assignRoleHandler])

    let props = {
        users : users,
        handler: assignRoleHandler
    }

    if (loading) {
        return <></>
    }

    const createHandler = () => {
        history.push('/admin/users/add')
    }
    return(
        <div className="row">
            <h4>Manage Users</h4>
            <p>Assign roles to users listed below</p>

            {!loading && <UserList {...props} />}

            <div className="card-action" style={{marginTop: 25}}>
                <button
                    className="waves-effect waves-light btn"
                    style={{marginRight: 15, backgroundColor:"#2ea44f"}}
                    onClick={createHandler}>
                    Create
                </button>
            </div>
        </div>
    )
}