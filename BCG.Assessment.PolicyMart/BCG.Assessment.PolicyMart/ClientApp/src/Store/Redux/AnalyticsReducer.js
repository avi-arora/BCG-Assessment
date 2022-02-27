import { createReducer } from "./BaseReducer";
import { AnalyticsActionConstants } from "./ActionConstants";


const initialState = {
    dashboard: {},
}

const getDashboardAnalytics = (state, action) => {
    return { ...state, dashboard: action.payload }
}

const analyticsReducer = createReducer(initialState, {
    [AnalyticsActionConstants.GET_DASHBOARD_STATS_SUCCESS]: getDashboardAnalytics,
});


export default analyticsReducer

