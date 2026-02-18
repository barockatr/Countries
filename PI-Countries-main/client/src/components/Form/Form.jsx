import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { addActivity, getCountries } from '../../redux/actions';
import styles from './Form.module.css';

function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Name is required';
    }
    if (!input.duration) {
        errors.duration = 'Duration is required';
    }
    if (!input.difficulty) {
        errors.difficulty = 'Difficulty is required';
    }
    if (!input.season) {
        errors.season = 'Season is required';
    }
    return errors;
}

export default function Form() {
    const dispatch = useDispatch();
    const history = useHistory();
    const countries = useSelector((state) => state.countries);
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        countryId: []
    });

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]);

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    function handleSelect(e) {
        setInput({
            ...input,
            countryId: [...input.countryId, e.target.value]
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(input);
        if (!input.name || !input.difficulty || !input.duration || !input.season || input.countryId.length === 0) {
            return alert("Please fill all fields and select at least one country");
        }
        dispatch(addActivity(input));
        alert("Activity Created!");
        setInput({
            name: '',
            difficulty: '',
            duration: '',
            season: '',
            countryId: []
        });
        history.push('/home');
    }

    function handleDelete(el) {
        setInput({
            ...input,
            countryId: input.countryId.filter(occ => occ !== el)
        });
    }

    return (
        <div className={styles.container}>
            <Link to='/home'><button className={styles.btnBack}>Back</button></Link>
            <h1>Create Activity</h1>
            <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={handleChange}
                    />
                    {errors.name && (
                        <p className={styles.error}>{errors.name}</p>
                    )}
                </div>
                <div className={styles.inputGroup}>
                    <label>Duration:</label>
                    <input
                        type="number"
                        value={input.duration}
                        name="duration"
                        onChange={handleChange}
                    />
                    {errors.duration && (
                        <p className={styles.error}>{errors.duration}</p>
                    )}
                </div>
                <div className={styles.inputGroup}>
                    <label>Difficulty:</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={input.difficulty}
                        name="difficulty"
                        onChange={handleChange}
                    />
                    {errors.difficulty && (
                        <p className={styles.error}>{errors.difficulty}</p>
                    )}
                </div>
                <div className={styles.inputGroup}>
                    <label>Season:</label>
                    <select name="season" onChange={handleChange}>
                        <option value="" hidden>Select Season</option>
                        <option value="Summer">Summer</option>
                        <option value="Autumn">Autumn</option>
                        <option value="Winter">Winter</option>
                        <option value="Spring">Spring</option>
                    </select>
                    {errors.season && (
                        <p className={styles.error}>{errors.season}</p>
                    )}
                </div>
                <div className={styles.inputGroup}>
                    <label>Countries:</label>
                    <select onChange={handleSelect}>
                        {countries.map((c) => (
                            <option value={c.id} key={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.selectedCountries}>
                    {input.countryId.map(el => (
                        <div className={styles.tag} key={el}>
                            <p>{el}</p>
                            <button className={styles.btnX} onClick={() => handleDelete(el)}>x</button>
                        </div>
                    ))}
                </div>

                <button type="submit" className={styles.btnSubmit}>Create Activity</button>
            </form>
        </div>
    )
}
