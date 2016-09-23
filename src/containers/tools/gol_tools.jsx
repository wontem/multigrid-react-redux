import React, {Component} from 'react';
import {Group, String, CheckBox, Button, Display, Number} from 'gui';
import {Text} from 'gui/common';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createSelector} from 'reselect';
import {funargs} from 'mersenne';

import Player from 'components/tools/player';

import {rules, population, randomParams} from 'selectors/gol_selectors';
import {intersections, neighbours} from 'selectors/grids_selectors';
import {randomSeed} from 'selectors/enviroment_selectors';

import {
    setBirth,
    setSurvive,
    setNeighbourhood,
    setRandomSeed,
    setRandomArea,
    setRandomPopulation,
    setNextPopulation,
    clearPopulation,
} from 'actions/gol_actions';

function getNumbersArray(string) {
    return string.split(',').map(v => parseInt(v));
}

function getString(arrayLike) {
    return arrayLike.join(', ');
}

@connect(createSelector(
    [rules, population, intersections, neighbours, randomSeed, randomParams],
    (rules, population, intersections, neighbours, randomSeed, randomParams) => {
        return {
            rules,
            population,
            intersections,
            neighbours,
            randomParams,
            randomSeed,
        };
    }
))
export default class GolTools extends Component {
    constructor(props) {
        super(props);

        this.state = {
            random: funargs.randInt32(props.randomSeed),
        };
    }

    componentWillReceiveProps({randomSeed}) {
        if (randomSeed !== this.props.randomSeed) {
            this.setState({
                random: funargs.randInt32(randomSeed),
            });
        }
    }

    render() {
        const {
            rules,
            population,
            intersections,
            randomParams,
        } = this.props;

        const actions = bindActionCreators({
            setBirth: (string) => {
                return setBirth(getNumbersArray(string));
            },
            setSurvive: (string) => {
                return setSurvive(getNumbersArray(string));
            },
            generate: () => {
                const {rules, population, neighbours} = this.props;
                return setNextPopulation(rules, population, neighbours);
            },
            randomize: () => {
                return setRandomSeed(this.state.random());
            },
            randomFill: () => {
                return setRandomPopulation(intersections, randomParams);
            },
            setNeighbourhood,
            setRandomArea,
            setRandomSeed,
            clearPopulation,
        }, this.props.dispatch);

        return (
            <Group
                label="Game of life"
            >
                <Group
                    label="Rules"
                    expanded
                >
                    <String
                        label="To birth"
                        value={getString(rules.toBirth)}
                        onChange={actions.setBirth}
                    />
                    <String
                        label="To survive"
                        value={getString(rules.toSurvive)}
                        onChange={actions.setSurvive}
                    />
                    <CheckBox
                        label={rules.isNeumannOnly ? 'von Neumann' : 'Moore'}
                        value={rules.isNeumannOnly}
                        onChange={actions.setNeighbourhood}
                    />
                </Group>
                <Group
                    label="Random"
                    expanded
                >
                    <Number
                        label="Area"
                        min={0}
                        max={1}
                        value={randomParams.area}
                        onChange={actions.setRandomArea}
                    />
                    <Number
                        label="Random seed"
                        min={0}
                        step={1}
                        value={randomParams.seed}
                        onChange={actions.setRandomSeed}
                    />
                    <Button
                        label="Randomize"
                        onClick={actions.randomize}
                    />
                    <Button
                        label="Fill"
                        onClick={actions.randomFill}
                    />
                </Group>
                <Player
                    onIteration={actions.generate}
                    expanded
                />
                <Button
                    label="Next generation"
                    onClick={actions.generate}
                />
                <Button
                    label="Clear"
                    onClick={actions.clearPopulation}
                />
                <Display
                    label="Population"
                >
                    <Text>
                        {`${population.length} of ${intersections.size} (${Math.floor(population.length / intersections.size * 100 * 100) / 100}%)`}
                    </Text>
                </Display>
            </Group>
        );
    }
}
