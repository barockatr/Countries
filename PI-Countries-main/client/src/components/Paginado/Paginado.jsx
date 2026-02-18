import React from 'react';
import styles from './Paginado.module.css';

export default function Paginado({ countriesPerPage, allCountries, paginado }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className={styles.paginado}>
                {pageNumbers && pageNumbers.map(number => (
                    <li key={number} className={styles.number}>
                        <a onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
