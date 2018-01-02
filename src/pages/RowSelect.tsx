import * as React from 'react';
// import PropTypes from 'prop-types';

class RowInput extends React.Component<any, any> {
  constructor(props: object) {
    super(props);
    this.state = {
      data: this.props.data,
      defaultKey: this.props.defaultKey,
      name: this.props.name
    };
    this.change = this.change.bind(this);
    this.blur = this.blur.bind(this);
  }
  componentWillReceiveProps(props: object) {
    // this.setState(props);
  }
  render() {
    const {
      name,
      // placeholder,
      // value,
      defaultKey,
      data
    } = this.state;
    console.log(defaultKey)
    return (
      <div>
        <div className="content">
        <p>{`${this.props.isValid}`}</p>
          <div>
            <select 
              name={name} 
              onChange={this.change}
              value={defaultKey}
            >
              {data.map((e: any, i: number) => {
                return (
                  <option
                    key={i} 
                    value={e.key}
                  >
                    {e.value}
                  </option>
                )
              })}
            </select>
            {/*<input
              type={type ? type : 'text'}
              placeholder={placeholder}
              name={name}
              onChange={this.change}
              value={value}
              onBlur={this.blur}
            />*/}
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