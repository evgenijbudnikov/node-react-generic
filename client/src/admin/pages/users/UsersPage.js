import React from 'react'
import "materialize-css/dist/css/materialize.min.css"
import {useState, useEffect} from "react"
import { useHistory } from 'react-router-dom'
import {useSelector} from "react-redux"
import {UserList} from "../../components/users/UserList"
import {useEntityRepository} from "../../../repository/entity.repository"



export const UsersPage = () => {

    const [getAll, createOrUpdate, remove, getById] = useEntityRepository("/api/users")

    const [users, setUsers] = useState()
    const loading = useSelector(({loading}) => loading)

    const history = useHistory()

    const fetchUsers = async () => {
        const usersData = await getAll()
        if(usersData && !usersData.status){
            setUsers(usersData)
        }
    }

    const handler = async () => {
        console.log('handler from page')
        await fetchUsers()
    }

    useEffect(async ()=>{
        await fetchUsers()
        console.log('useEffect from page')
    },[])



    let props = {
        users : users,
        handler: handler
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