import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
export default class ToolTip extends React.PureComponent {
  render () {
    let visibility = 'hidden';
    let transform = '';
    let x = 0;
    let y = 0;
    let width = 100;
    let height = 30;
    let transformText = 'translate(' + (width / 2 + 5) + ',' + height / 2 + ')';
    let transformArrow = '';

    if (this.props.tooltip.display === true) {
      let position = this.props.tooltip.pos;

      x = position.x;
      y = position.y;
      visibility = 'visible';

      if (y > height) {
        transform = 'translate(' + (x - width / 2) + ',' + (y - height - 20) + ')';
        transformArrow = 'translate(' + (width / 2 - 20) + ',' + (height - 0.2) + ')';
      } else if (y < height) {
        transform = 'translate(' + (x - width / 2) + ',' + (Math.round(y) + 20) + ')';
        transformArrow = 'translate(' + (width / 2 - 20) + ',' + 0 + ') rotate(180,20,0)';
      }
    } else {
      visibility = 'hidden';
    }

    return (
      <g transform={transform}>
        <rect
          className={this.props.bgStyle}
          width={width}
          height={height}
          rx="5"
          ry="5"
          visibility={visibility}
        />
        <polygon
          className={this.props.bgStyle}
          points="10,0  30,0  20,10"
          transform={transformArrow}
          visibility={visibility}
        />
        {this.props.tooltip.data.color && (
          <circle
            fill={this.props.tooltip.data.color}
            cx={width / 11}
            cy={15}
            r={4}
            visibility={visibility}
          />
        )}
        <text visibility={visibility} transform={transformText}>
          <tspan x="0" className={this.props.textStyle} textAnchor="middle" dy="5px">
            {this.props.tooltip.data.key + ' : ' + d3.format(',')(this.props.tooltip.data.value)}
          </tspan>
        </text>
      </g>
    );
  }
}

ToolTip.propTypes = {
  tooltip: PropTypes.object,
  bgStyle: PropTypes.string,
  textStyle: PropTypes.string
};
