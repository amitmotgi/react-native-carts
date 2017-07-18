import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ART,
} from 'react-native';

const {
  Surface,
  Group,
  Rectangle,
  ClippingRectangle,
  LinearGradient,
  Shape,
} = ART;

import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as format from 'd3-format';
import * as axis from 'd3-axis';
import * as ease from 'd3-ease';

import {
    scaleBand,
    scaleLinear
} from 'd3-scale';

type Props = {
  height: number,
  width: number,
  color: any,
  data: any
};

const d3 = {
  scale,
  shape,
  format,
  axis,
};

const margin = 20;

class Area extends React.Component {

  constructor(props: Props) {
    super(props);
    this._createArea = this._createArea.bind(this);
    this._Xvalue = this._Xvalue.bind(this);
    this._Yvalue = this._Yvalue.bind(this);
    this._label = this._label.bind(this);
  }

  //TODO: expose this methods as part of the AreaSpline interface.
  _Yvalue(item, index) { return -item.value; }

  //TODO: expose this methods as part of the AreaSpline interface.
  _Xvalue(item, index) { return index * 65; }

  //TODO: expose this methods as part of the AreaSpline interface.
  _label(item, index) { return item.name; }

  // method that transforms data into a svg path (should be exposed as part of the AreaSpline interface)
  _createArea() {
    var that = this;
    var area = d3.shape.area()
        .x(function(d, index) { console.log("d >>> ", d); return that._Xvalue(d, index); })
        .y1(function(d, index) { return that._Yvalue(d, index); })
        .curve(d3.shape.curveBasis)
        (this.props.data)

    // console.debug(`area: ${JSON.stringify(area)}`);

    return { path : area };
  }

  render() {
    const x = margin;
    const y = this.props.height - margin;
    var graph = this._createArea();

    return (
      <View width={this.props.width} height={this.props.height}>
        <Surface width={this.props.width} height={this.props.height}>
           <Group x={x} y={y}>
             <Shape
               d={graph.path}
               stroke={this.props.color}
               fill={this.props.color}
             />
           </Group>
        </Surface>
      </View>
    );
  }

}

export default Area;
