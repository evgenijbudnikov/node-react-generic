import React, {useContext} from 'react'
import "materialize-css/dist/css/materialize.min.css";
import {AdminNavBar} from "../../components/AdminNavBar"
import {useState} from "react"
import {useHttp} from "../../../hooks/http.hook";
import { useHistory } from 'react-router-dom'
import {useSelector} from "react-redux";
import {UserList} from "../../components/users/UserList";
import M from "materialize-css";

const {useCallback} = require("react")
const {useEffect} = require("react")



export const UsersPage = () => {

    const [header, setHeader] = useState()
    const [loading, request] = useHttp()
    const [users, setUsers] = useState()
    const token = useSelector(({token}) => token)

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

    useEffect(()=>{
        fetchUsers()
        console.log('useeefect from page')
        {M.FormSelect.init(document.querySelectorAll('select'))}

    },[fetchUsers])

    if (loading) {
        return <></>
    }
    const createHandler = () => {
        history.push('/admin/users/add')
    }
    return(

        <div className="row">
            <AdminNavBar />
            <h3>Manage Users</h3>
            <p>Assign roles to users listed below</p>

            <span>
                <i className="material-icons">details</i>
                <label> - Open selected user details</label>
            </span>
            <br/>
            <span>
                <i className="material-icons">delete</i>
                <label> - Delete selected user</label>
            </span>

            <br/>

            {!loading && <UserList users={users} />}

            <div className="card-action" style={{marginTop: 25}}>
                <button
                    className="waves-effect waves-light btn"
                    style={{marginRight: 15, backgroundColor:"#ffab40"}}
                    onClick={createHandler}>
                    Create
                </button>
            </div>

        </div>
    )
}