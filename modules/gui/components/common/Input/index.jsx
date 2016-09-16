import React, {Component} from 'react';
import classNames from 'classnames';

export default class Input extends Component {
    static defaultProps = {
        type: 'text',
        isValid: true,
    }

    handleKeyDown(e) {
        if (e.keyCode === 13) {
            this.props.onConfirm();
        }
    }

    render() {
        const {
            isValid,
            inputValue,
            onChange,
        } = this.props;

        return (
            <input
                className={classNames('input', {invalid: !isValid})}
                value={inputValue}
                size={1}
                onChange={e => onChange(e.target.value)}
                onKeyDown={e => this.handleKeyDown(e)}
                onBlur={this.props.onBlur}
            />
        );
    }
}
