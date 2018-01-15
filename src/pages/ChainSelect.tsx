import * as React from 'react';
import './RowDateSelect.scss';
// import PropTypes from 'prop-types';

class RowInput extends React.Component<any, any> {
  constructor(props: object) {
    super(props);
    let defaultYear = this.props.defaultYear;
    defaultYear = parseInt(defaultYear);
    let index:number = this.props.yearArr.indexOf(defaultYear);
    let moveStyle = 0-index*this.props.itemHeight;
    this.itemHeight = parseInt(this.props.itemHeight);
    // this.setState({
    //   ...props,
    //   moveStyle: moveStyle
    // });
    this.state = {
      defaultKey: this.props.defaultKey,
      name: this.props.name,
      yearArr: this.props.yearArr,
      moveStyle: moveStyle,
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
  timeout: any
  itemHeight: number
  componentWillReceiveProps(props:any) {
    // let defaultYear = props.defaultYear;
    // defaultYear = parseInt(defaultYear);
    // let index:number = props.yearArr.indexOf(defaultYear);
    // let moveStyle = 0-index*props.itemHeight;
    // this.setState({
    //   moveStyle: moveStyle
    // })
    if(this.state.yearArr.length!==props.yearArr.length) {
      this.stop()
    }
    
  }
  componentDidMount() {
    
  }

  componentDidUpdate() {

    // let moveStyle:number = Math.round(this.state.moveStyle/20)*20;
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
    clearTimeout(this.timeout);
    // let parentEl:any = this.refs.yearItems;
    // let height = 0 - e.currentTarget.clientHeight + parentEl.clientHeight - 50;
    let pos:number = e.touches[0].clientY;
    let movePos = pos - this.startPos;
    this.timeStart = e.timeStamp;
    this.setState({moveStyle: movePos});
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
        this.setState({
          moveStyle: moveStyle,
          needTransition: true
        })
      }
    }
    let height = 0 - e.currentTarget.clientHeight + this.itemHeight;
    if(this.state.moveStyle > 0||this.state.moveStyle < height) {
      this.jumpBack.bind(this)(e);
    }else{
      this.stop();
    }
  }
  cao() {
    let moveStyle:number = Math.round(this.state.moveStyle/this.itemHeight)*this.itemHeight;
    let yearValue = Math.abs(moveStyle/this.itemHeight);
    if(yearValue<0){
      yearValue = 0;
      moveStyle = 0;
    }
    if(yearValue>this.props.yearArr.length-1){
      yearValue = this.props.yearArr.length-1
      moveStyle = (1-this.props.yearArr.length)*this.itemHeight
    }
    this.props.callback({name: this.props.name, value: this.props.yearArr[yearValue]});
    this.setState({
      moveStyle: moveStyle
    });
  }
  stop() {
    let self = this;
    this.timeout = setTimeout(self.cao.bind(self), 300);
  }
  jumpBack(e:any) {
    // let parentEl:any = this.refs.yearItems;
    let height = 0 - e.currentTarget.clientHeight + this.itemHeight;
    let moveStyle: number = this.state.moveStyle, 
        yearValue: number = 0;
    if(this.state.moveStyle > 0) {
      moveStyle = 0;
      yearValue = 0;
    }
    if(this.state.moveStyle < height) {
      moveStyle = height;
      yearValue = this.state.yearArr.length - 1;
    }
    this.setState({moveStyle: moveStyle, needTransition: true});
    this.props.callback({name: this.props.name, value: this.props.yearArr[yearValue]});
  }
  componentWillUpdate(props:any,state:any) {
    let cao:any = this.refs.cao;
    if(state.needTransition) {
      cao.style.transition = 'all .2s ease-out';
    }else{
      cao.style.transition = '';
    }
  }
  render() {
    const {
      yearArr
    } = this.props;
    let cao = {
      transform: `translate3d(0, ${this.state.moveStyle}px, 0)`
    }
    return (
          <div 
            className="out-items" 
            ref="yearItems"
            // onTouchEnd={this.jumpBack.bind(this)}
          >

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
                    <div className="select-item" key={i} ref="selectItem">
                      {e + this.props.unit}
                    </div>
                  )
                })
              }
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
    // this.setState({defaultKey: value});
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