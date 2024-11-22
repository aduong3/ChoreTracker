import {useState, useEffect} from 'react';
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
    const [shopItems, setShopItems] = useState([]);

    const options = [
        {value: 'faGamepad', label: <><FontAwesomeIcon icon={faGamepad} /></>}
    ];

    const iconMapping = {
        faGamepad: faGamepad,
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const shopData = {
            description,
            price: Number(price),
            selectedIcon,
        };

        const authHeaders = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        };

        try{
            const response = await fetch(`http://localhost:3000/api/shop`, {
                method: "POST",
                headers: authHeaders,
                body: JSON.stringify(shopData),
            });

            if(!response.ok){
                throw new Error("Failed to create new Shop Reward");
            }
            const result = await response.json();
            console.log("Successfully created Shop Reward");

        } catch(error){
            console.error("Error creating Shop Reward:", error);
        }
    };

    const fetchShopItems = async () => {
        const token = localStorage.getItem('token');
        try{
            const response = await fetch('http://localhost:3000/api/shop', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const result = await response.json();
            setShopItems(result);
        } catch(error){
            console.error("Failed to fetch Shop Rewards", error);
        }
    };

    useEffect(() => {
        const fetchShopItems = async () => {
            const token = localStorage.getItem('token');
            try{
                const response = await fetch('http://localhost:3000/api/shop', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const result = await response.json();
                setShopItems(result);
            } catch(error){
                console.error("Failed to fetch Shop Rewards", error);
            }
        };
        fetchShopItems();
    }, []);



return (
    <>
    {!isCreatingItem ? (
    <div id="form-container">
        
        <div id="buttons-container">
        {/* <button className="shopItems"><FontAwesomeIcon icon={faGamepad} id="gamePadIcon" className="fontAwesomeIcons"/>Buy a new game:<span>3000</span></button> */}
        {shopItems.map((shopItem) => (
            <button key={shopItem.id} className="shopItems"><FontAwesomeIcon icon={iconMapping[shopItem.icon]} id="gamePadIcon" className="fontAwesomeIcons"/>{shopItem.text}:<span>{shopItem.price}</span></button>
        ))}
        </div>
        <div id="mainShop-buttons">
        <button onClick={handleCreateItem}>Create a Reward</button>
        <button onClick={onClose}>Back</button>
        </div>
    </div>
    ) : (
        <div id="form-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="description">Description:</label>
                <input type="text" name="description" id="description" placeholder="For example: Buy A Game" value={description} onChange={(e) => setDescription(e.target.value)} autoComplete="off"/>
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
                onChange={(selected) => setSelectedIcon(selected.value)}
                />
                <div>
                <input type="submit"/>
                <button onClick={() => {onClose(); handleCreateItem(false);}}>Back</button>
                </div>
            </form>
            
        </div>
    )}
    </>
);

};

Shop.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default Shop;