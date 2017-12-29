import * as React from 'react';
const Fragment = React.Fragment;
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
  hideModal() {
    this.setState({
      isShown: false
    })
  }
	render() {
    const className: string = `simple-modal ${this.state || ''}`;
    return(
      <Fragment>
        { this.state.isShown ? 
          (
            <div 
              className={className}
              onClick={this.hideModal}
            >
              123456
            </div>
          ) : null
        }
      </Fragment>
    );
	}
}
export default SimpleModal;

