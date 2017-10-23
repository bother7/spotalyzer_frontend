import React from 'react';
import { scaleLinear, scaleOrdinal} from '@vx/scale';
import { max, min } from 'd3-array';
import { Stack } from '@vx/shape';
import {firstsample} from '../data/firstsample'
import { curveBasis } from '@vx/curve'
import { Group } from '@vx/group'
import { AxisLeft, AxisBottom } from '@vx/axis';
import * as pitchConstant from '../data/pitchConstant'
import {connect} from 'react-redux'

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
    pitch11: item.pitches[11]
    }})



const yScale = scaleLinear({
  range: [pitchConstant.yMax, 0],
  domain: [-5, 5],
});

const xScale = scaleLinear({
      range: [0, pitchConstant.xMax],
      domain: [0, max(data, pitchConstant.x)/4]
    })

const zScale = scaleOrdinal({
  domain: pitchConstant.keys,
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

const stack = () => (<svg width={pitchConstant.width} height={pitchConstant.height}>
  <Group top={pitchConstant.margin.top} left={pitchConstant.margin.left}>
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
          top={pitchConstant.yMax}
          label={'Seconds'}
          stroke={'#1b1a1e'}
          tickTextFill={'#1b1a1e'}
        />
<Stack
  keys={pitchConstant.keys}
  curve={curveBasis}
  data={data}
  offset="wiggle"
  order="insideout"
  x={d => xScale(pitchConstant.x(d.data))}
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




class SongVisual extends React.Component {



  render () {
    {if (this.props.songData.length > 1) {
      return (stack())
    } else {
      return (<p>nothing</p>)
    }
    }
  }

}

function mapStateToProps(state) {
  return {
    songData: state.songs.songData
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}



export default connect(mapStateToProps, mapDispatchToProps)(SongVisual)
