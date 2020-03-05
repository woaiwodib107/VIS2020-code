import React from 'react';
import BarGroup from './lib/BarGroup';
import './index.css'

export default class Bar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const props = this.props;
    const { margin } = this.props;
    const width = props.width - margin.left - margin.right;
    const height = props.height - margin.top - margin.bottom;
    const outerWidth = props.width;
    const outerHeight = props.height;
    return (
      <div>
          <svg
            width={outerWidth}
            height={outerHeight}
            className="bar-chart"
          >
           <g transform={`translate(${margin.left},${margin.top})`}>
            <BarGroup
              {...props}
              width={width}
              height={height}
            />
            </g>
          </svg>
      </div>
    );
  }
}

Bar.defaultProps = {
  margin: {
    left: 30,
    right: 120,
    top: 5,
    bottom: 20,
  },
  width: 300,
  height: 150,
};
