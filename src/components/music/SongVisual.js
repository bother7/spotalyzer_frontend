import React from 'react';
import { scaleLinear, scaleOrdinal} from '@vx/scale';
import { max, min } from 'd3-array';
import { Stack } from '@vx/shape';
import { curveBasis} from '@vx/curve'
import { Group } from '@vx/group'
import { AxisLeft, AxisBottom } from '@vx/axis';
import * as pitchConstant from '../data/pitchConstant'
import {connect} from 'react-redux'
import {getSongAnalysis} from '../../actions'





class SongVisual extends React.Component {


  componentWillReceiveProps(nextProps){
    if (this.props.container === "welcome") {
      this.props.getSongAnalysis(this.props.match.params.id)
    }
  }

  stack() {
    const data = this.props.songData.map( (item) => {
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
      domain: [-7, 7]
    });

    const xScale = scaleLinear({
          range: [0, pitchConstant.xMax],
          domain: [0, max(data, pitchConstant.x)]
        })

    const zScale = scaleOrdinal({
      domain: pitchConstant.keys,
      range: [
        // '#B9BFC1',
        // '#5D677A',
        // '#A9B0B5',
        // '#4E586E',
        // '#9AA1A9',
        // '#3F4963',
        // '#8B939D',
        // '#303B57',
        // '#7C8492',
        // '#212C4B',
        // '#6D7586',
        // '#121E40',
        '#A0A0AC',
        '#9393A1',
        '#868696',
        '#79798B',
        '#6C6C80',
        '#5F5F75',
        '#52526B',
        '#454560',
        '#383855',
        '#2B2B4A',
        '#1E1E3F',
        '#121235'
      ],
    })
    // <AxisLeft
    //    scale={yScale}
    //    top={0}
    //    left={0}
    //    stroke={'#1b1a1e'}
    //    tickTextFill={'#1b1a1e'}
    //  />
    // <AxisBottom
    //        scale={xScale}
    //        top={pitchConstant.yMax}
    //        stroke={'#1b1a1e'}
    //        tickTextFill={'#1b1a1e'}
    //      />
    return (<svg width={pitchConstant.width} height={pitchConstant.height}>
    <Group top={pitchConstant.margin.top} left={pitchConstant.margin.left}>

  <Stack
    keys={pitchConstant.keys}
    curve={curveBasis}
    data={data}
    offset="silhouette"
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
}


  render () {
    {if (this.props.songData.length > 1) {
      return (<div className="visualize">{this.stack()}</div>)
    } else {
      return (<div className="visualize">nothing</div>)
    }
    }
  }

}


function mapStateToProps(state) {
  return {
    songData: state.songs.songData,
    container: state.songs.container
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getSongAnalysis: (id) => {
      dispatch(getSongAnalysis(id))
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(SongVisual)
