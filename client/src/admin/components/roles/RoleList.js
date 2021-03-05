import React from 'react'
import {Link} from 'react-router-dom'
import {DeleteRole} from "./DeleteRole";
import { useHistory } from 'react-router-dom'

export const RoleList = ({roles}) => {

    console.log(roles)
    const history = useHistory()

    if(!roles || roles.length == 0){
        return <p className="center">'No roles'</p>
    }
    const deleteHandler = (evenet) => {
        history.push('/admin/roles/delete/'+evenet.target._id)
    }
    return(
        <>
        <table className="highlight">
            <thead>
            <tr>
                <th>Name</th>
                <th>Action</th>
            </tr>
            </thead>

            <tbody>

            {
                roles.map((role)=>{
                    return(
                        <tr key={role._id}>
                            <td>{role.roleName}</td>
                            <td>
                                <Link
                                    style={{marginRight: 15, backgroundColor:"#ffab40"}}
                                    className="waves-effect waves-light btn"
                                    to={`/admin/roles/${role._id}`}>
                                    View
                                </Link>
                                <Link
                                    style={{marginRight: 15, backgroundColor:"#ffab40"}}
                                    className="waves-effect waves-light btn grey darken-2"
                                    to={`/admin/roles/delete/${role._id}`}>
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    )
                })
            }

            </tbody>
        </table>

        </>
    )
}