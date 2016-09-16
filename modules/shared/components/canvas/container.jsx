import React, {PropTypes} from 'react';
import PureComponent from 'shared/components/pure_component';

import './canvas.sass';

export default class CanvasContainer extends PureComponent {
    static propTypes = {
        onWindowResize: PropTypes.func,
    }

    static defaultProps = {
        onWindowResize: Function.prototype,
    }

    componentDidMount() {
        window.addEventListener('resize', this.onWindowResize);
        this.onWindowResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    }

    constructor(props) {
        super(props);

        this.onWindowResize = this.onWindowResize.bind(this);
    }

    // TODO: Smells like a workaround
    onWindowResize() {
        this.props.onWindowResize();
    }

    render() {
        return (
            <div className="canvas-container">
                {this.props.children}
            </div>
        );
    }
}
