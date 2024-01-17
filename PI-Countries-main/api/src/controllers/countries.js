const { Activity, Country } = require('../db.js');

const filterByName = async (req, res) => {
	//localhost:3001/countries -> All Countries
	//localhost:3001/countries?name=nameToSearch
	try {
		const dbCountries = await Country.findAll({ include: [Activity] });
		const { name } = req.query;
		if (name) {
			const countriesByName = dbCountries.filter((c) =>
				c.name.toUpperCase().includes(name.toUpperCase())
			);
			if (countriesByName.length) res.json(countriesByName);
			else res.status(404).json({ error: 'Country not found by name' });
		} else {
			res.json(dbCountries /* .slice(0, 10) */);
		}
	} catch (error) {
		res.status(500).json({ error: 'Error reading database' });
	}
};

const filterById = async (req, res) => {
	try {
		const { countryId } = req.params;
		if (countryId) {
			const result = await Country.findOne({
				where: { id: countryId.toUpperCase() },
				include: [Activity]
			});
			if (!result) {
				return res.status(404).json({ msg: 'Country not found by id' });
			}
			await res.json(result);
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: 'Server error' });
	}
};

module.exports = {
	filterByName,
	filterById
};
