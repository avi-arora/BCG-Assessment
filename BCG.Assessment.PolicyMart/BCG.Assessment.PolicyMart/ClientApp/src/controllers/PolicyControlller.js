import { useDispatch, useSelector } from "react-redux";
import { fetchPolicyPaginated, deletePolicy, fetchMetaData, searchPolicy} from '../Store/Redux/PolicyActions'

export const PolicyController = () => {

    const dispatch = useDispatch();

    //data from reducers
    const policiesPaginated = useSelector((state) => {
        return state.policyReducer.policies
    })

    const formMetadata = useSelector((state) => {
        return state.policyReducer.metaData;
    })

    
    // initiate dispatchers
    const getPoliciesPaginated = (payload) => {
        dispatch(fetchPolicyPaginated(payload));
    }

    const removePolicy = (id) => {
        dispatch(deletePolicy(id));
    }

    const getMetadata = () => {
        dispatch(fetchMetaData());
    }

    const search = (query) => {
        dispatch(searchPolicy(query));
    }


    //return data to components
    return {
        policiesPaginated, 
        getPoliciesPaginated, 
        removePolicy, 
        getMetadata, 
        formMetadata,
        search,
    }
}