import React from 'react';
import {connect} from 'react-redux';
import {Router, Link, Switch, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import Game from './components/pages/Game';
import Questions from './components/pages/Questions';
import { addQuestions } from './store/actions/questions';

import './App.css';

const history = createBrowserHistory();

class App extends React.Component<any,any> {
  componentWillMount() {
    if(localStorage.getItem('questions')) {
      const questions = JSON.parse(localStorage.getItem('questions') as string);
      this.props.dispatch(addQuestions(questions));
    }
  }

  render() {
    return (
      <Router history={history}>
        <div className="container">
          <div className="my-5 d-flex justify-content-around">
            <Link to="/">Game</Link>
            <Link to="/questions">Questions</Link>
          </div>

          <Switch>
            <Route path="/questions">
              <Questions />
            </Route>
            <Route path="/">
              <Game />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect()(App);
