import {createSelector} from 'reselect';
import {filterMap} from 'helpers/collections_helpers';
import {tiles as allTiles} from 'selectors/grids_selectors';

export const gol = state => state.gol;

export const rules = createSelector(
    [gol],
    (gol) => ({
        toBirth: gol.get('toBirth'),
        toSurvive: gol.get('toSurvive'),
        isNeumannOnly: gol.get('isNeumannOnly'),
    })
);

export const population = createSelector(
    [gol],
    (gol) => gol.get('population')
);

export const randomParams = createSelector(
    [gol],
    (gol) => {
        return {
            seed: gol.get('randomSeed'),
            area: gol.get('randomArea'),
        };
    }
);

export const tiles = createSelector(
    [allTiles, population], filterMap
);
