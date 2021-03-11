import {useSelector} from "react-redux"
import {useHttp} from "../../hooks/http.hook";
const {useCallback} = require("react")


export const useRepository = () => {

    const token = useSelector(({token}) => token)
    const [loading, request] = useHttp()

    //returns role by id if roleId specified or all roles if not
    const sendRoleGetRequest = useCallback(async(roleId) => {

        let url = '/api/admin/roles'

        if(roleId){
            url = url+`/${roleId}`
        }

        try{
            const rolesData = await request(url, 'GET', null,
                {
                    Authorization: `Bearer ${token}`
                })

            if(rolesData && !rolesData.status){
                return rolesData
            }
        }
        catch (e) {
            throw e
        }
    }, [token, request])

    const sendRoleRequest = useCallback(async (roleId, body, method) => {
        try{
            const uri = roleId ? '/api/admin/roles?_id='+roleId : '/api/admin/roles'
            let requestMethod = (roleId) ? ('PUT') : ('POST')

            if(method){
                requestMethod = method
            }

            const result = await request(uri, requestMethod, body, {
                Authorization : `Bearer ${token.token}`
            })

            if(result){
                return result
            }
        }
        catch (e) {
            throw e
        }
    },[token, request])

    return [sendRoleGetRequest, sendRoleRequest, loading]
}