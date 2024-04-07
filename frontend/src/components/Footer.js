import '../css/footer.css';
import '../css/material-kit.css';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faClose } from '@fortawesome/free-solid-svg-icons';

const Footer = ({ setKeyColor }) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  const FloatingButton = ({ onClick }) => {  
    return (
      <button class="settings" onClick={onClick}>
        <FontAwesomeIcon icon={faGear} />
      </button>
    );
  };

  const Popover = ({ isVisible, onClose }) => {
    if (!isVisible) return null;

    const colors = ['#007bff', '#DC143C', '#FFD700', '#FFA500', '#32CD32'];

    const changeBackground = (color) => {
      setKeyColor(color);
    };
  
    return (
      <div class="popover">
        <button class="close" onClick={onClose}><FontAwesomeIcon icon={faClose} /></button>
        <hr class="divider" />
        <div class="colorPicker">
            <p class="label">Key Colour : </p>

            {colors.map((color) => (
                <button
                    key={color}
                    style={{
                        backgroundColor: color,
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        margin: '5px',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                    onClick={() => changeBackground(color)}
                ></button>
            ))}
        </div>
      </div>
    );
  };

  const togglePopover = () => {
    setIsPopoverVisible(!isPopoverVisible);
  };

  return (
    <footer class="footer">
        <div>
            <FloatingButton onClick={togglePopover} />
            <Popover isVisible={isPopoverVisible} onClose={() => setIsPopoverVisible(false)} />
        </div>

        <div class="container">
            <div class=" row">
                <div class="col-12">
                    <div class="text-center">
                        <p class="text-dark my-4 text-sm font-weight-normal">
                            <b>All rights reserved. Copyright © 2024 Type Aid.</b>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  );
}

export default Footer;
