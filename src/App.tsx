import * as React from 'react';
import bundle from './Bundle';
import { Route, BrowserRouter } from 'react-router-dom';
const Cao = bundle(() => import('./pages/PageIn'));
import './App.scss';
// import Cao from './pages/PageIn';
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h3 className="App-intro">
          DEMO-TS-REACT
        </h3>
        <BrowserRouter>
          <Route path="/page1" component={Cao} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
