import {useCallback} from 'react'

export const useMessage = () => {
    return useCallback(errorData => {
        if(window.M && errorData){

            if(errorData.errors){
                const errObject = errorData.errors.errors.map(a => a.msg);
                for(const msg in errObject){
                    window.M.toast({ html:errObject[msg] })
                }
            }
            else{
                if(typeof errorData.message !== 'undefined') {
                    window.M.toast({ html:errorData.message })
                }
                else{
                    window.M.toast({ html:errorData.msg })
                }
            }
        }
    }, [])
}