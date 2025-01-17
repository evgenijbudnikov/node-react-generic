import {useState, useCallback, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext"
import {LoaderContext} from "../context/LoaderContext"

export const useHttp = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const history = useHistory()
    const auth = useContext(AuthContext)

    const {setMax, setValue, value} = useContext(LoaderContext)


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

            //setValue(80)

            while (true){

                const {done, value} = await reader.read()

                if(done){
                    break
                }
                chunks.push(value)
                receivedLength += value.length

                console.log(`Received ${receivedLength} from ${contentLength}`)
            }

            let chunksAll = new Uint8Array(receivedLength)
            let position = 0;

            for(let chunk of chunks){
                chunksAll.set(chunk, position)
                position += chunk.length
            }

            const delta = Math.floor( receivedLength / 5 )
            console.log('delta:'+delta)
            let j = 0
            for (let i = 1; i < receivedLength; i=i+delta) {
                j+=1
                if(j < 2){
                    continue
                }
                const progress = Math.round((i /receivedLength) * 100)
                //console.log(progress)
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