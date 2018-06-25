import React, {Component} from "react";
import {Pie} from 'react-chartjs'
import {fetchCountries, getCurrentDate} from '../functions'
import axios from 'axios'
import _orderBy from 'lodash/orderBy'

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            topCountries: []
        }
    }

    componentDidMount() {
        fetchCountries().then(countries => {
            let countriesData = [];

            let requests = countries.map(country => {
                return axios.get(`http://api.population.io:80/1.0/population/${country}/${getCurrentDate()}/`)
                    .then(resp => {
                        countriesData.push({
                            value: resp.data.total_population.population,
                            label: country,
                            color: this.getRandomColor()
                        });
                    })
                    .catch(() => {
                    });
            });

            Promise.all(requests).then(() => {
                countries = _orderBy(countriesData, 'value');
                countries = countries.slice(0, 10);
                this.setState({topCountries: countries});
            });
        })
    }

    getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    render() {
        return (
            <div className="col-7">
                <h2 className="mb-4">Top 10 countries by population</h2>
                <div className="card">
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col">
                                <Pie width={250} height={250} data={this.state.topCountries}/>
                            </div>
                            <div className="col">
                                <ul>
                                    {this.state.topCountries.map((country, key) => {
                                        return (<li>{key + 1}. {country.label}</li>);
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;
