// @flow
'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

//import AreaSpline from './js/charts/AreaSpline';
import Area from './js/charts/Area';

import Pie from './js/charts/Pie';
import Theme from './js/theme';
import data from './resources/data';

type State = {
  activeIndex: number,
  spendingsPerYear: any
}

export default class App extends Component {

  state: State;

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      spendingsPerYear: data.spendingsPerYear,
    };

  }

  dynamicData() {
    var factor = 0.99;
    var results = [];
    var previousValue = 0;

    for(var i = 0; i < 120; i++) {
      results.push({
        month: i,
        value: factor === 0 ? 0 : factor
      });
      if (factor !== 0) {
        factor += 12;
      }
    }
    return results;
  }

  dynamicDataSet() {
    var results = [];
    var FACTOR = 0.99;

    // the range would be from 0 - 0.999
    for(var i = 0; i < 120; i++) {
      results.push({
        month: i,
        value: i === 0 ? 0 : FACTOR == 0 ? 0 : Math.exp(i * FACTOR) + 16 * i
      })
    }
    return results;
  }

  render() {
    const height = 220;
    const width = 320;

    return (
      <ScrollView>
        <View style={styles.container} >
          <Text style={styles.chart_title}>React Native Plots</Text>
          <View style={{
            flex:1,
            flexDirection: 'row',
            position: 'absolute',
            zIndex: 1,
            top: 20,
            backgroundColor: 'transparent'
          }}>
            <Area
              width={width}
              height={height}
              data={this.dynamicData()}
              color={'#2e2982'} />
          </View>
          <View style={{
            flex:1,
            flexDirection: 'row',
            position: 'absolute',
            top: 20,
            zIndex: 0,
            backgroundColor: 'transparent'
          }}>
            <Area
              width={width}
              height={height}
              data={this.dynamicDataSet()}
              color={Theme.colors[this.state.activeIndex]} />
          </View>
        </View>
      </ScrollView>
    );
  }

}

const styles = {
  container: {
    backgroundColor:'whitesmoke',
    marginTop: 21,
  },
  chart_title : {
    paddingTop: 15,
    textAlign: 'center',
    paddingBottom: 5,
    paddingLeft: 5,
    fontSize: 18,
    backgroundColor:'white',
    color: 'grey',
    fontWeight:'bold',
  }
}
