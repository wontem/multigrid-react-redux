import Immutable from 'immutable';
import {createReducer} from 'redux_helpers';
import {ActionTypes} from 'constants/enviroment_constants';

export default createReducer(Immutable.Map({
    randomSeed: 1,
}), type => {
    switch (type) {
        case ActionTypes.SET_RANDOM_SEED: return setRandomSeed;
    }
});

function setRandomSeed(state, {seed}) {
    return state.set('randomSeed', seed);
}
