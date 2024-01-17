const { Activity, Country } = require('../db.js');

const getActivities = async (_req, res) => {
	try {
		const allActivities = await Activity.findAll({
			include: [Country]
		});
		res.json(allActivities);
	} catch (error) {
		res.json({ error: 'Error reading database' });
	}
};

const addActivity = async function (req, res) {
	try {
		const { name, difficulty, duration, season, countryId } = req.body;
		let newActivity = await Activity.findOrCreate({
			where: {
				name: name,
				difficulty: difficulty,
				duration: duration,
				season: season
			}
		});
		//countryId = [Id1, Id2, ...]
		for (let i = 0; i < countryId.length; i++) {
			const match = await Country.findOne({
				where: {
					id: countryId[i]
				}
			});

			await newActivity[0].addCountry(match);
		}
		res.json({ msg: 'Activity created' });
	} catch (error) {
		res.send({ msg: 'Server Error' });
	}
};

module.exports = {
	getActivities,
	addActivity
};
