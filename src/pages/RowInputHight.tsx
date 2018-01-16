import * as React from 'react';
// import RowInput from './RowInput';
export default function logProps(WAPC: any, obj: {
  isValid: boolean, 
  data: string, 
  errorMsg: Array<string>, 
  title: string,
  placeHolder: string,
  resErrorMsg: string
}) {

  return class extends React.Component<any, any> {
    constructor(props: object) {
      super(props);
      // this.state = this.props;
      this.validate = this.validate.bind(this);
      this.setValue = this.setValue.bind(this);
      this.state = {
        isValid: false
      }
    }
    componentDidMount() {
      this.validate(this.props.data);
    }
    // componentWillUnmount() {
    // }
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
      this.setState({
        isValid: isValid,
        resErrorMsg: obj.resErrorMsg
      }, () => {
        /* valid infomation goes up */
        obj.isValid = isValid;
        // this.props.getValidate(isValid);
      });
    }
    setValue(value: string):void {
      obj.data = value;
    }
    handleChange() {
      this.setState({
      });
    }

    render() {
      return (
        <WAPC
          data={this.props.data}
          validate={this.validate}
          setValue={this.setValue}
          isValid={this.state.isValid}
          title={obj.title}
          placeHolder={obj.placeHolder}
          resErrorMsg={this.state.resErrorMsg}
        />
      );
    }
  };
}
