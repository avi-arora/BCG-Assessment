import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStats } from '../Store/Redux/AnalyticsActions'

export const AnalyticsController = () => {

    const dispatch = useDispatch();

    //data from reducers
    const dashboardData = useSelector((state) => {
        return state.analyticsReducer.dashboard
    })

    
    // initiate dispatchers
    const getDashboardStats = () => {
        dispatch(fetchDashboardStats());
    }

    //return data to components
    return {
        getDashboardStats,
        dashboardData
    }
}