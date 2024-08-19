import { ApiConfig } from "@/constants";
import ApiService from "@/services/api.service";

export const mixpanelSubmit = async (data: any) => {
    try {
        const response = await ApiService.post({
        url: ApiConfig.common + "/events",
        options:data,
        tokenNeeded: false,
        });
        return response;
    } catch (e) {
        throw e;
    }
}