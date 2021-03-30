import React, {useEffect, useState, useCallback} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {useSelector} from "react-redux";
import {useMessage} from "../../../hooks/message.hook";
import {useEntityRepository} from "../../../repository/entity.repository";


export const ResourceDetailPage = () => {

    const resourceId = useParams().id

    const message = useMessage()
    const [form, setForm] = useState({resource: ''})
    const [getAll, createOrUpdate, remove, getById] = useEntityRepository("/api/admin/resources")
    const loading = useSelector(({loading}) => loading)

    const history = useHistory()

    const cancelHandler = async () => {
        await redirectToUsers()
    }

    const redirectToUsers = async () => {
        history.push('/admin/resources')
    }

    const saveHandler = async () => {
        const id = resourceId === undefined ? '' : resourceId
        const result = await createOrUpdate(id, {...form})
        if(result){
            history.push('/admin/resources')
        }
    }

    const fetchResource = async () => {
        const fetchedResource = await getById(resourceId)
        if(fetchedResource){
            setForm({...form, resource: fetchedResource.resource})
        }
    }

    useEffect(async () => {
        if(resourceId){
            await fetchResource()
        }
    },[])


    return(
        <>
            <h2>Resource</h2>

            <div className="input-field">
                <input id="resource" type="text" name="resource" className="yellow-input" value={form.resource} disabled={true}
                ></input>
                <label className="active" htmlFor="resource">Resource:</label>
            </div>
            <div className="card-action" style={{marginTop: 25}}>
                <button
                    className="waves-effect waves-light btn"
                    style={{marginRight: 15, backgroundColor:"#ffab40"}}
                    onClick={saveHandler}
                    disabled={loading}>
                    Save
                </button>
                <button
                    className="waves-effect waves-light btn grey darken-2"
                    style={{marginRight: 15, backgroundColor:"#ffab40"}}
                    onClick={cancelHandler}
                    disabled={loading}>
                    Cancel
                </button>
            </div>
        </>
    )
}