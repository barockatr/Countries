import React from 'react';
import { NavBar } from '../components/NavBar';
import styles from './About.module.css';

export function About(_props) {
  return (
    <div className={styles.content}>
      <NavBar />
      <div className={styles.card}>
        <h2>Hi there! I am Ariel Romero.</h2>
        <p>I am currently a student at HENRY, where I have acquired knowledge about HTML, CSS, JavaScript, ReactJS, Redux, NodeJS, Express, Sequalize and Postgres among other technologies.</p>
        <p>This is a project where I have used part of what I have learned so far.</p>
        <p>Thanks for your visit, have a great day!</p>
      </div> 
    </div>
  )
}