import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UtilBar from './components/UtilBar';
import FullCharDetails from './components/FullCharDetails';
import './style.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact>
            <UtilBar />
          </Route>
          <Route path={'/character/:id'} exact component={FullCharDetails} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
