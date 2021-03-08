import React, {useContext} from 'react'
import {useHttp} from "../../../hooks/http.hook";
import { useHistory } from 'react-router-dom'
import {useSelector} from "react-redux";

export const DeleteRole = ({role}) => {

    console.log(role)
    const [loading, request] = useHttp()
    const token = useSelector(({token}) => token)
    const history = useHistory()

    const deleteHandler = async () => {
        try{

            const uri = '/api/admin/roles?_id='+role._id

            const result = await request(uri, 'DELETE', null, {
                Authorization : `Bearer ${token.token}`
            })

            if(result){
                redirectToRoles()
            }
        }
        catch (e) {
            throw e
        }
    }

    const cancelHandler = () => {
        redirectToRoles()
    }

    const redirectToRoles = () => {
        history.push('/admin/roles')
    }

    if(!role || role.length == 0){
        return <p className="center">No role</p>
    }
    return(
        <div className="row">
            <div className="col s12 m6">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Delete role: <b>{role.roleName}</b></span>
                        <p>Are you sure you want to delete this role?</p>
                    </div>
                    <div className="card-action" style={{marginTop: 25}}>
                        <button
                            className="waves-effect waves-light btn"
                            style={{marginRight: 15, backgroundColor:"#ffab40"}}
                            onClick={deleteHandler}
                            disabled={loading}>
                            Ok
                        </button>
                        <button
                            className="waves-effect waves-light btn grey darken-2"
                            onClick={cancelHandler}
                            disabled={loading}
                           >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}