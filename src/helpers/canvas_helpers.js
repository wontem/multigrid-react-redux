export function canvasTransform(ctx, [a, b, c, d, e, f]) {
    ctx.transform(a, d, b, e, c, f);
}

export function drawPath(ctx, points, closed) {
    ctx.beginPath();
    points.forEach((point, i) => {
        if (i === 0) {
            ctx.moveTo(point.x, point.y);
        } else {
            ctx.lineTo(point.x, point.y);
        }
    });

    if (closed) {
        ctx.closePath();
    }
}
