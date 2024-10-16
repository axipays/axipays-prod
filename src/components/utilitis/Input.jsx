import React from 'react';
import '../../styles/component.css';

const Input = ({ type = 'text', value, placeholder, className, onChange, isRequired }) => {
    return (
        <input
            type={type}
            className={`input ${className}`}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            // Basic email validation
            pattern={type === 'email' ? "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$" : undefined}
            title={type === 'email' ? "Please enter a valid email address" : undefined}
            required = {isRequired}
        />
    );
};

export default Input;