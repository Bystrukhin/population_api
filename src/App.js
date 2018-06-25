import React, {Component} from 'react';
import {Switch, Route, Link} from 'react-router-dom'
import './App.css';
import Dashboard from "./components/Dashboard";
import Reports from "./components/Reports";
import CountryReport from "./components/CountryReport";

class App extends Component {
    render() {
        return (
            <div className="App">
                <nav className="navbar navbar-expand navbar-dark bg-primary">
                    <a className="sidebar-toggle mr-3" href="#"><i className="fa fa-bars"/></a>
                    <Link className="navbar-brand" to="/">Frontend App</Link>
                </nav>

                <div className="d-flex">
                    <div className="sidebar sidebar-dark bg-dark">
                        <ul className="list-unstyled">
                            <li><Link className="navbar-brand" to="/"><i
                                className="fa fa-fw fa-chart-pie"/> Dashboard</Link></li>
                            <li>
                                <Link className="navbar-brand" to="/reports"><i className="fa fa-fw fa-table"/> Reports</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="content p-4">
                        <Switch>
                            <Route exact path="/" component={Dashboard}/>
                            <Route exact path="/reports" component={Reports}/>
                            <Route path="/reports/:country" component={CountryReport}/>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
