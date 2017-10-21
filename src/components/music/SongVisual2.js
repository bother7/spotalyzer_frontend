import React from 'react';
import { scaleLinear, scaleOrdinal} from '@vx/scale';
import { max, min } from 'd3-array';
import { Stack } from '@vx/shape';
// import {firstsample} from '../data/firstsample'
import { curveBasis } from '@vx/curve'
import { Group } from '@vx/group'
import { AxisLeft, AxisBottom } from '@vx/axis';
import {connect} from 'react-redux'


// const sample = firstsample
class SongVisual extends React.Component {


getData = () => {
  if (this.props.songData.length > 0) {
    return this.props.songData.segments.map( (item) => {
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
      }
    })
  }
}

x = d => d.time;
y = d => Math.max(d.pitch0,d.pitch1,d.pitch2,d.pitch3,d.pitch4,d.pitch5,d.pitch6,d.pitch7,d.pitch8,d.pitch9,d.pitch10,d.pitch11);
yScale = () => {return (scaleLinear({
  range: [this.yMax, 0],
  domain: [-5, 5],
  }))
}
xScale = (xMax) => {return scaleLinear({
  range: [0, xMax],
  domain: [0, max(this.getData(), this.x)/4],
  });
}
zScale = (keys) => {scaleOrdinal({
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
    '#fc70af'
    ],
  })
}

stack = () => {
  let width = 500;
  let height = 300;
  let margin = {
  top: 60,
  bottom: 60,
  left: 80,
  right: 80,
  };
  let xMax = width - margin.left - margin.right;
  let yMax = height - margin.top - margin.bottom;
  let keys = ["pitch0", "pitch1", "pitch2", "pitch3","pitch4","pitch5","pitch6","pitch7","pitch8","pitch9","pitch10","pitch11"]

  return (<svg width={this.width} height={this.height}>
  <Group top={margin.top} left={margin.left}>
  <AxisLeft
     scale={this.yScale(this.yMax)}
     top={0}
     left={0}
     label={'Pitch'}
     stroke={'#1b1a1e'}
     tickTextFill={'#1b1a1e'}
   />
   <AxisBottom
          scale={this.xScale(this.xMax)}
          top={this.yMax}
          label={'Seconds'}
          stroke={'#1b1a1e'}
          tickTextFill={'#1b1a1e'}
        />
<Stack
  keys={this.keys}
  curve={this.curveBasis}
  data={this.getData()}
  offset="wiggle"
  order="insideout"
  x={d => this.xScale(this.x(d.data))}
  y0={d => this.yScale(d[0])}
  y1={d => this.yScale(d[1])}
  render={({ seriesData, path }) => {
              return seriesData.map((series, i) => {
                return (
                  <g key={`series-${series.key}`}>
                    <path d={path(series)} fill={this.zScale(keys)(series.key)} />
                    <path
                      d={path(series)}
                      fill={this.zScale(keys)(series.key)}
                    />
                  </g>
                );
              });
            }}

/></Group>
</svg>)
}



  render () {
    return (this.stack())
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
