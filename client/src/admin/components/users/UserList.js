import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {DeleteUser} from "./DeleteUser";
import { useHistory } from 'react-router-dom'
import M from "materialize-css";

const {useState} = require("react");


export const UserList = ({users}) => {

    console.log('users:'+users)
    const history = useHistory()
    const[select, setSelect] = useState()


    useEffect(() => {
        const elements = document.querySelectorAll('select')
        M.FormSelect.init(elements)
    },[users])

    if(!users || users.length == 0){
        return <p className="center">'No users'</p>
    }
    const deleteHandler = (event) => {
        //console.log(event.target.parentNode.id)
        //history.push('/admin/users/'+event.target.parentNode.id)
    }
    return(
        <table className="highlight">
            <thead>

            </thead>

            <tbody>

            {
                users.users.map((user)=>{
                    return(
                        <tr key={user._id} id={user._id} onClick={deleteHandler}>
                            <td>
                                <label>email: </label>
                                <b>{user.email}</b>
                            </td>
                            <td>

                                <Link to={`/admin/users/${user._id}`} className="secondary-content">
                                    <i className="material-icons">
                                        details
                                    </i>
                                </Link>
                                <Link to={`/admin/users/delete/${user._id}`} className="secondary-content" style={{marginRight:10+'px'}}>
                                    <i className="material-icons">
                                        delete
                                    </i>
                                </Link>
                                <label style={{marginRight:10+'px', marginTop:5+'px'}}>roles: </label>
                                <div className="sel">
                                    <select key={user.email}  multiple defaultValue={user.roles.map(x => x._id)}>
                                        <option key={Math.random() * (1000 - 10) + 10 && console.log(user.roles)}  value="" disabled defaultValue>Choose your option</option>
                                        {
                                            users.roles.map((role) => {
                                                return(
                                                    <option
                                                        key={role._id+Math.random() * (1000 - 10) + 10}
                                                        value={role._id}>
                                                        {role.roleName}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </td>
                        </tr>
                    )
                })
            }

            </tbody>
        </table>


    )
}