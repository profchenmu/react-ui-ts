import * as React from 'react';
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
    const {
      type,
      name,
      placeholder,
      value
    } = this.state;
    return (
      <div>
        <div className="content">
        <p>{`${this.props.isValid}`}</p>
          <div>
            <input
              type={type ? type : 'text'}
              placeholder={placeholder}
              name={name}
              onChange={this.change}
              value={value}
              onBlur={this.blur}
            />
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
    this.props.validate && this.props.validate(value);
  }
  setValue(value: string) {
    this.props.setValue(value);
  }
}
export default RowInput;