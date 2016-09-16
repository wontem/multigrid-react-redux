import {Layer} from 'shared/components/canvas';
import {canvasTransform} from 'helpers/canvas_helpers';

import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {borderPoints} from 'selectors/maze_selectors';
import {tilesTransform, size} from 'selectors/canvas_selectors';

@connect(createSelector(
    [borderPoints, tilesTransform, size],
    (borderPoints, tilesTransform, size) => ({
        ...size,
        borders: borderPoints,
        transform: tilesTransform,
    })
))
export default class MazeLayer extends Layer {
    clearAndDraw() {
        const ctx = this.ctx;
        const {borders} = this.props;

        canvasTransform(ctx, this.props.transform);
        ctx.lineWidth = 1 / 10;
        ctx.lineJoin = 'round';
        ctx.strokeStyle = 'palegreen';
        ctx.fillStyle = 'palegreen';

        ctx.beginPath();
        borders.forEach(([startPoint, endPoint]) => {
            ctx.moveTo(startPoint.x, startPoint.y);
            ctx.lineTo(endPoint.x, endPoint.y);
        });
        ctx.stroke();
    }
}
