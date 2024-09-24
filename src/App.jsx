import './App.css'
import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMagnifyingGlass, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import Form from './Form'


function App() {
  const [showForm, setShowForm] = useState(false);
  
  const toggleForm = () => {
    setShowForm(!showForm);
  }

  const handleCloseForm = () => {
    setShowForm(false);
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
          <button>
          <FontAwesomeIcon icon={faMagnifyingGlass} id="magnify-glass"/>
            <span>View Chores</span>
          </button>
          <button>
          <FontAwesomeIcon icon={faDollarSign} id="dollar-sign"/>
            <span>Reward Shop</span>
          </button>
        </div>
      </div>
      {showForm && <Form onClose={handleCloseForm} />}
      

    </>
  )
};

export default App;
