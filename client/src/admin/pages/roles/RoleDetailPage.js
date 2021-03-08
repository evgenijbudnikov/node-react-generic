import React, {useEffect, useContext, useState, useCallback} from 'react'
import {useHttp} from "../../../hooks/http.hook"
import { useHistory, useParams } from 'react-router-dom'
import {useSelector} from "react-redux";
import {useMessage} from "../../../hooks/message.hook";



export const RoleDetailPage = ({role}) => {

    const roleId = useParams().id

    const message = useMessage()
    const [form, setForm] = useState({roleName: ''})
    const [loading, request, error, clearError] = useHttp()
    const [method, setMethod] = useState()

    const history = useHistory()
    const token = useSelector(({token}) => token)

    const cancelHandler = () => {
        redirectToRoles()
    }

    const redirectToRoles = () => {
        history.push('/admin/roles')
    }

    const saveHandler = async () => {
        try{

            const uri = roleId ? '/api/admin/roles?_id='+roleId : '/api/admin/roles'

            const result = await request(uri, method, {...form}, {
                Authorization : `Bearer ${token.token}`
            })

            if(result){
                history.push('/admin/roles')
            }
        }
        catch (e) {
            throw e
        }
    }

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const fetchRole = useCallback(async () => {
        try{
            //const roleId = role._id
            const fetchedRole = await request('/api/admin/roles/' + roleId, 'GET', null, {
                Authorization : `Bearer ${token.token}`
            })

            if(fetchedRole){
                setForm({...form, roleName: fetchedRole.roleName})
            }
        }
        catch (e) {
            throw e
        }
    }, [token, request])

    useEffect(async () => {
        const requestMethod = (roleId) ? ('PUT') : ('POST')

        setMethod(requestMethod)

        if(roleId){
            fetchRole()
        }
        message(error)
        clearError()

    },[fetchRole, error, message, clearError])


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