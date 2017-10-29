import React from 'react';
import {connect} from 'react-redux'
import {getSongAnalysis} from '../../actions'
import { Group } from '@vx/group'
import { scaleBand, scaleLinear, scaleOrdinal, schemeCategory20b } from '@vx/scale';
import { HeatmapCircle, HeatmapRect } from '@vx/heatmap';
import { extent, min, max } from 'd3-array';
import { AxisLeft, AxisBottom } from '@vx/axis';
import * as pitchConstant from '../data/pitchConstant'
import * as heatmapConstant from '../data/heatmapConstant'
import { Stack, Line } from '@vx/shape'
import {curveBasis} from '@vx/curve'
import { withTooltip, Tooltip } from '@vx/tooltip';
import { localPoint } from '@vx/event';



class SongVisual extends React.Component {
  state = {
    heat: false,
    stream: true,
    tooltipOpen: false,
    tooltipLeft: 0,
    tooltipTop: 0,
    tooltipData: null,
    vertLineLeft: 0,
    seconds: 0
  }

  handleTooltip = (event, xScale ) => {
      const { x, y } = localPoint(event) ;
      const x0 = xScale.invert(x);
      this.setState({vertLineLeft: x, tooltipLeft: x, tooltopTop: localPoint(event).y, seconds: x0})
    }

  toggleHeat = (event) => {
    event.preventDefault()
    this.setState({heat: !this.state.heat})
  }

  toggleStream = (event) => {
    event.preventDefault()
    this.setState({stream: !this.state.stream})
  }

  renderToolTip = () => {
    return (          <div>
              <Tooltip
                top={this.state.tooltipTop + 600}
                left={14}
                style={{
                  backgroundColor: '#242D49',
                  color: 'white',
                  font: 'Raleway',
                }}
                >      <div>
             {`${this.secondsString()}`}
          </div>
        </Tooltip>
                </div>)
  }

  secondsString = () => {
    let total = this.state.seconds

    return `${parseInt(total/60)}:${(total % 60).toFixed(2)}`
  }

  componentWillReceiveProps(nextProps){
    console.log(this.props)
    if (this.props.container === "welcome" && !this.props.history.location.pathname.startsWith("/demo")) {
      this.props.getSongAnalysis(this.props.match.params.id)
    }
  }


  heat (opacity) {
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
    const colorScale = scaleOrdinal({
      range: [
      //   '#ffef96',
      // '#50394c',
      // '#b2b2b2',
      // '#f4e1d2',
      // '#936676',
      // '#36486b',
      // '#4040a1',
      // '#618685',
      // '#242D49'
      '#242D49',
      '#666666',
      '#936676',
      '#333333',
      '#142238',
      '#FEF5E3',
      '#555964',
      '#592537',
      '#A0A0AC',
      '#000A56',
    ],
      domain: [0, colorMax]
    });
    // const colorScale = scaleLinear({
    //   range: ['#c7cbdb', '#021872'],
    //   domain: [0, colorMax]
    // });
    const opacityScale = scaleLinear({
      range: [.25, opacity],
      domain: [0, colorMax]
    });
    const events = false
    return (

        <Group top={80} left={pitchConstant.margin.left}>
          <HeatmapCircle

            data={heatmapData}
            xScale={xScale}
            yScale={yScale}
            colorScale={colorScale}
            opacityScale = {opacityScale}
            radius={bHeight/2.5}
            step={dStep}
            gap={2}
          />
        </Group>

    )
  }

