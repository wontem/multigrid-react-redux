export function toPolar({x, y}) {
    return {
        p: Math.sqrt(x * x + y * y),
        phi: Math.atan2(y, x),
    };
}

export function toCartesian({p, phi}) {
    return {
        x: p * Math.cos(phi),
        y: p * Math.sin(phi),
    };
}

export function sum(a, b) {
    return {
        x: a.x + b.x,
        y: a.y + b.y,
    };
}

export function diff(a, b) {
    return {
        x: a.x - b.x,
        y: a.y - b.y,
    };
}

export function div({x, y}, d) {
    return {
        x: x / d,
        y: y / d,
    };
}

export function prod({x, y}, m) {
    return {
        x: x * m,
        y: y * m,
    };
}

export function transform({x, y}, [a, b, c, d, e, f, g = 0, h = 0, i = 1]) {
    const cx = a * x + b * y + c;
    const cy = d * x + e * y + f;
    const cw = g * x + h * y + i;

    return {
        x: cx / cw,
        y: cy / cw,
    };
}

export function invert([a, b, c, d, e, f, g = 0, h = 0, i = 1]) {
    const A =  (e * i - f * h);
    const B = -(d * i - f * g);
    const C =  (d * h - e * g);
    const D = -(b * i - c * h);
    const E =  (a * i - c * g);
    const F = -(a * h - b * g);
    const G =  (b * f - c * e);
    const H = -(a * f - c * d);
    const I =  (a * e - b * d);

    const det = a * A + b * B + c * C;

    return [
        A, D, G,
        B, E, H,
        C, F, I,
    ].map(val => val / det);
}

export function translate([a, b, c, d, e, f, g = 0, h = 0, i = 1], {x, y}) {
    return [a, b, c + x, d, e, f + y, g, h, i];
}

export function getXOnPolarLine({p, phi}, y) {
    return (p - y * Math.sin(phi)) / Math.cos(phi);
}

export function getYOnPolarLine({p, phi}, x) {
    return (p - x * Math.cos(phi)) / Math.sin(phi);
}

export function getLinePoints(line, minPoint, maxPoint) {
    return [minPoint, maxPoint].map(({x, y}) => {
        const point = {
            x,
            y,
        };

        switch (getInRange(line.phi, 2 * Math.PI) % Math.PI) {
            case 0:
                point.x = getXOnPolarLine(line, point.y);
                break;
            case Math.PI / 2:
                point.y = getYOnPolarLine(line, point.x);
                break;
            default:
                point.x = getXOnPolarLine(line, point.y);
                point.y = getYOnPolarLine(line, point.x);
        }

        return point;
    });
}

export function summate(arrayLike, handler = value => value) {
    return arrayLike.reduce((sum, value) => {
        return sum + handler(value);
    }, 0);
}

export function getInRange(value, min, max) {
    if (max == null) {
        max = min;
        min = 0;
    }

    const dist = max - min;
    return min + (value % dist + dist) % dist;
}

export function getMinAngleBetween(angle1, angle2) {
    const fullCircle = 2 * Math.PI;
    const angle = getInRange(angle1 - angle2, fullCircle);

    return Math.min(angle, fullCircle - angle);
}

export function lerp(percent, min, max) {
    if (max == null) {
        max = min;
        min = 0;
    }

    return min + (max - min) * percent;
}
