import React, { useState } from "react";
import "../styles/component.css";
import data from "../assets/testdata/data";
import flag from "../media/image/flag/france.png";
import Visa from "../media/image/visa.png";
import MasterCard from "../media/image/mastercard.png";
import Icon from "../media/icon/icons";

const TransactionTable = ({ headerLabels = [], onViewClick }) => {
    const [expandedRows, setExpandedRows] = useState([]);
    const [activeOptionRow, setActiveOptionRow] = useState(null);
    const [filterText] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredData = data.filter((row) =>
        Object.values(row).some((val) =>
            String(val).toLowerCase().includes(filterText.toLowerCase())
        )
    );

    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

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

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const handleNextPageClick = () => {
        if (currentPage * rowsPerPage < filteredData.length) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePrevPageClick = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
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
                <tbody>
                    {paginatedData.length > 0 ? (
                        paginatedData.map((row, index) => (
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
                            <td colSpan={headerLabels.length + 1}>
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="pagination-info">
                <div className="page-info">
                    <p className="page-info-text">Showing</p>
                    <p>{Math.min(currentPage * rowsPerPage, filteredData.length)}</p>
                    <p className="page-info-text">from</p>
                    <p>{filteredData.length}</p>
                    <p className="page-info-text">items</p>
                </div>



                <div className="pagination-buttons">
                    <select
                        className="rows-dropdown"
                        onChange={handleRowsPerPageChange}
                        value={rowsPerPage}
                    >
                        {[10, 20, 50, 100].map((rows) => (
                            <option key={rows} value={rows}>
                                {rows} rows
                            </option>
                        ))}
                    </select>

                    <button
                        className="btn-pagination"
                        onClick={handlePrevPageClick}
                        disabled={currentPage === 1}
                    >
                        <Icon name="double_arrow_left" width={20} height={20} color="#000" />
                    </button>

                    {["arrow_left", "arrow_right"].map((direction, index) => (
                        <button key={index} className="btn-pagination">
                            <Icon name={direction} width={20} height={20} color="#000" />
                        </button>
                    ))}

                    <button
                        className="btn-pagination"
                        onClick={handleNextPageClick}
                        disabled={currentPage * rowsPerPage >= filteredData.length}
                    >
                        <Icon name="double_arrow_right" width={20} height={20} color="#000" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionTable;
