import {Layer} from 'shared/components/canvas';
import {canvasTransform, drawPath} from 'helpers/canvas_helpers';

import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {tiles} from 'selectors/gol_selectors';
import {size, tilesTransform} from 'selectors/canvas_selectors';

@connect(createSelector(
    [tiles, tilesTransform, size],
    (tiles, tilesTransform, size) => ({
        ...size,
        tiles,
        transform: tilesTransform,
    })
))
export default class GolLayer extends Layer {
    clearAndDraw() {
        const ctx = this.ctx;
        const {tiles} = this.props;

        canvasTransform(ctx, this.props.transform);
        ctx.lineWidth = 1 / 10;
        ctx.lineJoin = 'round';
        ctx.fillStyle = 'gold';
        ctx.strokeStyle = 'orange';

        tiles.forEach(({points}) => {
            drawPath(ctx, points, true);
            ctx.fill();
            ctx.stroke();
        });
    }
}
