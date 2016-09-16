import {translate} from 'actions/canvas_actions';
import {diff} from 'helpers/math_helpers';

export function dragTranslate(point, prevPoint) {
    const {x, y} = diff(point, prevPoint);
    return translate(x, y);
}
