const { Activity, Country } = require('../db.js');

const getActivities = async (_req, res) => {
	try {
		const allActivities = await Activity.findAll({
			include: [Country]
		});
		res.json(allActivities);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error reading database' });
	}
};

const addActivity = async function (req, res) {
	try {
		const { name, difficulty, duration, season, countryId } = req.body;

		if (!name || !difficulty || !season) {
			return res.status(400).json({ msg: 'Missing required fields' });
		}

		let [newActivity, created] = await Activity.findOrCreate({
			where: {
				name,
				difficulty,
				duration,
				season
			}
		});

		if (countryId && Array.isArray(countryId)) {
			const countries = await Country.findAll({
				where: {
					id: countryId
				}
			});
			await newActivity.addCountries(countries);
		}

		res.json({ msg: 'Activity created', activity: newActivity });
	} catch (error) {
		console.error(error);
		res.status(500).send({ msg: 'Server Error' });
	}
};

module.exports = {
	getActivities,
	addActivity
};
