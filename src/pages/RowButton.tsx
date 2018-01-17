import * as React from 'react';
import './RowButton.scss';
// import PropTypes from 'prop-types';

class RowButton extends React.Component<any, any> {
  constructor(props: object) {
    super(props);
    this.state = {
      active: ''
    };
    this.touchEnd = this.touchEnd.bind(this);
    this.touchStart = this.touchStart.bind(this);
  }
  touchStart() {
    this.setState({
      active: ' active'
    })
  }
  touchEnd() {
    this.setState({
      active: ''
    }, () => {
      this.props.callback && this.props.callback();
    })
  }
  render() {
    return (
      <div className={`row-button ${this.props.type}${this.state.active}`}>
        <div 
          onTouchEnd={this.touchEnd}
          onTouchStart={this.touchStart}
        >
          <p>
            {this.props.text}
          </p>
          <div className="mask"></div>
        </div>
      </div>
    );
  }
}
export default RowButton;