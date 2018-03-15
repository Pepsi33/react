import React from 'react';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import App from '../App';
import Page from '../components/Page/Page';
import Home from '../components/home/Home';
import Login from '../components/common/Login';
import Register from '../components/common/Register';
import NotFound from '../components/common/NotFound';

import ReportManager from '../views/report/ReportManager';
import ReportRpqueue from '../views/report/ReportRpqueue';
import AddReport from '../views/report/AddReport';
import ReportDetail from '../views/report/ReportDetail';

import { checkAuth } from '../redux/reducers/UserInfo';

const routes =
    <Route path={'/'} components={Page}>
        <IndexRedirect to="/reportCenter/index" />
        <Route onEnter={checkAuth} path={'reportCenter'} component={App}>
            <Route path={'index'} component={Home} />
            <Route path={'report/reportManager'} component={ReportManager} />
            <Route path={'report/reportRpqueue'} component={ReportRpqueue} />
        </Route>
        <Route onEnter={checkAuth} path={'addReport'} component={AddReport} />
        <Route onEnter={checkAuth} path={'report/detail/:id'} component={ReportDetail} />
        <Route path={'register'} components={Register} />
        <Route path={'login'} components={Login} />
        <Route path={'404'} component={NotFound} />
    </Route>;

export default class Routers extends React.Component {
    render(){
        return(
            <Router history={hashHistory}>
                {routes}
            </Router>
        )
    }
}