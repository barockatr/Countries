import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCountries,
  filterCountriesByRegion,
  orderCountriesByName,
  orderCountriesByPopulation,
  getActivities,
  filterCountriesByActivity
} from '../redux/actions';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { Paginated } from '../components/Paginated';
import { SearchBar } from '../components/SearchBar';
import { NavBar } from '../components/NavBar';
import styles from './Home.module.css';

export function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state)=> state.countries);

  //>> Paginado:
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  //9 países en la primer página
  const [contriesInFirstPage, setcontriesInFirstPage] = useState(9);
  const difference = countriesPerPage - contriesInFirstPage;
  //Guardamos countries a mostrar por página
  const currentCountries = allCountries.slice(
    (currentPage === 1 ? indexOfFirstCountry : indexOfFirstCountry - difference),
    indexOfLastCountry - difference
  );
  //Estado inicial para recargar página al ordenar por nombre:
  const [refresh, setRefresh] = useState([]);

  const activities = useSelector((state) => state.activities);
  
  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  //<<

  useEffect(()=> {
    dispatch(getCountries());
  },[dispatch])

  useEffect(()=> {
    dispatch(getActivities());
  }, [dispatch])

  function handleReset(e) {
    e.preventDefault();
    dispatch(getCountries());
  }

  //>> recibe los datos del formulario: "e.target.value":
  function handleFilterByRegion(e) {
    dispatch(filterCountriesByRegion(e.target.value))
    setCurrentPage(1);
    setRefresh(`Ordered By Region ${e.target.value}`)
  }

  function handleFilterByActivity(e) {
    dispatch(filterCountriesByActivity(e.target.value));
    //console.log(e.target.value);
    setCurrentPage(1);
    setRefresh(`Ordered By Activity ${e.target.value}`) //Modifico estado local para recargar
    e.target.value = 'default';
  }

  function handleOrderByName(e) {
    e.preventDefault();
    dispatch(orderCountriesByName(e.target.value))
    setCurrentPage(1);
    setRefresh(`Ordered By Name ${e.target.value}`) //Modifico estado local para recargar
    e.target.value = 'default';
  }

  function handleOrderByPopulation(e) {
    e.preventDefault();
    dispatch(orderCountriesByPopulation(e.target.value))
    setCurrentPage(1);
    setRefresh(`Ordered By Population ${e.target.value}`) //Modifico estado local para recargar
    e.target.value = 'default';
  }
  //<<

  return (
    <div>
      <NavBar />
      
      <div className={styles.content}>
        <div className={styles.searchContent}>
          <button className={styles.button} onClick={e => {handleReset(e)}}>Reload Countries</button>
          <Link to='/activity'><button className={styles.button}>Add Activity</button></Link>
          <SearchBar className={styles.button} />
        </div>

        <div className={styles.filterContent}>
          {/* Filtrado por continente */}
          <span className={styles.item}>Continent: </span>
          <select className={styles.select} onChange={e => handleFilterByRegion(e)} >
            <option value='All'>All</option>
            <option value='Africa'>Africa</option>
            <option value='Americas'>Americas</option>
            <option value='Asia'>Asia</option>
            <option value='Europe'>Europe</option>
            <option value='Oceania'>Oceania</option>
            <option value='Polar'>Polar</option>
          </select>
          {/* Filtrado por actividad turística */}
          <span className={styles.item}>Activity: </span>
          <select 
            className={styles.select}
            defaultValue='default'
            onChange={(e) => handleFilterByActivity(e)} >
            <option value='default' disabled='disabled'>Choose activity</option>
            {
              activities.map((a) => (
                <option value={a.name} key={a.id}>{a.name}</option>
              ))
            }
          </select>
          {/* Filtrado por orden alfabético */}
          <span className={styles.item}>Order: </span>
          <select 
            className={styles.select}
            defaultValue='default'
            onChange={(e) => handleOrderByName(e)}>
            <option value='default' disabled='disabled'>Choose order</option>
            <option value='Ascendent'>Ascendent</option>
            <option value='Descendent'>Descendent</option>
          </select>
          {/* Filtrado por población */}
          <span className={styles.item}>Population: </span>
          <select
            className={styles.select}
            defaultValue='default'
            onChange={e => handleOrderByPopulation(e)}>
            <option value='default' disabled="disabled">Choose order</option>
            <option value='Ascendent'>Ascendent</option>
            <option value='Descendent'>Descendent</option>
          </select>
        </div>
      </div>
      
      {/* //>> PAGINADO */}
      <div>
        <Paginated
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          paginated={paginated}
          //Enviamos la currentPage
          currentPage={currentPage}
          contriesInFirstPage={contriesInFirstPage}
        />
        {/* //<< PAGINADO */}
        <ul className={styles.countriesGrid}>
          {
            currentCountries?.map(c => {
              return (
                // key => evitar warning!!!
                <div key={c.name}>
                  <Link to={`/home/${c.id}`}>
                    <Card
                      flag={c.flag}
                      name={c.name}
                      region={c.region}
                      population={c.population}
                      // gini={c.gini}
                    />
                  </Link>
                </div>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}