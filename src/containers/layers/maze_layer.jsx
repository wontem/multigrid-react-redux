import {Layer} from 'shared/components/canvas';
import {canvasTransform, drawPath} from 'helpers/canvas_helpers';

import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {tiles} from 'selectors/grids_selectors';
import {borderPoints} from 'selectors/maze_selectors';
import {tilesTransform, size} from 'selectors/canvas_selectors';

@connect(createSelector(
    [tiles, borderPoints, tilesTransform, size],
    (tiles, borderPoints, tilesTransform, size) => ({
        ...size,
        tiles,
        borders: borderPoints,
        transform: tilesTransform,
    })
))
export default class MazeLayer extends Layer {
    clearAndDraw() {
        const ctx = this.ctx;
        const {borders, tiles} = this.props;

        canvasTransform(ctx, this.props.transform);
        ctx.lineWidth = 1 / 10;
        ctx.lineJoin = 'round';
        ctx.strokeStyle = 'palegreen';
        ctx.fillStyle = '#111';

        tiles.forEach(({points}) => {
            drawPath(ctx, points, true);
            ctx.fill();
        });

        ctx.beginPath();
        borders.forEach(([startPoint, endPoint]) => {
            ctx.moveTo(startPoint.x, startPoint.y);
            ctx.lineTo(endPoint.x, endPoint.y);
        });
        ctx.stroke();
    }
}
