import React, {useEffect, useContext, useState, useCallback} from 'react'
import {useHttp} from "../../../hooks/http.hook"
import {AuthContext} from "../../../context/AuthContext"
import { useHistory, useParams } from 'react-router-dom'



export const RoleDetailPage = ({role}) => {

    const roleId = useParams().id

    const [form, setForm] = useState({roleName: ''})
    const [loading, request] = useHttp()
    const [method, setMethod] = useState()

    const history = useHistory()
    const {token} = useContext(AuthContext)


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

    },[fetchRole])


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
            </div>
        </>
    )
}