import * as React from 'react';
import './RowDateSelect.css';
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
  componentWillReceiveProps(props: object) {
    this.setState(props);
  }
  render() {
    const {
      // placeholder,
      // value,
      yearArr, monArr, dayArr
    } = this.state;
    console.log(yearArr)
    return (
      <div>
        <div className="content">
        <p>{`${this.props.isValid}`}</p>
          <div>
            <div className="date-item year-item">
              {
                yearArr.map((e:any,i:number) => {
                  return (
                    <p key={i}>
                      {e}
                    </p>
                  )
                })
              }
            </div>
            <div className="date-item mon-item">
              {
                monArr.map((e:any,i:number) => {
                  return (
                    <p key={i}>
                      {e}
                    </p>
                  )
                })
              }
            </div>
            <div className="date-item day-item">
              {
                dayArr.map((e:any,i:number) => {
                  return (
                    <p key={i}>
                      {e}
                    </p>
                  )
                })
              }
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