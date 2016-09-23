import {checkNamespace} from 'key_mirror';
import {NAMESPACE as gridsNS} from 'constants/grids_constants';

import {clear as resetAnts} from 'actions/ant_actions';
import {clearPopulation as resetGol} from 'actions/gol_actions';

const resetTools = () => next => action => {
    let result = next(action);

    if (checkNamespace(gridsNS)) {
        result = next(resetAnts());
        result = next(resetGol());
    }

    return result;
};

export default resetTools;
