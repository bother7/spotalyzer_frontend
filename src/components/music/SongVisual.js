import React from 'react';
import {connect} from 'react-redux'
import {getSongAnalysis} from '../../actions'
import { Group } from '@vx/group'
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import { HeatmapCircle, HeatmapRect } from '@vx/heatmap';
import { extent, min, max } from 'd3-array';
import { AxisLeft, AxisBottom } from '@vx/axis';
import * as pitchConstant from '../data/pitchConstant'
import * as heatmapConstant from '../data/heatmapConstant'
import { Stack } from '@vx/shape'
import {curveBasis} from '@vx/curve'



class SongVisual extends React.Component {
  state = {
    heat: true,
    stream: true
  }

  toggleHeat = (event) => {
    event.preventDefault()
    console.log("hello", this.state)
    this.setState({heat: !this.state.heat})
  }

  toggleStream = (event) => {
    event.preventDefault()
    this.setState({stream: !this.state.stream})
  }


  componentWillReceiveProps(nextProps){
    if (this.props.container === "welcome") {
      this.props.getSongAnalysis(this.props.match.params.id)
    }
  }

  heat () {
    const heatmapData = heatmapConstant.theHeat(this.props.songData)
    const dMin = min(heatmapData, d => min(heatmapConstant.y(d), heatmapConstant.x));
    const dMax = max(heatmapData, d => max(heatmapConstant.y(d), heatmapConstant.x));
    const dStep = dMax / heatmapData[0].bins.length;
    const bWidth = pitchConstant.xMax / heatmapData.length;
    const bHeight = pitchConstant.yMax / heatmapData[0].bins.length;
    const colorMax = max(heatmapData, d => max(heatmapConstant.y(d), heatmapConstant.z));
    const xScale = scaleLinear({
      range: [0, pitchConstant.xMax],
      domain: extent(heatmapData, heatmapConstant.x)
    });
    const yScale = scaleLinear({
      range: [pitchConstant.yMax, 0],
      domain: [dMin, dMax]
    });
    const colorScale = scaleLinear({
      range: ['#c7cbdb', '#021872'],
      domain: [0, colorMax]
    });
    const opacityScale = scaleLinear({
      range: [.1, 1],
      domain: [0, colorMax]
    });
    return (

        <Group top={50}>
          <HeatmapCircle
            data={heatmapData}
            xScale={xScale}
            yScale={yScale}
            colorScale={colorScale}
            opacityScale = {opacityScale}
            radius={4*bWidth}
            step={dStep}
            gap={1}
          />
        </Group>

    )
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
      domain: [-5, 5]
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
    return (
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
  )
}


  render () {
    {
        if (this.props.songData.length > 0 && this.state.heat && this.state.stream) {
            return (<div className="visualize">
            <button className="defButton" onClick={this.toggleHeat}>Timbre Heatmap</button>
            <button className="defButton" onClick={this.toggleStream}>Pitch Stream</button>
            <svg width={pitchConstant.width} height={pitchConstant.height}>
            {this.heat()}{this.stack()}
            </svg>
            </div>)
        } else if (this.props.songData.length > 0 && this.state.heat && !this.state.stream) {
          return (<div className="visualize">
            <button className="defButton" onClick={this.toggleHeat}>Timbre Heatmap</button>
            <button className="defButton" onClick={this.toggleStream}>Pitch Stream</button>
            <svg width={pitchConstant.width} height={pitchConstant.height}>
            {this.heat()}
            </svg>
            </div>)
        } else if (this.props.songData.length > 0 && !this.state.heat && this.state.stream) {
          return (<div className="visualize">
            <button className="defButton" onClick={this.toggleHeat}>Timbre Heatmap</button>
            <button className="defButton" onClick={this.toggleStream}>Pitch Stream</button>
            <svg width={pitchConstant.width} height={pitchConstant.height}>
            {this.stack()}
            </svg>
            </div>)
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
