
export const createReducer = (initialState, handlers) =>
    (state = initialState, action) => {
        return handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action) : state;
    }