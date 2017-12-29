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
    errorMsg: 'cao'
  },
  {
    name: 'b',
    type: 'input',
    data: '345',
    validate: [isNum, minLength],
    errorMsg: 'fk'
  }
];
class PageIn extends React.Component<any, any> {
  constructor(props: object) {
    super(props);
    this.state = {
      CaoPage: PageCao(obj)
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
    console.log(obj)
  }
  render() {
    const CaoPage: any = this.state.CaoPage;
    return (
      <div>
        <CaoPage />
        <div onClick={this.submitForm}>submit</div>
        <SimpleModal 
          isShown={true}
        />
      </div>
    );
  }
}
export default PageIn;