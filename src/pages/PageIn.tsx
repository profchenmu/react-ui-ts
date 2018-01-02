import * as React from 'react';
// import RowInput from './RowInput';
import PageCao from './Page1';
import { isNum, maxLength, minLength } from './validate';
import SimpleModal from './SimpleModal';

let obj = [
  {
    name: 'a',
    type: 'input',
    data: '123',
    validate: [isNum, maxLength],
    errorMsg: ['cao1', 'cao2'],
    resErrorMsg:''
  },
  {
    name: 'b',
    type: 'input',
    data: '345',
    validate: [isNum, minLength],
    errorMsg: ['fk1', 'fk2'],
    resErrorMsg:''
  }
];
class PageIn extends React.Component<any, any> {
  constructor(props: object) {
    super(props);
    this.state = {
      CaoPage: PageCao(obj),
      isShown: false
    };
    this.getValue = this.getValue.bind(this);
    this.getValidate = this.getValidate.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  getValue(value: string) {
  }
  getValidate(isValid: boolean) {
  }
  componentDidMount() {
  }
  submitForm() {
    let resErrorMsg: string = obj[1].resErrorMsg
    this.setState({
      isShown: true,
      resErrorMsg: resErrorMsg
    })
  }
  render() {
    const CaoPage: any = this.state.CaoPage;
    return (
      <div>
        <CaoPage />
        <div onClick={this.submitForm}>submit</div>
        <SimpleModal 
          isShown={this.state.isShown}
          msg={this.state.resErrorMsg}
        />
      </div>
    );
  }
}
export default PageIn;