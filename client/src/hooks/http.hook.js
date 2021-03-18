import {useState, useCallback, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {LoaderContext} from "../context/LoaderContext"
import {useAuth} from "./auth.hook"
import {useDispatch} from "react-redux"
import {onSignOut} from "../actions"

export const useHttp = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const history = useHistory()
    const auth = useAuth()

    const {setMax, setValue, value} = useContext(LoaderContext)
    const dispatch = useDispatch()


    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {

        setLoading(true)
        setValue(1)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }


            const response = await fetch(url, {method, body, headers})

            setValue(20)
            //const data = await response.json()
            const reader = response.body.getReader()

            const contentLength = +response.headers.get('Content-Length')
            setMax(contentLength)

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
                setValue(progress)

            }

            let result = new TextDecoder("utf-8").decode(chunksAll)
            let commits = JSON.parse(result);

            setLoading(false)
            setValue(100)

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
            setLoading(false)
            setError([e.message])
            //throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return [ loading, request, error, clearError ]
}