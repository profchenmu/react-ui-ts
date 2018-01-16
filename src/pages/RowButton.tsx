import * as React from 'react';
import './RowButton.scss';
// import PropTypes from 'prop-types';

class RowButton extends React.Component<any, any> {
  constructor(props: object) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className="row-button">
        {this.props.text}
      </div>
    );
  }
}
export default RowButton;