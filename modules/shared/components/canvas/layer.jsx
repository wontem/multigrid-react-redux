import React, {PropTypes} from 'react';
import PureComponent from 'shared/components/pure_component';

export default class Layer extends PureComponent {
    static propTypes = {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        devicePixelRatio: PropTypes.number,
    }

    static defaultProps = {
        devicePixelRatio: 1,
    }

    componentDidMount() {
        this.ctx = this.refs.canvas.getContext('2d');
        this.draw();
    }

    componentDidUpdate() {
        this.draw();
    }

    draw() {
        const logLabel = `Draw ${this.constructor.name}`;
        const {width, height, devicePixelRatio} = this.props;
        this.ctx.clearRect(0, 0, width * devicePixelRatio, height * devicePixelRatio);
        this.ctx.save();
        this.ctx.scale(devicePixelRatio, devicePixelRatio);

        console.time(logLabel);
        this.clearAndDraw();
        console.timeEnd(logLabel);

        this.ctx.restore();
    }

    clearAndDraw() {
        // should be implemented in child class
    }

    render() {
        const {width, height, devicePixelRatio} = this.props;

        return (
            <canvas
                style={{width, height}}
                ref="canvas"
                width={width * devicePixelRatio}
                height={height * devicePixelRatio}
            />
        );
    }
}
