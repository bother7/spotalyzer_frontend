import React from 'react';
import { Bar } from '@vx/shape';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { appleStock } from '@vx/mock-data';
import { scaleTime, scaleLinear } from '@vx/scale';
import { extent, max } from 'd3-array';
import { AreaClosed } from '@vx/shape';
import { Group } from '@vx/group';



const data = appleStock;
const width = 750;
const height = 400;
const margin = {
top: 60,
bottom: 60,
left: 80,
right: 80,
};
const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;
const x = d => new Date(d.date); // d.date is unix timestamps
const y = d => d.close;
const xScale = scaleTime({
range: [0, xMax],
domain: extent(data, x)
});
const yScale = scaleLinear({
range: [yMax, 0],
domain: [0, max(data, y)],
});

const chart = (
<svg width={width} height={height}>
  <Group top={margin.top} left={margin.left}>
<AxisBottom
  scale={xScale}
  top={yMax}
  label={'Years'}
  stroke={'#1b1a1e'}
  tickTextFill={'#1b1a1e'}
/>


  <AxisLeft
  scale={yScale}
  top={0}
  left={0}
  label={'Close Price ($)'}
  stroke={'#1b1a1e'}
  tickTextFill={'#1b1a1e'}
/>
    <AreaClosed
      data={data}
      xScale={xScale}
      yScale={yScale}
      x={x}
      y={y}
      fill={"red"}
    />
  </Group>
</svg>
)


export default class SongVisual extends React.Component {

  render () {
    return (chart)
  }

}
