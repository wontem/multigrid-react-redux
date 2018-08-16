import {Layer} from 'shared/components/canvas';
import {canvasTransform, drawPath} from 'helpers/canvas_helpers';

import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {points} from 'selectors/walk_selectors';
import {tilesTransform, size} from 'selectors/canvas_selectors';

@connect(createSelector(
    [points, tilesTransform, size],
    (points, tilesTransform, size) => ({
        ...size,
        points,
        transform: tilesTransform,
    })
))
export default class WalkLayer extends Layer {
    clearAndDraw() {
        const ctx = this.ctx;
        const {points} = this.props;

        canvasTransform(ctx, this.props.transform);

        ctx.lineWidth = 1 / 10;
        ctx.lineJoin = 'round';
        ctx.fillStyle = 'orange';
        ctx.strokeStyle = 'gold';

        drawPath(ctx, points, false);

        ctx.stroke();
    }
}
