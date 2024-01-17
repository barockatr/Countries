const initialState = {
	countries: [],
	allCountries: [],
	activities: [],
	countryDetails: {}
};

export function rootReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_COUNTRIES':
			return {
				...state,
				countries: action.payload,
				//Guardamos una copia de countries:
				allCountries: action.payload
			};

		case 'FILTER_BY_REGION':
			const allCountries = state.allCountries;
			let regionFiltered;
			if (action.payload === 'All') regionFiltered = allCountries;
			else
				regionFiltered = allCountries.filter(
					(c) => c.region === action.payload
				);
			return {
				...state,
				countries: regionFiltered
			};

		case 'FILTER_BY_ACTIVITY':
			const countries = state.allCountries;
			//const countries = state.countries;
			//console.log(action.payload);
			//console.log(countries[0]);
			let filteredByActivity = [];
			for (let c = 0; c < countries.length; c++) {
				if (countries[c].activities.length) {
					for (let a = 0; a < countries[c].activities.length; a++) {
						if (countries[c].activities[a].name === action.payload) {
							filteredByActivity.push(countries[c]);
						}
					}
				}
			}
			//console.log(filteredByActivity);
			return {
				...state,
				countries: filteredByActivity
			};

		case 'ORDER_BY_NAME':
			let orderedCountriesByName;
			if (action.payload === 'Ascendent') {
				orderedCountriesByName = state.countries.sort((a, b) => {
					if (a.name > b.name) return 1;
					if (a.name < b.name) return -1;
					return 0;
				});
			}
			if (action.payload === 'Descendent') {
				orderedCountriesByName = state.countries.sort((a, b) => {
					if (a.name < b.name) return 1;
					if (a.name > b.name) return -1;
					return 0;
				});
			}
			return {
				...state,
				countries: orderedCountriesByName
			};

		case 'ORDER_BY_POPULATION':
			let orderedCountriesByPopulation;
			if (action.payload === 'Ascendent') {
				orderedCountriesByPopulation = state.countries.sort(
					(a, b) => a.population - b.population
				);
			}
			if (action.payload === 'Descendent') {
				orderedCountriesByPopulation = state.countries.sort(
					(a, b) => b.population - a.population
				);
			}
			return {
				...state,
				countries: orderedCountriesByPopulation
			};

		case 'GET_COUNTRIES_BY_NAME':
			return {
				...state,
				countries: action.payload
			};
		//Agregar Post en activity: No modifica el estado
		case 'ADD_ACTIVITY':
			return {
				...state
			};
		//Get Details:
		case 'GET_COUNTRY_DETAILS':
			return {
				...state,
				countryDetails: action.payload
			};

		case 'GET_ACTIVITIES':
			return {
				...state,
				activities: action.payload
			};
		//------------
		case 'COUNTRY_NOT_FOUND':
			return {
				...state,
				countries: action.payload
			};
		//------------
		default:
			return state;
	}
}
