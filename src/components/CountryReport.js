import React, {Component} from 'react';
import axios from 'axios';

class CountryReport extends Component {
    constructor(props) {
        super(props);

        let date = new Date();

        this.handleAgeChange = this.handleAgeChange.bind(this);

        let ages = [];

        for (let age = 0; age <= 100; age++) {
            ages.push(age)
        }

        this.state = {
            year: date.getFullYear(),
            currentAge: 25,
            ages: ages,
            country: props.match.params.country,
            results: [],
            females: 0,
            males: 0
        }
    }

    componentDidMount() {
        axios.get(`http://api.population.io:80/1.0/population/${this.state.year}/${this.state.country}/`)
            .then(resp => {
                this.setState({results: resp.data}, () => this.setCurrentData());
            })
    }

    setCurrentData = () => {
        let obj = this.state.results.find(item => {
            return item.age == this.state.currentAge
        });

        this.setState({females: obj.females, males: obj.males})
    };

    handleAgeChange(event) {
        this.setState({currentAge: event.target.value}, () => this.setCurrentData());
    };

    render() {
        return (
            <div>
                <h3>Population in {this.state.country}</h3>

                <div className="card">
                    <div className="card-body">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Age</th>
                                <th>Males</th>
                                <th>Females</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <select className="form-control" value={this.state.currentAge}
                                            onChange={this.handleAgeChange}>
                                        {this.state.ages.map((age, key) => {
                                            return (
                                                <option value={age} key={key}>{age}</option>)
                                        })}
                                    </select>
                                </td>
                                <td className="align-middle">
                                    {this.state.males}
                                </td>
                                <td className="align-middle">
                                    {this.state.females}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default CountryReport;