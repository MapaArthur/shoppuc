import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./routes";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/shards-dashboard/styles/shards-dashboards.1.1.0.min.css";

function RouteApp() {
    return (
        <Router>
            <div id="page-top">
                <Switch>
                    {routes.map((route, index) => {
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={(props => {
                                    return (
                                        <route.layout {...props}>
                                            <route.component {...props} />
                                        </route.layout>
                                    );
                                })}
                            />
                        );
                    })}
                </Switch>
            </div>
        </Router>
    );
}

ReactDOM.render(<RouteApp />, document.getElementById('root'));