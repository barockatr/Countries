import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, filterByContinent, filterByActivity, sort, getActivities } from '../../redux/actions';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Home.module.css';

export default function Home() {
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries);
    const allActivities = useSelector((state) => state.activities);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage] = useState(10);
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Sorting state to trigger re-render
    const [order, setOrder] = useState('');

    useEffect(() => {
        dispatch(getCountries());
        dispatch(getActivities());
    }, [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getCountries());
    }

    function handleFilterContinent(e) {
        dispatch(filterByContinent(e.target.value));
        setCurrentPage(1);
    }

    function handleFilterActivity(e) {
        dispatch(filterByActivity(e.target.value));
        setCurrentPage(1);
    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(sort(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`);
    }

    return (
        <div className={styles.home}>
            <div className={styles.nav}>
                <Link to='/activity' className={styles.link}>Create Activity</Link>
                <h1>Henry Countries</h1>
                <button onClick={e => { handleClick(e) }} className={styles.reloadBtn}>
                    Reload all countries
                </button>
                <SearchBar setCurrentPage={setCurrentPage} />
            </div>

            <div className={styles.filters}>
                <select onChange={e => handleSort(e)}>
                    <option value="asc">Ascending (A-Z)</option>
                    <option value="desc">Descending (Z-A)</option>
                    <option value="pop_asc">Population (Low-High)</option>
                    <option value="pop_desc">Population (High-Low)</option>
                </select>
                <select onChange={e => handleFilterContinent(e)}>
                    <option value="All">All Continents</option>
                    <option value="Africa">Africa</option>
                    <option value="North America">North America</option>
                    <option value="South America">South America</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                    <option value="Antarctica">Antarctica</option>
                </select>
                <select onChange={e => handleFilterActivity(e)}>
                    <option value="All">All Activities</option>
                    {allActivities && allActivities.map(act => (
                        <option value={act.name} key={act.id}>{act.name}</option>
                    ))}
                </select>
            </div>

            <Paginado
                countriesPerPage={countriesPerPage}
                allCountries={allCountries.length}
                paginado={paginado}
            />

            <div className={styles.cards}>
                {currentCountries?.map((c) => {
                    return (
                        <div key={c.id}>
                            <Link to={'/home/' + c.id}>
                                <Card name={c.name} flag={c.flag_image} continent={c.continent} key={c.id} />
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
