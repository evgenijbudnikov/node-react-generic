import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import M from "materialize-css";
import {useEntityRepository} from "../../../repository/entity.repository";

export const ResourceList = (props) => {

    const [deleteWindow, setDeleteWindow] = useState()
    const [resourceToDelete, setResourceToDelete] = useState({})

    const [getAll, createOrUpdate, remove, getById, loading] = useEntityRepository("/api/admin/resources")


    if(!props || !props.resources || props.resources.length == 0){
        return <p className="center">'No roles'</p>
    }


    return(

        <div className="collection">
            {
                props.resources.map((resource)=>{
                    return(

                        <Link key={resource._id} to={`/admin/resources/${resource._id}`} className="collection-item">
                            <i className="material-icons verified-user">accessibility</i>
                            {resource.resource.split('/')[resource.resource.split('/').length - 1]}
                        </Link>
                    )
                })
            }
        </div>

    )
}