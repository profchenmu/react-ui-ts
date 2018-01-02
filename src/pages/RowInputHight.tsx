import * as React from 'react';
// import RowInput from './RowInput';
export default function logProps(WAPC: any, obj: {isValid: boolean, data: string, errorMsg: Array<string>, resErrorMsg: string}) {

  return class extends React.Component<any, any> {
    constructor(props: object) {
      super(props);
      this.state = {
        data: this.props.data,
        isValid: true
      };
      this.validate = this.validate.bind(this);
      this.setValue = this.setValue.bind(this);
    }
    componentDidMount() {
      this.validate(this.state.data);
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
      this.setState({isValid: isValid}, () => {
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
          data={this.state.data}
          validate={this.validate}
          setValue={this.setValue}
          isValid={this.state.isValid}
        />
      );
    }
  };
}
