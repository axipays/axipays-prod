import React, { useState } from "react";
import "../styles/component.css";

import data from "../assets/testdata/data";
import flag from "../media/image/flag/france.png";
import Visa from "../media/icon/internet.png";
import MasterCard from "../media/icon/internet.png";

// Icons
import Icon from "../media/icon/icons";

const TransactionTable = ({ headerLabels = [], onViewClick }) => {
    const [expandedRows, setExpandedRows] = useState([]);
    const [activeOptionRow, setActiveOptionRow] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const totalCount = data.length;

    const toggleRowExpand = (index) => {
        setExpandedRows((prevExpandedRows) =>
            prevExpandedRows.includes(index)
                ? prevExpandedRows.filter((rowIndex) => rowIndex !== index)
                : [...prevExpandedRows, index]
        );
    };

    const toggleOptions = (index) => {
        setActiveOptionRow(activeOptionRow === index ? null : index);
    };

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1); 
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage * itemsPerPage < totalCount) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="transaction-table-container">
            <table className="transaction-table">
                <thead>
                    <tr>
                        {headerLabels.map((label, index) => (
                            <th key={index}>{label}</th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
            </table>
            <div className="transaction-table-body">
                <table className="transaction-table">
                    <tbody>
                        {data.length > 0 ? (
                            data.map((row, index) => (
                                <React.Fragment key={index}>
                                    <tr className={expandedRows.includes(index) ? "expanded-parent" : ""}>
                                        {headerLabels.map((label, colIndex) => {
                                            if (colIndex === 4) {
                                                const statusClass =
                                                    row[label].toLowerCase() === "success"
                                                        ? "status-success"
                                                        : row[label].toLowerCase() === "failed"
                                                        ? "status-failed"
                                                        : "status-pending";

                                                return (
                                                    <td key={label}>
                                                        <div className={`status-column ${statusClass}`}>
                                                            <div className={`bullet ${statusClass}`}></div> {row[label]}
                                                        </div>
                                                    </td>
                                                );
                                            }
                                            return (
                                                <td key={label} className={expandedRows.includes(index) ? "remover" : ""}>
                                                    {row[label]}
                                                </td>
                                            );
                                        })}
                                        <td>
                                            <div className="more-options">
                                                <span
                                                    className="icon-options"
                                                    onClick={() => toggleRowExpand(index)}
                                                >
                                                    <Icon
                                                        name="keyboard_arrow_down"
                                                        width={20}
                                                        height={20}
                                                        color="#000000"
                                                    />
                                                </span>
                                                <span
                                                    className="icon-options"
                                                    onClick={() => toggleOptions(index)}
                                                >
                                                    <Icon
                                                        name="vertical_dots"
                                                        width={20}
                                                        height={20}
                                                        color="#000000"
                                                    />
                                                </span>
                                            </div>

                                            {activeOptionRow === index && (
                                            <div className="options-menu active">
                                                <ul>
                                                    <li onClick={() => onViewClick(row)}>View Transaction</li>
                                                    <li onClick={() => alert("Delete action")}>Delete</li>
                                                </ul>
                                            </div>
                                        )}
                                        </td>
                                    </tr>

                                    {expandedRows.includes(index) && (
                                        <tr className="expanded-row">
                                            <td colSpan={headerLabels.length + 1}>
                                                <div className="expanded-content">
                                                    <div className="expanded-content-row">
                                                        <div className="expanded-left">
                                                            <span><span className="expand-text">Order No.</span> {row["Additional Info"]?.orderNo || "N/A"}</span>
                                                            <div className="divider-div"></div>
                                                            <span className="name-text"><span className="expand-text">Name</span> {row["Additional Info"]?.name || "N/A"}</span>
                                                            <div className="divider-div"></div>
                                                            <span><span className="expand-text">Email</span> {row["Additional Info"]?.email || "N/A"}</span>
                                                        </div>

                                                        <div className="expanded-center">
                                                            <span className="cards-row"><>
                                                                <img src={flag} alt="USA flag" width={20} height={15} className="flag-icon" />  <span>{row["Additional Info"]?.flag || "N/A"}</span>
                                                            </></span>
                                                            <div className="divider-div"></div>
                                                            <span className="cards-row">
                                                                {row["Additional Info"]?.card ? (
                                                                    row["Additional Info"].card.toLowerCase() === "visa" ? (
                                                                        <>
                                                                            <img
                                                                                src={Visa}
                                                                                alt="Visa card"
                                                                                width={35}
                                                                                height={15}
                                                                            />
                                                                            <span className="divider"></span>
                                                                            <span>{row["Additional Info"]?.card || "N/A"}</span>
                                                                        </>
                                                                    ) : row["Additional Info"].card.toLowerCase() === "mastercard" ? (
                                                                        <>
                                                                            <img
                                                                                src={MasterCard}
                                                                                alt="Mastercard"
                                                                                width={35}
                                                                                height={15}
                                                                            />
                                                                            <span className="divider"></span>
                                                                            <span>{row["Additional Info"]?.card || "N/A"}</span>
                                                                        </>
                                                                    ) : (
                                                                        <span>{row["Additional Info"].card}</span>
                                                                    )
                                                                ) : "N/A"}
                                                            </span>
                                                            <div className="divider-div"></div>

                                                            <span className="cards-row amount-row">{row["Additional Info"]?.amount || "N/A"}<span>{row["Additional Info"]?.currency || "N/A"}</span></span>
                                                        </div>

                                                        <div className="expanded-right">
                                                            <button className="btn-primary" onClick={() => onViewClick(row)}>
                                                                View More
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={headerLabels.length + 1} style={{ textAlign: "center" }}>
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="pagination-info">
                <div className="page-info">
                    <p className="page-info-text">Showing</p> <p>{Math.min(currentPage * itemsPerPage, totalCount)}</p> <p className="page-info-text">from</p> <p>{totalCount}</p> <p className="page-info-text">items</p>
                </div>
                <div className="pagination-buttons">
                    <select className="rows-dropdown" onChange={handleItemsPerPageChange} value={itemsPerPage}>
                        <option value={10}>10 rows</option>
                        <option value={20}>20 rows</option>
                        <option value={50}>50 rows</option>
                        <option value={100}>100 rows</option>
                    </select>

                    <div className="btn-pagination"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}>
                        <Icon
                            name="double_left_arrow"
                            width={20}
                            height={20}
                            color="#000"
                        />
                    </div>

                    <div className="btn-pagination">
                        <Icon
                            name="arrow_left"
                            width={20}
                            height={20}
                            color="#000" />
                    </div>
                    <div className="btn-pagination"> <Icon
                        name="arrow_right"
                        width={20}
                        height={20}
                        color="#000"
                    /></div>

                    <div className="btn-pagination"
                        onClick={handleNextPage}
                        disabled={currentPage * itemsPerPage >= totalCount}>
                        <Icon
                            name="double_right_arrow"
                            width={20}
                            height={20}
                            color="#000"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionTable;
