import {useState, useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {onSignIn, onSignOut} from "../actions";


const storageName = 'userData'

export const useAuth = () => {
    const[token, setToken] = useState()
    const[userId, setUserId] = useState()
    const [ready, setReady] = useState(false)
    const dispatch = useDispatch()

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem(storageName,
            JSON.stringify({
                userId:id,
                token:jwtToken
            }))

    },[])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    },[])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if(data && data.token){
            login(data.token, data.userId)
            //dispatch(onSignIn(data))
            //console.log("useEffect from auth hook login")

        }
        else {
            logout()
            //dispatch(onSignOut())
            //console.log("useEffect from auth hook logout")

        }
        setReady(true)
    }, [login, logout])

    return {login, logout, token, userId, ready}
}