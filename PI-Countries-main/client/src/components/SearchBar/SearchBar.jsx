import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchCountries } from '../../redux/actions';
import styles from './SearchBar.module.css';

export default function SearchBar({ setCurrentPage }) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!name) return alert('Please enter a name');
        dispatch(searchCountries(name));
        setName('');
        setCurrentPage(1);
    }

    return (
        <div className={styles.searchBar}>
            <input
                type="text"
                placeholder="Search..."
                onChange={(e) => handleInputChange(e)}
                value={name}
                className={styles.input}
            />
            <button type="submit" onClick={(e) => handleSubmit(e)} className={styles.btn}>Search</button>
        </div>
    )
}
