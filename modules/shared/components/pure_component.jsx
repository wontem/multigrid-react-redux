import shallowCompare from 'react-addons-shallow-compare';
import {Component} from 'react';

export default class PureComponent extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }
}
