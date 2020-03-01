import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

export default class Grid extends React.PureComponent {
    render () {
       const { width, height, yScale, yValues,format } = this.props;
      //  console.log(yValues)
        // let fliterYvalues = yValues.fliter(d => d%10 === 0)
        const yLines = computeGridLines({
            width,
            height,
            scale: yScale,
            axis: 'y',
            values: yValues,
          })
        return (
            <g>
            {yLines.map((line, index) => (
                <g key={line.key} className={'grid'}>
                    <text x={line.x1} y={line.y1} dx={-15} dy={5}>{format(line.key)}</text>
                    <line {...line}/>
                </g>
              ))}
            </g>
        );
      }
}


const getScaleValues = (scale, tickCount) => {
  //debugger
    if (scale.ticks) return scale.ticks(tickCount);
    return scale.domain();
};
const computeGridLines = ({
    width,
    height,
    scale,
    axis,
    values = getScaleValues(scale,10),
  }) => {
    const position = scale.bandwidth ? centerScale(scale) : scale;
    // console.log(values)
    // let fliterYvalues = values.filter(d => d%10 === 0)
    let lines;
    if (axis === 'x') {
      lines = values
        .map(v => ({
          key: `${v}`,
          x1: position(v),
          x2: position(v),
          y1: 0,
          y2: height,
        }))
        .filter(d => d.x1 >= 0 && d.x1 <= width && d.x2 >= 0 && d.x2 <= width);
    } else if (axis === 'y') {
      lines = values
        .map(v => ({
          key: `${v}`,
          x1: 0,
          x2: width,
          y1: position(v),
          y2: position(v),
        }))
        .filter(d => d.y1 >= 0 && d.y1 <= height && d.y2 >= 0 && d.y2 <= height);
    }
    return lines;
};


  