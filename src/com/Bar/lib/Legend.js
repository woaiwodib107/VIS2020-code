import React from 'react';

export default class Legend extends React.PureComponent {
  render () {
    const { keys, color } = this.props;
    const legends = keys.map((d, i) => (
      <g key={d} transform={'translate(15,-10)'}> 
      <circle cx={i * 55 } cy={20} fill={color({key: d})} r={5} />
        <text x={i * 55 + 8} y={20} dy={'0.35em'}>
          {d}
        </text>
      </g>
    ));
    return <g className={'legend'}>{legends}</g>;
  }
}