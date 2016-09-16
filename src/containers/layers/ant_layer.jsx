import {Layer} from 'shared/components/canvas';
import {canvasTransform, drawPath} from 'helpers/canvas_helpers';

import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {tiles, tileColors, turmitesPositions} from 'selectors/ant_selectors';
import {size, tilesTransform} from 'selectors/canvas_selectors';

@connect(createSelector(
    [tiles, tileColors, turmitesPositions, tilesTransform, size],
    (tiles, tileColors, turmitesPositions, tilesTransform, size) => ({
        ...size,
        tiles,
        tileColors,
        turmitesPositions,
        transform: tilesTransform,
    })
))
export default class AntLayer extends Layer {
    clearAndDraw() {
        const ctx = this.ctx;
        const {tiles, tileColors, turmitesPositions} = this.props;

        canvasTransform(ctx, this.props.transform);
        ctx.lineWidth = 1 / 10;
        ctx.lineJoin = 'round';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';

        tiles.forEach(({points}, id) => {
            ctx.fillStyle = tileColors.get(id);
            drawPath(ctx, points, true);
            ctx.fill();
            ctx.stroke();
        });

        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        turmitesPositions.forEach(({x, y}) => {
            ctx.beginPath();
            ctx.arc(x, y, 0.2, 0, 2 * Math.PI);
            ctx.fill();
        });
    }
}
