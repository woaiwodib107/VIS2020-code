import PropTypes from 'prop-types';
// import { LegendPropShape } from 'packages/legends';
export const BarGroupPropTypes = {
  // 数据格式
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  // 图表类型
  layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
  mode: PropTypes.oneOf(['stacked', 'group']).isRequired,
  // 其他参数
  padding: PropTypes.number.isRequired,
  isInteractive: PropTypes.bool.isRequired,
  enableGridX: PropTypes.bool.isRequired,
  enableGridY: PropTypes.bool.isRequired,
  labelSkipWidth: PropTypes.number.isRequired,
  labelSkipHeight: PropTypes.number.isRequired,
  enableLabel: PropTypes.bool.isRequired,
  themeScheme: PropTypes.string.isRequired,
  legend: PropTypes.shape({
    dataFrom: PropTypes.oneOf(['indexes', 'keys']),
    // ...LegendPropShape,
  }).isRequired,
  colorScheme: PropTypes.oneOf(['category1', 'category2', 'red', 'blue', 'yellow']).isRequired,
};
export const BarGroupDefaultProps = {
  // 图表类型
  layout: 'vertical',
  mode: 'stacked',
  // 其他参数
  padding: 1,
  tooltipFormat: ',',
  isInteractive: true,
  enableGridX: false,
  enableGridY: false,
  enableLog: false,
  axisLeft: {
    tickCount: 4,
  },
  axisBottom: {
    tickCount: 4,
  },
  labelSkipWidth: 4,
  labelSkipHeight: 4,
  enableLabel: false,
  themeScheme: 'white',
  colorScheme: 'category1',
  legend: {
    dataFrom: 'keys',
    anchor: 'bottom-right',
    direction: 'column',
    justify: false,
    translateX: 120,
    translateY: 0,
    itemsSpacing: 2,
    itemWidth: 100,
    itemHeight: 15,
    itemDirection: 'left-to-right',
    itemOpacity: 0.85,
    symbolShape: 'circle',
    symbolSize: 10,
    effects: [
      {
        on: 'hover',
        style: {
          itemOpacity: 1,
        },
      },
    ],
  },
  margin: {
    left: 100,
    right: 160,
    top: 50,
    bottom: 60,
  },
};
