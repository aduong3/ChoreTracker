import './App.css'
import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMagnifyingGlass, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import Form from './Form'
import ViewChore from './ViewChore'


function App() {
  const [showForm, setShowForm] = useState(false);
  const [showChores, setShowChores] = useState(false);
  
  const toggleForm = () => {
    setShowForm(!showForm);
  }

  const handleCloseForm = () => {
    setShowForm(false);
  }

  const toggleChores = () => {
    setShowChores(!showChores);
  }

  const handleCloseChores = () => {
    setShowChores(false);
  }

  return (
    <> 
      <div id="main-container">
        <div id="home-info">
          <h2>Points: #</h2>
          <h2>Amount of Chores: #</h2>
        </div>
        <div id="home-buttons">
          <button onClick={toggleForm}>
          <FontAwesomeIcon icon={faPlus} id="plus-icon"/>
            <span>Add Chores</span>
          </button>
          <button onClick={toggleChores}>
          <FontAwesomeIcon icon={faMagnifyingGlass} id="magnify-glass"/>
            <span>View Chores</span>
          </button>
          <button>
          <FontAwesomeIcon icon={faDollarSign} id="dollar-sign"/>
            <span>Reward Shop</span>
          </button>
        </div>
      </div>
      <footer>Test</footer>
      {showForm && <Form onClose={handleCloseForm} />}
      {showChores && <ViewChore onClose={handleCloseChores}/>}

    </>
  )
};

export default App;
