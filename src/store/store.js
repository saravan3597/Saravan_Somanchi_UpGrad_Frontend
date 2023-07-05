import { createStore } from 'redux';

function upgradStateReducer(state = {
    searchString: ''
}, action) {
    state.searchString = action.value;
    return state;
}

const store = createStore(upgradStateReducer);

export default store;