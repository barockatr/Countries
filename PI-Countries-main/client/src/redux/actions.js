import axios from 'axios';

export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_COUNTRY_DETAIL = 'GET_COUNTRY_DETAIL';
export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT';
export const FILTER_BY_ACTIVITY = 'FILTER_BY_ACTIVITY';
export const SORT = 'SORT';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const SEARCH_COUNTRIES = 'SEARCH_COUNTRIES';

export function getCountries() {
	return async function (dispatch) {
		try {
			const response = await axios.get('http://localhost:3001/countries');
			return dispatch({
				type: GET_COUNTRIES,
				payload: response.data
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function getCountryDetail(id) {
	return async function (dispatch) {
		try {
			const response = await axios.get(`http://localhost:3001/countries/${id}`);
			return dispatch({
				type: GET_COUNTRY_DETAIL,
				payload: response.data
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function searchCountries(name) {
	return async function (dispatch) {
		try {
			const response = await axios.get(`http://localhost:3001/countries?name=${name}`);
			return dispatch({
				type: SEARCH_COUNTRIES,
				payload: response.data
			});
		} catch (error) {
			console.log(error);
			alert('Country not found');
		}
	};
}

export function getActivities() {
	return async function (dispatch) {
		try {
			const response = await axios.get('http://localhost:3001/activity');
			return dispatch({
				type: GET_ACTIVITIES,
				payload: response.data
			});
		} catch (error) {
			console.log(error);
		}
	}
}

export function addActivity(payload) {
	return async function (dispatch) {
		try {
			const response = await axios.post('http://localhost:3001/activity', payload);
			return response;
		} catch (error) {
			console.log(error);
		}
	}
}

export function filterByContinent(payload) {
	return {
		type: FILTER_BY_CONTINENT,
		payload
	};
}

export function filterByActivity(payload) {
	return {
		type: FILTER_BY_ACTIVITY,
		payload
	};
}

export function sort(payload) {
	return {
		type: SORT,
		payload
	};
}
