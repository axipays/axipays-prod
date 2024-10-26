import React from "react";
import "../styles/pages.css";

const ViewTransaction = ({ data, onBackClick }) => {
    return (
        <div className="view-transaction-container">
            <h4>Transaction Details</h4>
            <div className="transaction-details">
                {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="transaction-detail">
                        <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value) : value}
                    </div>
                ))}
            </div>
            <button className="back-button" onClick={onBackClick}>
                Back to Transaction Monitoring
            </button>
        </div>
    );
};

export default ViewTransaction;
