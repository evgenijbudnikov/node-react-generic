import React from 'react'
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import {useState, useEffect} from "react"
import {RoleList} from "../../components/roles/RoleList";
import {Link, useHistory} from 'react-router-dom'
import {useEntityRepository} from "../../../repository/entity.repository"
import {useDispatch, useSelector} from "react-redux"
import {onRolesLoaded} from "../../../actions";
import {Loader} from "../../../components/Loader";



export const RolesPage = () => {

    const [getAll, createOrUpdate, remove, getById] = useEntityRepository("/api/admin/roles")
    const [roles, setRoles] = useState(null)
    const loading = useSelector(({loading}) => loading)
    const dispatch = useDispatch()
    const previousRoles = useSelector(({roleList}) => roleList)


    const history = useHistory()

    const fetchRoles = async () => {
        const result = await getAll()
        if(result){
            //console.log(result)
            //props.roles = result
            setRoles(result)
            //dispatch(onRolesLoaded(result))
        }
    }

    const handler = async () => {
        await fetchRoles()
    }

    let props = {
        roles : roles,
        handler: handler
    }

    if(previousRoles){
        //props.roles = previousRoles
    }

    useEffect(async ()=>{
        await fetchRoles()
    },[])

    if (loading) {
        return <></>
        //return (
        //    <Loader />
        //)

    }
    const createHandler = () => {
        history.push('/admin/roles/add')
    }

    return(

        <div className="row">
            <h4>Manage Roles</h4>

            {!loading && <RoleList {...props} />}

            <div className="card-action" style={{marginTop: 25}}>
                <button
                    className="waves-effect waves-light btn"
                    style={{marginRight: 15, backgroundColor:"#2ea44f"}}
                    onClick={createHandler}>
                    Create
                </button>
            </div>

        </div>
    )
}