import * as React from 'react';
class SimpleModal extends React.Component<any, any> {
  constructor(props: object){
    super(props);
    this.state = {
      ...this.props,
      isShown: this.props.isShown || false
    };
    this.hideModal = this.hideModal.bind(this);
  }
  componentDidMount() {
  }
  componentWillReceiveProps(props: object) {
    this.setState(props)
  }
  hideModal() {
    this.setState({
      isShown: false
    })
  }
	render() {
    const className: string = `simple-modal ${this.state || ''}`;
    return (
      this.state.isShown ? 
        (
          <div 
            className={className}
            onClick={this.hideModal}
          >
            {this.state.msg||''}
          </div>
        ) : null
      )
	}
}
export default SimpleModal;

