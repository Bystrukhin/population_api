import React, {Component} from 'react';
import {fetchCountries, fetchPopulation} from '../functions'
import _orderBy from "lodash/orderBy";

class MaleFemaleRatio extends Component {
    constructor(props) {
        super(props);

        this.state = {
            topCountryRatio: {
                name: '',
                ratio: 0,
                males: 0,
                females: 0
            }
        }
    }

    componentDidMount() {
        let countriesData = [];

        fetchCountries().then(countries => {
            let requests = countries.map(country => {
                // Count population for each country
                return fetchPopulation(country).then(resp => {
                    if (Array.isArray(resp)) {
                        let countryData = {
                            name: country,
                            males: 0,
                            females: 0
                        };

                        resp.map(item => {
                            countryData.males += item.males;
                            countryData.females += item.females;
                        });

                        countryData.ratio = countryData.males / countryData.females;

                        countriesData.push(countryData);
                    }
                })
                    .catch(() => {
                    })
            });

            // Wait for all requests and show top 1 country
            Promise.all(requests).then(() => {
                countriesData = _orderBy(countriesData, 'ratio');
                let topCountryRatio = countriesData[0];
                this.setState({topCountryRatio: topCountryRatio});
            });
        });
    }

    render() {
        return (
            <div className="col-5">
                <h2 className="mb-4">Highest female to male ratio</h2>
                <div className="card">
                    <div className="card-body">
                        <b>Country: {this.state.topCountryRatio.name}</b>
                        <br/><br/>
                        <div>Males: {this.state.topCountryRatio.males}</div>
                        <div>Females: {this.state.topCountryRatio.females}</div>
                        <div>Ratio: {this.state.topCountryRatio.ratio.toFixed(2)}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MaleFemaleRatio;