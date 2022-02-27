import { AnalyticsActionConstants } from "./ActionConstants";
import { getDashboardStats } from '../../Apis/analyticsApi'

export const getDashboardStatsSuccess = (payload) => {
    return (
        {
            type: AnalyticsActionConstants.GET_DASHBOARD_STATS_SUCCESS,
            payload: payload
        }
    )
}


export const fetchDashboardStats = () => {
    return async function (dispatch) {
        const response = await getDashboardStats();
        dispatch(getDashboardStatsSuccess(response));
        

    }
}


