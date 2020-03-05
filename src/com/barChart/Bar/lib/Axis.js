import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

export default class Axis extends React.PureComponent {
  componentDidUpdate () {
    this.renderAxis();
  }
  componentDidMount () {
    this.renderAxis();
  }
  getAxisOrient (orientation) {
    switch (orientation) {
      case 'left':
        return d3.axisLeft();
      case 'top':
        return d3.axisTop();
      case 'right':
        return d3.axisRight();
      case 'bottom':
        return d3.axisBottom();
    }
  }
  renderAxis () {
    const axis = this.getAxisOrient(this.props.orient)
      .scale(this.props.scale)
      .ticks(5);
    d3.select(this.node)
      .transition()
      .duration(500)
      .call(axis);
  }

  render () {
    return (
      <g
        ref={node => {
          this.node = node;
        }}
        className={this.props.orient}
        transform={this.props.transform}
      >
        <text className="axis-text" x={0} y={-15} textAnchor="end">
          {this.props.text}
        </text>
      </g>
    );
  }
}

Axis.propTypes = {
  scale: PropTypes.func
};