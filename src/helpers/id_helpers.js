import {matches} from 'helpers/regexp_helpers';

const KEY_VALUE_SEPARATOR = ':';
const PAIRS_SEPARATOR = ',';

const regExp = new RegExp(`(\\d+)${KEY_VALUE_SEPARATOR}(\\d+)${PAIRS_SEPARATOR}`);

export function getId(pairs) {
    return pairs.reduce((id, [key, value]) => {
        return `${id}${key}${KEY_VALUE_SEPARATOR}${value}${PAIRS_SEPARATOR}`;
    }, '');
}

export function parseId(id) {
    return [...matches(regExp, id)].map(pair => pair.map(str => parseInt(str)));
}

export function getEdgeId(cellId0, cellId1) {
    return `${cellId0}->${cellId1}`;
}
