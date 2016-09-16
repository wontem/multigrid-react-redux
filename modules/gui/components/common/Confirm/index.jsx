import React, {Component} from 'react';
import classNames from 'classnames';

export default class Confirm extends Component {
    render() {
        const {onConfirm, onDiscard, isChanged} = this.props;

        return (
            <div className="confirmation">
                <div className="accept"
                    onClick={onConfirm}
                >
                    <div className={classNames('indicator', {active: isChanged})}></div>
                </div>
                <div
                    className="discard"
                    onClick={onDiscard}
                >
                    <div className={classNames('indicator', {active: isChanged})}></div>
                    <div className="current-value">{this.props.children}</div>
                </div>
            </div>
        );
    }
}
