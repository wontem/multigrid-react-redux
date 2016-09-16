import {createSelector} from 'reselect';
import {filterMap} from 'helpers/collections_helpers';
import {div, sum} from 'helpers/math_helpers';
import {tiles as allTiles} from 'selectors/grids_selectors';
import {getTurnColor} from 'helpers/ant_helpers';

export const ant = state => state.ant;
export const turmites = state => state.ant.get('turmites');
export const colors = state => state.ant.get('colors');
export const field = state => state.ant.get('field');

export const tiles = createSelector(
    [allTiles, field],
    (allTiles, field) => filterMap(allTiles, [...field.keys()])
);

export const turnColors = createSelector(
    [colors],
    (colors) => {
        return colors.map((turnDirection, id, colors) => {
            return getTurnColor(colors, id);
        });
    }
);

export const tileColors = createSelector(
    [turnColors, field],
    (turnColors, field) => field.map(colorId => {
        return turnColors.get(colorId);
    })
);

export const turmitesPositions = createSelector(
    [allTiles, turmites],
    (allTiles, turmites) => {
        return turmites.reduce((positions, {cellId}) => {
            const {points} = allTiles.get(cellId);
            const pos = div(sum(points[0], points[2]), 2);

            return positions.concat(pos);
        }, []);
    }
);