  stack(opacity) {
    const data = this.props.songData.map( (item) => {
      return {time: item.start, pitch0: item.pitches[0], pitch1: item.pitches[1], pitch2: item.pitches[2], pitch3: item.pitches[3], pitch4: item.pitches[4], pitch5: item.pitches[5],
        pitch6: item.pitches[6], pitch7: item.pitches[7], pitch8: item.pitches[8], pitch9: item.pitches[9], pitch10: item.pitches[10], pitch11: item.pitches[11]
        }})

    const yScale = scaleLinear({
      range: [pitchConstant.yMax, 0],
      domain: [-6, 6]
    });

    const xScale = scaleLinear({
          range: [0, pitchConstant.xMax],
          domain: [0, max(data, pitchConstant.x)]
        })

    const zScale = scaleOrdinal({
      domain: pitchConstant.keys,
      range: [
        '#242D49',
        '#EFEFEF',
        '#666666',
        '#936676',
        '#333333',
        '#142238',
        '#FEF5E3',
        '#555964',
        '#592537',
        '#A0A0AC',
        '#FEF9EF',
        '#000A56',

        // '#A0A0AC',
        // '#9393A1',
        // '#868696',
        // '#79798B',
        // '#6C6C80',
        // '#5F5F75',
        // '#52526B',
        // '#454560',
        // '#383855',
        // '#2B2B4A',
        // '#1E1E3F',
        // '#242D49'
      ],
    })
    return (
    <Group top={pitchConstant.margin.top+30} left={pitchConstant.margin.left}>

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
                    <g key={`series-${series.key}`} >
                      <path d={path(series)}  fill={zScale(series.key)} fillOpacity={opacity.toString()}/>
                      <path
                        onMouseOver={event => this.handleTooltip(event, xScale)}
                        d={path(series)}
                         fill={zScale(series.key)} fillOpacity={opacity.toString()}
                        />
                    </g>
                  );
                });
              }}

  /></Group>
  )
}


  render () {
    const leftStyle = {position:"fixed",left:'170px',top:'49px'}
    const rightStyle = {position:"fixed",left:'280px',top:'49px'}
    {
        if (this.props.songData.length > 0 && ((this.state.heat && this.state.stream) || (!this.state.heat && !this.state.stream))) {
            return (<div className="visualize">
            <button className="defButton" onClick={this.toggleHeat} style={leftStyle}>Timbre Heatmap</button>
            <button className="defButton" onClick={this.toggleStream} style={rightStyle}>Pitch Stream</button>
            <svg width={pitchConstant.width} height={pitchConstant.height}>
            {this.heat(0.5)}{this.stack(0.3)}
            <Line
            from={{ x: this.state.vertLineLeft, y: 30 }}
            to={{ x: this.state.vertLineLeft, y: 3.2*pitchConstant.yMax}}
            stroke="#242D49"
            strokeWidth={1.5}
            style={{ pointerEvents: 'none' }}
            strokeDasharray="12,2"
            />
            </svg>
            {this.renderToolTip()}
            </div>)
        } else if (this.props.songData.length > 0 && this.state.heat && !this.state.stream) {
          return (<div className="visualize">
          <button className="defButton" onClick={this.toggleHeat} style={leftStyle}>Timbre Heatmap</button>
          <button className="defButton" onClick={this.toggleStream} style={rightStyle}>Pitch Stream</button>
            <svg width={pitchConstant.width} height={pitchConstant.height}>
            {this.heat(0.9)}
            </svg>
            </div>)
        } else if (this.props.songData.length > 0 && !this.state.heat && this.state.stream) {
          return (<div className="visualize"  >
          <button className="defButton" onClick={this.toggleHeat} style={leftStyle}>Timbre Heatmap</button>
          <button className="defButton" onClick={this.toggleStream} style={rightStyle}>Pitch Stream</button>
            <svg width={pitchConstant.width} height={pitchConstant.height} >
            {this.stack(0.5)}
        <Line
        from={{ x: this.state.vertLineLeft, y: 30 }}
        to={{ x: this.state.vertLineLeft, y: 3.2*pitchConstant.yMax}}
        stroke="#242D49"
        strokeWidth={1.5}
        style={{ pointerEvents: 'none' }}
        strokeDasharray="12,2"
        />
        </svg>
            {this.renderToolTip()}
            </div>)
        } else {
      return (<div className="visualize">Loading</div>)
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



export default connect(mapStateToProps, mapDispatchToProps)(withTooltip(SongVisual))
