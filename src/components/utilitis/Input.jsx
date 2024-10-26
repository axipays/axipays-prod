import React from 'react';
import '../../styles/component.css'; // Assuming you have common styles

// Reusable FormInput component
export const Input = ({
  label,
  id,
  placeholder,
  type = "text",
  value,
  onChange,
  onKeyDown,
  className = "",
  labelClass = "",
  inputClass = "",
  hideLabel = false,  // New prop to control label rendering
  hideWrapper = false 
}) => (
  <>
    {!hideWrapper ? (
      <div className={`id-input-div ${className}`}>
        {!hideLabel && (
          <label
            className={`id-label ${value ? "filled-id-label" : ""} ${labelClass}`}
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className={`transaction-input ${inputClass}`}
        />
      </div>
    ) : (
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={`transaction-input ${inputClass}`}
      />
    )}
  </>
);

// Reusable SelectInput component
export const Select = ({
  label,
  id,
  options = [],
  value,
  onChange,
  onKeyDown,
  className = "",
  labelClass = "",
  selectClass = ""
}) => (
  <div className={`id-input-div ${className}`}>
    <label className={`id-label ${value ? "filled-id-label" : ""} ${labelClass}`} htmlFor={id}>
      {label}
    </label>
    <select
      id={id}
      value={value}
      onChange={(e)=>onChange(e.target.value)}
      onKeyDown={onKeyDown}
      className={`select-div ${selectClass}`}
    >
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);
