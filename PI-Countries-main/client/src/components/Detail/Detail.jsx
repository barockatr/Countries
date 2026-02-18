import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountryDetail } from '../../redux/actions';
import { Link, useParams } from 'react-router-dom';
import styles from './Detail.module.css';

export default function Detail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const myCountry = useSelector((state) => state.detail);

    useEffect(() => {
        dispatch(getCountryDetail(id));
    }, [dispatch, id]);

    return (
        <div className={styles.container}>
            <Link to='/home'>
                <button className={styles.btn}>Back</button>
            </Link>
            {
                myCountry ?
                    <div className={styles.card}>
                        <h1>{myCountry.name}</h1>
                        <img src={myCountry.flag_image} alt="img" width="300px" height="200px" />
                        <h2>Code: {myCountry.id}</h2>
                        <h3>Continent: {myCountry.continent}</h3>
                        <h3>Capital: {myCountry.capital}</h3>
                        <h3>Subregion: {myCountry.subregion}</h3>
                        <h3>Area: {myCountry.area} km2</h3>
                        <h3>Population: {myCountry.population}</h3>
                        <div className={styles.activities}>
                            <h3>Activities:</h3>
                            {myCountry.activities && myCountry.activities.length > 0 ? myCountry.activities.map(a => (
                                <div key={a.id} className={styles.activity}>
                                    <p>Name: {a.name}</p>
                                    <p>Difficulty: {a.difficulty}</p>
                                    <p>Duration: {a.duration}</p>
                                    <p>Season: {a.season}</p>
                                </div>
                            )) : <p>No activities found</p>}
                        </div>
                    </div> : <p>Loading...</p>
            }
        </div>
    )
}
