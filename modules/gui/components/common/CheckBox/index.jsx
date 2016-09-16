import React, {Component} from 'react';
import classNames from 'classnames';

export default class CheckBox extends Component {
    render() {
        const {
            inputValue,
            onChange,
        } = this.props;

        return (
            <div className={classNames('checkbox', {checked: inputValue})}
                onClick={() => onChange(!inputValue)}
            >
                <div className="flag"></div>
            </div>
        );
    }
}
