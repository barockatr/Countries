import axios from 'axios';

export function getCountries() {
	return async function (dispatch) {
		var allCountries = await axios('http://localhost:3001/countries');
		return dispatch({
			type: 'GET_COUNTRIES',
			payload: allCountries.data
		});
	};
}

export function filterCountriesByRegion(payload) {
	return {
		type: 'FILTER_BY_REGION',
		payload
	};
}

export function filterCountriesByActivity(payload) {
	return {
		type: 'FILTER_BY_ACTIVITY',
		payload
	};
}

export function orderCountriesByName(payload) {
	return {
		type: 'ORDER_BY_NAME',
		payload
	};
}

export function orderCountriesByPopulation(payload) {
	return {
		type: 'ORDER_BY_POPULATION',
		payload
	};
}

export function getCountriesByName(payload) {
	return async function (dispatch) {
		try {
			const countriesByName = await axios.get(
				`http://localhost:3001/countries?name=${payload}`
			);
			return dispatch({
				type: 'GET_COUNTRIES_BY_NAME',
				payload: countriesByName.data
			});
		} catch (error) {
			//console.log(error);
			return dispatch({
				type: 'GET_COUNTRIES_BY_NAME',
				payload: [
					{
						id: '404',
						name: 'Country Not Found',
						flag: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjUinX3N0rZjQ1mYFOCpJXcmJGgdvNm09ZAw&usqp=CAU',
						region: '-',
						population: '-'
					}
				]
			});
		}
	};
}
//>>Funcón para agregar post a la tabla "activity"
export function addActivity(payload) {
	//console.log('entre a addAct');
	//console.log(payload);
	return async function (dispatch) {
		try {
			const response = await axios.post(
				'http://localhost:3001/activity',
				payload
			);
			console.log(response);
			return response;
		} catch (error) {
			console.log(error);
		}
	};
}

//Traer país desde el back:
export function getCountyDetails(id) {
	return async function (dispatch) {
		try {
			const response = await axios(`http://localhost:3001/countries/${id}`);
			return dispatch({
				type: 'GET_COUNTRY_DETAILS',
				payload: response.data
			});
		} catch (error) {
			console.log(error);
		}
	};
}

//Traer activities desde el back:
export function getActivities() {
	return async function (dispatch) {
		try {
			const response = await axios('http://localhost:3001/activity');
			return dispatch({
				type: 'GET_ACTIVITIES',
				payload: response.data
			});
		} catch (error) {
			console.log(error);
		}
	};
}
