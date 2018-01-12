import * as React from 'react';
// import RowInput from './RowInput';
export default function logProps(WAPC: any, obj: {
  isValid: boolean, 
  data: any, 
  errorMsg: Array<string>, 
  resErrorMsg: string,
  defaultValue: string,
  defaultKey: string,
  format: string,
  unit: string
}) {
let initDateFormat = (start: string, end: string, format: string) => {
  let startArr = start.split('-'), endArr = end.split('-');
  let formatArr = format.split('-');
  let startYear = parseInt(startArr[formatArr.indexOf('yyyy')]),
      startMon = parseInt(startArr[formatArr.indexOf('mm')]),
      startDay = parseInt(startArr[formatArr.indexOf('dd')]);
  let endYear = parseInt(endArr[formatArr.indexOf('yyyy')]),
      endMon = parseInt(endArr[formatArr.indexOf('mm')]),
      endDay = parseInt(endArr[formatArr.indexOf('dd')]);

  console.log(startYear, startMon, startDay);
  console.log(endYear, endMon, endDay);

  let forMatDate: any = (startNum: number, endNum: number): Array<number> => {
    let tempArr: Array<number> = [];
    for(let i:number=startNum; i<=endNum; i++){
      tempArr.push(i);
    }
    return tempArr;
  }

  let getDate: any = (startYear: number, startMon: number): Array<number> => {
    let isLarge = [1,3,5,7,8,10,12].filter((i: number) => {
      return i == startMon;
    });
    if(isLarge.length > 0) {
      return forMatDate(1, 31);
    } else if(startMon == 2) {
      if(startYear % 4 == 0 && startYear % 10 !== 0) {
        return forMatDate(1, 29);
      } else {
        return forMatDate(1, 28);
      }
    } else {
      return forMatDate(1, 30);
    }
  }
  const yearArr = forMatDate(startYear, startYear + 60);
  const monArr = [1,2,3,4,5,6,7,8,9,11,12];
  const dayArr = getDate(startYear, startMon);
  return {yearArr: yearArr, monArr: monArr, dayArr: dayArr};
}

  return class extends React.Component<any, any> {
    constructor(props: object) {
      super(props);
      this.state = {
        ...this.props
      };
      this.validate = this.validate.bind(this);
      this.setValue = this.setValue.bind(this);
      this.changeYears = this.changeYears.bind(this);
    }
    componentDidMount() {
      this.validate(this.state.data);
    }
    componentWillReceiveProps(props: object) {
      // this.setState(props);
    }
    // componentWillUnmount() {
    // }

    changeYears(year:any) {
      console.log(year);
    }
    validate(value: string):void {
      const validateFun = this.props.validate;
      let isValid = true;
      if (validateFun instanceof Array) {
        for (let i of validateFun) {
          if (!i(value)) {
            isValid = i(value);
            obj.resErrorMsg = obj.errorMsg[validateFun.indexOf(i)];
            break;
          } else {
            isValid = i(value);
          }
        }
      }
      if(isValid){
        obj.resErrorMsg = '';
      }
      const data = obj.data;
      const { start, end } = data;
      const dateObj = initDateFormat(start, end, obj.format);
      const defaultKey = obj.defaultKey;
      const format = obj.format;
      const unit = obj.unit;
      this.setState({unit: unit, isValid: isValid, dateObj: dateObj, defaultKey: defaultKey, format: format, }, () => {
        /* valid infomation goes up */
        obj.isValid = isValid;
        // this.props.getValidate(isValid);
      });
    }
    setValue(value: string):void {
      obj.defaultValue = value;
    }
    handleChange() {
      this.setState({
      });
    }
    // openDateSelect(e:any) {
    //   this.setState({showSelectPad: true})
    // }
    // callback(value:any) {
    //   this.setState({defaultKey: value});
    // }
    getDateValue(dateValue: string) {
      obj.defaultKey = dateValue;
    }
    render() {
      let dateObj = this.state.dateObj||{};
      return (

              <WAPC
                format={this.state.format}
                data={this.state.data}
                unit={this.state.unit}
                yearArr={dateObj.yearArr}
                monArr={dateObj.monArr}
                dayArr={dateObj.dayArr}
                validate={this.validate}
                setValue={this.setValue}
                isValid={this.state.isValid}
                defaultKey={this.state.defaultKey}
                chanYears={this.changeYears}
                getDateValue={this.getDateValue.bind(this)}
              />
          
      );
    }
  };
}
