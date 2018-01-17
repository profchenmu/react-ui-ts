import * as React from 'react';
// import PropTypes from 'prop-types';
import RowButton from './RowButton';
import './RowButtonGroup.scss';

class RowButtonGroup extends React.Component<any, any> {
  constructor(props: object) {
    super(props);
    this.state = {
    };
    this.submit = this.props.submit;
    this.cancel = this.props.cancel;
  }
  submit: void
  cancel: void
  render() {
    return (
      <div className="row-button-group">
        <div className="button-group-content">
          <RowButton type="cancel" text="cancel" callback={this.cancel}/>
          <RowButton type="submit" text="submit" callback={this.submit} />
        </div>
      </div>
    );
  }
}
export default RowButtonGroup;