import './Form.css'
import {useState} from 'react';
import PropTypes from 'prop-types';


function Form({ onClose }){
    const [choreName, setChoreName] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [points, setPoints] = useState(0);
    const [frequency, setFrequency] = useState('none');
    

    const handleFrequencyChange = (e) => {
        setFrequency(e.target.value);
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    }

    const fixDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        let displayDate = new Date(year, month - 1, day);

        return displayDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // await saveChore({ choreName, selectedDate, points, frequency});
    }

    return(
        <>
        <div id="form-container">
        <form onSubmit={handleSubmit}>
            <label htmlFor="chore-title">Chore Name:</label>
            <input type="text" name="chore-title" id="chore-title" value={choreName} onChange={(e) => setChoreName(e.target.value)} required></input>

            <label htmlFor="chore-date">Pick which date:</label>
            <input type="date" name="chore-date" id="chore-date" value={selectedDate} onChange={handleDateChange} required></input>

            <label htmlFor="points">How many points? (1-20)</label>
            <input type="number" name="points" id="points" min="1" max="20" value={points} onChange={(e)=> setPoints(e.target.value)} required></input>

            <label htmlFor="frequency">How frequent?</label>
            <select name="frequency" id="frequency" value={frequency} onChange={handleFrequencyChange} required>
                <option value="none">No Repeat</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
            </select>
            <div id="form-buttons">
            <input type="submit"></input>
            <button onClick={onClose}>Cancel</button>
            </div>
        </form>
            
            {frequency != 'none' && selectedDate && (
                <p>This chore will repeat {frequency} starting on {fixDate(selectedDate)}.</p>
            )}
            {frequency === 'none' && selectedDate && (
                <p> This chore will take place on {fixDate(selectedDate)}.</p>
            )}
        </div>
        </>
    )
};

Form.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default Form;