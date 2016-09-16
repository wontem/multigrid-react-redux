import {Layer} from 'shared/components/canvas';
import {canvasTransform, drawPath} from 'helpers/canvas_helpers';

import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {tilesTransform, size, pointOnTiles, tile} from 'selectors/canvas_selectors';

@connect(createSelector(
    [tile, tilesTransform, pointOnTiles, size],
    (tile, tilesTransform, pointOnTiles, size) => ({
        ...size,
        tile,
        transform: tilesTransform,
        // TODO: bottleneck. point always changes
        point: pointOnTiles,
    })
))
export default class InteractiveTilesLayer extends Layer {
    clearAndDraw() {
        const ctx = this.ctx;
        const {point, tile} = this.props;

        canvasTransform(ctx, this.props.transform);

        ctx.fillStyle = 'white';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.arc(point.x, point.y, 4 / 10, 0, Math.PI * 2);
        ctx.fill();

        if (tile) {
            drawPath(ctx, tile.points, true);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2 / 10;
            ctx.fill();
            ctx.stroke();
        }
    }
}
