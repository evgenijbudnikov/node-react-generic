import React from 'react'
import { useHistory } from 'react-router-dom'
import {useEntityRepository} from "../../../repository/entity.repository"

export const DeleteRole = ({role}) => {

    const history = useHistory()
    const [getAll, createOrUpdate, remove, getById, loading] = useEntityRepository("/api/admin/roles")

    const deleteHandler = async () => {
        const result = await remove(role._id)
        if(result){
            redirectToRoles()
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
            <div className="col s12 m12">
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