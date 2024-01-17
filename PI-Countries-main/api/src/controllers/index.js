const { filterByName, filterById } = require('./countries');
const { getActivities, addActivity } = require('./activity');
const { dbLoader } = require('./dbLoader');

module.exports = {
	filterByName,
	filterById,
	getActivities,
	addActivity,
	dbLoader
};
