import './Form.css'
import {useState} from 'react';
import PropTypes from 'prop-types';


function Form({initialData = {} , onSubmit, onClose }){
    const [choreName, setChoreName] = useState(initialData.name || '');
    const [selectedDate, setSelectedDate] = useState(initialData.date || '');
    const [points, setPoints] = useState(initialData.points || 0);
    const [frequency, setFrequency] = useState(initialData.frequency || 'none');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    

    const handleFrequencyChange = (e) => {
        setFrequency(e.target.value);
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    }

    const fixDate = (dateString, frequency) => {
        const [year, month, day] = dateString.split('-');
        let displayDate = new Date(year, month - 1, day);

        if(frequency === 'none'){
            return displayDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })
        }
        if(frequency === 'weekly'){
            return daysofWeek[displayDate.getDay()]
        }
        if(frequency === 'monthly'){
            let nth = displayDate.getDate();
            if (nth > 3 && nth < 21){
                return nth + "th";
            }
            switch (nth % 10){
                case 1: return nth + "st";
                case 2: return nth + "nd";
                case 3: return nth + "rd";
                default: return nth + "th";
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (points < 1 || points > 20) {
            setError('Must be between 1-20 points.');
            return;
        }

        const choreData = {
            choreName,
            date: selectedDate,
            points: Number(points),
            frequency,
        };

        try{
            const authHeaders = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            };

            const response = initialData.id
            ? await fetch(`http://localhost:3000/api/chores/${initialData.id}`, {
                method: 'PUT',
                headers: authHeaders,
                body: JSON.stringify(choreData),
            })
            : await fetch('http://localhost:3000/api/chores', {
                method: 'POST',
                headers: authHeaders,
                body: JSON.stringify(choreData),
            });

            if (!response.ok){
                throw new Error(initialData.id ? 'Failed to update chore' : 'Failed to add chore');
            }
            const result = await response.json();
            setSuccessMessage(`Chore ${initialData.id ? 'updated' : 'added'} successfully!`);
            console.log(successMessage);

            if(!initialData.id) {
            setChoreName('');
            setSelectedDate('');
            setPoints(1);
            setFrequency('none');
            } else {
                onClose();
            }

        }
        catch (error){
            setError(error.message);
        }

    };

    const daysofWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return(
        <>
        <div id="form-container">
        <form onSubmit={handleSubmit}>
            <label htmlFor="chore-title">Chore Name:</label>
            <input type="text" name="chore-title" id="chore-title" value={choreName} onChange={(e) => setChoreName(e.target.value)} autoComplete="off" required></input>

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
            {frequency === 'none' && selectedDate && (
                <p> This chore will take place once on {fixDate(selectedDate,frequency)}.</p>
            )}
            {frequency === 'daily' && (
                <p>This chore will repeat {frequency}.</p>
            )}
            {frequency === 'weekly' && selectedDate && (
                <p>This chore will repeat {frequency} every {fixDate(selectedDate,frequency)}.  </p>
            )}
            {frequency === 'monthly' && selectedDate && (
                <p>This chore will repeat {frequency} on the {fixDate(selectedDate,frequency)}.</p>
            )}
        </div>
        </>
    )
};

Form.propTypes = {
    initialData: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default Form;