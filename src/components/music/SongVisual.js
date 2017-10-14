import React from 'react';
import { scaleLinear, scaleOrdinal} from '@vx/scale';
import { max, min } from 'd3-array';
import { Stack } from '@vx/shape';
import {firstsample} from '../data/firstsample'
import { curveBasis } from '@vx/curve'
import { Group } from '@vx/group'
import { AxisLeft, AxisBottom } from '@vx/axis';


const sample = firstsample

const data = sample.segments.map( (item) => {
  return {time: item.start,
    pitch0: item.pitches[0],
    pitch1: item.pitches[1],
    pitch2: item.pitches[2],
    pitch3: item.pitches[3],
    pitch4: item.pitches[4],
    pitch5: item.pitches[5],
    pitch6: item.pitches[6],
    pitch7: item.pitches[7],
    pitch8: item.pitches[8],
    pitch9: item.pitches[9],
    pitch10: item.pitches[10],
    pitch11: item.pitches[11],
    }})

const width = 500;
const height = 300;
const margin = {
top: 60,
bottom: 60,
left: 80,
right: 80,
};
const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;
const x = d => d.time;
const y = d => Math.max(d.pitch0,d.pitch1,d.pitch2,d.pitch3,d.pitch4,d.pitch5,d.pitch6,d.pitch7,d.pitch8,d.pitch9,d.pitch10,d.pitch11);
const yScale = scaleLinear({
range: [yMax, 0],
domain: [-5, 5],
});
const xScale = scaleLinear({
      range: [0, xMax],
      domain: [0, max(data, x)/4],
    });
const keys = ["pitch0", "pitch1", "pitch2", "pitch3","pitch4","pitch5","pitch6","pitch7","pitch8","pitch9","pitch10","pitch11"]
const zScale = scaleOrdinal({
  domain: keys,
  range: [
    '#fc8f71',
    '#f7fc70',
    '#fcdb70',
    '#95fc70',
    '#70fcd2',
    '#77fc70',
    '#70fcf9',
    '#7097fc',
    '#ba70fc',
    '#fc70e4',
    '#fc70af',
  ],
})


const stack = (<svg width={width} height={height}>
  <Group top={margin.top} left={margin.left}>
  <AxisLeft
     scale={yScale}
     top={0}
     left={0}
     label={'Pitch'}
     stroke={'#1b1a1e'}
     tickTextFill={'#1b1a1e'}
   />
   <AxisBottom
          scale={xScale}
          top={yMax}
          label={'Seconds'}
          stroke={'#1b1a1e'}
          tickTextFill={'#1b1a1e'}
        />
<Stack
  keys={keys}
  curve={curveBasis}
  data={data}
  offset="wiggle"
  order="insideout"
  x={d => xScale(x(d.data))}
  y0={d => yScale(d[0])}
  y1={d => yScale(d[1])}
  render={({ seriesData, path }) => {
              return seriesData.map((series, i) => {
                return (
                  <g key={`series-${series.key}`}>
                    <path d={path(series)} fill={zScale(series.key)} />
                    <path
                      d={path(series)}
                      fill={zScale(series.key)}
                    />
                  </g>
                );
              });
            }}

/></Group>
</svg>)


export default class SongVisual extends React.Component {

  render () {
    // console.log(data)
    return (stack)
  }

}
