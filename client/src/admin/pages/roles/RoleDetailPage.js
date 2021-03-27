import React, {useEffect, useState} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {useMessage} from "../../../hooks/message.hook";
import {useEntityRepository} from "../../../repository/entity.repository";


export const RoleDetailPage = ({role}) => {

    const [getAll, createOrUpdate, remove, getById, loading] = useEntityRepository("/api/admin/roles")

    const roleId = useParams().id

    const message = useMessage()
    const [form, setForm] = useState({roleName: ''})
    const history = useHistory()

    const cancelHandler = () => {
        redirectToRoles()
    }

    const redirectToRoles = () => {
        history.push('/admin/roles')
    }

    const saveHandler = async () => {
        const id = roleId === undefined ? '' : roleId
        const result = await createOrUpdate(id, {...form})
        if(result){
            history.push('/admin/roles')
        }
    }

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const fetchRole = async () => {
        const result = await getById(roleId)
        if(result){
            setForm({...form, roleName: result.roleName})
        }
    }

    useEffect(async () => {
        if(roleId){
            await fetchRole()
        }
    },[])


    return(
        <>
            <h2>Role</h2>

            <div className="input-field">
                <input id="email" type="text" name="roleName" className="yellow-input" value={form.roleName}
                       onChange={changeHandler}
                ></input>
                <label className="active" htmlFor="roleName">Name</label>
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