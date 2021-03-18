import React from 'react'
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import {AdminNavBar} from "../../components/AdminNavBar"
import {useState} from "react"
import {RoleList} from "../../components/roles/RoleList";
import { useHistory } from 'react-router-dom'
import {useRepository} from "../../repository/roles.repository";

const {useEffect} = require("react")



export const RolesPage = () => {

    const [sendRoleGetRequest, sendRoleRequest, loading] = useRepository()
    const [roles, setRoles] = useState()
    const history = useHistory()

    const fetchRoles = async () => {
        const result = await sendRoleGetRequest(null)
        if(result){
            setRoles(result)
        }
    }

    useEffect(async ()=>{
        await fetchRoles()
    },[])

    if (loading) {
        return <></>
    }
    const createHandler = () => {
        history.push('/admin/roles/add')
    }
    return(

        <div className="row">
            <h4>Manage Roles</h4>

            {!loading && <RoleList roles={roles} />}

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