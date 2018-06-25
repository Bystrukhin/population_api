import axios from 'axios'

// Cached countries
let countries = [];

let fetchCountries = async () => {
    if (countries.length > 0)
        return countries;

    return await axios.get('http://api.population.io:80/1.0/countries')
        .then(resp => {
            countries = resp.data.countries;
            return countries;
        })
};

let fetchPopulation = async (country) => {
    return await axios.get(`http://api.population.io:80/1.0/population/${getCurrentYear()}/${country}/`)
        .then(resp => {
            return resp.data;
        })
};

let getCurrentDate = (del = '-') => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    return `${yyyy}${del}${mm}${del}${dd}`;
};

let getCurrentYear = () => {
    let date = new Date();
    return date.getFullYear();
};

export {fetchCountries, getCurrentDate, getCurrentYear, fetchPopulation}