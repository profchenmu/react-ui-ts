import * as React from 'react';
// import RowInput from './RowInput';
export default function logProps(WAPC: any, obj: {isValid: boolean, data: string}) {

  return class extends React.Component<any, any> {
    constructor(props: object) {
      super(props);
      this.state = {
      }
    }

    render() {
      return (
        <WAPC />
      );
    }
  };
}
