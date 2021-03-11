import React, {useContext} from 'react'
import { useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import {UserDashboard} from '../components/UserDashboard'
import Can from "../components/Can";
import {useSelector} from "react-redux";

const {useEffect, useCallback} = require("react");


export const DashboardPage = () => {

    const [userData, setUserData] = useState()
    const [loading, request] = useHttp()

    const token = useSelector(({token}) => token)
    const userId = useSelector(({userId}) => userId)

    const role = 'visitor'
    const fetchUserInfo = useCallback(async () => {
        try {
            const data = await request('/api/users/' + userId, 'GET', null, {
                Authorization: `Bearer ${token}`
            })

            if(data && !data.status){
                setUserData(data)
                //set user info to redux store here

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