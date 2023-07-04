import { createStore } from 'redux';

function upgradStateReducer(state = {
    searchString: '',
    loginState: false
}, action) {
    state[action.type] = action.value;
    return state;
}

const store = createStore(upgradStateReducer);

export default store;