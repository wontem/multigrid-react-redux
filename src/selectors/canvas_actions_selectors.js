import {createSelector} from 'reselect';
import {currentLayer, intersectionId} from 'selectors/canvas_selectors';
import {Layers} from 'constants/canvas_constants';

import {addTile} from 'actions/path_actions';
import {toggleCell} from 'actions/gol_actions';
import {addAnt} from 'actions/ant_actions';
import {setCurrentPoint, resize, dragTranslate} from 'actions/canvas_actions';

const CLICK_ACTIONS = {
    [Layers.PATH]: addTile,
    [Layers.GOL]: toggleCell,
    [Layers.ANT]: addAnt,
};

export const actions = createSelector(
    [currentLayer, intersectionId],
    (currentLayer, intersectionId) => {
        const clickAction = CLICK_ACTIONS[currentLayer];
        const actions = {
            move: setCurrentPoint,
            drag: dragTranslate,
            resize,
        };

        if (clickAction) {
            actions['click'] = () => clickAction(intersectionId);
        }

        return actions;
    }
);
