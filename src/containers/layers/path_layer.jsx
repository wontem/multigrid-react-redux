import {Layer} from 'shared/components/canvas';
import {canvasTransform, drawPath} from 'helpers/canvas_helpers';

import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {tiles} from 'selectors/path_selectors';
import {tilesTransform, size} from 'selectors/canvas_selectors';

@connect(createSelector(
    [tiles, tilesTransform, size],
    (tiles, tilesTransform, size) => ({
        ...size,
        tiles,
        transform: tilesTransform,
    })
))
export default class PathLayer extends Layer {
    clearAndDraw() {
        const ctx = this.ctx;
        const {tiles} = this.props;

        canvasTransform(ctx, this.props.transform);
        ctx.lineWidth = 1 / 10;
        ctx.lineJoin = 'round';
        ctx.fillStyle = 'orange';
        ctx.strokeStyle = 'gold';


        tiles.forEach(({points}) => {
            drawPath(ctx, points, true);
            ctx.fill();
            // ctx.stroke();
        });
    }
}
