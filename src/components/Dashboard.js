import React, {Component} from 'react';

import TopCountries from './TopCountries'
import MaleFemaleRatio from './MaleFemaleRatio'

class Dashboard extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <TopCountries/>
                    <MaleFemaleRatio/>
                </div>
            </div>
        );
    }
}

export default Dashboard;