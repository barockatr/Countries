import React from 'react';
import { NavBar } from '../components/NavBar';
import styles from './NotFound.module.css';
import notFound from '../assets/not_found.png';

export function NotFound(_props) {
  return (
    <div className={styles.content}>
      <NavBar />
      <div className={styles.card}>
        <img className={styles.image} src={notFound} alt="" />
      </div> 
    </div>
  )
}