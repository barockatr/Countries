import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities } from '../redux/actions';
import { NavBar } from '../components/NavBar';
import styles from './Activities.module.css';
import image from '../assets/activities2.png'

export function Activities(props) {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getActivities(props));
  }, [dispatch])

  const activities = useSelector ((state) => state.activities);
  //console.log(activities);

 //Verifico que existan actividades:
 const existActivities = activities?.length ? '' : 'No activities';

  return (
    <div className={styles.content}>
      <NavBar />
      <ul className={styles.card}>
      <img className={styles.image} src={image} alt='Activities' />
      <h2>{existActivities}</h2>
        {
          activities?.map(a => {
            return (
              // key => evitar warning!!!
              <li className={styles.activity} key={a.id}>
                <h2 className={styles.activityTitle}>{a.name}</h2>
                {/* < className={styles.activityItems}> */}
                  <div>
                    <h3>Duration: {a.duration}</h3>
                    <h3>Difficulty: {a.difficulty}</h3>
                    <h3>Season: {a.season}</h3>
                  </div>
                  <div>
                    {
                      a.countries?.map(ac => {
                        return(
                          <h3>{ac.name}</h3>
                        )
                      })
                    }
                  </div>
              </li>
            )
          })
        }
        </ul>
    </div>
  )
}