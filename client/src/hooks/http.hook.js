import {useState, useCallback, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuth} from "./auth.hook"
import {useDispatch, useSelector} from "react-redux"
import {onLoading, onLoadingProgress, onSignOut} from "../actions"

export const useHttp = () => {

    const [error, setError] = useState(null)

    const history = useHistory()
    const auth = useAuth()

    const dispatch = useDispatch()
    const token = useSelector(({token}) => token)

    const request = useCallback(async (url, method = 'GET', body = null, isActiveProgress = true, headers = {}) => {

        dispatch(onLoading(true))
        console.log(isActiveProgress)
        if(isActiveProgress){
            dispatch(onLoadingProgress(1))
        }


        try {

            headers['Authorization'] = `Bearer ${token}`

            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, {method, body, headers})
            if(isActiveProgress){
                dispatch(onLoadingProgress(20))
            }


            const reader = response.body.getReader()

            //const contentLength = +response.headers.get('Content-Length')
            //setMax(contentLength)

            let receivedLength = 0
            let chunks = []

            while (true){

                const {done, value} = await reader.read()

                if(done){
                    break
                }
                chunks.push(value)
                receivedLength += value.length
            }

            let chunksAll = new Uint8Array(receivedLength)
            let position = 0;

            for(let chunk of chunks){
                chunksAll.set(chunk, position)
                position += chunk.length
            }

            const delta = Math.floor( receivedLength / 5 )

            let j = 0
            for (let i = 1; i < receivedLength; i=i+delta) {
                j+=1
                if(j < 2){
                    continue
                }
                const progress = Math.round((i /receivedLength) * 100)
                if(isActiveProgress) {
                    dispatch(onLoadingProgress(progress))
                }

            }

            let result = new TextDecoder("utf-8").decode(chunksAll)
            let commits = JSON.parse(result)

            dispatch(onLoading(false))

            if(isActiveProgress) {
                dispatch(onLoadingProgress(100))
            }


            if (!response.ok) {
                setError(commits)
                if(response.status === 401) {
                    auth.logout()
                    dispatch(onSignOut())
                    history.push("/auth")
                }
            }

            return commits

        } catch (e) {
            dispatch(onLoading(false))
            setError([e.message])
            //throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return [ request, error, clearError ]
}