import './Form.css'
import {useState} from 'react';


function Form(){
    const [frequency, setFrequency] = useState('none');
    const [selectedDate, setSelectedDate] = useState('');

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

    return(
        <>
        <div id="form-container">
        <form>
            <label htmlFor="chore-title">Chore Name:</label>
            <input type="text" name="chore-title" id="chore-title"></input>

            <label htmlFor="chore-date">Pick which date:</label>
            <input type="date" name="chore-date" id="chore-date" value={selectedDate} onChange={handleDateChange}></input>

            <label htmlFor="points">How many points?</label>
            <input type="number" name="points" id="points" min="1" max="20"></input>

            <label htmlFor="frequency">How frequent?</label>
            <select name="frequency" id="frequency" value={frequency} onChange={handleFrequencyChange}>
                <option value="none">No Repeat</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly (WIP)</option>
            </select>

            <input type="submit"></input>
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

export default Form;