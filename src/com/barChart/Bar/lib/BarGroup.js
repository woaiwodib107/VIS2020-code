import React from 'react';
import { stack } from 'd3-shape';
import { scaleLinear, scaleBand } from 'd3-scale';
import { max } from 'd3-array';
import { getColorsGenerator } from './utli';
import Legend from './Legend'
import Axis from './Axis'
import ToolTip from './ToolTip'
import Grid from './Grid'
import { BarGroupPropTypes, BarGroupDefaultProps } from './props';

export default class BarGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltip: {
        display: false,
        data: { key: '', value: '' },
        pos: { x: 0, y: 0 }
      }
    };
    this.generateStyles = this.generateStyles.bind(this);
    this.showToolTip = this.showToolTip.bind(this);
    this.hideToolTip = this.hideToolTip.bind(this);
  }
  showToolTip (e) {
    let target = e.target || e.current.target
    this.setState({
      tooltip: {
        display: true,
        data: {
          key: target.getAttribute('data-key'),
          value: target.getAttribute('data-value'),
          color: target.getAttribute('fill')
        },
        pos: {
          x:
            parseInt(target.getAttribute('x')) +
            (1 / 2) * parseInt(target.getAttribute('width')),
          y:
            parseInt(target.getAttribute('y')) +
            (1 / 2) * parseInt(target.getAttribute('height'))
        }
      }
    });
  }
  hideToolTip () {
    this.setState({
      tooltip: {
        display: false,
        data: { key: '', value: '', color: '' }
      }
    });
  }
  generateStyles(xScale, yScale, getColor) {
    let {
      data,
      layout,
      padding,
    } = this.props;
    let styles = [];
    var keys = [];
    for (var p1 in data[0]) {
      if (p1 !== 'state') keys.push(p1);
    }
    stack()
      .keys(keys)(data)
      .map((datum, i) =>
        datum.map((d, j) => {
          let y = layout === 'horizontal'
                  ? yScale(d.data.state) +
                  ((yScale.bandwidth() - padding) / keys.length) * i +
                  padding / 2
                : yScale(d[1] - d[0]);

          let x = layout === 'horizontal'
                  ? xScale(0)
                  : xScale(d.data.state) +
                    ((xScale.bandwidth() - padding) / keys.length) * i +
                    padding / 2;

          let height = layout === 'horizontal'
                    ? (yScale.bandwidth() - padding) / keys.length
                    : -yScale(d[1] - d[0]) + yScale(0);


          let width =layout === 'horizontal'
                  ? xScale(d[1] - d[0]) -  xScale(0)
                  : (xScale.bandwidth() - padding) / keys.length;

          width = width > 0 ? width : 0;
          height = height > 0 ? height : 0;
          styles.push({
            key: `${d.data.state}-${datum.key}`,
            data: {
              color: getColor(datum),
              data: {
                value: d[1] - d[0],
                id: datum.key,
              }
            },
            style: {
              x: x,
              y: y,
              height: height,
              width: width,
            },
          });
        })
      );
    return styles;
  }

  render() {
    const {
      data,
      width,
      height,
      layout,
      margin,
      colorScheme,
      xTransform,
    } = this.props;
    var keys = [];
    for (var p1 in data[0]) {
      if (p1 !== 'state') keys.push(p1);
    }
    let maxVal, xScale, yScale;

    maxVal = max(data, function(d) {
      let max = 0;
      keys.map(index => {
        if (d[index] > max) max = d[index];
      });
      return max;
    });

    let level = data.map(function(d) {
      return d.state;
    });
    let getColor = getColorsGenerator('key', colorScheme, keys.length);
    if (layout === 'horizontal') {
        xScale = scaleLinear()
          .rangeRound([0, width])
          .domain([0, maxVal * 1.2])
          .nice();
      yScale = scaleBand()
        .range([height, 0])
        .domain(level);
    } else {
      yScale = scaleLinear()
          .rangeRound([0, height])
          .domain([maxVal * 1.2, 0])
          .nice();
      xScale = scaleBand()
        .range([0, width])
        .domain(level);
    }
    xScale = xTransform ? xScale.range(xScale.range().map(d => xTransform.applyX(d))) : xScale;
    let renderData = this.generateStyles(xScale, yScale, getColor)
    let barPart = (
      renderData.map(d=> {
        return (
          <g key={d.key}>
              <rect
              x={d.style.x}
              y={d.style.y}
              width={d.style.width}
              height={d.style.height}
              fill={d.data.color}
              className={`${d.key}`}
              data-key={d.data.data.id}
              data-value={d.data.data.value?d.data.data.value : ''}
              onMouseOver={(e)=>this.showToolTip(e)}
              onMouseLeave={(e)=>this.hideToolTip()}
              />
              </g>
        )
      })
    );

    return (
      <g>
        <Grid
          yScale={yScale}
          width={width}
          height={height}/>
       {barPart} 
       <Axis
          scale={xScale}
          width={width}
          height={height}
          orient={'bottom'}
          transform={
            `translate(0,${height})`}
        />
        <Legend
          keys={keys}
          height={height}
          width={width}
          margin={margin}
          color={getColor}
        /> 
         <ToolTip
          textStyle="tooltip-text"
          bgStyle="tooltip-bg"
          tooltip={this.state.tooltip}
          />
      </g>
    );
  }
}

BarGroup.propTypes = BarGroupPropTypes;
BarGroup.defaultProps = BarGroupDefaultProps;