import './ViewChore.css';
import React, { useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Form from './Form';

const ViewChore = ({ onClose, setUserPoints}) => {

const [chores, setChores] = useState([]);
const [loading, setLoading] = useState(true);
const [isEditing, setIsEditing] = useState(false);
const [currentChore, setCurrentChore] = useState(null);

const frequencyOrder = {
    'none': 0,
    'daily': 1,
    'weekly': 2,
    'monthly': 3,
};

const completeChore = async (choreId, chorePoints, frequency, currentDate) => {
    let nextDate = new Date(currentDate);

    if(frequency === 'daily'){
        nextDate.setDate(nextDate.getDate() + 1);
    } else if (frequency === 'weekly') {
        nextDate.setDate(nextDate.getDate() + 7);
    } else if (frequency === 'monthly') {
        nextDate.setMonth(nextDate.getMonth() + 1);
    } else {
        nextDate = null;
    }

    console.log("Points being sent:", chorePoints);
    
    try{
        const response = await fetch(`http://localhost:3000/api/chores/complete/${choreId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({nextDate, chorePoints: Number(chorePoints)}),
        });
        if (response.ok){
            const result = await response.json();
            setUserPoints(result.totalPoints);
            fetchChores();
            console.log(result.totalPoints);
            alert(`Chore completed. You earned ${chorePoints} points!`);
        } else{
            console.error("Failed to complete chore.");
        }
    } catch(error){
        console.error("Error completing chore:", error)
    }
};

const deleteChore = async (id) => {
    try{
        await fetch(`http://localhost:3000/api/chores/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        //setChores((prevChores) => prevChores.filter((chore) => chore.id !== id));
        fetchChores();
    } catch(error){
        console.error('Error deleting chore:', error);
    }
};

const editChore = (chore) => {
    setCurrentChore(chore);
    setIsEditing(true);
}

const updateChore = async (updatedChore) => {
    const token = localStorage.getItem('token');
    try{
        const response = await fetch(`http://localhost:3000/api/chores/${currentChore.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(updatedChore),
        });
        if (response.ok) {
            alert('Chore updated successfully!');
            setIsEditing(false);
            setCurrentChore(null);
            fetchChores(); //refresh chores list
        } else{
            console.error('Failed to update chore.');
        }
    } catch (error) {
        console.error('Error updating chore:', error);
    }
};

const fetchChores = async () => {
    const token = localStorage.getItem('token');
    try{
        const response = await fetch('http://localhost:3000/api/chores', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await response.json();
        //const sortedChores = data.sort((a,b) =>  new Date(a.date) - new Date(b.date));
        //setChores(sortedChores);
        setChores(data);
        setLoading(false);
    } catch (error) {
        console.error('Error fetching chores:', error);
        setLoading(false);
    }
};

useEffect(() => {
    const fetchChores = async () => {
        try{
            const response = await fetch('http://localhost:3000/api/chores', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();

            //const sortedChores = data.sort((a,b) => new Date(a.date) - new Date(b.date));
            //setChores(sortedChores);
            setChores(data);
            setLoading(false);
        }
        catch(error){
            console.error('Error fetching chores:', error);
            setLoading(false);
        }
    }

    fetchChores();
}, [frequencyOrder]);

if (loading) {
    return <p>Loading chores...</p>;
}


return (
    <>
    <div id="viewChoreForm">
        <h1>Chores List</h1>
        {isEditing ? (
            <Form
            initialData={currentChore}
            onSubmit={updateChore}
            onClose={() => setIsEditing(false)} /> ) : (
        <ul>
            {chores.map((chore) => (
                <li key={chore.id}>
                    <button onClick={() => completeChore(chore.id, chore.points, chore.frequency, chore.date)}>Completed</button>
                    <strong>{chore.name}</strong> - Points: {chore.points} - Frequency: {chore.frequency} - Next Repeat Date {new Date(chore.date).toLocaleDateString()}
                    <button onClick={() => deleteChore(chore.id)}>Delete</button>
                    <button onClick={() => editChore(chore)}>Edit</button>
                </li>
            ))}
        </ul>
            )}
    <button onClick={onClose}>Back</button>
    </div>
    
    </>
);


};

ViewChore.propTypes = {
    onClose: PropTypes.func.isRequired,
    setUserPoints: PropTypes.func.isRequired,
};

export default ViewChore;