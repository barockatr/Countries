const axios = require('axios');
const { Country } = require('../db');
const { URL_ALL } = require('../consts');

const getApiData = async () => {
	try {
		const apiCountries = await axios.get(URL_ALL);
		const dbCountries = apiCountries.data.map((c) => {
			return {
				id: c.cca3,
				name: c.name.common,
				flag_image: c.flags.svg,
				continent: c.continents ? c.continents[0] : 'Unknown',
				capital: c.capital ? c.capital[0] : 'No capital',
				subregion: c.subregion ? c.subregion : 'No subregion',
				area: c.area,
				population: c.population
			};
		});
		return dbCountries;
	} catch (error) {
		console.error('Error fetching API data:', error);
		return [];
	}
};

const savedToDb = async () => {
	try {
		const countries = await getApiData();
		await Country.bulkCreate(countries, { ignoreDuplicates: true }); // Prevent errors if run multiple times
		console.log('DB Loaded');
	} catch (error) {
		console.error('Error saving to DB:', error);
	}
};

module.exports = { savedToDb };
