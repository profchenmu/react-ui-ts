import * as React from 'react';
// import '../../styles/index.scss';
// import '../styles/pages/Page1.scss';
import RowInput from './RowInput';
import logProps from './RowInputHight';

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
	          	const RIH = logProps(RowInput, e);
	            return(
	              <div key={i}>
	                <RIH 
	                	data={e.data} 
	                	validate={e.validate} 
	                	getValidate={this.getValidate}
	                />
	              </div>
	            );
	          })
	        }
	      </div>
	    );
	  }
	};
}