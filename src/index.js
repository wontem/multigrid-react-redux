import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from 'containers/app';
import store from 'store';

import Immutable from 'immutable';
import installDevTools from 'immutable-devtools';
installDevTools(Immutable);


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.body.querySelector('.container')
);


////////////////////


window.store = store;
import {createGrids} from 'actions/grids_actions';
import {AngleStep} from 'constants/grids_constants';

store.dispatch(createGrids({
    grids: 5,
    lines: 10,
    shift: 0.2,
    angle: AngleStep.AUTO,
}));

import * as Rand from 'mersenne';
window.Rand = Rand;
