import React, {Component, PropTypes} from 'react';

const INITIAL_POINT = {x: 0, y: 0};

export default class MouseHandler extends Component {
    static propTypes = {
        move: PropTypes.func,
        down: PropTypes.func,
        up: PropTypes.func,
        click: PropTypes.func,
        dragStart: PropTypes.func,
        dragEnd: PropTypes.func,
        drag: PropTypes.func,
    }

    static defaultProps = {
        move: Function.prototype,
        down: Function.prototype,
        up: Function.prototype,
        click: Function.prototype,
        dragStart: Function.prototype,
        dragEnd: Function.prototype,
        drag: Function.prototype,
    }

    fire(action) {
        const handler = this.props[action];
        const args = this.getHandlerArgs(action);
        handler(...args);
    }

    getHandlerArgs(action) {
        const {point, dragPoint, prevPoint} = this.mouseState;

        return {
            move: [point, prevPoint],
            down: [point],
            up: [point],
            click: [point],
            dragStart: [prevPoint],
            dragEnd: [point, dragPoint],
            drag: [point, prevPoint, dragPoint],
        }[action];
    }

    mouseStateDidUpdate(prevState) {
        const previous = prevState;
        const current = this.mouseState;
        const isPressChanged = previous.isPressed !== current.isPressed;
        const isDragChanged = previous.isDrag !== current.isDrag;
        const isPointChanged = previous.point !== current.point;

        if (isPressChanged && current.isPressed) {
            this.fire('down');
        }

        if (isPointChanged) {
            this.fire('move');

            if (current.isDrag) {
                if (current.isDragChanged) {
                    this.fire('dragStart');
                } else {
                    this.fire('drag');
                }
            }
        }

        if (isPressChanged && previous.isPressed) {
            this.fire('up');

            if (isDragChanged && previous.isDrag) {
                this.fire('dragEnd');
            } else {
                this.fire('click');
            }
        }
    }

    getRelativePoint({clientX, clientY}) {
        const {left, top} = this.refs.container.getBoundingClientRect();
        return {
            x: clientX - left,
            y: clientY - top,
        };
    }

    onMouseMove(e) {
        const {point, isPressed, isDrag} = this.mouseState;

        const newStateChunk = {
            prevPoint: point,
            point: this.getRelativePoint(e),
        };

        if (isPressed && !isDrag) {
            Object.assign(newStateChunk, {
                isDrag: true,
                dragPoint: point,
            });
        }

        this.setMouseState(newStateChunk);
    }

    onMouseDown() {
        this.setMouseState({
            isPressed: true,
        });
    }

    onMouseUp() {
        this.setMouseState({
            isPressed: false,
            isDrag: false,
        });
    }

    setMouseState(stateChunk) {
        const prevState = this.mouseState;

        this.mouseState = {
            ...prevState,
            ...stateChunk,
        };

        this.mouseStateDidUpdate(prevState);
    }

    constructor(props) {
        super(props);

        this.mouseState = {
            point: INITIAL_POINT,
            dragPoint: INITIAL_POINT,
            prevPoint: INITIAL_POINT,
            isDrag: false,
            isPressed: false,
        };

        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
    }

    render() {
        return (
            <div
                className="mouse-handler"
                ref="container"
                onMouseMove={this.onMouseMove}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
            >
                {this.props.children}
            </div>
        );
    }
}
