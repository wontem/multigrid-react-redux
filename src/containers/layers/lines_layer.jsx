import {Layer} from 'shared/components/canvas';
import {getLinePoints} from 'helpers/math_helpers';
import {getGridColor} from 'helpers/grids_helpers';
import {canvasTransform} from 'helpers/canvas_helpers';

import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {grids, lines, intersections} from 'selectors/grids_selectors';
import {linesTransform, size} from 'selectors/canvas_selectors';

@connect(createSelector(
    [grids, lines, intersections, linesTransform, size],
    (grids, lines, intersections, linesTransform, size) => ({
        ...size, grids, lines, intersections,
        transform: linesTransform,
    })
))
export default class LinesLayer extends Layer {
    clearAndDraw() {
        const ctx = this.ctx;
        const {grids, lines, intersections} = this.props;
        const {width, height} = this.props;

        canvasTransform(ctx, this.props.transform);
        ctx.lineWidth = 1 / 20;

        lines.forEach((linesOnGrid, gridId) => {
            ctx.strokeStyle = getGridColor(grids.get(gridId));
            ctx.beginPath();
            linesOnGrid.forEach(line => {
                // TODO: use transform of (0; 0) and (w; h)
                const [fromPoint, toPoint] = getLinePoints(line, {
                    x: -width / 2,
                    y: -height / 2,
                }, {
                    x: width / 2,
                    y: height / 2,
                });
                ctx.moveTo(fromPoint.x, fromPoint.y);
                ctx.lineTo(toPoint.x, toPoint.y);
            });
            ctx.stroke();
        });

        ctx.fillStyle = 'white';
        ctx.beginPath();
        intersections.forEach(({point}) => {
            ctx.moveTo(point.x, point.y);
            ctx.arc(point.x, point.y, 1 / 10, 0, Math.PI * 2);
        });
        ctx.fill();
    }
}
