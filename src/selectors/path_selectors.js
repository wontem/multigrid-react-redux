import {createSelector} from 'reselect';
import {neighbours, intersections, tiles as allTiles} from 'selectors/grids_selectors';
import {filterMap} from 'helpers/collections_helpers';
import {aStar} from 'helpers/path_helpers';
import {sum, div} from 'helpers/math_helpers';
import {Groups} from 'constants/grids_constants';

export const path = state => state.path;

export const pointsMap = createSelector(
    [path, intersections, allTiles],
    (path, intersections, allTiles) => {
        const distanceGroup = path.get('distanceGroup');

        switch (distanceGroup) {
            case Groups.TILES: return allTiles.map(({points}) => {
                return div(sum(points[0], points[2]), 2);
            });

            case Groups.LINES: return intersections.map(({point}) => {
                return point;
            });
        }
    }
);

export const intersectionsInPath = createSelector(
    [path, neighbours, pointsMap],
    (path, neighbours, pointsMap) => {
        const tiles = path.get('tiles');
        return aStar(neighbours, pointsMap, ...tiles);
    }
);

export const tiles = createSelector(
    [allTiles, intersectionsInPath], filterMap
);
