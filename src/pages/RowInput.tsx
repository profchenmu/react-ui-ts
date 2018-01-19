import * as React from 'react';
import './RowInput.scss';
// import PropTypes from 'prop-types';

class RowInput extends React.Component<any, any> {
  constructor(props: object) {
    super(props);
    this.state = {
      value: this.props.data
    };
    this.change = this.change.bind(this);
    this.blur = this.blur.bind(this);
  }
  render() {
    console.log(this);

    const {
      type,
      name,
      value
    } = this.state;
    return (
      <div className="row-input">
        <div className="input-content">
        {/*<p>{`${this.props.isValid}`}</p>*/}
          <div className="row-holder">
            <label>{this.props.title}</label>
            <input
              type={type ? type : 'text'}
              placeholder={this.props.placeHolder}
              name={name}
              onChange={this.change}
              value={value}
              onBlur={this.blur}
            />
            <div className="bottom-line"></div>
            {this.props.resErrorMsg?(<div className="red-line"></div>):null}
            <small>{this.props.resErrorMsg}</small>
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
    this.setState({value: value});
    this.validate(value);
    this.setValue(value)
  }
  validate(value: string) {
    this.props.validate && this.props.validate(value, true);
  }
  setValue(value: string) {
    this.props.setValue(value);
  }
}
export default RowInput;