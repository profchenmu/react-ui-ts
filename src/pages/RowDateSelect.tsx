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
      dayArr: []
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
    console.log(e.touches[0], e.timeStamp.valueOf())
  }
  yearTouchStart(e:any) {
    this.timeStart = e.timeStamp;
    this.startPos = e.touches[0].clientY;
  }
  yearTouchEnd(e:any) {
    this.timeEnd = e.timeStamp;
    console.log(e)
    this.timeMove = this.timeEnd - this.timeStart;
    this.endPos = e.changedTouches[0].clientY;
    this.movePos = Math.abs(this.endPos - this.startPos);
    let speed:number = this.movePos/this.timeMove;
    console.log(speed);
  }
  render() {
    const {
      // placeholder,
      // value,
      yearArr, monArr, dayArr
    } = this.state;
    return (
      <div className="row-date-select">
        <div>
        <p>{`${this.props.isValid}`}</p>
          <div>
            <div className="out-items" ref="yearItems">
              <div 
                className="date-item year-item"
                onTouchStart={this.yearTouchStart.bind(this)}
                onTouchEnd={this.yearTouchEnd.bind(this)}
                onTouchMove={this.yearTouchMove.bind(this)}
              >
                {
                  yearArr.map((e:any,i:number) => {
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