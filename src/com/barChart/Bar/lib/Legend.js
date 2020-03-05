import React from 'react';

export default class Legend extends React.PureComponent {
  numberToExponential(d){
    let _index = d.lastIndexOf('-')
    if(_index != -1){
       let d0 = d.substring(0,_index-1)
    let d1 = d.substring(_index + 1)
    return `${Number(d0).toPrecision(2)}-${Number(d1).toPrecision(2)}`
    }
    return d
  }
  render () {
    const { keys, color ,width, height, margin} = this.props;
    const legends = keys.map((d, i) => (
      <g key={d} transform={`translate(${width + 10},-10)`}> 
      <rect x={0} y={height - i * 12} fill={color({key: d})} width ={8} height ={8}/>
        <text x={10} y={height - i * 12} dy={'0.65em'}>
          {this.numberToExponential(d)}
        </text>
      </g>
    ));
    return <g className={'legend'}>{legends}</g>;
  }
}