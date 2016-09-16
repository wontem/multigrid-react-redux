import React, {Component} from 'react';
import classNames from 'classnames';

export default class Select extends Component {
    static defaultProps = {
        expanded: false,
        onBlur: Function.prototype,
        onHeadClick: Function.prototype,
    }

    getHeaderLabel() {
        const {selected, values} = this.props;

        switch (selected.size) {
            case 0:
                return 'Select...';
            default:
                return [...selected].map(key => values[key]).join(', ');
        }
    }

    render() {
        const {
            expanded,
            values,
            selected,
            headLabel,
            onChange,
            onHeadClick,
            onBlur,
        } = this.props;
        let list;

        if (expanded) {
            const items = Object.keys(values).map(key => {
                const label = values[key];
                return (
                    <div
                        className={classNames('item', {selected: selected.has(key)})}
                        key={key}
                        onClick={() => onChange(key)}
                    >{label}</div>
                );
            });

            list = (
                <div className="items">
                    {items}
                </div>
            );
        }


        return (
            <div
                className="select"
                tabIndex="-1"
                onBlur={onBlur}
            >
                <div
                    className="head"
                    onClick={onHeadClick}
                >{this.getHeaderLabel()}</div>
                {list}
            </div>
        );
    }
}
