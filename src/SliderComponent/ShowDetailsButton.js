import React from 'react';
import IconArrowDown from '../Icons/IconArrowDown'
import '../index.css'


const ShowDetailsButton = ({ onClick }) => (
    <button onClick={onClick} className="show-details-button">
    <span>
      <IconArrowDown />
    </span>
    </button>
);
export default ShowDetailsButton;
