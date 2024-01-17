const { Country, Activity, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model', () => {
	before(() =>
		conn.authenticate().catch((err) => {
			console.error('Unable to connect to the database:', err);
		})
	);
	describe('Validators', () => {
		beforeEach(() => Country.sync({ force: true }));
		describe('name', () => {
			it('should throw an error if name is null', (done) => {
				Country.create({})
					.then(() => done(new Error('It requires a valid name')))
					.catch(() => done());
			});
			it('should work when its a valid name', () => {
				Country.create({ name: 'Argentina' });
			});
			//-->> TESTING **--
			it('should return error season is null', (data) => {
				Activity.create({
					name: 'Ajedrez',
					difficulty: '3',
					duration: '10',
					season: null
				})
					.then(() => data(new Error('Requires a valid property (season).')))
					.catch(() => data());
			});
			it('should return error if name is null', (data) => {
				Activity.create({
					name: null,
					difficulty: '3',
					duration: '10',
					season: 'Summer'
				})
					.then(() => data(new Error('Requires a valid property (name).')))
					.catch(() => data());
			});
			//--<< TESTING **--
		});
	});
});
