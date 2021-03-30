import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import M from "materialize-css";
import {useEntityRepository} from "../../../repository/entity.repository";



export const UserList = (props) => {

    const [userToDelete, setUserToDelete] = useState({})
    const [deleteWindow, setDeleteWindow] = useState()
    const [getAll, createOrUpdate, remove, getById, loading] = useEntityRepository("/api/users")

    useEffect(() => {
        const elements = document.querySelectorAll('select')
        M.FormSelect.init(elements)

        M.Modal.init(document.querySelectorAll('.modal'));
        console.log('effect')
    },[props.users])

    if(!props.users || props.users.length == 0){
        return <p className="center">'No users'</p>
    }

    const modalStaticHandler = (user, e) => {
        e.preventDefault()
        setUserToDelete(user)

        console.log(user._id)
        const modal = document.getElementById("deleteModal")
        const instance = M.Modal.getInstance(modal)
        setDeleteWindow(instance)
        instance.open()
    }

    const removeHandler = async () => {
        const result = await remove(userToDelete._id)

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
        <>
            {
                props.users.users.map((user)=>{
                    return(

                        <a key={user._id}  className="collection-item user-list">
                            <i className="material-icons verified-user">
                                verified_user
                            </i>
                            <span style={{minWidth:150+'px'}}>
                                <Link className="user-email-link" to={`/admin/users/${user._id}`}>
                                    {user.email}
                                </Link>
                            </span>

                            <div className="user-role-list-email-container">
                                <div>
                                    <span>
                                    {
                                        user.roles.map((role) => {
                                            return(
                                                <span style={{paddingLeft:5+'px'}}>{role.roleName+';' }</span>
                                            )
                                        })
                                    }
                                    </span>
                                </div>
                            </div>
                            <Link to="#" onClick={(e) => modalStaticHandler(user, e)} className="secondary-content">
                                <i className="material-icons">
                                    delete_forever
                                </i>
                            </Link>
                        </a>
                    )
                })
            }
            <div id="deleteModal" className="modal">
                <div className="modal-content">
                    <h4>Delete User</h4>
                    <p>Are you sure you want to delete <b>{userToDelete.email}</b>?</p>
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
        </>

    )
}