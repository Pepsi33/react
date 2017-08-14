import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style/lib/animate.css';
import App from './App';
import Page from './components/common/Page';
import Home from './components/home/Home';
import Login from './components/common/Login';
import Register from './components/common/Register';
import NotFound from './components/common/NotFound';

//import requireAuthentication from './components/common/AuthenticatedComponent';
import registerServiceWorker from './registerServiceWorker';

import { Router, Route, hashHistory, IndexRedirect } from 'react-router';


const routes =
    <Route path={'/'} components={Page}>
        <IndexRedirect to="/app/index" />
        <Route path={'app'} component={App}>
            <Route path={'index'} component={Home}/>
        </Route>
        <Route path={'register'} components={Register} />
        <Route path={'login'} components={Login} />
        <Route path={'404'} component={NotFound} />
    </Route>;

ReactDOM.render(<Router history={hashHistory}>
      {routes}
  </Router>, document.getElementById('root'));
registerServiceWorker();
