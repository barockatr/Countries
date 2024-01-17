import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Card } from './components/Card';

describe('Card component', () => {
	const country = {
		id: 'ARG',
		name: 'Argentina',
		flag: 'https://restcountries.eu/data/arg.svg',
		region: 'Americas',
		capital: 'Buenos Aires',
		subregion: 'South America',
		area: 2780400,
		population: '43590400'
	};
	const component = render(
		<Card
			flag={country.flag}
			name={country.name}
			region={country.region}
			population={country.population}
		/>
	);
	test('Card component renders the country name', () => {
		//console.log(component);
		//component.debug();
		expect(component.container).toHaveTextContent(country.name);
	});
});

/*
import React from 'react';
import { configure, mount } from 'enzyme';
import Card from './components/Card';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import '@testing-library/jest-dom';

configure({ adapter: new Adapter() });

describe('Country Card', () => {
	const country = {
		id: 'ARG',
		name: 'Argentina',
		flag: 'https://restcountries.eu/data/arg.svg',
		region: 'Americas',
		capital: 'Buenos Aires',
		subregion: 'South America',
		area: 2780400,
		population: '43590400'
	};
	let wrapper;
	beforeEach(() => {
		wrapper = mount(
			<Card
				flag={country.flag}
				name={country.name}
				region={country.region}
				population={country.population}
			/>
		);
	});
	it('should render a img tag', () => {
		expect(wrapper.find('li')).toHaveLength(1);
	});
	it('should render a h2 tag', () => {
		expect(wrapper.find('h2')).toHaveLength(1);
	});
	it('should render two h3 tag', () => {
		expect(wrapper.find('h3')).toHaveLength(2);
	});
});
*/
