import React, { useEffect, useState } from 'react';
//**import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addActivity, getActivities, getCountries } from '../redux/actions';
import { NavBar } from '../components/NavBar';
import styles from './Activity.module.css';

//Validaciones:
function validate(input){
  const errors = {};
  if(!input.name) errors.name = 'An activity name is required';
  else if (!input.duration) errors.duration = "Duration is required";
  else if (!input.difficulty) errors.difficulty = 'Please select difficulty level';
  else if (input.difficulty < 1 || input.difficulty > 5) errors.difficulty = "Difficulty level can last between 1 and 5";
  else if (!input.season) errors.season = "Please select a season";
  else if (!input.countryId.length) errors.countryId = "At least one country is required";
  return errors;
}

export function Activity() {
  const dispatch = useDispatch();
  //**const history = useHistory();
  const allCountries = useSelector((state) => state.allCountries);
  const [input, setInput] = useState({
    name: "",
    difficulty:"",
    duration:"",
    season:"",
    countryId: []
  })
  const [errors, setErrors] = useState({});

  //Traemos el listado de paíces:
  useEffect(() => {
    dispatch(getCountries());
    }, []);

  //Manejo de inputs:
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })
    //console.log(input);
    setErrors(validate({
      ...input,
      [e.target.name] : e.target.value
    }))
  }

  //Manejo de radio:
  function handleRadio(e) {
    if(e.target.checked) {
      setInput({
        ...input,
        season: e.target.value
      })
    }
    //console.log((input));
      setErrors(validate({
      ...input,
      season: e.target.value
    }))
  }

  //Manejo de select:
  function handleSelect(e) {
    setInput({
      ...input,
      countryId: [...input.countryId, e.target.value]
    })
    setErrors(validate({
      ...input,
      countryId: [...input.countryId, e.target.value]
    }))
    //console.log(input.countryId);
  }

  //Obtener nombre desde id
  function getNameById(id) {
    const countryById = allCountries.filter((c) => c.id === id);
    //console.log('Nombre---', countryById[0].name);
    return countryById[0].name;
  }

  //Manejo de submit:
  function handleSubmit(e){
    //console.log(input);
    if(
      input.name &&
      input.duration &&
      input.difficulty &&
      input.season &&
      input.countryId.length
    ) {
      e.preventDefault();
      dispatch(addActivity(input));
      alert('Activty created');
      setInput({
        name: '',
        difficulty:'',
        duration:'',
        season:'',
        countryId: []
      });
      //Redirigimos a Home:
      //**history.push('/home');
    } else {
      e.preventDefault();
      //console.log(input.countryId);
      alert('All fields must be completed')
    }
  }

  //Borrar paíces seleccionados:
  const remove = (e) => {
    setInput({
      ...input,
      countryId: input.countryId.filter(country => country !== e.target.id)
    })
    e.preventDefault();
  };

  return(
    <div className={styles.content}>
      <NavBar />
      <div className={styles.card}>
        <h1>Create an activity:</h1>
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
          
          <label className={styles.item}>Activity name:</label>
            <input 
              type='text'
              value={input.name}
              name='name'
              onChange={(e) => handleChange(e)}
              placeholder='Activity name'
            />
          {errors.name && (<p className={styles.error}>{errors.name}</p>)}

          <label className={styles.item}>Activity duration:</label>
          <input type='text'
            value={input.duration}
            name='duration'
            onChange={(e) => handleChange(e)}
            placeholder='For example: 2 hours, 3 days, etc'
          />
          {errors.duration && (<p className={styles.error}>{errors.duration}</p>)}

          <label className={styles.item}>Activity difficulty:</label>
          <input type='number'
            value={input.difficulty}
            name='difficulty'
            onChange={(e) => handleChange(e)}
            placeholder='1 to 5'
          />
          {errors.difficulty && (<p className={styles.error}>{errors.difficulty}</p>)}

          <label className={styles.item}>Season: </label>
          <div>
            <label className={styles.radioItem}>
              <input 
                type='radio' 
                name='season' 
                value='summer' 
                onChange={e => handleRadio(e)}
              />Summer</label>
            <label className={styles.radioItem}>
              <input 
                type='radio' 
                name='season' 
                value='winter' 
                onChange={e => handleRadio(e)}
              />Winter</label>
            <label className={styles.radioItem}>
              <input 
                type='radio' 
                name='season' 
                value='spring' 
                onChange={e => handleRadio(e)}
              />Spring</label>
            <label className={styles.radioItem}>
              <input 
                type='radio' 
                name='season' 
                value='autumn'
                onChange={e => handleRadio(e) }
              />Autumn</label>
          </div>
          {errors.season && (<p className={styles.error}>{errors.season}</p>)}
          
          <label className={styles.item}>Choose countries:</label>
          <select
            className={styles.countriesSelection}
            name='countryId'
            id={input.countryId}
            onChange={(e) => handleSelect(e)}>
            {allCountries.map((c) => (
              <option value={c.id} key={c.id}>{c.name}</option>
            ))}
          </select>
          {errors.countryId && (<p className={styles.error}>{errors.countryId}</p>)}

          <ul className={styles.countriesList}>
            {input.countryId.map(c => (
              <div className={styles.countryRow} key={c + 'A'}>
                <button className={styles.countryListButton}
                onClick={remove}
                id={c}>X</button>
                <li key={c}>{getNameById(c)}</li>
              </div>
              )
            )}
          </ul>

          <button type='submit'>Create Activity</button>

        </form>
      </div>
    </div>
  )
}