import React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { getCountriesByName } from "../redux/actions";
import { FiSearch } from 'react-icons/fi';
import styles from './SearchBar.module.css';

export function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  function handlerInputChange(e) {
    setName(e.target.value);
    //console.log(name);
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getCountriesByName(name));
    //console.log('1 ', name);
    setName(''); //NO funciona
    //console.log('2 ', name);
  }

  return (
    <form className={styles.searchContainer}>
      <div className={styles.searchBox}>
        <input 
          className={styles.searchInput}
          type="text"
          placeholder='Search Countries...'
          value= {name}
          onChange={(e) => handlerInputChange(e)}
        />
        <button className={styles.searchButton} type='submit' onClick={
          (e) => { handleSubmit(e) }
        }>
          <FiSearch className={styles.imageButton} />
        </button>
      </div>
    </form>
  )
}