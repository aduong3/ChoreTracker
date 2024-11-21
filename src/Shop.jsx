import {useState} from 'react';
import PropTypes from 'prop-types';
import './Shop.css';

const Shop = ({onClose}) => {


return (
    <>
    <div id="form-container">
        <div id="buttons-container">
        <button className="shopItems">Example</button>
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
        <button>Create a Reward</button>
        <button onClick={onClose}>Back</button>
        </div>
    </div>
    </>
);

};

Shop.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default Shop;