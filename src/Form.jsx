import './Form.css'
import {useState} from 'react';


function Form(){
    const [frequency, setFrequency] = useState('none');

    const handleFrequencyChange = (e) => {
        setFrequency(e.target.value);
    };
    return(
        <>
        <div id="form-container">
        <form>
            <label htmlFor="chore-title">Chore Name:</label>
            <input type="text" name="chore-title" id="chore-title"></input>
            <label htmlFor="points">How many points?</label>
            <input type="number" name="points" id="points" min="1" max="20"></input>
            <label htmlFor="frequency">How frequent?</label>
            <select name="frequency" id="frequency" value={frequency} onChange={handleFrequencyChange}>
                <option value="none">No Repeat</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
            </select>
            {/* Conditional statement to render weekdays for weekly dropdown option */}
        </form>
        </div>


        </>
    )
};

export default Form;