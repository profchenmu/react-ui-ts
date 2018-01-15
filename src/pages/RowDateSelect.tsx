import * as React from 'react';
import './RowDateSelect.scss';
// import PropTypes from 'prop-types';
import ChainSelect from './ChainSelect';
import './RowSignature.scss';

class RowInput extends React.Component<any, any> {
  constructor(props: object) {
    super(props);
    this.state = {
      data: this.props.data,
      defaultKey: this.props.defaultKey,
      name: this.props.name,
      format: '',
      yearArr: [],
      monArr: [],
      dayArr: [],
      moveStyle: 0,
      needTransition: true,
      showSelectPad: false,
      fadeOut: ' fade-out',
      slideUp: ' slide-down'
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
    let _format = this.state.format?this.state.format.split('-'):[];
    let defaultYear = parseInt(_tempArr[_format.indexOf('yyyy')]);
    let defaultMon = parseInt(_tempArr[_format.indexOf('mm')]);
    let defaultDay = parseInt(_tempArr[_format.indexOf('dd')]);
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
    let formatStr = this.state.format;
    defaultKey = formatStr
      .replace('yyyy', defaultYear)
       .replace('mm', defaultMon)
      .replace('dd', defaultDay);
    const _obj:any = {defaultKey: defaultKey}
    this.state.dayArr.length !== dayArr.length && (_obj.dayArr = dayArr);
    this.setState(_obj);
  }
  setMon(value: object) {
    console.log(value);
  }
  openDateSelect(e:any) {
    let self = this;
    this.setState({showSelectPad: true},()=>{
      setTimeout(()=>{
        self.setState({fadeOut: ' fade-in', slideUp: ' slide-up'})
      },0);
    })
  }
  confirmDate() {
    this.setState({
      fadeOut: ' fade-out',
      slideUp: ' slide-down'
    }, ()=>{
      setTimeout(()=>{
        this.setState({
          defaultKey: this.state.defaultKey,
          showSelectPad: false
        })
      },1000)
    });
    this.props.getDateValue(this.state.defaultKey);
  }
  cancel() {
    this.setState({
      fadeOut: ' fade-out',
      slideUp: ' slide-down'
    }, ()=>{
      setTimeout(()=>{
        this.setState({
          
          showSelectPad: false
        })
      },1000)
    });
  }
  render() {
    const {
      // placeholder,
      // value,
      yearArr, monArr, dayArr, defaultKey, 
      format, unit
    } = this.state;
    let _tempArr = defaultKey.split('-');
    let _format = format?format.split('-'):[];
    let _unit = unit?unit.split('-'):[];
    let defaultYear = _tempArr[_format.indexOf('yyyy')];
    let defaultMon = _tempArr[_format.indexOf('mm')];
    let defaultDay = _tempArr[_format.indexOf('dd')];
    let unitYear = _unit[_format.indexOf('yyyy')];
    let unitMon = _unit[_format.indexOf('mm')];
    let unitDay = _unit[_format.indexOf('dd')];
    return (
      <div>
      <div onClick={this.openDateSelect.bind(this)}>
        {defaultKey} 
      </div>
      {
        this.state.showSelectPad? 
        (<div className={`row-date-select-out${this.state.fadeOut}`}>
          <div className={`row-date-select${this.state.slideUp}`}>
          <p className="btn-holder">
            <span onClick={this.cancel.bind(this)}>Cancel</span>
            <span>{defaultKey}</span>
            <span onClick={this.confirmDate.bind(this)}>Submit</span>
          </p>
              <div>
              {/*<p>{`${this.props.isValid}`}</p>*/}
                <div className="selects-holder">
                  <div className="line-mark"></div>
                  {_format.map((e:any, i:number)=>{
                    switch (e) {
                      case "yyyy":
                        return(
                          <ChainSelect 
                            key={i} 
                            name='year' 
                            itemHeight='30'
                            unit={unitYear}
                            yearArr={yearArr} 
                            callback={this.callback.bind(this)} 
                            defaultYear={defaultYear} 
                          />
                        )
                      case "mm":
                        return(
                          <ChainSelect 
                            key={i} 
                            name='mon' 
                            itemHeight='30'
                            unit={unitMon}
                            yearArr={monArr} 
                            callback={this.callback.bind(this)} 
                            defaultYear={defaultMon} 
                          />
                        )  
                      case "dd":
                        return(
                          <ChainSelect 
                            key={i} 
                            name='day'
                            unit={unitDay}
                            itemHeight='30' 
                            yearArr={dayArr} 
                            callback={this.callback.bind(this)} 
                            defaultYear={defaultDay} 
                          />
                        )
                      default:
                        return null;
                    }
                  })}            
                </div>
              </div>
            </div>
          </div>):null
        }
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