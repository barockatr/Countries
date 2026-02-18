import {
	GET_COUNTRIES,
	GET_COUNTRY_DETAIL,
	GET_ACTIVITIES,
	SEARCH_COUNTRIES,
	FILTER_BY_CONTINENT,
	FILTER_BY_ACTIVITY,
	SORT
} from './actions';

const initialState = {
	countries: [],
	allCountries: [],
	activities: [],
	detail: {}
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_COUNTRIES:
			return {
				...state,
				countries: action.payload,
				allCountries: action.payload
			};
		case GET_COUNTRY_DETAIL:
			return {
				...state,
				detail: action.payload
			};
		case SEARCH_COUNTRIES:
			return {
				...state,
				countries: action.payload
			};
		case GET_ACTIVITIES:
			return {
				...state,
				activities: action.payload
			}
		case FILTER_BY_CONTINENT:
			const allCountriesContinent = state.allCountries;
			const statusFiltered = action.payload === 'All'
				? allCountriesContinent
				: allCountriesContinent.filter(el => el.continent === action.payload);
			return {
				...state,
				countries: statusFiltered
			};
		case FILTER_BY_ACTIVITY:
			const allCountriesActivity = state.allCountries;
			const activityFiltered = action.payload === 'All'
				? allCountriesActivity
				: allCountriesActivity.filter(c => c.activities && c.activities.find(a => a.name === action.payload));
			return {
				...state,
				countries: activityFiltered
			}
		case SORT:
			let sortedArr = action.payload === 'asc'
				? state.countries.sort(function (a, b) {
					if (a.name > b.name) return 1;
					if (b.name > a.name) return -1;
					return 0;
				})
				: action.payload === 'desc'
					? state.countries.sort(function (a, b) {
						if (a.name > b.name) return -1;
						if (b.name > a.name) return 1;
						return 0;
					})
					: action.payload === 'pop_asc'
						? state.countries.sort(function (a, b) {
							return a.population - b.population;
						})
						: action.payload === 'pop_desc'
							? state.countries.sort(function (a, b) {
								return b.population - a.population;
							})
							: state.countries;
			return {
				...state,
				countries: sortedArr
			};
		default:
			return state;
	}
}

export default rootReducer;
