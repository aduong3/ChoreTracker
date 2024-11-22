import {useState} from 'react';
import PropTypes from 'prop-types';
import './Shop.css';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';

const Shop = ({onClose}) => {
    const [isCreatingItem, setIsCreatingItem] = useState(false);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [selectedIcon, setSelectedIcon] = useState(null);

    const options = [
        {value: 'faGamepad', label: <><FontAwesomeIcon icon={faGamepad} /></>}
    ];

    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: '#3b3b3b',
            width: '120px',
            height: '35px',
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
            fontSize: 20,
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
                <input type="text" name="description" id="description" placeholder="For example: Buy A Game" value={description} onChange={(e) => setDescription(e.target.value)}/>
                <label htmlFor="price">Price:</label>
                <input type="number" name="price" id="price" min="100" placeholder="100 or more" value={price} onChange={(e) => setPrice(e.target.value)}/>
                <label htmlFor="iconSelector">Select an Icon:</label>
                <Select
                options={options}
                styles={customStyles}
                placeholder="Select an icon"
                id="iconSelector"
                name="iconSelector"
                isSearchable={false}
                value={selectedIcon}
                onChange={(selected) => setSelectedIcon(selected)}
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