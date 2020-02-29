import React from 'react';

export default class Legend extends React.PureComponent {
  render () {
    const { keys, color ,width, height, margin} = this.props;
    const legends = keys.map((d, i) => (
      <g key={d} transform={`translate(${width + 10},-10)`}> 
      <rect x={0} y={height - i * 12} fill={color({key: d})} width ={8} height ={8}/>
        <text x={10} y={height - i * 12} dy={'0.65em'}>
          {d}
        </text>
      </g>
    ));
    return <g className={'legend'}>{legends}</g>;
  }
}