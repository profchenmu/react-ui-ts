import * as React from 'react';
// import RowInput from './RowInput';
import PageCao from './Page1';
import { isNum, maxLength, minLength } from './validate';
import SimpleModal from './SimpleModal';
import RowButtonGroup from './RowButtonGroup';
import './PageIn.scss';

let obj = [
  {
    title: 'name',
    name: 'a',
    type: 'input',
    placeHolder: 'input your name',
    data: '456',
    validate: [isNum, maxLength],
    errorMsg: ['Min length should be 1!', 'Max length should be 3!'],
    resErrorMsg:''
  },
  {
    name: 'b',
    title: 'password',
    type: 'input',
    placeHolder: 'input your password',
    data: '345',
    validate: [isNum, minLength],
    errorMsg: ['fk1', 'fk2'],
    resErrorMsg:''
  },
  // {
  //   name: 'c',
  //   type: 'select',
  //   data: [
  //     {
  //       key: '0', 
  //       value: 'AA'
  //     },
  //     {
  //       key: '1', 
  //       value: 'BB'
  //     }
  //   ],
  //   defaultKey: '1',
  //   validate: [isNum, minLength],
  //   errorMsg: ['cf1', 'cf2'],
  //   resErrorMsg:''
  // },
  // {
  //   name: 'd',
  //   type: 'dateSelect',
  //   data: {
  //     start: '1-1-1980',
  //     end: '31-12-3000',
  //     devideWith: '-'
  //   },
  //   defaultKey: '9-3-1983',
  //   validate: [],
  //   errorMsg: ['df1', 'df2'],
  //   resErrorMsg:'',
  //   format: 'dd-mm-yyyy',
  //   unit: '日-月-年'
  // },
  // {
  //   name: 'e',
  //   type: 'signature',
  //   data: '',
  //   defaultKey: '',
  //   validate: [],
  //   errorMsg: [],
  //   resErrorMsg:''
  // }
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
    this.cancel = this.cancel.bind(this);
  }
  cancel() {
  }
  getValue(value: string) {
  }
  getValidate(isValid: boolean) {
  }
  componentDidMount() {
  }
  submitForm() {
    let resErrorMsg: string = ''
    for(let i of obj) {
      if(i.resErrorMsg) {
        resErrorMsg = i.resErrorMsg;
        break;
      }
    }
    this.setState({
      isShown: true,
      resErrorMsg: resErrorMsg
    })
  }
  render() {
    const CaoPage: any = this.state.CaoPage;
    console.log(this.state.isShown);
    return (
      <div>
        <CaoPage />
        <RowButtonGroup 
          submit={this.submitForm}
          cancel={this.cancel}
        />
        <SimpleModal 
          isShown={this.state.isShown}
          msg={this.state.resErrorMsg}
        />
      </div>
    );
  }
}
export default PageIn;