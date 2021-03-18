import React, {useContext} from 'react'
import {useHttp} from "../../../hooks/http.hook";
import { useHistory } from 'react-router-dom'
import {useSelector} from "react-redux";

export const DeleteUser = ({user}) => {

    //console.log(user)
    const [loading, request] = useHttp()
    const token = useSelector(({token}) => token)
    const history = useHistory()

    const deleteHandler = async () => {
        try{

            const uri = '/api/users?_id='+user._id

            const result = await request(uri, 'DELETE', null, {
                Authorization : `Bearer ${token}`
            })

            if(result){
                redirectToUsers()
            }
        }
        catch (e) {
            throw e
        }
    }

    const cancelHandler = () => {
        redirectToUsers()
    }

    const redirectToUsers = () => {
        history.push('/admin/users')
    }

    if(!user || user.length == 0){
        return <p className="center">No user</p>
    }
    return(
        <div className="row">
            <div className="col s12 m12">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Delete user: <b>{user.email}</b></span>
                        <p>Are you sure you want to delete this user?</p>
                    </div>
                    <div className="card-action" style={{marginTop: 25}}>
                        <button
                            className="waves-effect waves-light btn"
                            style={{marginRight: 15, backgroundColor:"#ffab40"}}
                            onClick={deleteHandler}
                            disabled={loading}>
                            Ok
                        </button>
                        <button
                            className="waves-effect waves-light btn grey darken-2"
                            onClick={cancelHandler}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}