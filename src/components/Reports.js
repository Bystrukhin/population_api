import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from 'axios';
import {getCurrentDate, fetchCountries} from '../functions'

class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentWillMount() {
        fetchCountries()
            .then(countries => {
                countries.map(item => {

                    return axios.get(`http://api.population.io:80/1.0/population/${item}/${getCurrentDate()}/`)
                        .then(resp => {
                            let newData = {"country": item, "total": resp.data.total_population.population}
                            this.setState({data: this.state.data.concat(newData)})
                        })
                        .catch(err => err)
                })
            })
    }

    filterCaseInsensitive(filter, row) {
        const id = filter.pivotId || filter.id;
        if (row[id] !== null) {
            return (
                row[id] !== undefined ?
                    String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) :
                    true
            );
        }
    }

    render() {
        const {data} = this.state;

        return (
            <div>
                <h2 className="mb-4">Reports</h2>
                <div className="card">
                    <ReactTable
                        columns={[
                            {
                                Header: "Country",
                                accessor: "country",
                                filterMethod: this.filterCaseInsensitive
                            },
                            {
                                Header: "Population",
                                id: "total",
                                accessor: d => d.total
                            },
                            {
                                Header: 'Details',
                                width: 65,
                                sortable: false,
                                filterable: false,
                                Cell: row => <Link
                                    to={"/reports/:country".replace(":country", row.row.country)}>Details </Link>,
                            },
                        ]}
                        data={data}
                        filterable
                        defaultPageSize={20}
                        className="-striped -highlight"
                    />
                </div>
            </div>
        );
    }
}

export default Reports;