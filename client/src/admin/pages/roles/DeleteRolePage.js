import React, {useEffect, useContext, useState, useCallback} from 'react'
import { useParams } from 'react-router-dom'
import {DeleteRole} from "../../components/roles/DeleteRole";
import {useEntityRepository} from "../../../repository/entity.repository";



export const DeleteRolePage = () => {

    const roleId = useParams().id
    const [role, setRole] = useState(null)
    const [getAll, createOrUpdate, remove, getById, loading] = useEntityRepository("/api/admin/roles")


    const fetchRole = async () => {
        try{
            const fetchedRole = await getById(roleId)

            if(fetchedRole){
                setRole(fetchedRole)
            }
        }
        catch (e) {
            throw e
        }
    }

    useEffect(async () => {
        if(roleId){
            await fetchRole()
        }
    },[])

    if (loading) {
        return <></>
    }

    return(
        <DeleteRole role={role}/>
    )
}