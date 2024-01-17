import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

export function Landing() {
  return (
    <div className={styles.content}>
      <div className={styles.banner}>
        <h1 className={styles.title}>Countries</h1>
        <h2 className={styles.quote}>“Remember that happiness is a way of travel, not a destination.”</h2>
        <Link to='/home'>
          <button className={styles.btn}>Get Started</button>
        </Link>
      </div>
    </div>
  )
}