function defaultReducer(state) {
    return state;
}

function _getReducer(reducerSelector, type) {
    if (reducerSelector == null) {
        return defaultReducer;
    }

    switch (reducerSelector.constructor) {
        case Function: return reducerSelector(type) || defaultReducer;
        case Object: return reducerSelector[type] || defaultReducer;
    }
}

export function createReducer(initialState, reducerSelector) {
    return (state = initialState, action) => {
        const reduce = _getReducer(reducerSelector, action.type);
        return reduce(state, action);
    };
}

function _getChunk(state, key) {
    return state[key];
}

function _setChunk(state, key, data) {
    return _getChunk(state, key) === data ? state : {
        ...state,
        [key]: data,
    };
}

export function combineReducers(reducers, getChunk = _getChunk, setChunk = _setChunk) {
    const reducerKeys = Object.keys(reducers);

    return (state, action) => reducerKeys.reduce((state, key) => {
        const reduce = reducers[key];
        let stateChunk = getChunk(state, key);

        stateChunk = reduce(stateChunk, action, state);
        return setChunk(state, key, stateChunk);
    }, state);
}

export function createCombinedReducer(reducers) {
    const combinedReducer = combineReducers(reducers);
    return createReducer({}, () => combinedReducer);
}

export function defineAction(type, getPayload = arg => arg) {
    return function createAction(...args) {
        const payload = getPayload(...args);
        return {
            type,
            ...payload,
        };
    };
}
