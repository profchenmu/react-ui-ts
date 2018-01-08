import * as React from 'react';
import './RowDateSelect.scss';
// import PropTypes from 'prop-types';

class RowInput extends React.Component<any, any> {
  constructor(props: object) {
    super(props);
    this.state = {
      defaultKey: this.props.defaultKey,
      name: this.props.name,
      yearArr: [],
      moveStyle: 0,
      needTransition: true
    };
    this.change = this.change.bind(this);
    this.blur = this.blur.bind(this);
  }
  timeStart: number
  timeEnd: number
  timeMove: number
  startPos: number
  endPos: number
  movePos: number
  componentWillReceiveProps(props: object) {
    this.setState(props);
  }
  componentDidMount() {
  }

  componentDidUpdate() {
    // console.dir(this.refs.yearItems);
    // let caoItem:any = this.refs.yearItems;
    // let self: any = this;
    // caoItem.addEventListener('touchstart', self.cal)
    // caoItem.addEventListener('touchend', self.cal)
  }
  cal(e: any) {
    // e.preventDefault()
    console.log(e)
    // let self: any = this;
    // let itemEl:any = this.refs.yearItems;
    // let newScrollTop = itemEl.scrollTop;
    // if(this.needCal) {
    //   setTimeout(() => {
    //     if(st == newScrollTop){
    //       console.log(newScrollTop, Math.round(newScrollTop/20)*20);
    //       let resScrollTop = Math.round(newScrollTop/20)*20;
    //       itemEl.scrollTop = resScrollTop;
    //       setTimeout(() => {
    //         self.needCal = false;
    //       }, 2000)
    //       // self.needCal = false;
    //     }
    //     self.cal(newScrollTop);
    //   },300)
    // }
  }
  yearTouchMove(e:any) {
    e.preventDefault();
    // let parentEl:any = this.refs.yearItems;
    // let height = 0 - e.currentTarget.clientHeight + parentEl.clientHeight - 50;
    let pos:number = e.touches[0].clientY;
    let movePos = pos - this.startPos;
    this.timeStart = e.timeStamp;
    this.setState({moveStyle: movePos})
  }
  yearTouchStart(e:any) {
    // this.timeStart = e.timeStamp;
    this.startPos = e.touches[0].clientY - this.state.moveStyle;
    this.setState({
      needTransition: true
    })
  }
  yearTouchEnd(e:any) {
    this.timeEnd = e.timeStamp;
    console.log(e)
    this.timeMove = this.timeEnd - this.timeStart;
    this.endPos = e.changedTouches[0].clientY;
    this.movePos = Math.abs(this.endPos - this.startPos);
    let speed:number = this.movePos/this.timeMove;
    this.speedDown(speed, this.endPos - this.startPos, e);
    
  }
  speedDown(speed: number, isUp: number, e: any) {
    if(speed!==0) {
      let _speed = speed;
      if(isUp<0){
        let moveStyle = this.state.moveStyle-_speed;
        console.log(moveStyle)
        this.setState({
          moveStyle: moveStyle,
          needTransition: true
        })
      }
    }
    this.stop();
    this.jumpBack(e);
  }
  stop() {
    let self = this;
    setTimeout(() => {
      let moveStyle:number = Math.round(self.state.moveStyle/20)*20;
      // let absMoveStyle:number = Math.abs(moveStyle % 20);
      // if( absMoveStyle > 10) {
      //   moveStyle += absMoveStyle;
      // } else {
      //   moveStyle -= absMoveStyle;
      // }
      let yearValue = Math.abs(moveStyle/20);
      this.props.callback(self.state.yearArr[yearValue]);
      self.setState({
        moveStyle: moveStyle
      });
    }, 500);
  }

  jumpBack(e:any) {
    let parentEl:any = this.refs.yearItems;
    let height = 0 - e.currentTarget.clientHeight + parentEl.clientHeight;
    this.state.moveStyle > 0 && this.setState({moveStyle: 0, needTransition: true});
    this.state.moveStyle < height && this.setState({moveStyle: height, needTransition: true});
  }
  componentWillUpdate(props:any,state:any) {
    let cao:any = this.refs.cao;
    if(state.needTransition) {
      console.dir(cao);
      cao.style.transition = 'all .4s ease-out';
    }else{
      cao.style.transition = '';
    }
  }
  render() {
    const {
      yearArr
    } = this.state;
    let cao = {
      transform: `translate3d(0, ${this.state.moveStyle}px, 0)`
    }
    return (
      <div className="row-date-select">
        <div>
        <p>{`${this.props.isValid}`}</p>
          <div>
            <div className="out-items" ref="yearItems">
              <div 
                className="date-item year-item"
                ref="cao"
                style={cao}
                onTouchStart={this.yearTouchStart.bind(this)}
                onTouchEnd={this.yearTouchEnd.bind(this)}
                onTouchMove={this.yearTouchMove.bind(this)}
              >
                {
                  yearArr.map((e:any,i:number) => {
                    return (
                      <div className="select-item" key={i}>
                        {e}
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  blur(e: any) {
    // let value = e.target.value;
  }
  change(e: any) {
    let value = e.target.value;
    console.log(value)
    this.setState({defaultKey: value});
    this.validate(value);
    this.setValue(value)
  }
  validate(value: string) {
    this.props.validate && this.props.validate(value);
  }
  setValue(value: string) {
    this.props.setValue(value);
  }
}
export default RowInput;