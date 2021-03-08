import React, {useEffect, useContext, useState, useCallback} from 'react'
import {useHttp} from "../../../hooks/http.hook"
import { useHistory, useParams } from 'react-router-dom'
import {DeleteRole} from "../../components/roles/DeleteRole";
import {useSelector} from "react-redux";



export const DeleteRolePage = () => {

    const roleId = useParams().id
    const [loading, request] = useHttp()
    const [role, setRole] = useState()
    const history = useHistory()
    const token = useSelector(({token}) => token)


    //move to helper
    const fetchRole = useCallback(async () => {
        try{
            const fetchedRole = await request('/api/admin/roles/' + roleId, 'GET', null, {
                Authorization : `Bearer ${token.token}`
            })

            if(fetchedRole){
                setRole(fetchedRole)
            }
        }
        catch (e) {
            throw e
        }
    }, [token, request])

    useEffect(async () => {
        if(roleId){
            fetchRole()
        }
    },[fetchRole])

    if (loading) {
        return <></>
    }

    return(
        <DeleteRole role={role}/>
    )
}