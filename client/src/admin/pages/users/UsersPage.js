import React from 'react'
import "materialize-css/dist/css/materialize.min.css"
import {useState, useEffect} from "react"
import { useHistory } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import {UserList} from "../../components/users/UserList"
import {useEntityRepository} from "../../../repository/entity.repository"
import {onActiveLoading} from "../../../actions";



export const UsersPage = () => {

    const [getAll, createOrUpdate, remove, getById] = useEntityRepository("/api/users")

    const [users, setUsers] = useState()
    const dispatch = useDispatch()
    const loading = useSelector(({loading}) => loading)

    const history = useHistory()

    const fetchUsers = async (phrase, isProgress) => {
        const usersData = await getAll(phrase, isProgress)
        if(usersData && !usersData.status){
            setUsers(usersData)
            //console.log(usersData)
        }
    }

    const handler = async () => {
        console.log('handler from page')
        await fetchUsers(null)
    }

    useEffect(async ()=>{
        await fetchUsers(null)
        console.log('useEffect from page')
    },[])



    let props = {
        users : users,
        handler: handler
    }

    if (loading) {
        //return <></>
    }

    const createHandler = () => {
        history.push('/admin/users/add')
    }

    let typingTimer
    let doneTypingInterval = 200

    const keyUpHandler = (event) => {

        const phrase = event.target.value
        clearTimeout(typingTimer)

        typingTimer = setTimeout(async () => {
            console.log(phrase)
            await fetchUsers(phrase, false)

        }, doneTypingInterval)
    }
    const keyDownHandler = () => {
        clearTimeout(typingTimer)
    }

    return(
        <div className="row">
            <h4>Manage Users</h4>

            <div className="admin-users-header">
                <input
                    type="text"
                    name="search"
                    placeholder="Enter user email"
                    onKeyUp={keyUpHandler}
                    onKeyDown={keyDownHandler}
                />

                <span><b>{users === undefined ? 0 : users.count}</b> users found</span>
            </div>
            <p>Assign roles to users listed below</p>

            <div className="collection">
                {!loading && <UserList {...props} />}
            </div>

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