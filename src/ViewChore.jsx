import React, { useEffect, useState} from 'react';

function ViewChore({onClose}){

const [chores, setChores] = useState([]);
const [loading, setLoading] = useState(true);

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
            },
            body: JSON.stringify({nextDate, chorePoints: Number(chorePoints)}),
        });
        if (response.ok){
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
        });
        setChores((prevChores) => prevChores.filter((chore) => chore.id !== id));
    } catch(error){
        console.error('Error deleting chore:', error);
    }
};

useEffect(() => {
    const fetchChores = async () => {
        try{
            const response = await fetch('http://localhost:3000/api/chores');
            const data = await response.json();

            const sortedChores = data.sort((a,b) => {
                const freqDiff = frequencyOrder[a.frequency] - frequencyOrder[b.frequency];

                if(freqDiff === 0){
                    return new Date(a.date) - new Date(b.date);
                }

                return freqDiff;

            });
            setChores(sortedChores);
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
    <div>
        <h1>Chores List</h1>
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
    </div>
    <button onClick={onClose}>Back</button>
    </>
);


};

export default ViewChore;