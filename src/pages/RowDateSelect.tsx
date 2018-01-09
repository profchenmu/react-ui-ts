import * as React from 'react';
import './RowDateSelect.scss';
// import PropTypes from 'prop-types';
import ChainSelect from './ChainSelect';

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
      this.props.chanYears(self.state.yearArr[yearValue]);
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
  }
  callback(valueObj: any) {
    let defaultKey = this.state.defaultKey;
    let _tempArr = defaultKey.split('-');
    let defaultYear = parseInt(_tempArr[0]);
    let defaultMon = parseInt(_tempArr[1]);
    let defaultDay = parseInt(_tempArr[2]);
    switch (valueObj.name) {
      case 'year':
        defaultYear = valueObj.value;
        break;
      case 'mon':
        defaultMon = valueObj.value;
        break;
      case 'day':
        defaultDay = valueObj.value;
        break;
    }
    let dayArr = [];
    for(let i=1; i<32; i++){
      dayArr.push(i);
    }
    if(defaultMon == 2) {
      if(defaultYear%4!==0||defaultYear%10==0) {
        dayArr.splice(dayArr.indexOf(29));
        defaultDay > 28 && (defaultDay = 28);
      }else{
        dayArr.splice(dayArr.indexOf(30));
        defaultDay > 29 && (defaultDay = 29);
      }
    } else {
      if([1,3,5,7,8,10,12].indexOf(defaultMon)<0) {
        dayArr.splice(dayArr.indexOf(31));
        defaultDay > 30 && (defaultDay = 30);
      }
    }
    defaultKey = `${defaultYear}-${defaultMon}-${defaultDay}`;
    const _obj:any = {defaultKey: defaultKey}
    this.state.dayArr.length !== dayArr.length && (_obj.dayArr = dayArr);
    this.setState(_obj);
  }
  setMon(value: object) {
    console.log(value);
  }
  render() {
    const {
      // placeholder,
      // value,
      yearArr, monArr, dayArr, defaultKey
    } = this.state;
    let _tempArr = defaultKey.split('-');
    let defaultYear = _tempArr[0];
    let defaultMon = _tempArr[1];
    let defaultDay = _tempArr[2];
    return (
      <div className="row-date-select">
      <p>{defaultKey}</p>
        <div>
        <p>{`${this.props.isValid}`}</p>
          <div className="selects-holder">
            <div className="line-mark"></div>
            <ChainSelect name='year' yearArr={yearArr} callback={this.callback.bind(this)} defaultYear={defaultYear} />
            <ChainSelect name='mon' yearArr={monArr} callback={this.callback.bind(this)} defaultYear={defaultMon} />
            <ChainSelect name='day' yearArr={dayArr} callback={this.callback.bind(this)} defaultYear={defaultDay} />
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