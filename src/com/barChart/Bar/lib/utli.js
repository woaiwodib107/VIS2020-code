import { scaleOrdinal, scaleSequential } from 'd3-scale';
import { interpolate, quantize } from 'd3-interpolate';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
export const sequentialColorSchemes = {
  red: ['#ffb3b9', '#ff6674', '#ff0a20'],
  blue: ['#b3d1ff', '#66a3ff', '#1774ff'],
  yellow: ['#ffeab3', '#ffd666', '#ffba00'],
};
export const categoricalColorSchemes = {
    category1: [
      '#dd6b66',
      '#759aa0',
      '#eedd78',
      '#7289ab',
      '#73a373',
      '#ea7e53',
      '#8dc1a9',
      '#73b9bc',
      '#e69d87',
    ],
    category2: [
      '#F47560',
      '#E8C1A0',
      '#F1E15A',
      '#E8A838',
      '#61CDBB',
      '#A7CFE4',
      '#4EAAA0',
      '#AF8880',
      '#9676B9',
    ],
  };
export const getColorsGenerator = (colorBy, colorScheme, size = 9) => {
    let getColor = colorBy ? d => d[colorBy] : d => d; // colorBy为取色比例尺根据哪个字段来确定颜色， 比如每条数据id不同， 可以用id来确定颜色； 如果有需求想用0,1,2,3这样的index来获取颜色 colorBy参数就传入null,输入的序号从0开始
    let scale;
    if (isString(colorScheme)) {
      if (categoricalColorSchemes[colorScheme]) {
        scale = scaleOrdinal(categoricalColorSchemes[colorScheme]);
        scale.type = 'ordinal';
      } else if (sequentialColorSchemes[colorScheme]) {
        let interpolator = interpolate(
          sequentialColorSchemes[colorScheme][0],
          sequentialColorSchemes[colorScheme][2]
        );
        let quantizeColors = quantize(interpolator, size);
        scale = scaleOrdinal(quantizeColors);
        scale.type = 'ordinal';
      } else {
        return () => colorScheme;
      }
    } else if (isArray(colorScheme)) {
      scale = scaleOrdinal(colorScheme);
      scale.type = 'ordinal';
    } else {
      throw new Error(`Unable to generate a color scale from '${colorScheme}',\n`);
    }
    let rangeLenth = scale.range().length;
    scale = colorBy ? scale : scale.domain(Array.from({ length: rangeLenth }, (v, k) => k));
    const colorGenerator = d => scale(getColor(d));
    colorGenerator.type = scale.type;
  
    return colorGenerator;
  };
  