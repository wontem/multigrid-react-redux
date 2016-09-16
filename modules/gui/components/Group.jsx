import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';

export default class Group extends Component {
    static propTypes = {
        label: PropTypes.string,
        expanded: PropTypes.bool,
        disabled: PropTypes.bool,
        color: PropTypes.string,
    }

    static defaultProps = {
        disabled: false,
    }

    constructor(props) {
        super(props);

        this.state = {
            expanded: !!this.props.expanded,
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        if (this.props.disabled) {
            return;
        }

        this.setState({
            expanded: !this.state.expanded,
        });
    }

    render() {
        const {expanded} = this.state;
        const {label, color} = this.props;
        let colorBlock;

        if (color) {
            colorBlock = (
                <div
                    className="color"
                    style={{
                        backgroundColor: color,
                    }}
                ></div>
            );
        }

        return (
            <div className={classNames('group', {expanded})}>
                <div className="head"
                    onClick={this.toggle}
                >
                    {colorBlock}
                    <div>
                        {label}
                    </div>
                </div>
                <div className="items">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
