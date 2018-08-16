import {createSelector} from 'reselect';
import {currentLayer, intersectionId, currentRibbonIds, cellId} from 'selectors/canvas_selectors';
import {Layers} from 'constants/canvas_constants';

import {addTile} from 'actions/path_actions';
import {toggleCell} from 'actions/gol_actions';
import {addAnt} from 'actions/ant_actions';
import {addCell} from 'actions/walk_actions';
import {setCenterCell} from 'actions/tiles_actions';
import {setCurrentPoint, resize, dragTranslate} from 'actions/canvas_actions';

const CLICK_ACTIONS = {
    [Layers.TILES]: setCenterCell,
    [Layers.PATH]: addTile,
    [Layers.GOL]: toggleCell,
    [Layers.ANT]: addAnt,
    [Layers.WALK]: addCell,
};

export const actions = createSelector(
    [currentLayer, intersectionId, cellId, currentRibbonIds],
    (currentLayer, intersectionId, cellId, currentRibbonIds) => {
        const clickAction = CLICK_ACTIONS[currentLayer];
        const actions = {
            move: setCurrentPoint,
            drag: dragTranslate,
            resize,
        };

        if (clickAction) {
            actions['click'] = () => clickAction(intersectionId, currentRibbonIds, cellId);
        }

        return actions;
    }
);
