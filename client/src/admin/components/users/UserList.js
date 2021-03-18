import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import M from "materialize-css";



export const UserList = (props) => {


    useEffect(() => {
        const elements = document.querySelectorAll('select')
        M.FormSelect.init(elements)

        M.Modal.init(document.querySelectorAll('.modal'));
        console.log('effect')
    },[props.users])

    //to={`/admin/users/${user._id}`}
    if(!props.users || props.users.length == 0){
        return <p className="center">'No users'</p>
    }
    const modalHandler = (id, e) => {
        e.preventDefault()
        //const id = window.location.href.split('#')[1]
        console.log(id)
        const modal = document.getElementById(id)
        //console.log(modal)
        const instance = M.Modal.getInstance(modal)
        //console.log(instance)
        instance.open()
    }

    return(
        <div className="collection">
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
                            <Link to="#" onClick={(e) => modalHandler(user._id, e)} className="secondary-content">
                                <i className="material-icons">
                                    delete_forever
                                </i>
                            </Link>
                            <div id={user._id} className="modal">
                                <div className="modal-content">
                                    <h4>Modal Header</h4>
                                    <p>A bunch of text</p>
                                </div>
                                <div className="modal-footer">
                                    <a href="/admin/users" className="modal-close waves-effect waves-green btn-flat">Agree</a>
                                </div>
                            </div>
                        </a>
                    )
                })
            }
        </div>



    )
}