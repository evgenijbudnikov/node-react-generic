import React, {useEffect, useState, useCallback} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {useSelector} from "react-redux";
import {useMessage} from "../../../hooks/message.hook";
import {useEntityRepository} from "../../../repository/entity.repository";



export const UserDetailPage = () => {

    const userId = useParams().id

    const message = useMessage()
    const [form, setForm] = useState({email: ''})
    const [getAll, createOrUpdate, remove, getById] = useEntityRepository("/api/users")
    const loading = useSelector(({loading}) => loading)

    const history = useHistory()

    const cancelHandler = () => {
        redirectToUsers()
    }

    const redirectToUsers = () => {
        history.push('/admin/users')
    }

    const saveHandler = async () => {
        const id = userId === undefined ? '' : userId
        const result = await createOrUpdate(id, {...form})
        if(result){
            history.push('/admin/users')
        }
    }


    const changeUserHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const fetchUser = async () => {
        const fetchedUser = await getById(userId)
        if(fetchedUser){
            setForm({...form, email: fetchedUser.email})
        }
    }

    useEffect(async () => {
        if(userId){
            await fetchUser()
        }
    },[])


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