import * as React from 'react';
// import PropTypes from 'prop-types';
import RowButton from './RowButton';
import './RowButtonGroup.scss';

class RowButtonGroup extends React.Component<any, any> {
  constructor(props: object) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className="row-button-group">
        <div className="button-group-content">
          <RowButton type="cancel" text="cancel" />
          <RowButton type="submit" text="submit" />
        </div>
      </div>
    );
  }
}
export default RowButtonGroup;