import React from 'react'
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import {useState, useEffect} from "react"
import {Link, useHistory} from 'react-router-dom'
import {useEntityRepository} from "../../../repository/entity.repository"
import {useDispatch, useSelector} from "react-redux"
import {ResourceList} from "../../components/resources/ResourceList";



export const ResourcesPage = () => {

    const [getAll, createOrUpdate, remove, getById] = useEntityRepository("/api/admin/resources")
    const [resources, setResources] = useState(null)
    const loading = useSelector(({loading}) => loading)
    const dispatch = useDispatch()

    const history = useHistory()

    const fetchResources = async () => {
        const result = await getAll()
        if(result){
            setResources(result)
        }
    }

    const handler = async () => {
        await fetchResources()
    }

    let props = {
        resources : resources,
        handler: handler
    }

    useEffect(async ()=>{
        await fetchResources()
    },[])

    if (loading) {
        return <></>
    }

    const createHandler = () => {
        history.push('/admin/resources/add')
    }

    return(

        <div className="row">
            <h4>Manage Resources</h4>
            {!loading && <ResourceList {...props} />}
        </div>
    )
}