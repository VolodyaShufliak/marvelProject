import { useCallback, useState } from "react"


const useHttp = () => {
    const [loading,setLoading] =useState(false);
    const [error,setError] =useState(null);

    const clearError = () => {setError(null)};
    const request = useCallback(async(url,method = 'GET',body = null,headers = {'Content-Type':'application/json'}) => {
        setLoading(true);
        clearError();
        try {
            const response = await fetch(url,{method,body,headers});
            if(!response.ok){
                throw new Error(`Could not fetch ${url}, status ${response.status}]`)
            }
            const data = await response.json();
            setLoading(false);
            return data;
        } catch (e) {
            setLoading(false);
            setError(e.message);
            //throw e;
        }
    },[])
    return {loading,error,request,clearError}
}

export default useHttp;