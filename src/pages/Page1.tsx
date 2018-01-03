import * as React from 'react';
// import '../../styles/index.scss';
// import '../styles/pages/Page1.scss';
import RowInput from './RowInput';
import RowSelect from './RowSelect';
import RIHProps from './RowInputHight';
import RSHProps from './RowSelectHight';

import RowDateSelect from './RowDateSelect';
import RDSHProps from './RowDateSelectHight';

export default function PageCao(obj: object) {
  function getValues(isValid: boolean):void {
    console.log(isValid)
  }
  return class Page1 extends React.Component<any, any> {
    constructor(props: object) {
      super(props);
      this.state = {
        inputInfoObj: []
      };
      this.getValidate = this.getValidate.bind(this);
    }
    componentDidMount() {
      this.setState({inputInfoObj: obj || []});
    }
    getValidate(isValid: boolean) {
      if (!isValid) {
        getValues(isValid)
      }
    }
    render() {
      const inputInfoObj = this.state.inputInfoObj;
      return (
        <div>
          {
            inputInfoObj.map((e: any, i: number) => {
              switch (e.type) {
                case 'input':
                  const RIH = RIHProps(RowInput, e);
                  return(
                    <div key={i}>
                      <RIH 
                        data={e.data} 
                        validate={e.validate} 
                        getValidate={this.getValidate}
                      />
                    </div>
                  );
                case 'select':
                  const RSH = RSHProps(RowSelect, e);
                  return(
                    <div key={i}>
                      <RSH
                        data={e.data} 
                        validate={e.validate}
                        name={e.name}
                        defaultKey={e.defaultKey}
                        getValidate={this.getValidate}
                      />
                    </div>
                  );
                case 'dateSelect':
                  const RDSH = RDSHProps(RowDateSelect, e);
                  return(
                    <div key={i}>
                      <RDSH
                        data={e.data} 
                        validate={e.validate}
                        name={e.name}
                        defaultKey={e.defaultKey}
                        getValidate={this.getValidate}
                      />
                    </div>
                  );
                default:
                  return(
                    <div>coacaocaocao</div>
                  )
                }
            })
          }
        </div>
      );
    }
  };
}