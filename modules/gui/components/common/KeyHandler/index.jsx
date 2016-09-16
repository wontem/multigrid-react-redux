import React, {Component} from 'react';
import classNames from 'classnames';

export default class KeyHandler extends Component {
    static defaultProps = {
        handler: Function.prototype,
        filter: () => true,
    }

    constructor(props) {
        super(props);

        this.state = {
            active: false,
            currentKeyCodes: [],
        };

        this.toggle = this.toggle.bind(this);
        this.activate = this.activate.bind(this);
        this.deactivate = this.deactivate.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    activate() {
        this.setState({
            active: true,
            currentKeyCodes: [],
        });
    }

    deactivate() {
        this.setState({
            active: false,
            currentKeyCodes: [],
        });
    }

    toggle() {
        if (this.state.active) {
            this.deactivate();
        } else {
            this.activate();
        }
    }

    handleKeyDown(e) {
        const {filter, handler} = this.props;

        if (filter(e.keyCode)) {
            this.setState({
                currentKeyCodes: [...this.state.currentKeyCodes, e.keyCode],
            }, () => {
                handler(this.state.currentKeyCodes);
            });
        }

        e.preventDefault();
    }

    render() {
        const {active} = this.state;

        return (
            <div
                className={classNames('key-handler', {active})}
                tabIndex="-1"
                onKeyDown={this.handleKeyDown}
                onClick={this.toggle}
                onBlur={this.deactivate}
            >
                {active ? 'Listening...' : 'Click to listen'}
            </div>
        );
    }
}
