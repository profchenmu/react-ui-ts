import * as React from 'react';
import bundle from './Bundle';
import { Route, BrowserRouter } from 'react-router-dom';
const Cao = bundle(() => import('./pages/PageIn'));
// import Cao from './pages/PageIn';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit and save to reload.
        </p>
        <BrowserRouter>
          <Route path="/page1" component={Cao} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
