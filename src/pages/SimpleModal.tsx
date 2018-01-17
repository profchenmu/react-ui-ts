import * as React from 'react';
import './SimpleModal.scss';
class SimpleModal extends React.Component<any, any> {
  constructor(props: object){
    super(props);
    this.state = {
      isShown: this.props.isShown || false
    };
    // this.hideModal = this.hideModal.bind(this);
  }
  componentDidMount() {
  }
  componentWillReceiveProps(props: object) {
    console.log(props);
    this.setState(props);
  }
  // hideModal() {
  //   this.setState({
  //     isShown: false
  //   })
  // }
	render() {
    // const className: string = `simple-modal ${this.state || ''}`;
    console.log(this.state.isShown);
    return (
      this.state.isShown ? 
        (
          <div 
            className="simple-modal"
          >
            {this.props.msg||''}
          </div>
        ) : null
      )
	}
}
export default SimpleModal;

