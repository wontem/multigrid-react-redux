import {createSelector} from 'reselect';
import {invert, transform, diff, toPolar} from 'helpers/math_helpers';
import {getRibbonIds, getProjectionOfCell} from 'helpers/grids_helpers';
import {grids, gridIds, graph, intersections, tiles, cellCoords} from 'selectors/grids_selectors';
import {getId} from 'helpers/id_helpers';

export const canvas = state => state.canvas;

export const currentLayer = state => state.canvas.get('currentLayer');
export const currentPoint = state => state.canvas.get('currentPoint');
export const tilesScale = state => state.canvas.get('tilesScale');
export const linesScale = state => state.canvas.get('linesScale');
export const linesTranslate = state => state.canvas.get('linesTranslate');
export const size = state => state.canvas.get('size');

export const center = createSelector(
    [size],
    ({width, height}) => ({
        x: width / 2,
        y: height / 2,
    })
);

export const tilesTranslate = createSelector(
    [linesTranslate, grids, gridIds, tilesScale, linesScale],
    (linesTranslate, grids, gridIds, tilesScale, linesScale) => {
        const ribbonIds = getRibbonIds(grids, gridIds, linesTranslate);
        const {x, y} = getProjectionOfCell(grids, ribbonIds);
        const k = tilesScale / linesScale;

        return {
            x: x * k,
            y: y * k,
        };
    }
);

export const linesTransform = createSelector(
    [center, linesScale, linesTranslate],
    (center, linesScale, linesTranslate) => {
        return [
            linesScale, 0, center.x + linesTranslate.x,
            0, linesScale, center.y + linesTranslate.y,
        ];
    }
);

export const tilesTransform = createSelector(
    [center, tilesScale, tilesTranslate],
    (center, tilesScale, tilesTranslate) => {
        return [
            tilesScale, 0, center.x + tilesTranslate.x,
            0, tilesScale, center.y + tilesTranslate.y,
        ];
    }
);

export const pointOnLines = createSelector(
    [linesTransform, currentPoint],
    (linesTransform, currentPoint) => {
        const matrix = invert(linesTransform);
        return transform(currentPoint, matrix);
    }
);

export const pointOnTiles = createSelector(
    [pointOnLines, grids, gridIds],
    (pointOnLines, grids, gridIds) => {
        const ribbonIds = getRibbonIds(grids, gridIds, pointOnLines);
        return getProjectionOfCell(grids, ribbonIds);
    }
);

export const cellId = createSelector(
    [grids, gridIds, cellCoords, currentPoint],
    (grids, gridIds, cellCoords, currentPoint) => {
        const ribbonIds = getRibbonIds(grids, gridIds, currentPoint);
        const cellId = getId(ribbonIds);

        return cellCoords.has(cellId) ? cellId : null;
    }
);

export const itersectionRibbonIds = createSelector(
    [pointOnLines, grids, gridIds],
    (pointOnLines, grids, gridIds) => {
        return getRibbonIds(grids, gridIds, pointOnLines);
    }
);

export const intersectionId = createSelector(
    [grids, gridIds, graph, intersections, tiles, pointOnLines],
    (grids, gridIds, graph, intersections, tiles, point) => {
        const ribbonIds = getRibbonIds(grids, gridIds, point);
        const cellId = getId(ribbonIds);

        if (!graph.cells.has(cellId)) {
            return null;
        }

        const intersectionIds = graph.cells.get(cellId);
        const intersectionPoints = intersectionIds.map(intersectionId => {
            return intersections.get(intersectionId).point;
        });
        const magnitudes = intersectionPoints.map(intersectionPoint => {
            const difference = diff(intersectionPoint, point);
            return toPolar(difference).p;
        });
        // TODO: rewrite using indexes
        const minMagnitude = Math.min(...magnitudes);
        return intersectionIds[magnitudes.indexOf(minMagnitude)];
    }
);

export const tile = createSelector(
    [intersectionId, tiles],
    (intersectionId, tiles) => {
        if (!intersectionId) {
            return null;
        }

        return tiles.get(intersectionId);
    }
);
