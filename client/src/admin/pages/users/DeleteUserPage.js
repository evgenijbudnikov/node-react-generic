import React, {useEffect, useContext, useState, useCallback} from 'react'
import {useHttp} from "../../../hooks/http.hook"
import { useHistory, useParams } from 'react-router-dom'
import {DeleteUser} from "../../components/users/DeleteUser";
import {useSelector} from "react-redux";



export const DeleteUserPage = () => {

    const userId = useParams().id
    const [loading, request] = useHttp()
    const [user, setUser] = useState()
    const history = useHistory()
    const token = useSelector(({token}) => token)


    //move to helper
    const fetchUser = useCallback(async () => {
        try{
            const fetchedUser = await request('/api/users/' + userId, 'GET', null, {
                Authorization : `Bearer ${token}`
            })

            if(fetchedUser){
                setUser(fetchedUser)
            }
        }
        catch (e) {
            throw e
        }
    }, [token, request])

    useEffect(async () => {
        if(userId){
            fetchUser()
        }
    },[fetchUser])

    if (loading) {
        return <></>
    }

    return(
        <DeleteUser user={user}/>
    )
}