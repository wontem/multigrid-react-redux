import {Layer} from 'shared/components/canvas';
import {getLinePoints, summate} from 'helpers/math_helpers';
import {getLine, getLineIdsByRibbonId, getGridColor} from 'helpers/grids_helpers';
import {canvasTransform} from 'helpers/canvas_helpers';

import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {grids, gridIds} from 'selectors/grids_selectors';
import {linesTransform, currentRibbonIds, size} from 'selectors/canvas_selectors';

@connect(createSelector(
    [grids, gridIds, linesTransform, currentRibbonIds, size],
    (grids, gridIds, linesTransform, currentRibbonIds, size) => ({
        ...size, grids, gridIds,
        transform: linesTransform,
        currentRibbons: currentRibbonIds,
    })
))
export default class InteractiveLinesLayer extends Layer {
    clearAndDraw() {
        const ctx = this.ctx;
        const {grids, currentRibbons} = this.props;
        const {width, height} = this.props;

        canvasTransform(ctx, this.props.transform);

        currentRibbons.forEach(([gridId, ribbonId]) => {
            const grid = grids.get(gridId);
            const lineIds = getLineIdsByRibbonId(ribbonId);
            const lineId = summate(lineIds) / lineIds.length;

            const line = getLine(grid, lineId);

            const [fromPoint, toPoint] = getLinePoints(line, {
                x: -width / 2,
                y: -height / 2,
            }, {
                x: width / 2,
                y: height / 2,
            });

            ctx.strokeStyle = getGridColor(grid, 0.3);
            ctx.lineWidth = grid.interval;
            ctx.beginPath();
            ctx.moveTo(fromPoint.x, fromPoint.y);
            ctx.lineTo(toPoint.x, toPoint.y);
            ctx.stroke();
        });
    }
}
