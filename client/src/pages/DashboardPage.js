import React, {useContext} from 'react'
import { useState } from 'react'
import {UserDashboard} from '../components/UserDashboard'
import Can from "../components/Can";
import {useSelector} from "react-redux";
import {useEntityRepository} from "../repository/entity.repository";

const {useEffect, useCallback} = require("react");


export const DashboardPage = () => {

    const [userData, setUserData] = useState()
    const [getAll, createOrUpdate, remove, getById] = useEntityRepository("/api/users")
    const loading = useSelector(({loading}) => loading)
    const userId = useSelector(({userId}) => userId)

    const role = 'visitor'
    const fetchUserInfo = async () => {
        const data = await getById(userId)
        if(data && !data.status){
            setUserData(data)
        }
    }


    useEffect(async () => {
        await fetchUserInfo()
    }, [])


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