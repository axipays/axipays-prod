import React from 'react';
import '../../styles/component.css';

const Button = ({ className = '', onClick, disabled, children,label }) => {
    return (
        <button
            className={`btn ${className}`}
            disabled={disabled}
            onClick={onClick}
            aria-label={label}
        >
            {children}
        </button>
    );
};

export default Button;
