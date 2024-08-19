import { ApiConfig } from "@/constants"
import ApiService from "@/services/api.service"

export const getApplications = async()=>{
    try{
        const res = await ApiService.get({
            url: `${ApiConfig.applications}/student`,
            tokenNeeded: true
        })
        return res?.data?.data
    }catch(e){
        Promise.reject(e)
    }
}