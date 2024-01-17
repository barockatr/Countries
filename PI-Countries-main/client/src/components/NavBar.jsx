import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

export function NavBar () {
  return (
    <div className={styles.content}>
      <h1 className={styles.title}>Countries</h1>
      <div className={styles.buttons}>
        <Link to='/home'><button className={styles.button}>Home</button></Link>
        <Link to='/activities'><button className={styles.button}>Activities</button></Link>
        <Link to='/about'><button className={styles.button}>About</button></Link>
      </div>
    </div>
  )
}