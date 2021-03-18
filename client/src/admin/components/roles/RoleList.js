import React from 'react'
import {Link} from 'react-router-dom'
import {DeleteRole} from "./DeleteRole";
import { useHistory } from 'react-router-dom'

export const RoleList = ({roles}) => {

    const history = useHistory()

    if(!roles || roles.length == 0){
        return <p className="center">'No roles'</p>
    }
    const deleteHandler = (event) => {
        history.push('/admin/roles/delete/'+event.target._id)
    }

    return(

        <div className="collection">
            {
                roles.map((role)=>{
                    return(

                        <Link key={role._id} to={`/admin/roles/${role._id}`} className="collection-item">
                                <i className="material-icons verified-user">accessibility</i>
                                {role.roleName}
                                <Link to={`/admin/roles/delete/${role._id}`} className="secondary-content">
                                    <i className="material-icons">
                                        delete_forever
                                    </i>
                                </Link>
                        </Link>
                    )
                })
            }
        </div>

    )
}