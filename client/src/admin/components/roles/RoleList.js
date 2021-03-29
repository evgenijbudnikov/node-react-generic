import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import M from "materialize-css";
import {useEntityRepository} from "../../../repository/entity.repository";

export const RoleList = (props) => {

    const history = useHistory()
    const [roleToDelete, setRoleToDelete] = useState({})
    const [deleteWindow, setDeleteWindow] = useState()
    const [getAll, createOrUpdate, remove, getById, loading] = useEntityRepository("/api/admin/roles")

    useEffect(() => {
        M.Modal.init(document.querySelectorAll('.modal'));
        console.log('effect')
    },[props.roles])

    if(!props || !props.roles || props.roles.length == 0){
        return <p className="center">'No roles'</p>
    }

    const modalHandler = (role, e) => {
        e.preventDefault()
        setRoleToDelete(role)

        console.log(role._id)
        const modal = document.getElementById("deleteRoleModal")
        const instance = M.Modal.getInstance(modal)
        setDeleteWindow(instance)
        instance.open()
    }

    const removeHandler = async () => {
        const result = await remove(roleToDelete._id)

        if(result){
            deleteWindow.close()
            props.handler()
            console.log('deleted')
        }
    }

    const cancelHandler = async () => {
        deleteWindow.close()
    }


    return(

        <div className="collection">
            {
                props.roles.map((role)=>{
                    return(

                        <Link key={role._id} to={`/admin/roles/${role._id}`} className="collection-item">
                                <i className="material-icons verified-user">accessibility</i>
                                {role.roleName}
                                <Link to="#" onClick={(e) => modalHandler(role, e)}  className="secondary-content">
                                    <i className="material-icons">
                                        delete_forever
                                    </i>
                                </Link>
                        </Link>
                    )
                })
            }
            <div id="deleteRoleModal" className="modal">
                <div className="modal-content">
                    <h4>Delete Role</h4>
                    <p>Are you sure you want to delete <b>{roleToDelete.roleName}</b>?</p>
                </div>
                <div className="modal-footer">
                    <button
                        className="waves-effect waves-light btn"
                        style={{marginRight: 15, backgroundColor:"#ffab40"}}
                        onClick={removeHandler}>
                        Ok
                    </button>
                    <button
                        className="waves-effect waves-light btn"
                        style={{marginRight: 15, backgroundColor:"#616161"}}
                        onClick={cancelHandler}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>

    )
}