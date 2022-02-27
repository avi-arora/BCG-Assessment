/*
 * Using Fetch instead of axios to save dev time, less package etc
 * 
 * NOTE: Axios can be used but ignored due to demo application. 
 * */
export const getDashboardStats = () => {
    return fetch("/api/analytics/dashboard").then((resp) => resp.json());
};