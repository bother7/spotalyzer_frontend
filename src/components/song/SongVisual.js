import React from 'react';
import { scaleLinear} from '@vx/scale';
import { max } from 'd3-array';
import { Stack, AreaClosed } from '@vx/shape';
import {firstsample} from '../sampledata/firstsample'
import { curveNatural } from '@vx/curve'
import { cityTemperature } from '@vx/mock-data';
import { Group } from '@vx/group'


const city = cityTemperature
const sample = firstsample
// const data = appleStock;
const data = sample.segments.map( (item) => {
  return {time: item.start,
    pitch0: item.pitches[0],
    timbre0: item.timbre[0],
    pitch1: item.pitches[1],
    timbre1: item.timbre[1],
    pitch2: item.pitches[2],
    timbre2: item.timbre[2],
    pitch3: item.pitches[3],
    timbre3: item.timbre[3],
    }})

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
const x = d => d.time;
const y = d => d.pitch0;
const curve = curveNatural
const yScale = scaleLinear({
range: [yMax, 0],
domain: [0, max(data, y)],
});
const xScale = scaleLinear({
      range: [0, xMax],
      domain: [0, max(data, x)],
    });
const keys = ["pitch0", "pitch1", "pitch2","pitch3"]

const stack = (<svg width={width} height={height}>
<AreaClosed
  data={data}
  xScale={xScale}
  yScale={yScale}
  x={x}
  y={y}
  strokeWidth={2}
  fill={"red"}
/>
</svg>)


export default class SongVisual extends React.Component {

  render () {
    console.log(city)
    return (stack)
  }

}
