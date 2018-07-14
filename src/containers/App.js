import "font-awesome/css/font-awesome.css";
import 'styles/App.css';
import React, { Component } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
// Containers
import Layout from 'containers/Layout';
import Home from "containers/Home";
import Detail from "containers/Detail";

import store from 'store';

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <CookiesProvider>
          <Router history={history}>
            <div className="App">
              <Switch>
                <Layout>
                  {/* <HomeRoute exact path="/"/> */}
                  <Route exact path="/" component={Home}/>
                  <Route exact path="/:id" component={Detail}/>
                </Layout>
              </Switch>
            </div>
          </Router>
        </CookiesProvider>
      </Provider>
    );
  }
}

export default App;
