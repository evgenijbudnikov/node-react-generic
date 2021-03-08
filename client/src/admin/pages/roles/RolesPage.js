import React, {useContext} from 'react'
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import {AdminNavBar} from "../../components/AdminNavBar"
import {useState} from "react"
import {useHttp} from "../../../hooks/http.hook";
import {RoleList} from "../../components/roles/RoleList";
import { useHistory } from 'react-router-dom'
import {useSelector} from "react-redux";

const {useCallback} = require("react")
const {useEffect} = require("react")



export const RolesPage = () => {

    const [header, setHeader] = useState()
    const [loading, request] = useHttp()
    const [roles, setRoles] = useState()
    const token = useSelector(({token}) => token)

    const history = useHistory()

    const fetchRoles = useCallback(async () => {
        try{
            const rolesData = await request('/api/admin/roles', 'GET', null,
                {
                    Authorization: `Bearer ${token.token}`
                })

            if(rolesData && !rolesData.status){
                setRoles(rolesData)
            }
        }
        catch (e) {
            throw e
        }
    },[token, request])

    useEffect(()=>{
        fetchRoles()
    },[fetchRoles])

    if (loading) {
        return <></>
    }
    const createHandler = () => {
        history.push('/admin/roles/add')
    }
    return(

        <div className="row">
            <AdminNavBar />
            <h2>Manage Roles</h2>

            {!loading && <RoleList roles={roles} />}

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