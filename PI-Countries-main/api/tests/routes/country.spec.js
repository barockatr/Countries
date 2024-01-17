/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);

describe('Country routes', () => {
	before(() =>
		conn.authenticate().catch((err) => {
			console.error('Unable to connect to the database:', err);
		})
	);
	beforeEach(
		() => Country.sync({ force: true }) //.then(() => Country.create(Country))
	);
	describe('GET /countries', () => {
		it('should get 200', () => agent.get('/countries').expect(200));
	});
	//-->> TESTING **--
	describe('GET /activity', () => {
		it('Should exptected receibed 200', () => {
			agent.get('/activity').expect(200);
		});
	});
	describe('POST create /activity', () => {
		it('Should create an activity (200)', () => {
			agent
				.post('/activity')
				.send({
					name: 'Ajedrez',
					difficulty: '3',
					duration: '2 hours',
					season: 'Summer'
				})
				.then(() => {
					expect('Content-Type', /json/);
				});
		});
	});
	//--<< TESTING **--
});
