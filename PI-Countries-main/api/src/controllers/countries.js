const { Activity, Country } = require('../db.js');
const { savedToDb } = require('./dbLoader');
const { Op } = require('sequelize');

const filterByName = async (req, res) => {
	try {
		const { name } = req.query;

		// Check if DB is empty and populate if needed
		const count = await Country.count();
		if (count === 0) {
			await savedToDb();
		}

		if (name) {
			const countriesByName = await Country.findAll({
				where: {
					name: {
						[Op.iLike]: `%${name}%`
					}
				},
				include: [Activity]
			});

			if (countriesByName.length) return res.json(countriesByName);
			return res.status(404).json({ error: 'Country not found by name' });
		}

		const allCountries = await Country.findAll({
			include: [Activity]
		});

		res.json(allCountries);
	} catch (error) {
		console.error(error);
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
			return res.json(result);
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ msg: 'Server error' });
	}
};

module.exports = {
	filterByName,
	filterById
};
