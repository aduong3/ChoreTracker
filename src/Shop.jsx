import {useState} from 'react';
import PropTypes from 'prop-types';
import './Shop.css';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';

const Shop = ({onClose, onChange}) => {
    const [isCreatingItem, setIsCreatingItem] = useState(false);

    const options = [
        {value: 'faGamepad', label: <><FontAwesomeIcon icon={faGamepad} /></>}
    ];

    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: '#3b3b3b',
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#3b3b3b',
            
        }),
        option: (provided) => ({
            ...provided,
            backgroundColor: '#3b3b3b',
            color: '#ffffff',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#ffffff',
        }),
    };

    const handleCreateItem = () => {
        setIsCreatingItem(!isCreatingItem);
    }

return (
    <>
    {!isCreatingItem ? (
    <div id="form-container">
        
        <div id="buttons-container">
        <button className="shopItems"><FontAwesomeIcon icon={faGamepad} id="gamePadIcon" className="fontAwesomeIcons"/>Buy a new game:<span>3000</span></button>
        <button className="shopItems">Example</button>
        <button className="shopItems">Example</button>

        <button className="shopItems">Example</button>
        <button className="shopItems">Example</button>
        <button className="shopItems">Example</button>

        <button className="shopItems">Example</button>
        <button className="shopItems">Example</button>
        <button className="shopItems">Example</button>
        </div>
        <div id="mainShop-buttons">
        <button onClick={handleCreateItem}>Create a Reward</button>
        <button onClick={onClose}>Back</button>
        </div>
    </div>
    ) : (
        <div id="form-container">
            <form>
                <label htmlFor="description">Description:</label>
                <input type="text" name="description" id="description" placeholder="For example: Buy A Game"/>
                <label htmlFor="price">Price:</label>
                <input type="number" name="price" id="price" min="100"/>
                <label htmlFor="iconSelector">Select an Icon:</label>
                <Select
                options={options}
                onChange={onChange}
                styles={customStyles}
                placeholder="Select an icon"
                id="iconSelector"
                name="iconSelector"
                />
                <div>
                <input type="submit"/>
                <button onClick={() => {onClose(); handleCreateItem();}}>Back</button>
                </div>
            </form>
            
        </div>
    )}
    </>
);

};

Shop.propTypes = {
    onClose: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Shop;