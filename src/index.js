import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const BREAK = "Break"
const SESSION = "Session"

class App extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      break: 5,
      session: 25,
      timer: 25*60,
      play: false,
      timeLabel: SESSION,
      intervalID: ''
    }
    this.modifyBreakLength = this.modifyBreakLength.bind(this);
    this.modifySessionLength = this.modifySessionLength.bind(this);
    this.handlePlayPause = this.handlePlayPause.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
 this.countDown = this.countDown.bind(this);
    this.stopCountDown = this.stopCountDown.bind(this);
    this.changeLabelTimer = this.changeLabelTimer.bind(this);
  }
  modifyBreakLength(value) {
    if(!this.state.play) {
        this.setState({break: this.state.break + value });
    }
  }
    modifySessionLength(value) {
      console.log(this.state.intervalID)
      if(this.state.intervalID) {
        this.stopCountDown();
      } 
          this.setState({session: this.state.session + value, timer: (this.state.session+value)*60, play: false });
  }

  handlePlayPause() {
    if(this.state.play) {
      this.setState({play: false})
      this.stopCountDown()
    } else {
      this.setState({play: true})
      this.countDown()
    }
  }
  countDown() {
               this.setState({intervalID: setInterval(() => {
                 if(this.state.timer > 0) {
                     this.setState({timer: this.state.timer - 1})
                 } else {
                   const beep = document.getElementById("beep")
                   beep.currentTime = 0
                   beep.play()
                   this.changeLabelTimer()
                 }

}, 1000)
  }) 
  }
  
  stopCountDown() {
    clearInterval(this.state.intervalID)
  }
  
  changeLabelTimer () {
    if(this.state.timeLabel == SESSION) {
      this.setState({timer: this.state.break*60, timeLabel: BREAK})
    } else {
            this.setState({timer: this.state.session*60, timeLabel: SESSION})
    }
  }
  
  handleRefresh() {
        if(this.state.intervalID) {
      this.stopCountDown();
                         const beep = document.getElementById("beep")
               console.log(beep)
                  beep.pause()
                 beep.currentTime = 0 
    }
 this.setState({
      break: 5,
      session: 25,
      timer: 1500,
      play: false,
      timeLabel: SESSION,
      intervalID: ''
    })
  }
  render() {
    return (
      <div id="clock">
         <div id="length-painel">
          <BreakSide modifyBreakLength={this.modifyBreakLength} break={this.state.break}/>
          <SessionSide 
           modifySessionLength={this.modifySessionLength} session={this.state.session}/>
         </div>
        <Timer handlePlayPause={this.handlePlayPause} handleRefresh={this.handleRefresh} timer={this.state.timer} timeLabel={this.state.timeLabel}/>
       </div >
    )
  }
}

class BreakSide extends React.Component {
  constructor(props) {
    super(props);
    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
  }
  handleIncrement(e) {
    if(60 > this.props.break) { this.props.modifyBreakLength(parseInt(e.currentTarget.value));
    }
  }
  handleDecrement(e){
    if(this.props.break > 1) { this.props.modifyBreakLength(parseInt(e.currentTarget.value));
    }
  }
  render() {
    return(
    <div>
        <h2 id="break-label">Break Length</h2>
        <div>
          <button id="break-increment" onClick={this.handleIncrement} value={1}><i  className="fa fa-arrow-up"/></button>
         {this.props.break}
          <button id="break-decrement" onClick={this.handleDecrement} value={-1}><i className="fa fa-arrow-down" /></button>
        </div>
    </div>
    )
}
}
class SessionSide extends React.Component{
 constructor(props){
   super(props)
    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
  }
  handleIncrement(e) {
    if(60 > this.props.session) { this.props.modifySessionLength(parseInt(e.currentTarget.value));
    }
  }
  handleDecrement(e){
    if(this.props.session > 1) { this.props.modifySessionLength(parseInt(e.currentTarget.value));
    }
  }  
render() {
    return(
    <div>
        <h2 id="session-label">Session Length</h2>
                   <button id="session-increment" onClick={this.handleIncrement} value={1}><i className="fa fa-arrow-up"/></button>
         {this.props.session}
          <button id="session-decrement" onClick={this.handleDecrement} value={-1}><i className="fa fa-arrow-down" /></button>
    </div>
    )
}
}


class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.handleTimerDisplay = this.handleTimerDisplay.bind(this)
  }
  handleTimerDisplay() {
    let min = Math.floor(this.props.timer/60)
    min = min < 10 ? '0' + min: min
    let sec = this.props.timer - min*60
    sec = sec < 10 ? '0' + sec: sec
    return min + ":" + sec;
  }
  render() {
    return(
    <div id="timer-painel">
        <div id="timer-counter">
          <div id="display">
            <h3 id="timer-label">{this.props.timeLabel}</h3>  
            <h4 id="time-left">{this.handleTimerDisplay()}</h4>
          </div>
          <audio id="beep" src="https://assets.mixkit.co/sfx/preview/mixkit-basketball-buzzer-1647.mp3"/>
        </div>
        <TimerButton handlePlayPause={this.props.handlePlayPause} handleRefresh={this.props.handleRefresh}/>
    </ div>
    )
}
   }

const TimerButton = (props) => {
    return(
    <div>
        <button id="start_stop" onClick={props.handlePlayPause}>
          <i class="fa fa-play" aria-hidden="true"></i>
          <i class="fa fa-pause" aria-hidden="true"></i>
         </button>
        <button id="reset" onClick={props.handleRefresh}>
          <i class="fa fa-refresh" aria-hidden="true"></i>
        </button>
    </div>
    )
}

ReactDOM.render(
    <App />,
  document.getElementById('app')
);

