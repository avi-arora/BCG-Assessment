import { createReducer } from "./BaseReducer";
import { PolicyActionConstants } from "./ActionConstants";


const initialState = {
    policies: {},
    metaData: {}
}

const getPolicyPaginated = (state, action) => {
    return { ...state, policies: action.payload }
}

const getMetaData = (state, action) => {
    return {...state, metaData: action.payload}
}



const policyReducer = createReducer(initialState, {
    [PolicyActionConstants.GET_POLICY_PAGINATED_SUCCESS]: getPolicyPaginated,
    [PolicyActionConstants.GET_METADATA_SUCCESS]: getMetaData
});


export default policyReducer

