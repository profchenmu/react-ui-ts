import * as React from 'react';
import './SimpleModal.scss';
class SimpleModal extends React.Component<any, any> {
  constructor(props: object){
    super(props);
    this.state = {
      isShown: this.props.isShown || false,
      active: this.props.isShown || false
    };
    this.hideModal = this.hideModal.bind(this);
  }
  componentDidMount() {
  }
  componentWillReceiveProps(props: any) {
    console.log(props.isShown);
    this.setState({...props, active: props.isShown});
  }
  hideModal() {
    this.setState({
      active: false,
    },()=>{setTimeout(()=>{
      this.setState({
        isShown: false
      })
    },0)})
  }
	render() {
    // const className: string = `simple-modal ${this.state || ''}`;
    // console.log(this.state.isShown);
    console.log(this.state.active)
    return (
      // this.state.isShown ? 
      //   (
          <div 
            className={`simple-modal${this.state.active?` active`:``}`}
            onTouchEnd={this.hideModal}
          >
            <div className='simple-modal-container'>
            {this.props.msg||''}
            </div>
          </div>
        // ) : null
      )
	}
}
export default SimpleModal;

