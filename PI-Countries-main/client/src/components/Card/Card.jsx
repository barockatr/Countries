import React from 'react';
import styles from './Card.module.css';

export default function Card({ flag, name, continent, id }) {
    return (
        <div className={styles.card}>
            <img src={flag} alt="img not found" width="200px" height="120px" />
            <div className={styles.info}>
                <h3>{name}</h3>
                <h5>{continent}</h5>
            </div>
        </div>
    );
}
