import {createSelector} from 'reselect';

export const enviroment = state => state.enviroment;

export const randomSeed = createSelector(
    [enviroment],
    (enviroment) => enviroment.get('randomSeed')
);
