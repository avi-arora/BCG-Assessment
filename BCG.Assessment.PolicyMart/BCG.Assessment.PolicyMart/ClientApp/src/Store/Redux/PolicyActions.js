import { PolicyActionConstants } from "./ActionConstants";
import { GetPaginated, Delete, GetMetadata, Search } from '../../Apis/policyApi'

export const getPoliciesPaginated = (payload) => {
    return (
        {
            type: PolicyActionConstants.GET_POLICY_PAGINATED,
            payload: payload
        }
    )
}

const getPoliciesPaginatedSuccess = (payload) => (
    {
        type: PolicyActionConstants.GET_POLICY_PAGINATED_SUCCESS,
        payload: payload
    }
)

const getMetadataSuccess = (payload) => (
    {
        type: PolicyActionConstants.GET_METADATA_SUCCESS,
        payload: payload
    }
)

export const fetchMetaData = () => {
    return async function (dispatch) {
        const response = await GetMetadata()
        dispatch(getMetadataSuccess(response));
    }
}
export const fetchPolicyPaginated = (payload) => {
    return async function (dispatch) {
        const response = await GetPaginated(payload);
        dispatch(getPoliciesPaginatedSuccess(response))
    }
}

export const deletePolicy = (id) => {
    return async function (dispatch) {
        const response = await Delete(id);
        if (response == true) {
            console.log("delete success");
            dispatch(getPoliciesPaginated({ currentPage: 1, pageSize: 10 }));
            console.log("SUCCESS");
        }
    }
}

export const searchPolicy = (query) => {
    return async function (dispatch) {
        const response = await Search(query);
        if (response) {
            dispatch(getPoliciesPaginatedSuccess(response));
        }
       
    }
}


