import * as React from 'react';
import './RowDateSelect.scss';
// import PropTypes from 'prop-types';

class RowInput extends React.Component<any, any> {
  constructor(props: object) {
    super(props);
    this.state = {
      data: this.props.data,
      defaultKey: this.props.defaultKey,
      name: this.props.name,
      yearArr: [],
      monArr: [],
      dayArr: [],
      moveStyle: 0,
      needTransition: false
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
    let parentEl:any = this.refs.yearItems;
    let height = 0 - e.currentTarget.clientHeight + parentEl.clientHeight - 50;
    console.dir(height)
    let pos:number = e.touches[0].clientY;
    let movePos = pos - this.startPos;
    // if(movePos<=50 && movePos>=height){
      this.setState({moveStyle: movePos})
    // }
  }
  yearTouchStart(e:any) {
    this.timeStart = e.timeStamp;
    this.startPos = e.touches[0].clientY - this.state.moveStyle;
  }
  yearTouchEnd(e:any) {
    this.timeEnd = e.timeStamp;
    console.log(e)
    this.timeMove = this.timeEnd - this.timeStart;
    this.endPos = e.changedTouches[0].clientY;
    this.movePos = Math.abs(this.endPos - this.startPos);
    let speed:number = this.movePos/this.timeMove;
    // let isUp = this.endPos - this.startPos > 0;
    this.speedDown(speed, this.endPos - this.startPos);
    this.jumpBack(e);
  }
  speedDown(speed: number, isUp: number) {
    if(speed!==0) {
      let _speed = speed*10000;
      if(isUp>0){
        let moveStyle = this.state.moveStyle+_speed;
        console.log(moveStyle)
        this.setState({
          moveStyle: moveStyle,
          needTransition: true
        })
      }
    }
  }
  jumpBack(e:any) {
    let parentEl:any = this.refs.yearItems;
    let height = 0 - e.currentTarget.clientHeight + parentEl.clientHeight;
    this.state.moveStyle > 0 && this.setState({moveStyle: 0, needTransition: true});
    this.state.moveStyle < height && this.setState({moveStyle: height, needTransition: true});
  }
  render() {
    const {
      // placeholder,
      // value,
      yearArr, monArr, dayArr, needTransition
    } = this.state;
    let transition:string = needTransition ? 'transition: all 10s ease-in' : '';
    let cao = {
      transform: `translate3d(0, ${this.state.moveStyle}px, 0)`,
      Transition: 'transition: all 1s ease-in'
    }
    console.log(transition)
    return (
      <div className="row-date-select">
        <div>
        <p>{`${this.props.isValid}`}</p>
          <div>
            <div className="out-items" ref="yearItems">
              <div 
                className="date-item year-item"
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
            <div className="out-items">
              <div className="date-item mon-item">
                {
                  monArr.map((e:any,i:number) => {
                    return (
                      <div key={i}>
                        {e}
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className="out-items">
              <div className="date-item day-item">
                {
                  dayArr.map((e:any,i:number) => {
                    return (
                      <div key={i}>
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