import React, {useContext} from 'react'
import { useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import {AuthContext} from "../context/AuthContext"
import {Loader} from '../components/Loader'
import {UserDashboard} from '../components/UserDashboard'
import Can from "../components/Can";
import {ProgressLoader} from "../components/ProgressLoader";

const {useEffect, useCallback} = require("react");



export const DashboardPage = () => {

    const [userData, setUserData] = useState()
    const [loading, request] = useHttp()

    const {token, userId} = useContext(AuthContext)
    const role = 'visitor'
    const fetchUserInfo = useCallback(async () => {
        try {
            const data = await request('/api/users/' + userId, 'GET', null, {
                Authorization: `Bearer ${token.token}`
            })

            if(data && !data.status){
                setUserData(data)
            }

        }
        catch (e) {
            throw e
        }
    }, [token, request])


    useEffect(() => {
        fetchUserInfo()
    }, [fetchUserInfo])


    if (loading) {
        return <></>//<ProgressLoader/>
    }

    return(

            <Can
                role={role}
                perform="dashboard:visit"
                yes={() => (
                    <div>
                        {!loading && <UserDashboard userInfo={userData} /> }
                    </div>
                )}
                no={() => <h1>no access</h1>}
            />


        //<>

         //   {!loading && <UserDashboard userInfo={userData} /> }
        //</>
    )
}